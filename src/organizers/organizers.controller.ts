import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';

@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Post()
  create(@Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizersService.create(createOrganizerDto);
  }

  @Get(':userId')
  findUniqueParticipant(@Param('userId') userId: string) {
    return this.organizersService.findByUnique(userId);
  }
}
