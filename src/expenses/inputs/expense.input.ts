import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class ExpenseInput {
  @Field()
  readonly name: string;
  @Field(() => Float)
  readonly value: number;
  @Field()
  readonly budgetId: string;
}
