import { gql, useMutation } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        email
        id
        username
      }
    }
  }
`;

export const useSignup = () => {
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleSignup = async (username, email, password) => {
    try {
      //   console.log(email);
      const response = await signup({
        variables: { username, email, password },
      });
      return response.data.signup;
    } catch (error) {
      throw new Error("Test" + error.message);
    }
  };

  return { signup: handleSignup, data, loading, error };
};
