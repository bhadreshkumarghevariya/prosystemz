import { gql, useQuery } from "@apollo/client";

// export const GET_CART_QUERY = gql`
//   query GetCart($getCartId: ID) {
//     getCart(id: $getCartId) {
//       id
//       price
//       productName
//       productShortDescription
//       productType {
//         id
//         productTypeName
//       }
//       imageURL
//     }
//   }
// `;

export const GET_CART_QUERY = gql`
  query GetCart($getCartId: ID, $userId: ID) {
    getCart(id: $getCartId, userId: $userId) {
      products {
        imageURL
        price
        id
        productDetails
        productShortDescription
        productName
        productType {
          customFields
          id
          imageURL
          productTypeName
        }
      }
      id
      user
      cartName
    }
  }
`;

export const useGetBYOCart = (getCartId) => {
  console.log(getCartId);
  const { error, data, loading, refetch } = useQuery(GET_CART_QUERY, {
    variables: { getCartId },
  });

  return { error, loading, data, refetch };
};
