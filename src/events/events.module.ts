import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EventRepository } from './events.repository';
import { AppService } from 'src/app.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventRepository, PrismaService, AppService],
})
export class EventsModule {}
