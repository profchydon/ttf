import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
