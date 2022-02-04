import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '../users/users.decorators';
import { ExpensesService } from './expenses.service';
import { ExpenseResponse, ExpenseType } from './dto/expense.dto';
import { ExpenseInput } from './inputs/expense.input';
import { validateExpenseData } from './expenses.validations';
import { formatValidationErrors } from '../utils/validation';

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
  @Mutation(() => ExpenseResponse)
  async createExpense(@Args('input') input: ExpenseInput) {
    const validation = validateExpenseData(input);

    if (validation != null) {
      const errors = formatValidationErrors(validation);

      return {
        errors,
        user: null,
      };
    }

    const expense = await this.expensesService.create(input);

    return {
      errors: null,
      expense,
    };
  }
}
