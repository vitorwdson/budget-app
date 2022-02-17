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
import NumberFormat from 'react-number-format';

type FormInputProps = {
  inputIcon?: ReactNode;
  label?: string;
  placeholder?: string;
  type: string;
  helperText?: string;
} & FieldConfig;

const FormInput: FC<FormInputProps> = ({
  inputIcon,
  label,
  placeholder,
  type,
  helperText,
  ...props
}) => {
  const [field, meta] = useField(props);
  const inputId = `form-input-${field.name}`;
  const error = !!meta.error && meta.touched;

  return (
    <FormControl isInvalid={error}>
      {label && <FormLabel htmlFor={inputId}>{label}</FormLabel>}
      <InputGroup>
        {inputIcon && (
          <InputLeftElement pointerEvents="none" children={inputIcon} />
        )}
        {type === 'text' && (
          <Input
            id={inputId}
            {...field}
            placeholder={placeholder}
            type={type}
            border="1px"
            borderColor="gray.400"
          />
        )}
        {type === 'number' && (
          <NumberFormat
            {...field}
            thousandSeparator={true}
            prefix={'$'}
            customInput={Input}
            border="1px"
            borderColor="gray.400"
            decimalScale={2}
          />
        )}
      </InputGroup>
      {!error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
