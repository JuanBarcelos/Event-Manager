import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsRepository } from './participants.repository';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participants } from './entities/participant.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly participantsRepository: ParticipantsRepository,
  ) {}

  async create(_createParticipantDto: CreateParticipantDto): Promise<void> {
    const participant = _createParticipantDto;

    await this.participantsRepository.createParticipant(participant);
  }

  async update(id: string, _updateParticipantDto: UpdateParticipantDto) {
    const data = _updateParticipantDto;
    await this.participantsRepository.update(id, data);
  }

  async findByUnique(userId: string): Promise<Participants> {
    const participant = this.participantsRepository.findUserById(userId);
    return participant;
  }
}
