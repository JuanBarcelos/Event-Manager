import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { OrganizersModule } from 'src/organizers/organizers.module';
import { ParticipantsModule } from 'src/participants/participants.module';
import { AppService } from 'src/app.service';

@Module({
  imports: [OrganizersModule, ParticipantsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, AppService],
  exports: [UsersService],
})
export class UsersModule {}
