import React, { useState } from "react";
import {
  Alert,
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
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Upload from "../components/Upload";
import Header from "../components/Header";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productShortDescription, setProductShortDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [customFields, setCustomFields] = useState([]);
  const [success, setSuccess] = useState(false);
  const [err, setError] = useState(null);
  const [productDetails, setProductDetails] = useState([]); // [key: string]: string | number | boolean | string[] | number[
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

      const response = await addProduct(input);

      setProductName("");
      setProductShortDescription("");
      setProductType("");
      setPrice("");
      setImageURL("");
      setProductDetails([]);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(false);
      throw new Error(error.message);
    }
  };
  return (
    <>
      <Container className="text-center mt-5">
        <Card className="shadow">
          <Card.Body className="m-4">
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
                        <option value="">Select Product Type</option>
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
              <PrimaryButton
                variant="primary"
                className="m-2"
                type="submit"
                disabled={loading}
              >
                {loading ? "Adding Product..." : "Add Product"}
              </PrimaryButton>
              {/* <Button variant="primary" className="m-2" type="submit">
                Add Product
              </Button> */}
              <Alert
                variant="success"
                className="mt-5 col-4 m-auto"
                show={success !== false}
              >
                <p>Product Added Successfully</p>
              </Alert>
              <Alert
                variant="danger"
                className="mt-5 col-4 m-auto"
                show={err !== null}
              >
                <p>{err}</p>
              </Alert>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddProduct;
