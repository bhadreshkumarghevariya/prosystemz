import { gql, useMutation } from "@apollo/client";

const ADD_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: productInput!) {
    createProduct(input: $input) {
      productName
      productShortDescription
      productType {
        productTypeName
        id
      }
      price
      imageURL
    }
  }
`;

export const useAddProduct = () => {
  const [addProduct, { data, loading, error }] =
    useMutation(ADD_PRODUCT_MUTATION);

  const handleAddProduct = async (input) => {
    try {
      console.log(input);
      const response = await addProduct({
        variables: {
          input,
        },
      });
      return response.data.createProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { addProduct: handleAddProduct, data, loading, error };
};