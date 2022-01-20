import { Document } from 'mongoose';

export interface BudgetDocument extends Document {
  readonly id: string;
  readonly name: string;
  readonly maxValue: number;
  readonly userId: string;
}
