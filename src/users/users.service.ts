import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { hash } from 'bcryptjs';
import { User } from './entities/user.entity';
import { UpdateUserProfileDto } from './dto/update-profile.dto';
import { DeleteUserAccount } from './dto/delete-user.dto';
import { Request } from 'express';
import { AppService } from 'src/app.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly appService: AppService,
  ) {}

  async create(_createUserDto: CreateUserDto): Promise<User> {
    const { userName, email, password, fullName, role } = _createUserDto;
    const userWithExistingEmail = await this.userRepository.findByEmail(email);

    if (userWithExistingEmail !== null) {
      throw new BadRequestException('This e-mail is already registered.');
    }

    const hashedPassword = await hash(password, 8);
    const newUser = await this.userRepository.createUserOrganizerOrParticipant({
      userName,
      email,
      password: hashedPassword,
      fullName,
      role,
    });

    return newUser;
  }

  async updateProfile(
    _request: Request,
    _updateUserProfile: UpdateUserProfileDto,
  ): Promise<any> {
    const user = await this.appService.decodedRequestToken(_request);
    const userUpdate = await this.userRepository.updateUserProfile(
      user.id,
      user.role,
      _updateUserProfile,
    );
    return userUpdate;
  }

  async deleteAccount(
    _request: Request,
    _requestBody: DeleteUserAccount,
  ): Promise<void> {
    const user = await this.appService.decodedRequestToken(_request);
    const { email } = _requestBody;
    const userWithExistingEmail = await this.userRepository.findByEmail(email);
    if (userWithExistingEmail !== null) {
      return await this.userRepository.deleteUserAccount(user.id);
    }
    throw new BadRequestException(
      'This email does not exist, try with an email already registered.',
    );
  }

  async findUserByEmail(_email: string) {
    return await this.userRepository.findByEmail(_email);
  }
}
