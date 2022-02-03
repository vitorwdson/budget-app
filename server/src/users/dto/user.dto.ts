import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ErrorType {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly firstName: string;
  @Field()
  readonly lastName: string;
  @Field()
  readonly email: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [ErrorType], { nullable: true })
  errors?: ErrorType[];
  @Field(() => UserType, { nullable: true })
  user?: UserType;
}
