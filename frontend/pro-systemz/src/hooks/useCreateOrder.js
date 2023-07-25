import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: OrderInput) {
    createOrder(input: $input) {
      id
      orderStatus
      orderDate
    }
  }
`;

export const useCreateOrder = () => {
  const [createOrder, { data, loading, error }] = useMutation(
    CREATE_ORDER_MUTATION
  );

  return { createOrder, data, loading, error };
};
