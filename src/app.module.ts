import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ComponentsModule } from './modules/components/components.module';
import { QuizModule } from './modules/quizPerformance/quiz.module';
import { OpenAIQuizModule } from './modules/openAIService/openaiQuizz.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: false,
      migrations: [__dirname + '/database/migrations/*{.js,.ts}'],
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    UsersModule,
    ComponentsModule,
    QuizModule,
    OpenAIQuizModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
