import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { hash } from 'bcryptjs';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user.enum';
import { OrganizersService } from 'src/organizers/organizers.service';
import { ParticipantsService } from 'src/participants/participants.service';
import { UpdateUserProfile } from './dto/update-profile.dto';
import { DeleteUserAccount } from './dto/delete-user.dto';
import { Request } from 'express';
import { AppService } from 'src/app.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly organizersService: OrganizersService,
    private readonly participantsService: ParticipantsService,
    private readonly appService: AppService,
  ) {}

  async create(_createUserDto: CreateUserDto): Promise<User> {
    const { userName, email, password, fullName, role } = _createUserDto;

    const userWithExistingEmail = await this.userRepository.findByEmail(email);

    if (userWithExistingEmail !== null) {
      throw new BadRequestException('This e-mail is already registered.');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await this.userRepository.createUser({
      userName,
      email,
      password: hashedPassword,
      fullName,
      role,
    });

    if (newUser.role === UserRole.ORGANIZER) {
      await this.organizersService.create({
        userID: newUser.id,
      });
    } else {
      await this.participantsService.create({
        userID: newUser.id,
      });
    }

    return newUser;
  }

  async update(
    _request: Request,
    _updateUserProfile: UpdateUserProfile,
  ): Promise<any> {
    const { fullName, userName, email, bio, organizationName, website } =
      _updateUserProfile;
    const user = await this.appService.decodedRequestToken(_request);

    const participantExists = await this.participantsService.findByUnique(
      user.id,
    );

    if (participantExists) {
      await this.participantsService.update(participantExists.userId, {
        bio,
        website,
      });

      const userUpdate = await this.userRepository.updateUserProfile(user.id, {
        userName,
        email,
        fullName,
      });

      return userUpdate;
    } else {
      const organizerExists = await this.organizersService.findByUnique(
        user.id,
      );

      if (organizerExists) {
        await this.organizersService.update(organizerExists.userId, {
          bio,
          organizationName,
          website,
        });

        const userUpdate = await this.userRepository.updateUserProfile(
          user.id,
          {
            userName,
            email,
            fullName,
          },
        );

        return userUpdate;
      }
    }
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
