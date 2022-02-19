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
import { useCreateBudgetMutation } from '../generated/graphql';

type NewBudgetModalProps = {
  isOpen: boolean;
  hide: () => void;
};

type Values = {
  name: string;
  maxValue: string;
};

const validationSchema = yup.object({
  name: yup.string().required('This field is required'),
  maxValue: yup.string().required('This field is required'),
});

const NewBudgetModal: FC<NewBudgetModalProps> = ({ isOpen, hide }) => {
  const [, createBudget] = useCreateBudgetMutation();

  return (
    <Modal isOpen={isOpen} onClose={hide} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new Budget</ModalHeader>
        <ModalCloseButton />

        <Formik
          initialValues={{ name: '', maxValue: '' }}
          onSubmit={async (values: Values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            const result = await createBudget({
              name: values.name,
              maxValue: parseFloat(
                values.maxValue.replace('$', '').replace(',', ''),
              ),
            });
            setSubmitting(false);

            const errors = result.data?.createBudget.errors;
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
              <FormInput type="number" name="maxValue" label="Max Value" />
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

export default NewBudgetModal;
