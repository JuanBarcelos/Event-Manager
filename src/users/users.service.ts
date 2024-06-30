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

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly organizersService: OrganizersService,
    private readonly participantsService: ParticipantsService,
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
    userId: string,
    _updateUserProfile: UpdateUserProfile,
  ): Promise<any> {
    const { fullName, userName, email, bio, organizationName, website } =
      _updateUserProfile;

    const participantExists =
      await this.participantsService.findByUnique(userId);

    if (participantExists) {
      await this.participantsService.update(participantExists.userId, {
        bio,
        website,
      });

      const userUpdate = await this.userRepository.updateUserProfile(userId, {
        userName,
        email,
        fullName,
      });

      return userUpdate;
    } else {
      const organizerExists = await this.organizersService.findByUnique(userId);

      if (organizerExists) {
        await this.organizersService.update(organizerExists.userId, {
          bio,
          organizationName,
          website,
        });

        const userUpdate = await this.userRepository.updateUserProfile(userId, {
          userName,
          email,
          fullName,
        });

        return userUpdate;
      }
    }
  }

  async deleteAccount(
    _userId: string,
    _requestBody: DeleteUserAccount,
  ): Promise<void> {
    const { email } = _requestBody;

    const userWithExistingEmail = await this.userRepository.findByEmail(email);

    if (userWithExistingEmail !== null) {
      return await this.userRepository.deleteUserAccount(_userId);
    }

    throw new BadRequestException(
      'This email does not exist, try with an email already registered.',
    );
  }

  async findUserByEmail(_email: string) {
    return await this.userRepository.findByEmail(_email);
  }
}
