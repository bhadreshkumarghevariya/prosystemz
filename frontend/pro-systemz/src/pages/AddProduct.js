import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useAddProduct } from "../hooks/useAddProduct";
import { useGetProductType } from "../hooks/useGetProductType";
import Upload from "../components/Upload";
import Header from "../components/Header";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productShortDescription, setProductShortDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [customFields, setCustomFields] = useState([]);
  const [productDetails, setProductDetails] = useState([]); // [key: string]: string | number | boolean | string[] | number[
  const [ports, setPorts] = useState([]);
  const [err, setError] = useState(null);
  const { addProduct, loading, error } = useAddProduct();
  const { data } = useGetProductType();

  const handleProductTypeChange = (e) => {
    const selectedProductTypeId = e.target.value;
    setProductType(selectedProductTypeId);

    const selectedProductType = data?.getProductType.find(
      (productType) => productType.id === selectedProductTypeId
    );

    setCustomFields(selectedProductType?.customFields);
    setProductDetails([]);

    console.log(data);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      //Make http request to upload file
      fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.file.path);
          setImageURL("http://localhost:4000/" + data.file.path);
          // return data.file.path;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const input = {
        productName,
        productShortDescription,
        productType,
        price,
        imageURL,
        productDetails,
      };
      console.log(input);
      const response = await addProduct(input);
      console.log(response);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <>
      <Container className="text-center mt-5">
        <Card className="shadow">
          <Card.Body>
            <Card.Title>Add Product</Card.Title>
            <Form onSubmit={handleAddProduct}>
              <Row>
                <Col></Col>
                <Col className="m-2" xs={8}>
                  <Form.Group>
                    <FloatingLabel label="Product Name">
                      <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col></Col>
                <Col className="m-2" xs={8}>
                  <Form.Group>
                    <FloatingLabel label="Product Short Description">
                      <Form.Control
                        as="textarea"
                        placeholder="Enter product short description."
                        rows={3}
                        value={productShortDescription}
                        onChange={(e) =>
                          setProductShortDescription(e.target.value)
                        }
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col></Col>
                <Col className="m-2" xs={8}>
                  <Form.Group>
                    <FloatingLabel label="Product Type">
                      <Form.Select
                        value={productType}
                        onChange={(e) => handleProductTypeChange(e)}
                        required
                      >
                        {data?.getProductType.map((productType) => (
                          <option
                            key={productType.id}
                            value={productType.id}
                            label={productType.productTypeName}
                          >
                            {productType.productTypeName}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col></Col>
                <Col className="m-2" xs={8}>
                  <Form.Group>
                    <FloatingLabel label="Product Price">
                      <Form.Control
                        type="text"
                        placeholder="Enter product price"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col></Col>
                <Col className="m-2" xs={8}>
                  <Form.Group>
                    <FloatingLabel label="Product Image">
                      <Form.Control
                        type="file"
                        placeholder="Enter product image"
                        onChange={(e) => {
                          handleFileChange(e);
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col></Col>
                <Col className="m-2" xs={8}>
                  <h3>Extra Parts</h3>
                </Col>
                <Col></Col>
              </Row>
              {customFields.map((field) => (
                <Row key={field.name}>
                  <Col></Col>
                  <Col className="m-2" xs={8}>
                    <Form.Group>
                      <FloatingLabel label={field.name}>
                        <Form.Control
                          type={field.type}
                          placeholder={`Enter ${field.name}`}
                          value={field.value}
                          onChange={(e) => {
                            setProductDetails({
                              ...productDetails,
                              [field.name]: e.target.value,
                            });
                          }}
                          // Add appropriate value and onChange handlers based on the field type
                          // value={customFieldsInput[field.name]}
                          // onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                          required
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>
              ))}
              <Button variant="primary" className="m-2" type="submit">
                Add Product
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddProduct;
