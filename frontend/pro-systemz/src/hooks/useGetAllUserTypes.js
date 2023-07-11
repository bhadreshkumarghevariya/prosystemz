/*
generate gql for getAllUserTypes: async () => {
      return await UserType.find();
    },
*/

import { gql, useQuery } from "@apollo/client";

const GET_ALL_USER_TYPES = gql`
  query GetAllUserTypes {
    getAllUserTypes {
      id
      userTypeName
    }
  }
`;

export const useGetAllUserTypes = () => {
  const { error, data, loading } = useQuery(GET_ALL_USER_TYPES);

  return { error, loading, data };
};
