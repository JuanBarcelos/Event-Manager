import { Module } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { OrganizersController } from './organizers.controller';
import { OrganizersRepository } from './organizers.repository';
import { PrismaService } from 'src/database/prisma.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [OrganizersController],
  providers: [
    OrganizersService,
    OrganizersRepository,
    PrismaService,
    AppService,
  ],
  exports: [OrganizersService, OrganizersRepository],
})
export class OrganizersModule {}
