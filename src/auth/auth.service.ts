import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(_email: string, _pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(_email);
    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await compare(_pass, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
