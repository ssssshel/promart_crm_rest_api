import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChangeUserStatusDto } from 'src/infraestructure/utils/dto/change-user-status.dto';
import { CreateUserDto } from 'src/infraestructure/utils/dto/create-user.dto';
import { UpdateUserDto } from 'src/infraestructure/utils/dto/update-user.dto';
import { Status } from 'src/model/status.model';
import { UserStatus } from 'src/model/user-status.model';
import { User } from 'src/model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(UserStatus)
    private userStatusModel: typeof UserStatus,
    @InjectModel(Status)
    private statusModel: typeof Status
  ) { }

  private validTransitions = {
    prospect: ['active'],
    active: ['inactive'],
    inactive: ['active', 'locked'],
    locked: ['active']
  };

  async create(createUserDto: CreateUserDto) {
    try {
      Logger.log(createUserDto, 'UserService');
      const { email, first_name, last_name, password_hash, role_id, middle_name } = createUserDto

      const user = await User.create({
        first_name,
        last_name,
        middle_name,
        email,
        password_hash,
        role_id
      });
      return user;
    } catch (error) {
      Logger.error(error, 'UserService');
      throw error
    }
  }

  async findById(id: number) {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new NotFoundException(`User not found with id: ${id}`);
      }
      return user;
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Failed to retrieve user');
    }
  }

  async findAll(page: number, limit: number) {
    try {
      const { count, rows } = await this.userModel.findAndCountAll({
        limit,
        offset: (page - 1) * limit
      });

      return { data: rows, total: count };
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Failed to retrieve users');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new NotFoundException(`User not found with id: ${id}`);
      }
      await user.update(updateUserDto);
      return user;
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Failed to update user');
    }
  }

  async delete(id: number) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new NotFoundException(`User not found with id: ${id}`);
      }

      user.is_deleted = true;
      await user.save();
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Failed to delete user');
    }
  }

  async changeStatus(id: number, changeUserStatusDto: ChangeUserStatusDto) {
    try {
      const userStatus = await this.userStatusModel.findOne({
        where: { user_id: id }
      });
      if (!userStatus) {
        throw new NotFoundException(`User not found with id: ${id}`);
      }
      const { current_status_id } = userStatus;

      const currentStatusName = (
        await this.statusModel.findByPk(current_status_id)
      ).name;
      const newStatusName = (
        await this.statusModel.findByPk(changeUserStatusDto.status_id)
      ).name;
      if (!currentStatusName || !newStatusName) {
        throw new NotFoundException(`Failed to update user_status`);
      }

      this.validateStatusTransition(currentStatusName, newStatusName);

      userStatus.current_status_id = changeUserStatusDto.status_id;
      await userStatus.save();
      return userStatus;
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Failed to change user status');
    }
  }

  private validateStatusTransition(
    currentStatusName: string,
    newStatusName: string
  ): void {
    // Verificamos si el nuevo estado es válido para el estado actual
    const allowedTransitions = this.validTransitions[currentStatusName];

    if (!allowedTransitions || !allowedTransitions.includes(newStatusName)) {
      throw new BadRequestException('Invalid status transition');
    }
  }
}
