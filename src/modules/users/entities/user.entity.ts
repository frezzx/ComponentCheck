import { Components } from 'src/modules/components/entities/components.entity';
import { QuizPerformance } from 'src/modules/quizPerformance/entities/quiz.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  COLLABORATOR = 'collaborator',
  MANAGER = 'manager',
  CANDIDATE = 'candidate',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name',  })
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;


  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    default: Role.CANDIDATE,
  })
  role: Role;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Components, (component) => component.user)
  components: Components[];

  @OneToMany(() => QuizPerformance, (quiz) => quiz.user)
  quizzes: QuizPerformance[];
}
