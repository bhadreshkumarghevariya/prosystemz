import { gql } from "@apollo/client";

export const ADD_BUILD_TO_CART_MUTATION = gql`
  mutation CreateShoppingCartWithCartId($cartId: ID, $userId: ID) {
    createShoppingCartWithCartId(cartId: $cartId, userId: $userId)
  }
`;
