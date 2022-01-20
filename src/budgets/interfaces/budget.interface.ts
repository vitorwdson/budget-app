import { Document, Schema } from 'mongoose';

export interface BudgetDocument extends Document {
  readonly name: string;
  readonly maxValue: string;
  readonly userId: Schema.Types.ObjectId;
}
