export class CreateComponentsDTO {
  readonly id?: number;
  readonly name: string;
  description: string;
  urlImage: string;
  readonly userId: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}
