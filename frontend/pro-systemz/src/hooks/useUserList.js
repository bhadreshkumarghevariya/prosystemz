import { gql, useQuery } from "@apollo/client";

const GET_USER_LIST = gql`
  query GetAllUsers {
    getAllUsers {
      id
      username
      email
      userType {
        id
        userTypeName
      }
    }
  }
`;

export const useUserList = () => {
  const { error, data, loading } = useQuery(GET_USER_LIST);

  return { error, loading, data };
};
