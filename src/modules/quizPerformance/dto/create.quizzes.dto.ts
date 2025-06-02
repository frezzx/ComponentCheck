// create.quiz.dto.ts
export class CreateQuizDTO {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard'; 
  componentId: number;
}
