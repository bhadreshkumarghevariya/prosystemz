import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useCreateProductType } from "../hooks/useCreateProductType";
import Header from "../components/Header";

const AddProductType = ({ onSubmit }) => {
  const [productTypeName, setProductTypeName] = useState("");
  const [customFields, setCustomFields] = useState([]);
  const { createProductType, data, loading, error } = useCreateProductType();

  const handleAddField = () => {
    setCustomFields([...customFields, { name: "", type: "" }]);
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
      console.log(productTypeName);
      const productType = {
        productTypeName,
      };
      console.log(customFields);
      const response = await createProductType({
        variables: {
          productType,
          customFields,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="text-center mt-5">
        <Card className="shadow">
          <Card.Body>
            <Card.Title>Add Product Type</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col></Col>
                <Col className="m-2" xs={8}>
                  <Form.Group>
                    <Form.Label>Product Type Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter product type name"
                      value={productTypeName}
                      onChange={(e) => setProductTypeName(e.target.value)}
                      required
                    />
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
                        <Form.Group>
                          <Form.Label>Socket Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter socket name"
                            value={field.name}
                            onChange={(e) =>
                              handleFieldChange(index, "name", e.target.value)
                            }
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Socket Type</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter socket data type"
                            value={field.type}
                            onChange={(e) =>
                              handleFieldChange(index, "type", e.target.value)
                            }
                            required
                          />
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
