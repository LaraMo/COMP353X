import React, { useState } from "react";
import { Button, Card as CardContainer, Col, Form, Row } from "react-bootstrap";
import { X } from "react-feather";

export default function FacilityCard(props) {
  let [isEdit, setIsEdit] = useState(props.mode === "add");
  let [facility, setFacility] = useState({
    id: props.id,
    name: props.name,
    telephone: props.telephone,
    url: props.url,
    type: props.type,
    isDrive: props.isDrive,
    numberHealthCareWorkers: props.numberHealthCareWorkers,
    appointementType: props.appointementType,
  });
  let { id, name, telephone, url, type, isDrive, appointementType, numberHealthCareWorkers } = facility;

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
        {mode === "none" && <X />}
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
                name="appointementType"
                onChange={onChange}
                value={appointementType}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Is drivethought
            </Form.Label>
            <Col sm="10">
              {isEdit?
                <input
                type="checkbox"
                readOnly={!isEdit}
                onChange={onChange}
                value={isDrive}
              />
              :
              <div>{isDrive ==="checked" ? "yes":"no"}</div>
              }
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
          {mode === "detailed" &&
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Number Health Care Workers
            </Form.Label>
            <Col sm="10">
              <input
                name="numberHealthCareWorkers"
                value={numberHealthCareWorkers}
                readOnly
              />
            </Col>
          </Form.Group>
          }
        </Form>
      </CardContainer.Body>
      {mode === "none" && (
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
