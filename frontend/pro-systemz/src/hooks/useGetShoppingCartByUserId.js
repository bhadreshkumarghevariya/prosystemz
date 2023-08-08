/*
query GetShoppingCartByUserId($userId: ID) {
  getShoppingCartByUserId(userId: $userId) {
    id
    status
    user
  }
}
*/

import { gql, useQuery } from "@apollo/client";

const GET_SHOPPING_CART_BY_USER_ID = gql`
  query GetShoppingCartByUserId($userId: ID) {
    getShoppingCartByUserId(userId: $userId) {
      id
      status
      user
    }
  }
`;

export default function useGetShoppingCartByUserId(userId) {
  const { data, loading, error } = useQuery(GET_SHOPPING_CART_BY_USER_ID, {
    variables: { userId: userId },
  });

  return {
    shoppingCart: data ? data.getShoppingCartByUserId : null,
    loading,
    error,
  };
}
