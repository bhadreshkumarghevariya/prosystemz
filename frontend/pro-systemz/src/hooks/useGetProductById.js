import { gql, useQuery } from "@apollo/client";

const GET_PRODUCT_BY_ID = gql`
  query GetProduct($getProductId: ID) {
    getProduct(id: $getProductId) {
      id
      imageURL
      price
      productName
      productType {
        id
        productTypeName
      }
      productShortDescription
    }
  }
`;

export const useGetProductById = (getProductId) => {
  const { error, data, loading } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { getProductId },
  });

  return { error, loading, data };
};
