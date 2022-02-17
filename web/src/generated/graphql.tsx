import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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

export type DeleteBudgetResponse = {
  __typename?: 'DeleteBudgetResponse';
  budgetId?: Maybe<Scalars['ID']>;
  errors?: Maybe<Array<ErrorType>>;
};

export type DeleteExpensesResponse = {
  __typename?: 'DeleteExpensesResponse';
  errors?: Maybe<Array<ErrorType>>;
  expenseId?: Maybe<Scalars['ID']>;
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
  deleteBudget: DeleteBudgetResponse;
  deleteExpense: DeleteExpensesResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
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

export type MutationDeleteBudgetArgs = {
  budgetId: Scalars['String'];
};

export type MutationDeleteExpenseArgs = {
  expenseId: Scalars['String'];
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

export type CreateBudgetMutationVariables = Exact<{
  name: Scalars['String'];
  maxValue: Scalars['Float'];
}>;

export type CreateBudgetMutation = {
  __typename?: 'Mutation';
  createBudget: {
    __typename?: 'BudgetResponse';
    errors?: Array<{
      __typename?: 'ErrorType';
      field: string;
      message: string;
    }> | null;
    budget?: {
      __typename?: 'BudgetType';
      id: string;
      name: string;
      maxValue: number;
    } | null;
  };
};

export type CreateExpenseMutationVariables = Exact<{
  name: Scalars['String'];
  value: Scalars['Float'];
  budgetId: Scalars['String'];
}>;

export type CreateExpenseMutation = {
  __typename?: 'Mutation';
  createExpense: {
    __typename?: 'ExpenseResponse';
    errors?: Array<{
      __typename?: 'ErrorType';
      field: string;
      message: string;
    }> | null;
    expense?: {
      __typename?: 'ExpenseType';
      id: string;
      name: string;
      value: number;
    } | null;
  };
};

export type DeleteBudgetMutationVariables = Exact<{
  budgetId: Scalars['String'];
}>;

export type DeleteBudgetMutation = {
  __typename?: 'Mutation';
  deleteBudget: {
    __typename?: 'DeleteBudgetResponse';
    budgetId?: string | null;
    errors?: Array<{ __typename?: 'ErrorType'; message: string }> | null;
  };
};

export type DeleteExpenseMutationVariables = Exact<{
  expenseId: Scalars['String'];
}>;

export type DeleteExpenseMutation = {
  __typename?: 'Mutation';
  deleteExpense: {
    __typename?: 'DeleteExpensesResponse';
    expenseId?: string | null;
    errors?: Array<{ __typename?: 'ErrorType'; message: string }> | null;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    errors?: Array<{ __typename?: 'ErrorType'; message: string }> | null;
    user?: {
      __typename?: 'UserType';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'UserResponse';
    errors?: Array<{
      __typename?: 'ErrorType';
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: 'UserType';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    } | null;
  };
};

export type BudgetsQueryVariables = Exact<{ [key: string]: never }>;

export type BudgetsQuery = {
  __typename?: 'Query';
  budgets: Array<{
    __typename?: 'BudgetType';
    id: string;
    name: string;
    maxValue: number;
    currentValue: number;
  }>;
};

export type ExpensesQueryVariables = Exact<{
  budgetId: Scalars['String'];
}>;

export type ExpensesQuery = {
  __typename?: 'Query';
  expenses: {
    __typename?: 'ExpensesResponse';
    errors?: Array<{
      __typename?: 'ErrorType';
      field: string;
      message: string;
    }> | null;
    expenses?: Array<{
      __typename?: 'ExpenseType';
      id: string;
      name: string;
      value: number;
    }> | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'UserType';
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export const CreateBudgetDocument = gql`
  mutation CreateBudget($name: String!, $maxValue: Float!) {
    createBudget(input: { name: $name, maxValue: $maxValue }) {
      errors {
        field
        message
      }
      budget {
        id
        name
        maxValue
      }
    }
  }
`;

export function useCreateBudgetMutation() {
  return Urql.useMutation<CreateBudgetMutation, CreateBudgetMutationVariables>(
    CreateBudgetDocument,
  );
}
export const CreateExpenseDocument = gql`
  mutation CreateExpense($name: String!, $value: Float!, $budgetId: String!) {
    createExpense(input: { name: $name, value: $value, budgetId: $budgetId }) {
      errors {
        field
        message
      }
      expense {
        id
        name
        value
      }
    }
  }
`;

export function useCreateExpenseMutation() {
  return Urql.useMutation<
    CreateExpenseMutation,
    CreateExpenseMutationVariables
  >(CreateExpenseDocument);
}
export const DeleteBudgetDocument = gql`
  mutation DeleteBudget($budgetId: String!) {
    deleteBudget(budgetId: $budgetId) {
      errors {
        message
      }
      budgetId
    }
  }
`;

export function useDeleteBudgetMutation() {
  return Urql.useMutation<DeleteBudgetMutation, DeleteBudgetMutationVariables>(
    DeleteBudgetDocument,
  );
}
export const DeleteExpenseDocument = gql`
  mutation DeleteExpense($expenseId: String!) {
    deleteExpense(expenseId: $expenseId) {
      errors {
        message
      }
      expenseId
    }
  }
`;

export function useDeleteExpenseMutation() {
  return Urql.useMutation<
    DeleteExpenseMutation,
    DeleteExpenseMutationVariables
  >(DeleteExpenseDocument);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      errors {
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

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
  );
}
export const RegisterDocument = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
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
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
  );
}
export const BudgetsDocument = gql`
  query Budgets {
    budgets {
      id
      name
      maxValue
      currentValue
    }
  }
`;

export function useBudgetsQuery(
  options?: Omit<Urql.UseQueryArgs<BudgetsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<BudgetsQuery>({ query: BudgetsDocument, ...options });
}
export const ExpensesDocument = gql`
  query Expenses($budgetId: String!) {
    expenses(budgetId: $budgetId) {
      errors {
        field
        message
      }
      expenses {
        id
        name
        value
      }
    }
  }
`;

export function useExpensesQuery(
  options: Omit<Urql.UseQueryArgs<ExpensesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExpensesQuery>({ query: ExpensesDocument, ...options });
}
export const MeDocument = gql`
  query Me {
    user {
      id
      firstName
      lastName
      email
    }
  }
`;

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
