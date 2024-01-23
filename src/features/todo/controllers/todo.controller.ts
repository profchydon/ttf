import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { Todo } from '@prisma/client';
import { TodoService } from '../services/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Get()
  async get(): Promise<Todo[]> {
    return this.todoService.get();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Todo> {
    const todoId = parseInt(id);
    return this.todoService.getOne(todoId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Todo> {
    const todoId = parseInt(id);
    return this.todoService.delete(todoId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    const todoId = parseInt(id);
    return this.todoService.update(todoId, todo);
  }
}
