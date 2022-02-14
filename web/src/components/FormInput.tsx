import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FieldConfig, useField } from 'formik';
import { FC, ReactNode } from 'react';

type FormInputProps = {
  inputIcon?: ReactNode;
  label: string;
  type: string;
  helperText?: string;
} & FieldConfig;

const FormInput: FC<FormInputProps> = ({
  inputIcon,
  label,
  type,
  helperText,
  ...props
}) => {
  const [field, meta] = useField(props);
  const inputId = `form-input-${field.name}`;
  const error = !!meta.error && meta.touched;

  return (
    <FormControl isInvalid={error}>
      <FormLabel htmlFor={inputId}>{label}</FormLabel>
      <InputGroup>
        {inputIcon && (
          <InputLeftElement pointerEvents="none" children={inputIcon} />
        )}
        <Input
          id={inputId}
          {...field}
          type={type}
          border="1px"
          borderColor="gray.400"
        />
      </InputGroup>
      {!error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
