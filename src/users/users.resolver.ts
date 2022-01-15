import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './dto/user.dto';
import { UserInput } from './inputs/user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  async hello() {
    return 'Hello World';
  }

  @Query(() => [UserType])
  async users() {
    return this.usersService.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput) {
    return this.usersService.create(input);
  }
}
