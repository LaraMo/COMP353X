import React, { useState } from "react";
import {
  Button,
  Card as CardContainer,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { X } from "react-feather";

export default function PHCRCard(props) {
  let [isEdit, setIsEdit] = useState(props.mode === "add");
  let [phcr, setPhcr] = useState({
    id: props.id,
    title: props.title,
    step: props.steps,
  });
  let {
    id,
    title,
    step,
  } = phcr;

  function onChange(e) {
    let name = e.target.name;
    setPhcr({ ...phcr, [name]: e.target.value });
  }
  return (
    <CardContainer>
      <CardContainer.Header className="title">
        <div></div>
        <X />
      </CardContainer.Header>
      <CardContainer.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <input
                name="title"
                onChange={onChange}
                value={title}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
             Steps
            </Form.Label>
            <Col sm="10">
              {step.map((x, i) => {
                return ( <div className="mb-10 d-flex align-items-center">
                <span>{i+1}. </span>
                <input
                name={`steps-${x}`}
                onChange={onChange}
                value={x}
                key={i}
                readOnly={!isEdit}
              />
              </div>)
              })}
            </Col>
          </Form.Group>
        </Form>
      </CardContainer.Body>
        <div>
          {isEdit && (
            <Button onClick={() => setIsEdit(false)} variant="primary">
              {" "}
              Save{" "}
            </Button>
          )}
          {!isEdit && (
            <Button onClick={() => setIsEdit(true)} variant="primary">
              {" "}
              Edit{" "}
            </Button>
          )}
        </div>
    </CardContainer>
  );
}
