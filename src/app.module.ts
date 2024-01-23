import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvitationController } from './features/invitation/controllers/invitation.controller';
import { InvitationService } from './features/invitation/services/invitation.service';
import { ConfigModule } from '@nestjs/config';
import { InvitationModule } from './features/invitation/invitation.module';
import { TodoModule } from './features/todo/todo.module';
import { TodoController } from './features/todo/controllers/todo.controller';
import { TodoService } from './features/todo/services/todo.service';
import { PrismaService } from './common/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), InvitationModule, TodoModule],
  controllers: [AppController, InvitationController, TodoController],
  providers: [AppService, InvitationService, TodoService, PrismaService],
})
export class AppModule {}
