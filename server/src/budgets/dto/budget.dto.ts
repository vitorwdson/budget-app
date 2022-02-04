import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ErrorType } from '../../users/dto/user.dto';

@ObjectType()
export class BudgetType {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field(() => Float)
  readonly maxValue: number;
  @Field(() => Float)
  readonly currentValue: number;
}

@ObjectType()
export class BudgetResponse {
  @Field(() => [ErrorType], { nullable: true })
  errors?: ErrorType[];
  @Field(() => BudgetType, { nullable: true })
  budget?: BudgetType;
}
