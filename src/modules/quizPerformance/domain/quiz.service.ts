import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizPerformance } from '../entities/quiz.entity';
import { CreateQuizPerformanceDTO } from '../dto/create.quiz.dto';
import { UsersService } from 'src/modules/users/domain/users.service';
import { CreateAnswerDTO } from '../dto/create.answers.dto';
import { CreateQuestionDTO } from '../dto/create.questions.dto';
import { Answer } from '../entities/answers.entity';
import { Question } from '../entities/questions.entity';
import { Quiz } from '../entities/quizzes.entity';
import { CreateQuizDTO } from '../dto/create.quizzes.dto';
import { UpdateQuizDTO } from '../dto/update.quizzes.dto';
import { UpdateQuestionDTO } from '../dto/update.questions.dto';
import { UpdateAnswerDTO } from '../dto/update.answers.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,

    @InjectRepository(QuizPerformance)
    private readonly quizPerformanceRepository: Repository<QuizPerformance>,

    private readonly userService: UsersService,
  ) {}

  // === QUIZ ===

  async findAllQuizzes(): Promise<Quiz[]> {
    const quizzes = await this.quizRepository.find({
      relations: ['questions', 'questions.answers'],
    });

    if (!quizzes.length) {
      throw new HttpException('quizzes.not.found', HttpStatus.NOT_FOUND);
    }

    return quizzes;
  }

  async findQuizById(quizId: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id: quizId },
      relations: ['questions', 'questions.answers'],
    });

    if (!quiz) {
      throw new HttpException('quiz.not.found', HttpStatus.NOT_FOUND);
    }

    return quiz;
  }

  async createQuiz(data: CreateQuizDTO): Promise<Quiz> {
    const newQuiz = this.quizRepository.create(data);
    return await this.quizRepository.save(newQuiz);
  }

  async updateQuiz(quizId: number, data: UpdateQuizDTO): Promise<Quiz> {
    const quiz = await this.findQuizById(quizId);
    Object.assign(quiz, data);
    return await this.quizRepository.save(quiz);
  }

  async deleteQuiz(quizId: number): Promise<void> {
    const quiz = await this.findQuizById(quizId);
    await this.quizRepository.remove(quiz);
  }

  // === QUESTIONS ===

  async createQuestions(
    quizId: number,
    questionsDto: CreateQuestionDTO[],
  ): Promise<Question[]> {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });

    if (!quiz) {
      throw new HttpException('quiz.not.found', HttpStatus.NOT_FOUND);
    }

    const questions = questionsDto.map((q) =>
      this.questionRepository.create({ ...q, quiz }),
    );

    return await this.questionRepository.save(questions);
  }

  async findQuestionsByQuiz(quizId: number): Promise<Question[]> {
    const questions = await this.questionRepository.find({
      where: { quiz: { id: quizId } },
      relations: ['answers'],
    });

    if (!questions.length) {
      throw new HttpException('questions.not.found', HttpStatus.NOT_FOUND);
    }

    return questions;
  }

  async updateQuestion(
    questionId: number,
    data: UpdateQuestionDTO,
  ): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!question) {
      throw new HttpException('question.not.found', HttpStatus.NOT_FOUND);
    }

    Object.assign(question, data);
    return await this.questionRepository.save(question);
  }

  async deleteQuestion(questionId: number): Promise<void> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!question) {
      throw new HttpException('question.not.found', HttpStatus.NOT_FOUND);
    }

    await this.questionRepository.remove(question);
  }

  // === ANSWERS ===

  async createAnswers(
    questionId: number,
    answersDto: CreateAnswerDTO[],
  ): Promise<Answer[]> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!question) {
      throw new HttpException('question.not.found', HttpStatus.NOT_FOUND);
    }

    const answers = answersDto.map((a) =>
      this.answerRepository.create({ ...a, question }),
    );

    return await this.answerRepository.save(answers);
  }

  async findAnswersByQuestion(questionId: number): Promise<Answer[]> {
    const answers = await this.answerRepository.find({
      where: { question: { id: questionId } },
    });

    if (!answers.length) {
      throw new HttpException('answers.not.found', HttpStatus.NOT_FOUND);
    }

    return answers;
  }

  async updateAnswer(answerId: number, data: UpdateAnswerDTO): Promise<Answer> {
    const answer = await this.answerRepository.findOne({
      where: { id: answerId },
    });

    if (!answer) {
      throw new HttpException('answer.not.found', HttpStatus.NOT_FOUND);
    }

    Object.assign(answer, data);
    return await this.answerRepository.save(answer);
  }

  async deleteAnswer(answerId: number): Promise<void> {
    const answer = await this.answerRepository.findOne({
      where: { id: answerId },
    });

    if (!answer) {
      throw new HttpException('answer.not.found', HttpStatus.NOT_FOUND);
    }

    await this.answerRepository.remove(answer);
  }

  // === QUIZ PERFORMANCE ===

  async createQuizPerformance(
    quizDTO: CreateQuizPerformanceDTO,
  ): Promise<QuizPerformance> {
    const user = await this.userService.findByUserId(Number(quizDTO.userId));

    if (!user) {
      throw new HttpException('user.not.found', HttpStatus.NOT_FOUND);
    }

    const performance = this.quizPerformanceRepository.create(quizDTO);
    return await this.quizPerformanceRepository.save(performance);
  }

  async findAllPerformances(): Promise<QuizPerformance[]> {
    return await this.quizPerformanceRepository.find({
      relations: ['quiz', 'user'],
    });
  }

  async findPerformancesByUser(userId: number): Promise<QuizPerformance[]> {
    const user = await this.userService.findByUserId(userId);

    if (!user) {
      throw new HttpException('user.not.found', HttpStatus.NOT_FOUND);
    }

    return await this.quizPerformanceRepository.find({
      where: { user: { id: userId } },
      relations: ['quiz'],
    });
  }

  async findPerformanceByQuiz(quizId: number): Promise<QuizPerformance[]> {
    return await this.quizPerformanceRepository.find({
      where: { quiz: { id: quizId } },
      relations: ['user'],
    });
  }

  async deletePerformance(answerId: number): Promise<void> {
    const performance = await this.quizPerformanceRepository.findOne({
      where: { id: answerId },
    });

    if (!performance) {
      throw new HttpException('performance.not.found', HttpStatus.NOT_FOUND);
    }

    await this.quizPerformanceRepository.remove(performance);
  }

  // async findUserByPerformance(): Promise<any> {
  //   getUser = await this.userService.
  //   return await
  // }
}
