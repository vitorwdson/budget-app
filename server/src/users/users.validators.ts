import { validate } from 'validate.js';
import { UserInput } from './inputs/user.input';

export const validateUserData = (userData: UserInput) => {
  const constraints = {
    firstName: {
      presence: {
        allowEmpty: false,
        message: 'must not be empty',
      },
    },
    lastName: {
      presence: {
        allowEmpty: false,
        message: 'must not be empty',
      },
    },
    email: {
      presence: {
        allowEmpty: false,
        message: 'must not be empty',
      },
      email: {
        message: 'must be a valid email.',
      },
    },
  };

  return validate(userData, constraints);
};

export const passwordTester = (password: string) => {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};
