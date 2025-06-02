// components.module.ts
import { Module } from '@nestjs/common';
import { ComponentsController } from './controller/components.controller';
import { ComponentsService } from './domain/components.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Components } from './entities/components.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Components]),
    UsersModule,
  ],
  controllers: [ComponentsController],
  providers: [ComponentsService],
})
export class ComponentsModule {}
