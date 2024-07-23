import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/model/role.model';
import { Status } from 'src/model/status.model';
import { UserStatus } from 'src/model/user-status.model';

@Injectable()
export class UserStatusService {

  constructor(
    @InjectModel(UserStatus)
    private userStatusModel: typeof UserStatus,
    @InjectModel(Role)
    private roleModel: typeof Role
  ) { }

  async findByUserId(userId: number, roleId: number) {
    try {
      const role = await this.roleModel.findByPk(roleId)
      if (!role.p_view_client) {
        throw new ForbiddenException('Forbidden access')
      }

      const userStatus = await this.userStatusModel.findOne({
        where: {
          user_id: userId
        },
        include: {
          model: Status
        }
      })

      if (!userStatus) {
        throw new NotFoundException(`User status not found with user_id: ${userId}`)
      }

      return userStatus
    } catch (error) {
      Logger.error(error, 'UserService')
      throw error
    }
  }
}
