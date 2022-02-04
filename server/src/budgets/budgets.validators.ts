import { validate } from 'validate.js';
import { BudgetInput } from './inputs/budget.input';

export const validateBudgetData = (budgetData: BudgetInput) => {
  const constraints = {
    name: {
      presence: {
        allowEmpty: false,
        message: 'must not be empty',
      },
    },
    maxValue: {
      presence: {
        message: 'must not be empty',
      },
      numericality: {
        greaterThan: 0,
        notGreaterThan: 'value must be greater than 0 (zero).',
      },
    },
  };

  return validate(budgetData, constraints);
};
