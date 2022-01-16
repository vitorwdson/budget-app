import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BudgetDocument } from './interfaces/budget.interface';
import { BudgetInput } from './inputs/budget.input';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel('Budget') private budgetModel: Model<BudgetDocument>,
  ) {}

  async create(budget: BudgetInput): Promise<BudgetDocument> {
    const createdBudget = new this.budgetModel(budget);
    return createdBudget.save();
  }

  async findAll(): Promise<BudgetDocument[]> {
    return this.budgetModel.find().exec();
  }
}
