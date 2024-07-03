import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/entities/user.enum';
import { ROLES_KEY } from './roles.decorator';
import { AppService } from 'src/app.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private appService: AppService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const payload = await this.appService.decodedRequestToken(request);
    const hasRole = () => requiredRoles.some((role) => payload.role === role);

    if (!hasRole()) throw new UnauthorizedException('Insufficient permission');

    return true;
  }
}
