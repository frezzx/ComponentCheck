import { CreateAnswerDTO } from "./create.answers.dto";

export class CreateQuestionDTO {
  readonly question: string;
  readonly answers: CreateAnswerDTO[];
}

