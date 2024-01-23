import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTodoDTO {
  @IsNumber()
  @IsNotEmpty()
  id: string;
}
