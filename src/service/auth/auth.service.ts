import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/controller/auth/dto/login.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/infraestructure/utils/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService
  ) { }

  /**
   * Authenticates a user and generates an access token.
   * @param loginDto - DTO containing user email and password.
   * @returns An object containing the access token.
   * @throws NotFoundException if the user with the given email is not found.
   * @throws UnauthorizedException if the provided password is incorrect.
   */
  async login(loginDto: LoginDto) {
    try {
      const user = await this.userModel.findOne({ where: { email: loginDto.email } })
      if (!user) {
        throw new NotFoundException("Invalid email")
      }

      const verifiedPsw = await bcrypt.compare(loginDto.password, user.password_hash)
      if (!verifiedPsw) {
        throw new UnauthorizedException("Invalid password")
      }

      return {
        accessToken: this.generateAccessToken(user)
      }
    } catch (error) {
      Logger.error(error, 'AuthService')
      throw error
    }
  }

  /**
   * Generates an access token for the authenticated user.
   * @param user - The authenticated user.
   * @returns The generated access token.
   */
  private generateAccessToken(user: User) {
    const payload: JwtPayload = { user_id: user.id, username: user.email, role_id: user.role_id }
    const accessToken = this.jwtService.sign(payload)
    return accessToken
  }
}
