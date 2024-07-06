import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user.enum';
import { UpdateUserProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUserOrganizerOrParticipant(
    _createUserDto: CreateUserDto,
  ): Promise<User> {
    const { userName, email, password, fullName, role } = _createUserDto;

    const result = await this.prisma.$transaction(async (trx) => {
      const user = await trx.user.create({
        data: {
          userName,
          email,
          password,
          fullName,
          role,
        },
        select: {
          id: true,
          userName: true,
          email: true,
          fullName: true,
          role: true,
        },
      });

      if (role === UserRole.ORGANIZER) {
        await trx.organizers.create({
          data: {
            userId: user.id,
          },
        });

        return user;
      }

      await trx.participants.create({
        data: {
          userId: user.id,
        },
      });

      return user;
    });

    return result as User;
  }

  async updateUserProfile(
    userId: string,
    role: string,
    _updateUserDto: UpdateUserProfileDto,
  ): Promise<User> {
    const { fullName, userName, email, bio, organizationName, website } =
      _updateUserDto;

    const result = await this.prisma.$transaction(async (trx) => {
      if (role === UserRole.ORGANIZER) {
        const organizerProfile = await trx.user.update({
          where: {
            id: userId,
          },
          data: {
            userName,
            fullName,
            email,
            organizers: {
              update: {
                where: {
                  userId,
                },
                data: {
                  bio,
                  organizationName,
                  website,
                },
              },
            },
          },
          include: {
            organizers: true,
          },
        });

        return organizerProfile;
      }

      const participantProfile = trx.user.update({
        where: {
          id: userId,
        },
        data: {
          userName,
          fullName,
          email,
          participants: {
            update: {
              where: {
                userId,
              },
              data: {
                bio,
                website,
              },
            },
          },
        },
        include: {
          participants: true,
        },
      });

      return participantProfile;
    });

    return result as User;
  }

  async deleteUserAccount(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
