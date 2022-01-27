export const REGISTER_MUTATION = `
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      input: {
      firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
    }
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;
