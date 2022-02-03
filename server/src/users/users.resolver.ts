import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserResponse, UserType } from './dto/user.dto';
import { UserInput } from './inputs/user.input';
import { LoginInput } from './inputs/login.input';
import { AuthGuard, User } from './users.decorators';
import { genSalt, hash, compare } from 'bcrypt';
import { Res, UseGuards } from '@nestjs/common';
import { UserDocument } from './interfaces/user.interface';
import { createTokens } from './users.utils';
import { validateUserData, passwordTester } from './users.validators';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserType)
  @UseGuards(AuthGuard)
  async user(@User() user: UserDocument) {
    return user;
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Args('input') input: UserInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    const validation = validateUserData(input);

    if (validation != null) {
      const errors = [];

      for (const field in validation) {
        errors.push({
          field,
          message: validation[field][0],
        });
      }

      return {
        errors,
        user: null,
      };
    }

    const { password } = input;
    if (!passwordTester(password)) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password is not strong enough',
          },
        ],
        user: null,
      };
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const [user, error] = await this.usersService.create({
      ...input,
      password: hashedPassword,
    });

    if (error != null) {
      return {
        errors: [
          {
            field: 'email',
            message: 'An user with this email already exists.',
          },
        ],
        user: null,
      };
    }

    const [accessToken, refreshToken] = createTokens(user);

    response.cookie('access-token', accessToken, {
      maxAge: 1000 * 60 * 1,
    });
    response.cookie('refresh-token', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { error: null, user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Args('input') input: LoginInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = input;
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Invalid email or password.',
          },
        ],
        user: null,
      };
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Invalid email or password.',
          },
        ],
        user: null,
      };
    }

    const [accessToken, refreshToken] = createTokens(user);

    response.cookie('access-token', accessToken, {
      maxAge: 1000 * 60 * 1,
    });
    response.cookie('refresh-token', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { errors: null, user };
  }
}
