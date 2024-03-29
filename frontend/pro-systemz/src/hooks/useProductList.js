import { gql, useQuery } from "@apollo/client";

const GET_PRODUCT_LIST_BY_PRODUCT_TYPE = gql`
  query GetProductsByType($productType: ID!) {
    getProductsByType(productType: $productType) {
      id
      productName
      productType {
        id
        productTypeName
      }
      productShortDescription
      price
      imageURL
    }
  }
`;

export const useProductList = (productType) => {
  const { error, data, loading } = useQuery(GET_PRODUCT_LIST_BY_PRODUCT_TYPE, {
    variables: { productType },
  });

  return { error, loading, data };
};
