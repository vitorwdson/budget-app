import { Document, Schema } from 'mongoose';

export interface ExpenseDocument extends Document {
  readonly name: string;
  readonly value: number;
  readonly budgetId: Schema.Types.ObjectId;
}
