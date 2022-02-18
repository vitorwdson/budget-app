import { cacheExchange } from '@urql/exchange-graphcache';
import { refocusExchange } from '@urql/exchange-refocus';
import { dedupExchange, fetchExchange } from 'urql';
import {
  MeQuery,
  MeDocument,
  BudgetsQuery,
  BudgetsDocument,
  ExpensesQuery,
  ExpensesDocument,
} from '../generated/graphql';
import CacheExchangeType from './exchangeType';
import { devtoolsExchange } from '@urql/devtools';

const exchanges = [
  devtoolsExchange,
  dedupExchange,
  refocusExchange(),
  cacheExchange<CacheExchangeType>({
    keys: {
      ExpensesResponse: (data) => null,
    },
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
              if (data && result.deleteBudget.budget) {
                return {
                  budgets: data.budgets.filter(
                    (budget) => budget.id !== result.deleteBudget.budget?.id,
                  ),
                };
              }

              return data;
            },
          );
        },
        createExpense(result, args, cache, info) {
          const expense = result.createExpense.expense;
          if (!expense) return;

          cache.updateQuery<BudgetsQuery>(
            {
              query: BudgetsDocument,
            },
            (data) => {
              if (data) {
                return {
                  budgets: data.budgets.map((budget) =>
                    budget.id === expense.budgetId
                      ? {
                          ...budget,
                          currentValue: budget.currentValue + expense.value,
                        }
                      : budget,
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
