import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class TodoModule {}
