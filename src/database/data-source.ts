import { Components } from 'src/modules/components/entities/components.entity';
import { Answer } from 'src/modules/quizPerformance/entities/answers.entity';
import { Question } from 'src/modules/quizPerformance/entities/questions.entity';
import { QuizPerformance } from 'src/modules/quizPerformance/entities/quiz.entity';
import { Quiz } from 'src/modules/quizPerformance/entities/quizzes.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateUserTable1748571566686 } from './migrations/1748571566686-CreateUserTable';
import { CreateComponentsTable1748578984312 } from './migrations/1748578984312-CreateComponentsTable';
import { CreateQuizStructureMigration1748580000000 } from './migrations/1748585338542-CreateQuizTable';



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5435,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'compcheck',
  migrations: [CreateUserTable1748571566686, CreateComponentsTable1748578984312, CreateQuizStructureMigration1748580000000],
  entities: [User, Components, QuizPerformance, Question, Answer, Quiz],
  synchronize: false,
  // migrationsRun: true,
});
