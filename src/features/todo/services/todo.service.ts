import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(todo: Todo): Promise<Todo> {
    return this.prisma.todo.create({
      data: todo,
    });
  }

  async get(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async getOne(id: number): Promise<Todo> {
    return this.prisma.todo.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, todo: Todo): Promise<Todo> {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data: todo,
    });
  }
}
