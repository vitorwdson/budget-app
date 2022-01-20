import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExpenseDocument } from './interfaces/expense.interface';
import { ExpenseInput } from './inputs/expense.input';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel('Expense') private expenseModel: Model<ExpenseDocument>,
  ) {}

  async create(expense: ExpenseInput): Promise<ExpenseDocument> {
    const newExpense = new this.expenseModel(expense);
    return await newExpense.save();
  }

  async findAll(budgetId: string): Promise<ExpenseDocument[]> {
    return await this.expenseModel.find({ budgetId });
  }
}
