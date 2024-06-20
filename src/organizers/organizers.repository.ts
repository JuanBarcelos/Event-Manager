import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { Organizers } from './entities/organizer.entity';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@Injectable()
export class OrganizersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganizer(
    _createOrganizerDto: CreateOrganizerDto,
  ): Promise<Organizers> {
    const { userID, bio, organizationName, website } = _createOrganizerDto;

    const newOrganizer = await this.prisma.organizers.create({
      data: {
        userId: userID,
        bio,
        organizationName,
        website,
      },
    });

    return newOrganizer;
  }

  async findUserById(userId: string): Promise<Organizers> {
    const organizer = await this.prisma.organizers.findUnique({
      where: {
        userId: userId,
      },
    });

    return organizer;
  }

  async update(
    userId: string,
    _updateOrganizerDto: UpdateOrganizerDto,
  ): Promise<Organizers> {
    const { bio, organizationName, website } = _updateOrganizerDto;

    const newOrganizer = await this.prisma.organizers.update({
      where: {
        userId: userId,
      },
      data: {
        bio,
        organizationName,
        website,
      },
    });

    return newOrganizer;
  }
}
