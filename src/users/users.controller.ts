import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfile } from './dto/update-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('profile/:userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserProfile: UpdateUserProfile,
  ) {
    return this.usersService.update(userId, updateUserProfile);
  }
}
