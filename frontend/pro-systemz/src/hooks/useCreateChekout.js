/*
mutation CreateCheckout($userId: ID, $address: AddressInput, $shoppingCartId: ID) {
  createCheckout(userId: $userId, address: $address, shoppingCartId: $shoppingCartId) {
    address {
      addressLine1
      addressLine2
      city
      country
      id
      state
      zipCode
    }
    id
    user
    shoppingCart
  }
}
*/

import { gql, useMutation } from "@apollo/client";
export const CREATE_CHECKOUT_MUTATION = gql`
  mutation CreateCheckout(
    $userId: ID
    $address: AddressInput
    $shoppingCartId: ID
  ) {
    createCheckout(
      userId: $userId
      address: $address
      shoppingCartId: $shoppingCartId
    ) {
      address {
        addressLine1
        addressLine2
        city
        country
        id
        state
        zipCode
      }
      id
      user
      shoppingCart
    }
  }
`;

const useCreateCheckout = (userId, address, shoppingCartId) => {
  const { error, data, loading } = useMutation(CREATE_CHECKOUT_MUTATION, {
    variables: { userId, address, shoppingCartId },
  });

  return { error, data, loading };
};

export default useCreateCheckout;
