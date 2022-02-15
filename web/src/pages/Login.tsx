import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Icon, useBoolean } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import FormInput from '../components/FormInput';
import { MdCreate, MdLogin } from 'react-icons/md';
import * as yup from 'yup';
import { useLoginMutation } from '../generated/graphql';
import ErrorDialog from '../components/ErrorDialog';
import { useNavigate } from 'react-router-dom';

interface Values {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .required('This field is required')
    .email('The email is invalid'),
  password: yup.string().required('This field is required'),
});

const Login: FC = () => {
  const [showError, setShowError] = useBoolean(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [_, login] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <>
      <Flex h="100%" justifyContent="center" alignItems="center">
        <Box
          w="100%"
          border="1px"
          borderColor="gray.500"
          borderRadius="3xl"
          padding="4"
        >
          <Heading textAlign="center">Sign in</Heading>
          <br />
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values: Values, { setSubmitting }) => {
              setSubmitting(true);
              const result = await login(values);
              setSubmitting(false);

              const errors = result.data?.login.errors;
              if (errors) {
                setErrorMessage(errors[0].message);
                setShowError.on();
              } else {
                navigate('/', { replace: true });
              }
            }}
            validationSchema={validationSchema}
          >
            <Form>
              <FormInput
                type="email"
                placeholder="Email"
                name="email"
                inputIcon={<EmailIcon />}
              />
              <br />
              <FormInput
                type="password"
                placeholder="Password"
                name="password"
                inputIcon={<LockIcon />}
              />
              <br />
              <Flex gap="5">
                <Button
                  flex="100%"
                  colorScheme="teal"
                  type="button"
                  leftIcon={<Icon as={MdCreate} />}
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
                <Button
                  flex="100%"
                  colorScheme="green"
                  type="submit"
                  leftIcon={<Icon as={MdLogin} />}
                >
                  Login
                </Button>
              </Flex>
            </Form>
          </Formik>
        </Box>
      </Flex>

      <ErrorDialog
        display={showError}
        hide={setShowError.off}
        message={errorMessage}
      />
    </>
  );
};

export default Login;
