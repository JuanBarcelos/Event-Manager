import {
  Controller,
  Post,
  Body,
  Param,
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
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from './entities/user.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('profile')
  @Roles(UserRole.ORGANIZER)
  @UseGuards(AuthGuard)
  update(@Body() updateUserProfile: UpdateUserProfile, @Request() req) {
    return this.usersService.update(req.userId.id, updateUserProfile);
  }

  @Delete('delete/account/:userId')
  delete(
    @Param('userId') userId: string,
    @Body() requestBody: DeleteUserAccount,
  ) {
    return this.usersService.deleteAccount(userId, requestBody);
  }
}
