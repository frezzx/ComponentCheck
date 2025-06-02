export class CreateUserDTO {
  readonly id?: number;
  readonly name: string;
  password: string;
  readonly email: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}
