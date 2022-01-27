import { FC, FormEvent } from 'react';
import { useMutation } from 'urql';
import { REGISTER_MUTATION } from '../../graphql/mutations';
import MySwal from '../../swal';
import Loading from '../../components/Loading';

const Register: FC = () => {
  const [registerResult, register] = useMutation(REGISTER_MUTATION);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      email: { value: string };
      password: { value: string };
    };

    register({
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      email: target.email.value,
      password: target.password.value,
    });
  };
  
  console.log(registerResult);
  if (registerResult.fetching) return <Loading />;
  if (registerResult.error) {
    MySwal.fire({
      icon: 'error',
      title: 'Error'
    });
  }
  if (registerResult.data) {
    MySwal.fire({
      icon: 'success',
      title: 'User create successfully!'
    }).then(() => window.open('/', '_self'));
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="first-name">First Name</label>
        <input type="text" required id="first-name" name="firstName" />
        <label htmlFor="last-name">Last Name</label>
        <input type="text" required id="last-name" name="lastName" />
        <label htmlFor="email">Email</label>
        <input type="email" required id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" required id="password" name="password" />

        <button type="submit">Register</button>
      </form>
      <br />
      <pre>{JSON.stringify(registerResult)}</pre>
    </>
  );
};

export default Register;
