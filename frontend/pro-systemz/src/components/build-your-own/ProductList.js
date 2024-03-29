import { useParams } from "react-router-dom";
import ProductListItem from "./ProductListItem";
import { useProductList } from "../../hooks/useProductList";
import React from "react";
import Header from "../Header";
import { Container, Table, Card, Alert } from "react-bootstrap";
import { useState } from "react";

const ProductList = (props) => {
  const { productTypeName, productTypeId } = useParams();
  const { error, data, loading } = useProductList(productTypeName);
  const [productAddedToBuild, setProductAddedToBuild] = useState(false);
  const [productType, setProductType] = useState("");
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
  console.log(data);
  return (
    <React.Fragment>
      <Container>
        <Card className="m-3">
          <Card.Header>
            <h3 className="text-center">{productType} List</h3>
          </Card.Header>
          <Card.Body className="m-1 p-1">
            <Table className="table text-nowrap mb-0 table-centered table-hover custom-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>View Details</th>
                  <th>Add to Build</th>
                </tr>
              </thead>
              {isData}
              <tbody>
                {data.getProductsByType.map((product) => {
                  if (productType === "") {
                    setProductType(product.productType.productTypeName);
                  }
                  return (
                    <ProductListItem
                      productObject={product}
                      key={product.id}
                      productAddedToBuild={productAddedToBuild}
                      setProductAddedToBuild={setProductAddedToBuild}
                      userId={props.userId}
                    />
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Alert
          variant="success"
          className="mt-5 col-4 m-auto"
          show={productAddedToBuild !== false}
        >
          <p>Product Added to Current Build</p>
        </Alert>
      </Container>
    </React.Fragment>
  );
};

export default ProductList;
