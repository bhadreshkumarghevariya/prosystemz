import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const UPDATE_SHOPPING_CART_STATUS = gql`
  mutation UpdateShoppingCartStatus(
    $updateShoppingCartStatusId: ID
    $status: String
  ) {
    updateShoppingCartStatus(id: $updateShoppingCartStatusId, status: $status) {
      status
      id
    }
  }
`;

export default function useUpdateShoppingCartStatus() {
  const [updateShoppingCartStatusMutation] = useMutation(
    UPDATE_SHOPPING_CART_STATUS
  );

  return {
    updateShoppingCartStatusMutation,
  };
}
