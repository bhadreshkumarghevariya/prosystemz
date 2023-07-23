import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const FormControl = (props) => {
  return (
    <Form.Group controlId={props.controlId} className="my-3">
      <FloatingLabel
        controlId={props.controlId}
        label={props.label}
        className={props.className + "m-3"}
      >
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
        />
      </FloatingLabel>
    </Form.Group>
  );
};

export default FormControl;
