import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetSchema } from './budgets.schema';
import { BudgetsResolver } from './budgets.resolver';
import { BudgetsService } from './budgets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Budget', schema: BudgetSchema }]),
  ],
  providers: [BudgetsResolver, BudgetsService],
})
export class BudgetsModule {}
