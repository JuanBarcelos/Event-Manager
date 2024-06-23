import { Controller, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfile } from './dto/update-profile.dto';
import { DeleteUserAccount } from './dto/delete-user.dto';

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

  @Delete('delete/account/:userId')
  delete(
    @Param('userId') userId: string,
    @Body() requestBody: DeleteUserAccount,
  ) {
    return this.usersService.deleteAccount(userId, requestBody);
  }
}
