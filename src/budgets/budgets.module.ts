import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetSchema } from './budgets.schema';
import { BudgetsResolver } from './budgets.resolver';
import { BudgetsService } from './budgets.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Budget', schema: BudgetSchema }]),
    UsersModule,
  ],
  providers: [BudgetsResolver, BudgetsService],
})
export class BudgetsModule {}
