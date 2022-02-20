export function formatValidationErrors(validation: any) {
  const errors = [];

  for (const field in validation) {
    errors.push({
      field,
      message: validation[field][0],
    });
  }

  return errors;
}
