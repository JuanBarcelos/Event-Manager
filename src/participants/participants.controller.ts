import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as request } from 'express';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findUniqueParticipant(@Request() req: request) {
    return this.participantsService.findByUnique(req);
  }
}
