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

const exchanges = [
  dedupExchange,
  refocusExchange(),
  cacheExchange<CacheExchangeType>({
    keys: {
      ExpensesResponse: () => null,
    },
    updates: {
      Mutation: {
        login: (result, args, cache) => {
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
          cache.invalidate(
            {
              __typename: 'Query',
            },
            'budgets',
          );
          cache.invalidate(
            {
              __typename: 'Query',
            },
            'expenses',
          );
        },
        register: (result, args, cache) => {
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
          cache.invalidate(
            {
              __typename: 'Query',
            },
            'budgets',
          );
          cache.invalidate(
            {
              __typename: 'Query',
            },
            'expenses',
          );
        },
        logout: (result, args, cache) => {
          cache.invalidate(
            {
              __typename: 'Query',
            },
            'me',
          );
          cache.invalidate(
            {
              __typename: 'Query',
            },
            'budgets',
          );
          cache.invalidate(
            {
              __typename: 'Query',
            },
            'expenses',
          );
        },
        createBudget(result, args, cache) {
          cache.updateQuery<BudgetsQuery>(
            {
              query: BudgetsDocument,
            },
            (data) => {
              const budget = result.createBudget.budget;
              if (budget) {
                const newBudget = { ...budget, currentValue: 0 };
                const oldBudgets = data?.budgets;

                if (oldBudgets) {
                  return {
                    budgets: [...oldBudgets, newBudget],
                  };
                }

                return {
                  budgets: [newBudget],
                };
              }

              return null;
            },
          );
        },
        deleteBudget(result, args, cache) {
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
        createExpense(result, args, cache) {
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

          cache.updateQuery<ExpensesQuery>(
            {
              query: ExpensesDocument,
              variables: {
                budgetId: expense.budgetId,
              },
            },
            (data) => {
              const expenseList = data?.expenses.expenses;
              if (expenseList != null) {
                return {
                  expenses: {
                    ...data?.expenses,
                    expenses: [...expenseList, expense],
                  },
                };
              }

              return null;
            },
          );
        },
        deleteExpense(result, args, cache) {
          const expense = result.deleteExpense.expense;
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
                          currentValue: budget.currentValue - expense.value,
                        }
                      : budget,
                  ),
                };
              }

              return data;
            },
          );

          cache.updateQuery<ExpensesQuery>(
            {
              query: ExpensesDocument,
              variables: {
                budgetId: expense.budgetId,
              },
            },
            (data) => {
              const expenseList = data?.expenses.expenses;
              if (expenseList?.length) {
                const newData = {
                  expenses: {
                    ...data?.expenses,
                    expenses: expenseList.filter(({ id }) => id !== expense.id),
                  },
                };

                return newData;
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
