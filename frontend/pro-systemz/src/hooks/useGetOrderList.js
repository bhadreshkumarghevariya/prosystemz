import { gql, useQuery } from "@apollo/client";

const GET_ALL_ORDERS_FOR_USER = gql`
  query GetAllOrdersForUser($userId: ID!) {
    getAllOrdersForUser(userId: $userId) {
      id
      orderDate
      orderStatus
    }
  }
`;

export const useGetOrderList = (userId) => {
  console.log(userId);
  const { loading, error, data } = useQuery(GET_ALL_ORDERS_FOR_USER, {
    variables: { userId },
  });

  return { loading, error, data };
};
