import { Document } from 'mongoose';

export interface BudgetDocument extends Document {
  readonly name: string;
  readonly maxValue: string;
}
