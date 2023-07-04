import { useMutation, gql } from "@apollo/client";

export const CREATE_PRODUCT_TYPE_MUTATION = gql`
  mutation CreateProductType(
    $productType: productTypeInput
    $customFields: JSON
    $imageURL: String
  ) {
    createProductType(
      productType: $productType
      customFields: $customFields
      imageURL: $imageURL
    ) {
      id
      productTypeName
      customFields
      imageURL
    }
  }
`;

export function useCreateProductType() {
  const [createProductType, { data, loading, error }] = useMutation(
    CREATE_PRODUCT_TYPE_MUTATION
  );
  return { createProductType, data, loading, error };
}
