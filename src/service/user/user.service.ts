import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError } from 'sequelize';
import { ChangeUserStatusDto } from 'src/controller/user/dto/change-user-status.dto';
import { CreateUserDto } from 'src/controller/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/controller/user/dto/update-user.dto';
import { Status } from 'src/model/status.model';
import { UserStatus } from 'src/model/user-status.model';
import { User } from 'src/model/user.model';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/model/role.model';
import { ValidTransitions } from 'src/infraestructure/utils/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(UserStatus)
    private userStatusModel: typeof UserStatus,
    @InjectModel(Status)
    private statusModel: typeof Status,
    @InjectModel(Role)
    private roleModel: typeof Role
  ) { }

  private validTransitions = {
    prospect: ['active'],
    active: ['inactive'],
    inactive: ['active', 'locked'],
    locked: ['active']
  };

  /**
   * Creates a new user.
   * @param createUserDto - DTO containing the necessary data to create a user.
   * @param roleId - ID of the role associated with the user.
   * @returns The created user.
   * @throws ForbiddenException if the role does not allow creating clients.
   * @throws BadRequestException if the email is already in use.
   */
  async create(createUserDto: CreateUserDto, roleId: number) {
    try {
      const role = await this.roleModel.findByPk(roleId)
      if (!role.p_create_client) {
        throw new ForbiddenException('Forbidden access')
      }

      const { email, first_name, last_name, role_id, middle_name } = createUserDto

      const psw = (first_name.slice(0, 2) + last_name.slice(1) + '2024').toLowerCase()

      const salt = await bcrypt.genSalt(7)
      const hashPsw = await bcrypt.hash(psw, salt)

      const user = await User.create({
        first_name,
        last_name,
        middle_name,
        email,
        password_hash: hashPsw,
        role_id
      })

      await UserStatus.create({
        user_id: user.id
      })

      return user
    } catch (error) {
      Logger.error(error, 'UserService')

      if (error instanceof UniqueConstraintError) {
        throw new BadRequestException({ message: 'Email should be unique' })
      }
      throw error
    }
  }

  /**
   * Finds a user by their ID.
   * @param id - ID of the user to find.
   * @param roleId - ID of the role associated with the user making the request.
   * @param includeRole - Whether to include the user's role information.
   * @returns The found user.
   * @throws ForbiddenException if the role does not allow viewing clients.
   * @throws NotFoundException if the user is not found.
   */
  async findById(id: number, roleId: number, includeRole: boolean = true) {
    try {
      const role = await this.roleModel.findByPk(roleId)
      if (!role.p_view_client) {
        throw new ForbiddenException('Forbidden access')
      }

      const user = await this.userModel.findOne({
        where: {
          id,
          is_deleted: false
        },
        attributes: ['id', 'first_name', 'last_name', 'middle_name', 'email', 'role_id'],
        include: includeRole ? {
          model: Role
        } : null
      })

      if (!user) {
        throw new NotFoundException(`User not found with id: ${id}`)
      }
      return user
    } catch (error) {
      Logger.error(error, 'UserService')
      throw error
    }
  }

  /**
  * Finds all users with pagination.
  * @param page - Page number.
  * @param limit - Number of users per page.
  * @param roleId - ID of the role associated with the user making the request.
  * @returns An object containing the users and the total count.
  * @throws ForbiddenException if the role does not allow viewing clients.
  * @throws NotFoundException if no users are found.
  */
  async findAll(page: number, limit: number, roleId: number) {
    try {
      const role = await this.roleModel.findByPk(roleId)
      if (!role.p_view_client) {
        throw new ForbiddenException('Forbidden access')
      }

      const { count, rows } = await this.userModel.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
        where: {
          is_deleted: false
        },
        attributes: ['id', 'first_name', 'last_name', 'middle_name', 'email', 'role_id'],
        include: {
          model: Role,
          attributes: ['id', 'name']
        }
      });

      if (!rows.length) {
        throw new NotFoundException(`Users not found with page: ${page}, limit: ${limit}`)
      }
      return { users: rows, total: count };
    } catch (error) {
      Logger.error(error, 'UserService');
      throw error
    }
  }

  /**
   * Updates an existing user.
   * @param id - ID of the user to update.
   * @param updateUserDto - DTO containing the data to update the user.
   * @param roleId - ID of the role associated with the user making the update.
   * @returns The updated user.
   * @throws ForbiddenException if the role does not allow updating clients.
   * @throws BadRequestException if the email is already in use.
   */
  async update(id: number, updateUserDto: UpdateUserDto, roleId: number) {
    try {
      const role = await this.roleModel.findByPk(roleId)
      if (!role.p_update_client) {
        throw new ForbiddenException('Forbidden access')
      }

      const user = await this.findById(id, roleId);

      Logger.log(JSON.stringify(updateUserDto), 'dto')
      await user.update(updateUserDto);
      return user;
    } catch (error) {
      Logger.error(error, 'UserService')
      if (error instanceof UniqueConstraintError) {
        throw new BadRequestException({ message: 'Email should be unique' })
      }
      throw error
    }
  }

  /**
   * Changes a user's status.
   * @param id - ID of the user whose status is to be changed.
   * @param changeUserStatusDto - DTO containing the data needed to change the user's status.
   * @param roleId - ID of the role associated with the user making the change.
   * @returns The updated user status.
   * @throws ForbiddenException if the role does not allow modifying client status.
   * @throws NotFoundException if the user or the status is not found.
   * @throws BadRequestException if the status transition is not valid.
   */
  async delete(id: number, roleId: number) {
    try {
      const role = await this.roleModel.findByPk(roleId)
      if (!role.p_delete_client) {
        throw new ForbiddenException('Forbidden access')
      }

      const user = await this.findById(id, roleId)

      user.is_deleted = true
      await user.save()
    } catch (error) {
      Logger.error(error, 'UserService');
      throw error
    }
  }

  async changeStatus(id: number, changeUserStatusDto: ChangeUserStatusDto, roleId: number) {
    try {
      const role = await this.roleModel.findByPk(roleId)
      if (!role.p_modify_client_status) {
        throw new ForbiddenException('Forbidden access')
      }

      // verificar si existe el usuario al que se le cambiara el estado
      await this.findById(id, roleId)
      const userStatus = await this.userStatusModel.findOne({
        where: { user_id: id }
      })
      if (!userStatus) {
        throw new NotFoundException(`User not found with id: ${id}`)
      }
      const { current_status_id } = userStatus

      // obtener los nombres de los estados (actual y nuevo)
      const currentStatus =
        await this.statusModel.findByPk(current_status_id)

      const newStatus =
        await this.statusModel.findByPk(changeUserStatusDto.status_id)

      if (!currentStatus || !newStatus) {
        throw new NotFoundException(`Failed to update user_status`)
      }
      const currentStatusName = currentStatus.name
      const newStatusName = newStatus.name

      // validar si la transicion esta permitida
      await this.validateStatusTransition(currentStatusName as ValidTransitions, newStatusName as ValidTransitions, roleId)

      // de ser valida se guardan los cambios
      userStatus.current_status_id = changeUserStatusDto.status_id
      userStatus.changed_by_user_id = changeUserStatusDto.user_id
      userStatus.change_status_date = new Date()
      await userStatus.save()

      return {
        ...userStatus.dataValues,
        statusName: newStatusName
      }
    } catch (error) {
      Logger.error(error, 'UserService')
      throw error
    }
  }

  private async validateStatusTransition(
    currentStatusName: ValidTransitions,
    newStatusName: ValidTransitions,
    roleId: number
  ) {

    const role = await this.roleModel.findByPk(roleId)
    if (currentStatusName === 'locked' && !role.p_unlock_client) {
      throw new ForbiddenException('Forbidden access')
    }
    // Verificamos si el nuevo estado es válido para el estado actual
    const allowedTransitions = this.validTransitions[currentStatusName];

    if (!allowedTransitions || !allowedTransitions.includes(newStatusName)) {
      throw new BadRequestException('Invalid status transition');
    }
  }
}
