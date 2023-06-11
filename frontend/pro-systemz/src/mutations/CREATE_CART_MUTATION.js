import { gql } from "@apollo/client";

export const CREATE_CART_MUTATION = gql`
  mutation CreateCart($productId: ID) {
    createCart(productId: $productId)
  }
`;
