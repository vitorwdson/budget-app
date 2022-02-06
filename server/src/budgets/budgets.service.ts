import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BudgetDocument } from './interfaces/budget.interface';
import { UserDocument } from '../users/interfaces/user.interface';
import { BudgetInput } from './inputs/budget.input';
import { BudgetType } from './dto/budget.dto';
import { ExpensesService } from '../expenses/expenses.service';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel('Budget') private budgetModel: Model<BudgetDocument>,
  ) {}

  async create(
    user: UserDocument,
    budget: BudgetInput,
  ): Promise<BudgetDocument> {
    const newBudget = new this.budgetModel({ ...budget, userId: user.id });
    return await newBudget.save();
  }

  async belongsToUser(budgetId: string, user: UserDocument): Promise<boolean> {
    const budget = await this.budgetModel.findById(budgetId);
    const userId = budget.userId.toString();

    return userId === user.id;
  }

  async findAll(
    user: UserDocument,
    expensesService: ExpensesService,
  ): Promise<BudgetType[]> {
    const budgets = await this.budgetModel.find({ userId: user.id });

    return await Promise.all(
      budgets.map(async (budget) => {
        const expenses = await expensesService.findAll(budget.id);
        const currentValue = expenses.reduce((acc, e) => acc + e.value, 0);
        const roundedCurrentValue = parseFloat(currentValue.toFixed(2));

        return {
          id: budget.id,
          name: budget.name,
          maxValue: budget.maxValue,
          currentValue: roundedCurrentValue,
        };
      }),
    );
  }
}
