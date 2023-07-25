import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const CREATE_PAYMENT_MUTATION = gql`
  mutation CreatePayment($input: PaymentInput) {
    createPayment(input: $input) {
      id
      method
      cardNumber
      cardExpiry
      cardCVV
      user {
        id
      }
    }
  }
`;

export const useCreatePayment = () => {
  const [createPayment, { data, loading, error }] = useMutation(
    CREATE_PAYMENT_MUTATION
  );

  return { createPayment, data, loading, error };
};
