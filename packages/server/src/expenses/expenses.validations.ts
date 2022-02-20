import { validate } from 'validate.js';
import { ExpenseInput } from './inputs/expense.input';

export const validateExpenseData = (expenseData: ExpenseInput) => {
  const constraints = {
    name: {
      presence: {
        allowEmpty: false,
        message: 'must not be empty',
      },
    },
    value: {
      presence: {
        message: 'must not be empty',
      },
      numericality: {
        greaterThan: 0,
        notGreaterThan: 'must be greater than 0 (zero).',
      },
    },
    budgetId: {
      presence: {
        allowEmpty: false,
        message: 'must not be empty',
      },
    },
  };

  return validate(expenseData, constraints);
};
