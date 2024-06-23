import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get(':userId')
  findUniqueParticipant(@Param('userId') userId: string) {
    return this.participantsService.findByUnique(userId);
  }
}
