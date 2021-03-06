import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BudgetsModule } from './budgets/budgets.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    UsersModule,
    BudgetsModule,
    ExpensesModule,

    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ res }) => res,
      playground: process.env.DEV_MODE == 'true',
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
