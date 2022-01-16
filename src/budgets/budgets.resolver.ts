import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { UserDocument } from '../users/interfaces/user.interface';
import { AuthGuard, User } from '../users/users.decorators';
import { BudgetsService } from './budgets.service';
import { BudgetType } from './dto/budget.dto';
import { BudgetInput } from './inputs/budget.input';

@Resolver()
export class BudgetsResolver {
  constructor(
    private readonly budgetsService: BudgetsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [BudgetType])
  async budgets(@User() user: UserDocument) {
    return this.budgetsService.findAll(user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => BudgetType)
  async createBudget(
    @User() user: UserDocument,
    @Args('input') input: BudgetInput,
  ) {
    return this.budgetsService.create(user, input);
  }
}
