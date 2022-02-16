import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthGuard, User } from '../users/users.decorators';
import { ExpensesService } from './expenses.service';
import {
  DeleteExpensesResponse,
  ExpenseResponse,
  ExpensesResponse,
} from './dto/expense.dto';
import { ExpenseInput } from './inputs/expense.input';
import { validateExpenseData } from './expenses.validations';
import { formatValidationErrors } from '../utils/validation';
import { UserDocument } from '../users/interfaces/user.interface';
import { BudgetsService } from '../budgets/budgets.service';

@Resolver()
export class ExpensesResolver {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly usersService: UsersService,
    private readonly budgetsService: BudgetsService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => ExpensesResponse)
  async expenses(
    @Args('budgetId') budgetId: string,
    @User() user: UserDocument,
  ) {
    const belongs = await this.budgetsService.belongsToUser(budgetId, user);
    if (!belongs) {
      return {
        errors: [
          {
            field: '',
            message: "The informed budget doesn't belong to the current user.",
          },
        ],
        expenses: null,
      };
    }

    return {
      errors: null,
      expenses: await this.expensesService.findAll(budgetId),
    };
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

  @UseGuards(AuthGuard)
  @Mutation(() => DeleteExpensesResponse)
  async deleteExpense(
    @Args('expenseId') expenseId: string,
    @User() user: UserDocument,
  ) {
    const expense = await this.expensesService.findById(expenseId);
    if (!expense) {
      return {
        errors: [{ message: 'The specified expense does not exist' }],
      };
    }

    const belongs = await this.budgetsService.belongsToUser(
      expense.budgetId.toString(),
      user,
    );
    if (!belongs) {
      return {
        errors: [
          {
            message: "The specified expense doesn't belong to the current user",
          },
        ],
      };
    }

    await expense.delete();
    return { expenseId: expense.id };
  }
}
