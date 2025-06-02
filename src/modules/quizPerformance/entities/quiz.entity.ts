import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Quiz } from './quizzes.entity';

@Entity('quiz_performance')
export class QuizPerformance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userId' })
  userId: number;

  @Column({ name: 'quizId' })
  quizId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @Column()
  category: string;

  @Column({ name: 'totalQuestions' })
  totalQuestions: number;

  @Column({ name: 'correctAnswers' })
  correctAnswers: number;

  @Column({ name: 'elapsedTime' })
  elapsedTime: number;

  @Column()
  score: number;

  @CreateDateColumn({ name: 'attemptedAt' })
  attemptedAt: Date;
}
