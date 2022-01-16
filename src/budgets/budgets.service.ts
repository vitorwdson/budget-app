import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BudgetDocument } from './interfaces/budget.interface';
import { UserDocument } from '../users/interfaces/user.interface';
import { BudgetInput } from './inputs/budget.input';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel('Budget') private budgetModel: Model<BudgetDocument>,
  ) {}

  async create(
    user: UserDocument,
    budget: BudgetInput,
  ): Promise<BudgetDocument> {
    const newBudget = new this.budgetModel(budget);

    user.budgets.push(newBudget);
    user.save();

    return newBudget;
  }

  async findAll(user: UserDocument): Promise<BudgetDocument[]> {
    return user.budgets;
  }
}
