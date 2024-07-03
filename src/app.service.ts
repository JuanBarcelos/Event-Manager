import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  private extractTokenFromHeader(_request: Request): string | undefined {
    const [type, token] = _request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async decodedRequestToken(_request: Request) {
    const token = this.extractTokenFromHeader(_request);

    if (!token) throw new UnauthorizedException('Token is required');

    const payload = await this.jwtService.verifyAsync(token);

    return payload;
  }
}
