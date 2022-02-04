import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '../users/users.decorators';
import { ExpensesService } from './expenses.service';
import { ExpenseType } from './dto/expense.dto';
import { ExpenseInput } from './inputs/expense.input';

@Resolver()
export class ExpensesResolver {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [ExpenseType])
  async expenses(@Args('budgetId') budgetId: string) {
    return this.expensesService.findAll(budgetId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ExpenseType)
  async createExpense(@Args('input') input: ExpenseInput) {
    return this.expensesService.create(input);
  }
}
