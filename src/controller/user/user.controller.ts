import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ChangeUserStatusDto } from 'src/controller/user/dto/change-user-status.dto';
import { CreateUserDto } from 'src/controller/user/dto/create-user.dto';
import { ResponseDto } from 'src/controller/user/dto/response.dto';
import { UpdateUserDto } from 'src/controller/user/dto/update-user.dto';
import { JwtAuthGuard } from 'src/infraestructure/guard/jwt-auth.guard';
import { JwtPayload } from 'src/infraestructure/utils/interfaces';
import { UserService } from 'src/service/user/user.service';

@Controller('api/v1/users')
export class UserController {

  constructor(private userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Response<ResponseDto>> {
    const { role_id }: JwtPayload = req.user
    const user = await this.userService.create(createUserDto, role_id)
    return res.status(201).json({
      success: true,
      data: user,
      statusCode: 201,
      message: 'User created successfully',
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Req() req, @Param('id') id: number, @Res() res: Response): Promise<Response<ResponseDto>> {
    if (isNaN(id)) {
      throw new BadRequestException(`Invalid id parameter =>  ${id}`);
    }

    const { role_id }: JwtPayload = req.user

    const user = await this.userService.findById(id, role_id);
    return res.status(200).json({
      success: true,
      data: user,
      statusCode: 200,
      message: 'User retrieved successfully',
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req, @Query('limit') limit: number, @Query('page') page: number, @Res() res: Response): Promise<Response<ResponseDto>> {
    ;

    if (isNaN(page) || page < 1) {
      throw new BadRequestException(`Invalid page parameter =>  ${page}`);
    }
    if (isNaN(limit) || limit < 1) {
      throw new BadRequestException(`Invalid limit parameter => ${limit}`);
    }

    const { role_id }: JwtPayload = req.user

    const result = await this.userService.findAll(page, limit, role_id)
    return res.status(200).json({
      success: true,
      data: result,
      statusCode: 200,
      message: 'Users retrieved successfully'
    })
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Req() req, @Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Res() res: Response): Promise<Response<ResponseDto>> {
    if (isNaN(id)) {
      throw new BadRequestException(`Invalid id parameter =>  ${id}`);
    }
    if (!Object.keys(updateUserDto).length) {
      throw new BadRequestException(`Empty payload =>  ${JSON.stringify(updateUserDto)}`);
    }

    const { role_id }: JwtPayload = req.user

    const user = await this.userService.update(id, updateUserDto, role_id)
    return res.status(200).json({
      success: true,
      data: user,
      statusCode: 200,
      message: 'User updated successfully',
    })

  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number, @Res() res: Response): Promise<Response<ResponseDto>> {
    if (isNaN(id)) {
      throw new BadRequestException(`Invalid id parameter =>  ${id}`);
    }

    const { role_id }: JwtPayload = req.user

    await this.userService.delete(id, role_id)
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User deleted successfully',
    })
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/status')
  async changeStatus(@Req() req, @Param('id') id: number, @Body() changeUserStatusDto: ChangeUserStatusDto, @Res() res: Response): Promise<Response<ResponseDto>> {
    if (isNaN(id)) {
      throw new BadRequestException(`Invalid id parameter =>  ${id}`);
    }

    const { role_id }: JwtPayload = req.user
    const userStatus = await this.userService.changeStatus(id, changeUserStatusDto, role_id);
    return res.status(200).json({
      success: true,
      data: userStatus,
      statusCode: 200,
      message: 'User status changed successfully',
    })

  }
}
