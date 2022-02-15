import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Flex, Box, Heading, Button, Icon } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { FC, FormEvent } from 'react';
import { MdCreate, MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { useRegisterMutation } from '../generated/graphql';
import * as yup from 'yup';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = yup.object({
  firstName: yup.string().required('This field is required'),
  lastName: yup.string().required('This field is required'),
  email: yup
    .string()
    .required('This field is required')
    .email('The email is invalid'),
  password: yup
    .string()
    .required('This field is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      'Your password is not strong enough',
    ),
  confirmPassword: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register: FC = () => {
  const [_, register] = useRegisterMutation();
  const navigate = useNavigate();

  return (
    <Flex h="100%" justifyContent="center" alignItems="center">
      <Box
        w="100%"
        border="1px"
        borderColor="gray.500"
        borderRadius="3xl"
        padding="4"
      >
        <Heading textAlign="center">Sign up</Heading>
        <br />
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={async (values: Values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            const result = await register(values);
            setSubmitting(false);

            const errors = result.data?.createUser.errors;
            if (errors) {
              const formErrors: Record<string, string> = {};
              for (const error of errors) {
                formErrors[error.field] = error.message;
              }

              setErrors(formErrors);
            } else {
              navigate('/', { replace: true });
            }
          }}
          validationSchema={validationSchema}
        >
          <Form>
            <Flex gap="3">
              <FormInput
                type="text"
                placeholder="First Name"
                name="firstName"
              />
              <FormInput type="text" placeholder="Last Name" name="lastName" />
            </Flex>
            <br />
            <FormInput type="email" placeholder="Email" name="email" />
            <br />
            <FormInput type="password" placeholder="Password" name="password" />
            <br />
            <FormInput
              type="password"
              placeholder="Confirm your Password"
              name="confirmPassword"
            />
            <br />
            <Flex gap="5">
              <Button
                flex="100%"
                colorScheme="teal"
                type="button"
                leftIcon={<Icon as={MdLogin} />}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                flex="100%"
                colorScheme="green"
                type="submit"
                leftIcon={<Icon as={MdCreate} />}
              >
                Register
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};

export default Register;
