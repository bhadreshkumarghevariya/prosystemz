import { gql, useQuery } from "@apollo/client";

export const GET_SHOPPING_CART_QUERY = gql`
  query GetShoppingCart($getShoppingCartId: ID, $userId: ID) {
    getShoppingCart(id: $getShoppingCartId, userId: $userId) {
      carts {
        cartName
        products {
          id
          imageURL
          price
          productName
          productDetails
          productShortDescription
          productType {
            customFields
            id
            imageURL
            productTypeName
          }
        }
        user
        id
        isAddedtoShoppingCart
      }
      id
      products {
        price
        productName
      }
      user
    }
  }
`;

export const useGetShoppingCart = (getShoppingCartId, userId) => {
  const { error, data, loading, refetch } = useQuery(GET_SHOPPING_CART_QUERY, {
    variables: { getShoppingCartId, userId },
  });

  return { error, loading, data, refetch };
};
