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
import { useCreateProductType } from "../hooks/useCreateProductType";
import Header from "../components/Header";

const AddProductType = ({ onSubmit }) => {
  const [productTypeName, setProductTypeName] = useState("");
  const [customFields, setCustomFields] = useState([]);

  const [success, setSuccess] = useState(false);
  const [err, setError] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const { createProductType, data, loading, error } = useCreateProductType();

  const handleAddField = () => {
    setCustomFields([...customFields, { name: "", type: "" }]);
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
        .catch((error) => {});
    }
  };

  const handleFieldChange = (index, fieldProp, value) => {
    const updatedFields = [...customFields];
    updatedFields[index][fieldProp] = value;
    setCustomFields(updatedFields);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productType = {
        productTypeName,
      };

      const response = await createProductType({
        variables: {
          productType,
          customFields,
          imageURL,
        },
      });

      setProductTypeName("");
      setCustomFields([]);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error);
      setSuccess(false);
    }
  };

  return (
    <>
      <Alert
        variant="success"
        className="mt-5 col-4 m-auto"
        show={success !== false}
      >
        <p>Product Type Added Successfully</p>
      </Alert>
      <Alert variant="danger" className="mt-5 col-4 m-auto" show={err !== null}>
        <p>{err}</p>
      </Alert>
      <Container className="text-center mt-5">
        <Card className="shadow">
          <Card.Body className="m-4">
            <Card.Title>Add Product Type</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col></Col>
                <Col className="m-2" xs={8}>
                  <Form.Group className="m-2">
                    <FloatingLabel label="Product Type Name">
                      <Form.Control
                        type="text"
                        placeholder="Enter product type name"
                        value={productTypeName}
                        onChange={(e) => setProductTypeName(e.target.value)}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="m-2">
                    <FloatingLabel label="Product Type Image">
                      <Form.Control
                        type="file"
                        placeholder="Enter product type image"
                        // value={productTypeImage}
                        onChange={(e) => {
                          handleFileChange(e);
                        }}
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
                  {customFields.map((field, index) => (
                    <Row key={index}>
                      <Col>
                        <Form.Group className="m-2">
                          <FloatingLabel label="Socket Name">
                            <Form.Control
                              type="text"
                              placeholder="Enter socket name"
                              value={field.name}
                              onChange={(e) =>
                                handleFieldChange(index, "name", e.target.value)
                              }
                              required
                            />
                          </FloatingLabel>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="m-2">
                          <FloatingLabel label="Socket Type">
                            <Form.Control
                              type="text"
                              placeholder="Enter socket data type"
                              value={field.type}
                              onChange={(e) =>
                                handleFieldChange(index, "type", e.target.value)
                              }
                              required
                            />
                          </FloatingLabel>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          className="mt-4"
                          onClick={() => handleRemoveField(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button
                    variant="primary"
                    className="m-2"
                    onClick={handleAddField}
                  >
                    Add A Socket
                  </Button>
                </Col>
                <Col></Col>
              </Row>
              <Button variant="primary" className="m-2" type="submit">
                Add Product Type
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddProductType;
