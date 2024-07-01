import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  async decodedRequestToken(_request: Request) {
    const [token] = _request.headers.authorization?.split(' ') ?? [];

    if (!token) throw new UnauthorizedException('Token is required');

    const payload = this.jwtService.verify(token);

    return payload;
  }
}
