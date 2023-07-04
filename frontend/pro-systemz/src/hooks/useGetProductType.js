import { gql, useQuery } from "@apollo/client";

export const GET_PRODUCT_TYPE_QUERY = gql`
  query GetProductType {
    getProductType {
      id
      productTypeName
      customFields
    }
  }
`;

export const useGetProductType = () => {
  const { error, data, loading, refetch } = useQuery(GET_PRODUCT_TYPE_QUERY);

  return { error, loading, data, refetch };
};
