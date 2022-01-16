import { sign, verify } from 'jsonwebtoken';
import { UserDocument } from './interfaces/user.interface';
import { decode, JwtPayload } from 'jsonwebtoken';
import { UsersService } from './users.service';

interface NewTokens {
  user?: UserDocument;
  accessToken?: string;
  refreshToken?: string;
}

export const createTokens = (user: UserDocument) => {
  const accessToken = sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1min',
    },
  );
  const refreshToken = sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET + user.password,
    {
      expiresIn: '7d',
    },
  );

  return [accessToken, refreshToken];
};

export const refreshAccessTokens = async (
  refreshToken: string,
  usersService: UsersService,
): Promise<NewTokens> => {
  let userId;

  try {
    const { userId: id } = decode(refreshToken) as JwtPayload;
    userId = id;
  } catch (err) {
    return {};
  }

  const user = await usersService.getUserByID(userId);
  if (!user) {
    return {};
  }

  try {
    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET + user.password);
  } catch (err) {
    return {};
  }

  const [accessToken, newRefreshToken] = createTokens(user);

  return {
    user,
    accessToken,
    refreshToken: newRefreshToken,
  };
};
