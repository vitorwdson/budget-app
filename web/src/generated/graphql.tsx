import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BudgetInput = {
  maxValue: Scalars['Float'];
  name: Scalars['String'];
};

export type BudgetResponse = {
  __typename?: 'BudgetResponse';
  budget?: Maybe<BudgetType>;
  errors?: Maybe<Array<ErrorType>>;
};

export type BudgetType = {
  __typename?: 'BudgetType';
  currentValue: Scalars['Float'];
  id: Scalars['ID'];
  maxValue: Scalars['Float'];
  name: Scalars['String'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ExpenseInput = {
  budgetId: Scalars['String'];
  name: Scalars['String'];
  value: Scalars['Float'];
};

export type ExpenseResponse = {
  __typename?: 'ExpenseResponse';
  errors?: Maybe<Array<ErrorType>>;
  expense?: Maybe<ExpenseType>;
};

export type ExpenseType = {
  __typename?: 'ExpenseType';
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['Float'];
};

export type ExpensesResponse = {
  __typename?: 'ExpensesResponse';
  errors?: Maybe<Array<ErrorType>>;
  expenses?: Maybe<Array<ExpenseType>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBudget: BudgetResponse;
  createExpense: ExpenseResponse;
  createUser: UserResponse;
  login: UserResponse;
};


export type MutationCreateBudgetArgs = {
  input: BudgetInput;
};


export type MutationCreateExpenseArgs = {
  input: ExpenseInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  budgets: Array<BudgetType>;
  expenses: ExpensesResponse;
  user: UserType;
};


export type QueryExpensesArgs = {
  budgetId: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ErrorType>>;
  user?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'ErrorType', field: string, message: string }> | null, user?: { __typename?: 'UserType', id: string, firstName: string, lastName: string, email: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', user: { __typename?: 'UserType', id: string, firstName: string, lastName: string, email: string } };


export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  createUser(
    input: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    errors {
      field
      message
    }
    user {
      id
      firstName
      lastName
      email
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query me {
  user {
    id
    firstName
    lastName
    email
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};