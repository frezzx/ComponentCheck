import { Controller, Get, Res } from '@nestjs/common';
import { MistralAIService } from '../domain/openaiQuizz.service';
import { Response } from 'express';

@Controller('openaiquiz')
export class QuizController {
  constructor(private readonly openAIService: MistralAIService) {}

  @Get('questions')
  async getQuestions() {
    // response.status(200).json(await this.openAIService.generateQuizQuestions());
    // console.log(response);
    // return response;
    return await this.openAIService.generateQuizQuestions();
  }
}
