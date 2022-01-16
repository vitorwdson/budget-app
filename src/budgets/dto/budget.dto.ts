import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class BudgetType {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field(() => Float)
  readonly maxValue: number;
}
