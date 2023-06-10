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
    }
  }
`;

export const useProductList = (productType) => {
  console.log(productType);
  const { error, data, loading } = useQuery(GET_PRODUCT_LIST_BY_PRODUCT_TYPE, {
    variables: { productType },
  });

  return { error, loading, data };
};
