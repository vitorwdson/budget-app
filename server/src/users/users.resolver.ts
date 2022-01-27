import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserType } from './dto/user.dto';
import { UserInput } from './inputs/user.input';
import { LoginInput } from './inputs/login.input';
import { AuthGuard, User } from './users.decorators';
import { genSalt, hash, compare } from 'bcrypt';
import { Res, UseGuards } from '@nestjs/common';
import { UserDocument } from './interfaces/user.interface';
import { createTokens } from './users.utils';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserType)
  @UseGuards(AuthGuard)
  async user(@User() user: UserDocument) {
    return user;
  }

  @Mutation(() => UserType)
  async createUser(
    @Args('input') input: UserInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { password } = input;

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await this.usersService.create({
      ...input,
      password: hashedPassword,
    });

    const [accessToken, refreshToken] = createTokens(user);

    response.cookie('access-token', accessToken, {
      maxAge: 1000 * 60 * 1,
    });
    response.cookie('refresh-token', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return user;
  }

  @Mutation(() => UserType)
  async login(
    @Args('input') input: LoginInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = input;
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const [accessToken, refreshToken] = createTokens(user);

    response.cookie('access-token', accessToken, {
      maxAge: 1000 * 60 * 1,
    });
    response.cookie('refresh-token', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return user;
  }
}
