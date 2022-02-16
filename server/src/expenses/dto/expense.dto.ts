import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ErrorType } from '../../users/dto/user.dto';

@ObjectType()
export class ExpenseType {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field(() => Float)
  readonly value: number;
}

@ObjectType()
export class ExpenseResponse {
  @Field(() => [ErrorType], { nullable: true })
  errors?: ErrorType[];
  @Field(() => ExpenseType, { nullable: true })
  expense?: ExpenseType;
}

@ObjectType()
export class ExpensesResponse {
  @Field(() => [ErrorType], { nullable: true })
  errors?: ErrorType[];
  @Field(() => [ExpenseType], { nullable: true })
  expenses?: ExpenseType[];
}

@ObjectType()
export class DeleteExpensesResponse {
  @Field(() => [ErrorType], { nullable: true })
  errors?: ErrorType[];
  @Field(() => ID, { nullable: true })
  expenseId?: string;
}
