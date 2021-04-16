import React, { useState } from "react";
import {
  Button,
  Card as CardContainer,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { X } from "react-feather";

export default function RegionCard(props) {
  let [isEdit, setIsEdit] = useState(props.mode === "add");
  let [region, setRegion] = useState({
    id: props.id,
    city: props.city,
    postalCode: props.postalCode,
  });
  let {
    id,
    city,
    postalCode,
  } = region;

  let { mode } = props;
  function onChange(e) {
    let name = e.target.name;
    setRegion({ ...region, [name]: e.target.value });
  }
  return (
    <CardContainer>
      <CardContainer.Header className="title">
        <div></div>
        {mode !== "add" && <X />}
      </CardContainer.Header>
      <CardContainer.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              City
            </Form.Label>
            <Col sm="10">
              <input
                name="city"
                onChange={onChange}
                value={city}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
             Postal Code
            </Form.Label>
            <Col sm="10">
              <input
                name="postalCode"
                onChange={onChange}
                value={postalCode}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
        </Form>
      </CardContainer.Body>
      {mode !== "add" && (
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
      )}
    </CardContainer>
  );
}
