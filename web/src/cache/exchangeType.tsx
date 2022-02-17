import { Variables, ResolveInfo, Cache } from '@urql/exchange-graphcache';
import {
  LoginMutation,
  RegisterMutation,
  LogoutMutation,
  DeleteBudgetMutation,
} from '../generated/graphql';

type CacheExchangeType = {
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
    };
  };
};

export default CacheExchangeType;
