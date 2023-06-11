import { gql } from "@apollo/client";

export const ADD_PRODUCT_TO_CART_MUTATION = gql`
  mutation AddProductToCart($cartId: ID, $productId: ID) {
    addProductToCart(CartId: $cartId, productId: $productId) {
      id
      productName
      price
    }
  }
`;
