import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { ChangeUserStatusDto } from 'src/infraestructure/utils/dto/change-user-status.dto';
import { CreateUserDto } from 'src/infraestructure/utils/dto/create-user.dto';
import { ResponseDto } from 'src/infraestructure/utils/dto/response.dto';
import { UpdateUserDto } from 'src/infraestructure/utils/dto/update-user.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('api/v1/users')
export class UserController {

  constructor(private userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Response<ResponseDto>> {
    try {
      const user = await this.userService.create(createUserDto);
      return res.status(201).json({
        success: true,
        data: user,
        statusCode: 201,
        message: 'User created successfully',
      })
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: error.errors[0].message
        })
      }

      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: error
      })
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ResponseDto> {
    try {
      const user = await this.userService.findById(id);
      return {
        success: true,
        data: user,
        statusCode: 200,
        message: 'User retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.getStatus?.() || 400,
        message: error.message
      }
    }
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<ResponseDto> {
    try {
      const result = await this.userService.findAll(page, limit);
      return {
        success: true,
        data: result.data,
        statusCode: 200,
        message: 'Users retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.getStatus?.() || 400,
        message: error.message
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<ResponseDto> {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return {
        success: true,
        data: user,
        statusCode: 200,
        message: 'User updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.getStatus?.() || 400,
        message: error.message
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDto> {
    try {
      await this.userService.delete(id);
      return {
        success: true,
        statusCode: 200,
        message: 'User deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.getStatus?.() || 400,
        message: error.message
      }
    }
  }

  @Post(':id/status')
  async changeStatus(@Param('id') id: number, @Body() changeUserStatusDto: ChangeUserStatusDto): Promise<ResponseDto> {
    try {
      const userStatus = await this.userService.changeStatus(id, changeUserStatusDto);
      return {
        success: true,
        data: userStatus,
        statusCode: 200,
        message: 'User status changed successfully',
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.getStatus?.() || 400,
        message: error.message
      }
    }
  }
}
