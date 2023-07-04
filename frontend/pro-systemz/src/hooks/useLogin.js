import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        id
        username
      }
    }
  }
`;

export const useLogin = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (email, password) => {
    try {
      const response = await login({
        variables: { email, password },
      });
      console.log(response);
      return response.data.login;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { login: handleLogin, data, loading, error };
};
