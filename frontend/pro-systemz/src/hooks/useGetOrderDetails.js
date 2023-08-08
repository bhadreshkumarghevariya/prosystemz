import { gql, useQuery } from "@apollo/client";

const GET_ORDER_DETAILS = gql`
  query GetOrderDetails($getOrderDetailsId: ID!) {
    getOrderDetails(id: $getOrderDetailsId) {
      id
      checkout {
        id
        shoppingCart
        address {
          addressLine1
          addressLine2
          city
          country
          id
          state
          zipCode
        }
      }
      orderDate
      orderStatus
      payment
      user {
        id
        email
        username
      }
    }
  }
`;

export default function useGetOrderDetails(getOrderDetailsId) {
  const { loading, error, data } = useQuery(GET_ORDER_DETAILS, {
    variables: { getOrderDetailsId },
  });

  return {
    loading,
    error,
    data,
  };
}
