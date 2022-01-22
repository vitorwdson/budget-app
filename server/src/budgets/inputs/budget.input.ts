import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class BudgetInput {
  @Field()
  readonly name: string;
  @Field(() => Float)
  readonly maxValue: number;
}
