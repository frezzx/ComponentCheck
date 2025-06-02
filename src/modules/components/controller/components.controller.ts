import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ComponentsService } from '../domain/components.service';
import { Response } from 'express';
import { CreateComponentsDTO } from '../dto/create.components.dto';

@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post('/create')
  async createUser(
    @Res() response: Response,
    @Body() data: CreateComponentsDTO,
  ) {
    return response
      .status(201)
      .json(await this.componentsService.createComponent(data));
  }

  @Get('/list')
  async findAllComponents(@Res() response: Response) {
    return response
      .status(200)
      .json(await this.componentsService.findAllComponents());
  }

  @Put('/:id')
  async UpdatedComponents(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() input: any,
  ) {
    return response
      .status(200)
      .json(await this.componentsService.Update(id, input));
  }
}
