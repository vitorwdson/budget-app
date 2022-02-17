import { cacheExchange } from '@urql/exchange-graphcache';
import { refocusExchange } from '@urql/exchange-refocus';
import { dedupExchange, fetchExchange } from 'urql';
import {
  MeQuery,
  MeDocument,
  BudgetsQuery,
  BudgetsDocument,
} from '../generated/graphql';
import CacheExchangeType from './exchangeType';

const exchanges = [
  dedupExchange,
  refocusExchange(),
  cacheExchange<CacheExchangeType>({
    updates: {
      Mutation: {
        login: (result, args, cache, info) => {
          cache.updateQuery<MeQuery>(
            {
              query: MeDocument,
            },
            (data) => {
              if (result.login.user) {
                return { me: result.login.user };
              }

              return data;
            },
          );
        },
        register: (result, args, cache, info) => {
          cache.updateQuery<MeQuery>(
            {
              query: MeDocument,
            },
            (data) => {
              if (result.createUser.user) {
                return { me: result.createUser.user };
              }

              return data;
            },
          );
        },
        logout: (result, args, cache, info) => {
          cache.invalidate(
            {
              __typename: 'Query',
            },
            'user',
          );
        },
        deleteBudget(result, args, cache, info) {
          cache.updateQuery<BudgetsQuery>(
            {
              query: BudgetsDocument,
            },
            (data) => {
              if (data && result.deleteBudget.budgetId) {
                return {
                  budgets: data.budgets.filter(
                    (budget) => budget.id !== result.deleteBudget.budgetId,
                  ),
                };
              }

              return data;
            },
          );
        },
      },
    },
  }),
  fetchExchange,
];

export default exchanges;
