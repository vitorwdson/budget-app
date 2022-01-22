import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class ExpenseType {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field(() => Float)
  readonly value: number;
}
