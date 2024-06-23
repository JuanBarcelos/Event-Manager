import { Injectable } from '@nestjs/common';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { OrganizersRepository } from './organizers.repository';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { Organizers } from './entities/organizer.entity';

@Injectable()
export class OrganizersService {
  constructor(private readonly organizersRepository: OrganizersRepository) {}

  async create(_createOrganizerDto: CreateOrganizerDto): Promise<void> {
    const organizer = _createOrganizerDto;

    await this.organizersRepository.createOrganizer(organizer);
  }

  async update(id: string, _updateOrganizerDto: UpdateOrganizerDto) {
    const data = _updateOrganizerDto;
    await this.organizersRepository.update(id, data);
  }

  async findByUnique(userId: string): Promise<Organizers> {
    const organizer = this.organizersRepository.findUserById(userId);
    return organizer;
  }
}
