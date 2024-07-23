import { BadRequestException, Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/infraestructure/guard/jwt-auth.guard';
import { UserStatusService } from 'src/service/user-status/user-status.service';
import { ResponseDto } from '../user/dto/response.dto';
import { JwtPayload } from 'src/infraestructure/utils/interfaces';
import { Response } from 'express';

@Controller('api/v1/user-status')
export class UserStatusController {
  constructor(
    private userStatusService: UserStatusService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findByUserId(@Req() req, @Param('id') id: number, @Res() res: Response): Promise<Response<ResponseDto>> {
    if (isNaN(id)) {
      throw new BadRequestException(`Invalid id parameter =>  ${id}`);
    }

    const { role_id }: JwtPayload = req.user

    const user = await this.userStatusService.findByUserId(id, role_id);
    return res.status(200).json({
      success: true,
      data: user,
      statusCode: 200,
      message: 'User retrieved successfully',
    })
  }
}
