import { CreateAnswerDTO } from "./create.answers.dto";

export class CreateQuestionDTO {
  readonly imgUrl?: string
  readonly question: string;
  readonly answers: CreateAnswerDTO[];
}

