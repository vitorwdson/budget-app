import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { BudgetsService } from './budgets.service';
import { BudgetType } from './dto/budget.dto';
import { BudgetInput } from './inputs/budget.input';

@Resolver()
export class BudgetsResolver {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Query(() => [BudgetType])
  async budgets() {
    return this.budgetsService.findAll();
  }

  @Mutation(() => BudgetType)
  async createBudget(@Args('input') input: BudgetInput) {
    return this.budgetsService.create(input);
  }
}
