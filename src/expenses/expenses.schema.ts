import * as mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema({
  name: String,
  value: Number,
  budgetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget',
  },
});
