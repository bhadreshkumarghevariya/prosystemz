import { gql, useQuery } from "@apollo/client";

/*generate gql for query GetUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    email
    id
    userType {
      id
      userTypeName
    }
    username
  }*/

const GET_USER = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      email
      id
      userType {
        id
        userTypeName
      }
      username
    }
  }
`;

export const useGetUser = (getUserId) => {
  const { error, data, loading } = useQuery(GET_USER, {
    variables: { getUserId },
  });

  return { error, loading, data };
};
