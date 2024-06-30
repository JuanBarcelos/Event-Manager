import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { OrganizersService } from 'src/organizers/organizers.service';
import { OrganizersModule } from 'src/organizers/organizers.module';
import { OrganizersRepository } from 'src/organizers/organizers.repository';
import { ParticipantsService } from 'src/participants/participants.service';
import { ParticipantsRepository } from 'src/participants/participants.repository';

@Module({
  imports: [OrganizersModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    PrismaService,
    OrganizersService,
    OrganizersRepository,
    ParticipantsService,
    ParticipantsRepository,
  ],
  exports: [UsersService],
})
export class UsersModule {}
