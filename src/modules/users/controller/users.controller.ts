import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from '../domain/users.service';
import { Response } from 'express';
import { CreateUserDTO } from '../dto/create.user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDTO } from '../dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async createUser(@Res() response: Response, @Body() data: CreateUserDTO) {
    return response.status(201).json(await this.userService.createUser(data));
  }

  @Get('list')
  async findAllUsers(@Res() response: Response) {
    return response.status(200).json(await this.userService.findAllUsers());
  }

  @Get(':id')
  async findUser(@Param('id') id: number, @Res() response: Response) {
    return response.status(200).json(await this.userService.findByUserId(id));
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Res() response: Response,
    @Body() input: UpdateUserDTO,
  ) {
    return response
      .status(200)
      .json(await this.userService.updateUser(id, input));
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: number,
    @Res() response: Response,
  ) {
    return response
      .status(200)
      .json(await this.userService.delete(id));
  }

  @Post('auth')
  async authUser(
    @Res() response: Response,
    @Body() data: { email: string; password: string },
  ) {
    try {
      const user = await this.userService.authUser(data);
      return response.status(200).json(user);
    } catch (error) {
      return response
        .status(error.status || 500)
        .json({ message: error.message });
    }
  }
}
