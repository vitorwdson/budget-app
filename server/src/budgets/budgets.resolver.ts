import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { ExpensesService } from '../expenses/expenses.service';
import { UsersService } from '../users/users.service';
import { formatValidationErrors } from '../utils/validation';
import { UserDocument } from '../users/interfaces/user.interface';
import { AuthGuard, User } from '../users/users.decorators';
import { BudgetsService } from './budgets.service';
import { validateBudgetData } from './budgets.validators';
import {
  BudgetType,
  BudgetResponse,
  DeleteBudgetResponse,
} from './dto/budget.dto';
import { BudgetInput } from './inputs/budget.input';

@Resolver()
export class BudgetsResolver {
  constructor(
    private readonly budgetsService: BudgetsService,
    private readonly usersService: UsersService,
    private readonly expensesService: ExpensesService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [BudgetType])
  async budgets(@User() user: UserDocument) {
    return this.budgetsService.findAll(user, this.expensesService);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => BudgetResponse)
  async createBudget(
    @User() user: UserDocument,
    @Args('input') input: BudgetInput,
  ) {
    const validation = validateBudgetData(input);

    if (validation != null) {
      const errors = formatValidationErrors(validation);

      return {
        errors,
        user: null,
      };
    }

    const budget = await this.budgetsService.create(user, input);

    return {
      errors: null,
      budget,
    };
  }

  @UseGuards(AuthGuard)
  @Mutation(() => DeleteBudgetResponse)
  async deleteBudget(
    @Args('budgetId') budgetId: string,
    @User() user: UserDocument,
  ) {
    const budget = await this.budgetsService.findById(budgetId);
    if (!budget) {
      return {
        errors: [{ message: "The specified budget doesn't exist" }],
      };
    }

    if (budget.userId != user.id) {
      return {
        errors: [
          {
            message: "The specified budget doesn't belong to the current user",
          },
        ],
      };
    }

    const expenses = await this.expensesService.findAll(budgetId);
    await Promise.all(expenses.map((expense) => expense.delete()));

    await budget.delete();
    return { budgetId };
  }
}
