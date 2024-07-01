import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as request } from 'express';

@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Post()
  create(@Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizersService.create(createOrganizerDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findUniqueParticipant(@Request() req: request) {
    return this.organizersService.findByUnique(req);
  }
}
