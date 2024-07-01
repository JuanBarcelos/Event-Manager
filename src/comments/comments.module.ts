import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repositories';
import { PrismaService } from 'src/database/prisma.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, PrismaService, AppService],
})
export class CommentsModule {}
