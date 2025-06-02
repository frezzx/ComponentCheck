// quiz.module.ts
import { Module } from '@nestjs/common';
import { QuizController } from './controller/openaiQuiz.controller';
import { MistralAIService } from './domain/openaiQuizz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    // TypeOrmModule.forFeature([QuizPerformance]),
    UsersModule,
  ],
  controllers: [QuizController],
  providers: [MistralAIService],
})
export class OpenAIQuizModule {}
