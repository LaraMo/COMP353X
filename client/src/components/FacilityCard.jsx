import React, { useState } from "react";
import { Button, Card as CardContainer, Col, Form, Row } from "react-bootstrap";
import { X } from "react-feather";

export default function FacilityCard(props) {
  let [isEdit, setIsEdit] = useState(props.mode === "add");
  let [facility, setFacility] = useState({
    id: props.id,
    name: props.name,
    phone_number: props.phone_number,
    web_address: props.web_address,
    type: props.type,
    has_drivethrough: props.has_drivethrough,
    numberHealthCareWorkers: props.numberHealthCareWorkers,
    appointment_type: props.appointment_type,
    address: props.address
  });
  let { id, name, phone_number, web_address, type, has_drivethrough, address, appointment_type, numberHealthCareWorkers } = facility;

  function editFacility() {
    fetch("http://localhost:3001/editFacility", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...facility}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteFacility() {
    fetch("http://localhost:3001/deleteFacility", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
            onChange={(e) => mode ==="add" ? 
            props.setAddFacility({ ...props.addFacility, name: e.target.value })
            : onChange(e)} 
            value={name}
            readOnly={!isEdit}
          />
        </div>
        {mode === "none" && <X onClick={deleteFacility} />}
      </CardContainer.Header>
      <CardContainer.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Phone
            </Form.Label>
            <Col sm="10">
              <input
                name="phone_number"
                onChange={(e) => mode ==="add" ? 
                props.setAddFacility({ ...props.addFacility, phone_number: e.target.value })
                : onChange(e)}
                value={phone_number}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
             Web Address
            </Form.Label>
            <Col sm="10">
              <input
                name="web_address"
                onChange={(e) => mode ==="add" ? 
                props.setAddFacility({ ...props.addFacility, web_address: e.target.value })
                : onChange(e)} 
                value={web_address}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
            Appointment type
            </Form.Label>
            <Col sm="10">
              <input
                name="appointment_type"
                onChange={(e) => mode ==="add" ? 
                props.setAddFacility({ ...props.addFacility, appointment_type: e.target.value })
                : onChange(e)}
                value={appointment_type}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
             Has Drivethrough
            </Form.Label>
            <Col sm="10">
              {isEdit?
                <input
                type="checkbox"
                readOnly={!isEdit}
                onChange={(e) => mode ==="add" ? 
                props.setAddFacility({ ...props.addFacility, has_drivethrough: e.target.checked })
                : setFacility({ ...facility, has_drivethrough: e.target.checked })}
                checked={has_drivethrough}
              />
              :
              <div>{has_drivethrough ? "yes":"no"}</div>
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
                onChange={(e) => mode ==="add" ? 
                props.setAddFacility({ ...props.addFacility, type: e.target.value })
                : onChange(e)}
                value={type}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Address
            </Form.Label>
            <Col sm="10">
              <input
                name="address"
                onChange={(e) => mode ==="add" ? 
                props.setAddFacility({ ...props.addFacility, address: e.target.value })
                : onChange(e)}
                value={address}
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
            <Button onClick={() => {setIsEdit(false);editFacility()}} variant="primary">
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
