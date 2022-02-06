import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './expenses.schema';
import { ExpensesResolver } from './expenses.resolver';
import { ExpensesService } from './expenses.service';
import { UsersModule } from '../users/users.module';
import { BudgetsModule } from '../budgets/budgets.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
    UsersModule,
    forwardRef(() => BudgetsModule),
  ],
  providers: [ExpensesResolver, ExpensesService],
  exports: [ExpensesService],
})
export class ExpensesModule {}
