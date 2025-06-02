// import { User } from 'src/modules/users/entities/user.entity';
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
//   CreateDateColumn,
// } from 'typeorm';

// @Entity('quiz_performance')
// export class QuizPerformance {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => User)
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @Column({ name: 'quiz_id' })
//   quizId: string;

//   @Column()
//   category: string;

//   @Column({ name: 'total_questions' })
//   totalQuestions: number;

//   @Column({ name: 'correct_answers' })
//   correctAnswers: number;

//   @Column({ name: 'elapsed_time' })
//   elapsedTime: number;

//   @Column()
//   score: number;

//   @CreateDateColumn({ name: 'attempted_at' })
//   attemptedAt: Date;
// }
