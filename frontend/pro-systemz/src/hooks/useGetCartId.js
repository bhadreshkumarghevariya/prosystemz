import { gql, useQuery } from "@apollo/client";
/*
query Query($userId: ID) {
  getCartId(userId: $userId)
}
*/

export const GET_CART_ID_QUERY = gql`
  query Query($userId: ID) {
    getCartId(userId: $userId)
  }
`;

export const useGetCartId = (userId) => {
  const { error, data, loading, refetch } = useQuery(GET_CART_ID_QUERY, {
    variables: { userId },
  });

  return { error, loading, data, refetch };
};
