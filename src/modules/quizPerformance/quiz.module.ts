// quiz.module.ts
import { Module } from '@nestjs/common';
import { QuizController } from './controller/quiz.controller';
import { QuizService } from './domain/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizPerformance } from './entities/quiz.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { Answer } from './entities/answers.entity';
import { Question } from './entities/questions.entity';
import { Quiz } from './entities/quizzes.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([QuizPerformance, Answer, Question, Quiz]),
    UsersModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
