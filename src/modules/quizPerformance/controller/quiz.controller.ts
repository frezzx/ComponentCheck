import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { QuizService } from '../domain/quiz.service';
import { CreateQuizDTO } from '../dto/create.quizzes.dto';
import { CreateQuestionDTO } from '../dto/create.questions.dto';
import { CreateAnswerDTO } from '../dto/create.answers.dto';
import { CreateQuizPerformanceDTO } from '../dto/create.quiz.dto';
import { UpdateQuizDTO } from '../dto/update.quizzes.dto';
import { UpdateQuestionDTO } from '../dto/update.questions.dto';
import { UpdateAnswerDTO } from '../dto/update.answers.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // === QUIZ ===

  @Post('create')
  async createQuiz(@Res() response: Response, @Body() data: CreateQuizDTO) {
    const quiz = await this.quizService.createQuiz(data);
    return response.status(201).json(quiz);
  }

  @Get('list')
  async findAllQuizzes(@Res() response: Response) {
    const quizzes = await this.quizService.findAllQuizzes();
    return response.status(200).json(quizzes);
  }

  @Get(':id')
  async findQuizById(@Param('id') id: number, @Res() response: Response) {
    const quiz = await this.quizService.findQuizById(id);
    return response.status(200).json(quiz);
  }

  @Patch(':id')
  async updateQuiz(
    @Param('id') id: number,
    @Body() data: UpdateQuizDTO,
    @Res() response: Response,
  ) {
    const updated = await this.quizService.updateQuiz(id, data);
    return response.status(200).json(updated);
  }

  @Delete(':id')
  async deleteQuiz(@Param('id') id: number, @Res() response: Response) {
    await this.quizService.deleteQuiz(id);
    return response.status(204).send();
  }

  // === QUESTIONS ===

  @Post(':quizId/questions')
  async createQuestions(
    @Param('quizId') quizId: number,
    @Body() questionsDto: CreateQuestionDTO[],
    @Res() response: Response,
  ) {
    const questions = await this.quizService.createQuestions(
      quizId,
      questionsDto,
    );
    return response.status(201).json(questions);
  }

  @Get(':quizId/questions')
  async findQuestionsByQuiz(
    @Param('quizId') quizId: number,
    @Res() response: Response,
  ) {
    const questions = await this.quizService.findQuestionsByQuiz(quizId);
    return response.status(200).json(questions);
  }

  @Patch('questions/:id')
  async updateQuestion(
    @Param('id') id: number,
    @Body() data: UpdateQuestionDTO,
    @Res() response: Response,
  ) {
    const updated = await this.quizService.updateQuestion(id, data);
    return response.status(200).json(updated);
  }

  @Delete('questions/:id')
  async deleteQuestion(@Param('id') id: number, @Res() response: Response) {
    await this.quizService.deleteQuestion(id);
    return response.status(204).send();
  }

  // === ANSWERS ===

  @Post('questions/:questionId/answers')
  async createAnswers(
    @Param('questionId') questionId: number,
    @Body() answersDto: CreateAnswerDTO[],
    @Res() response: Response,
  ) {
    const answers = await this.quizService.createAnswers(
      questionId,
      answersDto,
    );
    return response.status(201).json(answers);
  }

  @Get('questions/:questionId/answers')
  async findAnswersByQuestion(
    @Param('questionId') questionId: number,
    @Res() response: Response,
  ) {
    const answers = await this.quizService.findAnswersByQuestion(questionId);
    return response.status(200).json(answers);
  }

  @Patch('answers/:id')
  async updateAnswer(
    @Param('id') id: number,
    @Body() data: UpdateAnswerDTO,
    @Res() response: Response,
  ) {
    const updated = await this.quizService.updateAnswer(id, data);
    return response.status(200).json(updated);
  }

  @Delete('answers/:id')
  async deleteAnswer(@Param('id') id: number, @Res() response: Response) {
    await this.quizService.deleteAnswer(id);
    return response.status(204).send();
  }

  // === QUIZ PERFORMANCE ===

  @Post('performance')
  async createQuizPerformance(
    @Res() response: Response,
    @Body() data: CreateQuizPerformanceDTO,
  ) {
    const result = await this.quizService.createQuizPerformance(data);
    return response.status(201).json(result);
  }

  @Get('performance/list')
  async findAllPerformances(@Res() response: Response) {
    const result = await this.quizService.findAllPerformances();
    return response.status(200).json(result);
  }

  @Get('performance/user/:userId')
  async findPerformancesByUser(
    @Param('userId') userId: number,
    @Res() response: Response,
  ) {
    const result = await this.quizService.findPerformancesByUser(userId);
    return response.status(200).json(result);
  }

  // @Put('performance/user/:userId')
  // async findPerformancesByUser(
  //   @Param('userId') userId: number,
  //   @Res() response: Response,
  // ) {
  //   const result = await this.quizService.findPerformancesByUser(userId);
  //   return response.status(200).json(result);
  // }

  @Get('performance/quiz/:quizId')
  async findPerformanceByQuiz(
    @Param('quizId') quizId: number,
    @Res() response: Response,
  ) {
    const result = await this.quizService.findPerformanceByQuiz(quizId);
    return response.status(200).json(result);
  }

  @Delete('performance/:id')
  async deletePerformance(@Param('id') id: number, @Res() response: Response) {
    const result = await this.quizService.deletePerformance(id);
    return response.status(200).json(result);
  }
}
