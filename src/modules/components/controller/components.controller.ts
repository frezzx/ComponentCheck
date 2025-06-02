import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
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

  @Get('/:name')
  async findByComponentName(
    @Param('name') name: string,
    @Res() response: Response,
  ) {
    return response
      .status(200)
      .json(await this.componentsService.FindByName(name));
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

  @Delete('/:id')
  async DeleteComponents(@Res() response: Response, @Param('id') id: number) {
    return response.status(200).json(await this.componentsService.Delete(id));
  }
}
