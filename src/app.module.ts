import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvitationController } from './features/invitation/controllers/invitation.controller';
import { InvitationService } from './features/invitation/services/invitation.service';
import { ConfigModule } from '@nestjs/config';
import { InvitationModule } from './features/invitation/invitation.module';

@Module({
  imports: [ConfigModule.forRoot(), InvitationModule],
  controllers: [AppController, InvitationController],
  providers: [AppService, InvitationService],
})
export class AppModule {}
