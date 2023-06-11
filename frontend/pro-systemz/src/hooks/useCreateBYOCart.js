import { gql, useMutation } from "@apollo/client";

const CREATE_BYO_CART = gql`
  mutation CreateCart($productId: ID) {
    createCart(productId: $productId)
  }
`;

export const useCreateBYOCart = (productId) => {
  const { error, data, loading } = useMutation(CREATE_BYO_CART, {
    variables: { productId },
  });

  return { error, data, loading };
};
