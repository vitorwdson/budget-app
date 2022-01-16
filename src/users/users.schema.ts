import * as mongoose from 'mongoose';
import { BudgetSchema } from 'src/budgets/budgets.schema';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  budgets: [BudgetSchema],
});
