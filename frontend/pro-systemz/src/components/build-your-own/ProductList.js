import { useParams } from "react-router-dom";
import ProductListItem from "./ProductListItem";
import { useProductList } from "../../hooks/useProductList";
import React from "react";
import Header from "../Header";
import { Container, Table } from "react-bootstrap";

const ProductList = (props) => {
  const { productTypeName, productTypeId } = useParams();
  const { error, data, loading } = useProductList(productTypeName);
  if (loading) return <>loading....</>;
  if (error)
    return (
      <>
        something went wrong...
        {error.graphQLErrors.map(({ message }, i) => {
          <span key={i}>{message}</span>;
        })}
      </>
    );
  let isData;
  if (Object.keys(data.getProductsByType).length === 0) {
    isData = <h1>Sorry.... There is no product Available for this type</h1>;
  }
  return (
    <React.Fragment>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Description</th>
              <th>Price</th>
              <th>View Details</th>
              <th>Select Button</th>
            </tr>
          </thead>
          {isData}
          <tbody>
            {data.getProductsByType.map((product) => {
              return (
                <ProductListItem productObject={product} key={product.id} />
              );
            })}
          </tbody>
        </Table>
      </Container>
    </React.Fragment>
  );
};

export default ProductList;
