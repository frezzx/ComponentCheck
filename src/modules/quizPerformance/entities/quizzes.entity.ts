import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Question } from './questions.entity';
import { Components } from 'src/modules/components/entities/components.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'], default: 'easy' })
  difficulty: 'easy' | 'medium' | 'hard';

  @Column({ name: 'componentId' })
  componentId: number;

  @ManyToOne(() => Components, { nullable: true })
  @JoinColumn({ name: 'componentId' })
  component?: Components;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
