import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Participants } from './entities/participant.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createParticipant(
    _createParticipant: CreateParticipantDto,
  ): Promise<Participants> {
    const { userID, bio, website } = _createParticipant;

    const newParticipant = await this.prisma.participants.create({
      data: {
        userId: userID,
        bio,
        website,
      },
    });

    return newParticipant;
  }

  async findUserById(userId: string): Promise<Participants> {
    const participant = await this.prisma.participants.findUnique({
      where: {
        userId: userId,
      },
    });

    return participant;
  }

  async update(
    userId: string,
    _updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participants> {
    const { bio, website } = _updateParticipantDto;

    const newParticipant = await this.prisma.participants.update({
      where: {
        userId: userId,
      },
      data: {
        bio,
        website,
      },
    });

    return newParticipant;
  }
}
