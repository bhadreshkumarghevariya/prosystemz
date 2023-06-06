import { useQuery, gql } from "@apollo/client";

const GET_PRODUCT_TYPES = gql`
  query {
    getProductType {
      id
      productTypeName
    }
  }
`;

export const useProductType = () => {
  const { error, data, loading } = useQuery(GET_PRODUCT_TYPES);

  return { error, data, loading };
};

// import { useQuery, gql } from "@apollo/client";

// const GET_POSTS = gql`
//   query {
//     getAllPost {
//       id
//       title
//       description
//     }
//   }
// `;

// export const usePosts = () => {
//   const { error, data, loading } = useQuery(GET_POSTS);

//   return { error, data, loading };
// };
