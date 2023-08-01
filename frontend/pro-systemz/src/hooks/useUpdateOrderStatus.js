import { gql, useMutation } from "@apollo/client";
const UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus($orderId: ID!, $status: String!) {
    updateOrderStatus(id: $orderId, orderStatus: $status) {
      id
      orderStatus
    }
  }
`;

const useUpdateOrderStatus = () => {
  const [updateOrderStatus, { error, loading }] =
    useMutation(UPDATE_ORDER_STATUS);

  return { updateOrderStatus, error, loading };
};

export default useUpdateOrderStatus;
