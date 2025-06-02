export class CreateQuizPerformanceDTO {
  readonly id?: number;
  readonly userId: number;
  readonly quizId: string;
  readonly category: string;
  readonly totalQuestions: number;
  readonly correctAnswers: number;
  readonly elapsedTime: number; 
  readonly score: number;
  readonly attemptedAt?: string; 
}
