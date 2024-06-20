import { Module } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { OrganizersController } from './organizers.controller';
import { OrganizersRepository } from './organizers.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [OrganizersController],
  providers: [OrganizersService, OrganizersRepository, PrismaService],
})
export class OrganizersModule {}
