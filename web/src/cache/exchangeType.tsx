import {
  Variables,
  ResolveInfo,
  Cache,
  KeyingConfig,
} from '@urql/exchange-graphcache';
import {
  LoginMutation,
  RegisterMutation,
  LogoutMutation,
  DeleteBudgetMutation,
  CreateExpenseMutation,
  DeleteExpenseMutation,
} from '../generated/graphql';

type CacheExchangeType = {
  keys?: KeyingConfig;
  updates: {
    Mutation: {
      login: (
        result: LoginMutation,
        args: Variables,
        cache: Cache,
        info: ResolveInfo,
      ) => void;
      register: (
        result: RegisterMutation,
        args: Variables,
        cache: Cache,
        info: ResolveInfo,
      ) => void;
      logout: (
        result: LogoutMutation,
        args: Variables,
        cache: Cache,
        info: ResolveInfo,
      ) => void;
      deleteBudget: (
        result: DeleteBudgetMutation,
        args: Variables,
        cache: Cache,
        info: ResolveInfo,
      ) => void;
      createExpense: (
        result: CreateExpenseMutation,
        args: Variables,
        cache: Cache,
        info: ResolveInfo,
      ) => void;
      deleteExpense: (
        result: DeleteExpenseMutation,
        args: Variables,
        cache: Cache,
        info: ResolveInfo,
      ) => void;
    };
  };
};

export default CacheExchangeType;
