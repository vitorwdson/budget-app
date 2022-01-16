import { Document } from 'mongoose';
import { BudgetDocument } from '../../budgets/interfaces/budget.interface';

export interface UserDocument extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly budgets: [BudgetDocument];
}
