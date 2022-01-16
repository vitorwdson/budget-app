import * as mongoose from 'mongoose';

export const BudgetSchema = new mongoose.Schema({
  name: String,
  maxValue: Number,
});
