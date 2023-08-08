/*
mutation AddCartToShoppingCart($cartId: ID, $userId: ID, $shoppingCartId: ID) {
  addCartToShoppingCart(cartId: $cartId, userId: $userId, shoppingCartId: $shoppingCartId)
}
*/

import { gql, useMutation } from "@apollo/client";

const ADD_CART_TO_SHOPPING_CART_MUTATION = gql`
  mutation AddCartToShoppingCart(
    $cartId: ID
    $userId: ID
    $shoppingCartId: ID
  ) {
    addCartToShoppingCart(
      cartId: $cartId
      userId: $userId
      shoppingCartId: $shoppingCartId
    )
  }
`;

export const useAddCartToShoppingCart = (userId, cartId, shoppingCartId) => {
  const [addCartToShoppingCart, { data, loading, error }] = useMutation(
    ADD_CART_TO_SHOPPING_CART_MUTATION,
    {
      variables: { userId, cartId, shoppingCartId },
    }
  );

  return { addCartToShoppingCart, data, loading, error };
};
