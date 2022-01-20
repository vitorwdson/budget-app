import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './expenses.schema';
import { ExpensesResolver } from './expenses.resolver';
import { ExpensesService } from './expenses.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
    UsersModule,
  ],
  providers: [ExpensesResolver, ExpensesService],
})
export class ExpensesModule {}
