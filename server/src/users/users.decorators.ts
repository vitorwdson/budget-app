import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { UsersService } from './users.service';
import { refreshAccessTokens } from './users.utils';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const {
      req: { user },
    } = context.getArgs()[2];

    return user;
  },
);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const response = context.getArgs()[2];
    const { req: request } = response;

    try {
      const accessToken = request.cookies['access-token'];
      const { userId } = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      request.user = this.usersService.getUserByID(userId);
    } catch (err) {
      const refreshToken = request.cookies['refresh-token'];
      const tokens = await refreshAccessTokens(refreshToken, this.usersService);

      if (tokens.user && tokens.accessToken && tokens.refreshToken) {
        response.user = tokens.user;

        response.cookie('access-token', tokens.accessToken, {
          maxAge: 1000 * 60 * 1,
        });

        response.cookie('refresh-token', tokens.refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
      }
    }

    return !!request.user;
  }
}
