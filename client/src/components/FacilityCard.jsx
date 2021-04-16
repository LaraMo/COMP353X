import React, { useState } from "react";
import {
  Button,
  Card as CardContainer,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { X } from "react-feather";

export default function FacilityCard(props) {
  let [isEdit, setIsEdit] = useState(props.mode === "add");
  let [facility, setFacility] = useState({
    id: props.id,
    name: props.name,
    telephone: props.telephone,
    url: props.url,
    type: props.type
  });
  let {
    id,
    name,
    telephone,
    url,
    type
  } = facility;

  let { mode } = props;
  function onChange(e) {
    let name = e.target.name;
    setFacility({ ...facility, [name]: e.target.value });
  }
  return (
    <CardContainer>
      <CardContainer.Header className="title">
        <div>
          <input
            name="name"
            onChange={onChange}
            value={name}
            readOnly={!isEdit}
          />
        </div>
        {mode !== "add" && <X />}
      </CardContainer.Header>
      <CardContainer.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Phone
            </Form.Label>
            <Col sm="10">
              <input
                name="telephone"
                onChange={onChange}
                value={telephone}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Url
            </Form.Label>
            <Col sm="10">
              <input
                name="url"
                onChange={onChange}
                value={url}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
             Type
            </Form.Label>
            <Col sm="10">
              <input
                name="type"
                onChange={onChange}
                value={type}
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
