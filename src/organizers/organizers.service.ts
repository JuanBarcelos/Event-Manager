import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { OrganizersRepository } from './organizers.repository';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@Injectable()
export class OrganizersService {
  constructor(private readonly organizersRepository: OrganizersRepository) {}

  async create(_createOrganizerDto: CreateOrganizerDto): Promise<void> {
    const organizer = _createOrganizerDto;

    await this.organizersRepository.createOrganizer(organizer);
  }

  async update(id: string, _updateOrganizerDto: UpdateOrganizerDto) {
    const organizerExists = await this.organizersRepository.findUserById(id);

    if (organizerExists) {
      const data = _updateOrganizerDto;

      const updateOrganizer = await this.organizersRepository.update(
        organizerExists.userId,
        data,
      );

      return updateOrganizer;
    } else {
      throw new BadRequestException('This e-mail is already registered.');
    }
  }
}
