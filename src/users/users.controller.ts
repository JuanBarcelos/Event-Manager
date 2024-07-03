import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfile } from './dto/update-profile.dto';
import { DeleteUserAccount } from './dto/delete-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  update(
    @Body() updateUserProfile: UpdateUserProfile,
    @Request() req: request,
  ) {
    return this.usersService.update(req, updateUserProfile);
  }

  @Delete('delete/account')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  delete(@Request() req: request, @Body() requestBody: DeleteUserAccount) {
    return this.usersService.deleteAccount(req, requestBody);
  }
}
