/*
query is
getAllOrders: async () => {
      return await Order.find()
        .populate("checkout")
        .populate("payment")
        .populate("user");
    },
*/

// Path: frontend/pro-systemz/src/hooks/useGetAllProducts.js
// Compare this snippet from backend/pro-systemz-backend/typeDefs.js:

import { gql, useQuery } from "@apollo/client";

const GET_ALL_ORDERS = gql`
  query GetAllOrders {
    getAllOrders {
      checkout {
        id
        shoppingCart
        user
      }
      orderDate
      orderStatus
      payment
      user {
        username
        email
        id
      }
      id
    }
  }
`;

const useGetAllOrders = () => {
  const { data, loading, error } = useQuery(GET_ALL_ORDERS);
  return { data, loading, error };
};

export { useGetAllOrders };
