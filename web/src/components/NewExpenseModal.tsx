import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import FormInput from './FormInput';
import * as yup from 'yup';
import { useCreateExpenseMutation } from '../generated/graphql';

type NewExpenseModalProps = {
  budgetId: string;
  isOpen: boolean;
  hide: () => void;
};

type Values = {
  name: string;
  value: string;
};

const validationSchema = yup.object({
  name: yup.string().required('This field is required'),
  value: yup.string().required('This field is required'),
});

const NewExpenseModal: FC<NewExpenseModalProps> = ({
  isOpen,
  hide,
  budgetId,
}) => {
  const [, createExpense] = useCreateExpenseMutation();

  return (
    <Modal isOpen={isOpen} onClose={hide} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new Expense</ModalHeader>
        <ModalCloseButton />

        <Formik
          initialValues={{ name: '', value: '' }}
          onSubmit={async (values: Values, { setSubmitting, setErrors }) => {
            console.log(
              values.value,
              parseFloat(values.value.replace('$', '').replace(',', '')),
            );

            setSubmitting(true);
            const result = await createExpense({
              budgetId,
              name: values.name,
              value: parseFloat(values.value.replace('$', '').replace(',', '')),
            });
            setSubmitting(false);

            const errors = result.data?.createExpense.errors;
            if (errors) {
              const formErrors: Record<string, string> = {};
              for (const error of errors) {
                formErrors[error.field] = error.message;
              }

              setErrors(formErrors);
            } else {
              hide();
            }
          }}
          validationSchema={validationSchema}
        >
          <Form>
            <ModalBody>
              <FormInput type="text" name="name" label="Name" />
              <Spacer mt="3" />
              <FormInput type="number" name="value" label="Value" />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={hide}>
                Close
              </Button>
              <Button type="submit" colorScheme="green">
                Save
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default NewExpenseModal;
