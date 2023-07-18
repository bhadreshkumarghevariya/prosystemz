import { gql, useMutation } from "@apollo/client";

const ADD_BUILD_TO_CART_MUTATION = gql`
  mutation CreateShoppingCartWithCartId($cartId: ID, $userId: ID) {
    createShoppingCartWithCartId(cartId: $cartId, userId: $userId)
  }
`;

//handleAddBuildToCart will  be in components/AddBuildToCartButton.js
export const useAddBuildToCart = (cartId, userId) => {
  const { error, data, loading } = useMutation(ADD_BUILD_TO_CART_MUTATION, {
    variables: { cartId, userId },
  });

  return { error, data, loading };
};
