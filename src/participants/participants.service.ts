import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsRepository } from './participants.repository';
import { UpdateParticipantDto } from './dto/update-participant.dto';

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
    const participantExists =
      await this.participantsRepository.findUserById(id);

    if (participantExists) {
      const data = _updateParticipantDto;

      const updateOrganizer = await this.participantsRepository.update(
        participantExists.userId,
        data,
      );

      return updateOrganizer;
    } else {
      throw new BadRequestException('This participant is not registered.');
    }
  }
}
