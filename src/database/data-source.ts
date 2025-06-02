import { Components } from 'src/modules/components/entities/components.entity';
import { Answer } from 'src/modules/quizPerformance/entities/answers.entity';
import { Question } from 'src/modules/quizPerformance/entities/questions.entity';
import { QuizPerformance } from 'src/modules/quizPerformance/entities/quiz.entity';
import { Quiz } from 'src/modules/quizPerformance/entities/quizzes.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: 'postgres',
  database: 'compcheck',
  entities: [User, Components, QuizPerformance, Question, Answer, Quiz],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
