import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsRepository } from './participants.repository';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participants } from './entities/participant.entity';
import { Request } from 'express';
import { AppService } from 'src/app.service';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly participantsRepository: ParticipantsRepository,
    private readonly appService: AppService,
  ) {}

  async create(_createParticipantDto: CreateParticipantDto): Promise<void> {
    const participant = _createParticipantDto;

    await this.participantsRepository.createParticipant(participant);
  }

  async update(id: string, _updateParticipantDto: UpdateParticipantDto) {
    const data = _updateParticipantDto;
    await this.participantsRepository.update(id, data);
  }

  async findByUnique(_request: Request): Promise<Participants> {
    const user = await this.appService.decodedRequestToken(_request);
    const participant = this.participantsRepository.findUserById(user.id);
    return participant;
  }
}
