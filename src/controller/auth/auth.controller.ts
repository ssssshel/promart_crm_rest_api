import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ResponseDto } from '../user/dto/response.dto';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<Response<ResponseDto>> {
    const { accessToken } = await this.authService.login(loginDto)
    return res.status(200).json({
      success: true,
      data: {
        accessToken
      },
      message: 'Successfully login'
    })
  }
}
