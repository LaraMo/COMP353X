import React, { useState } from "react";
import {
  Alert,
  Button,
  Card as CardContainer,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { Briefcase, Calendar, Frown, Home, Mail, Phone, Smile, X } from "react-feather";

export default function PersonCard(props) {
  let [isEdit, setIsEdit] = useState(props.mode === "add");
  let [person, setPerson] = useState({
    id: props.id,
    first: props.first,
    last: props.last,
    dob: props.dob,
    med: props.med,
    telephone: props.telephone,
    address: props.address,
    province: props.province,
    email: props.email,
    isInfected: props.isInfected,
    postalCode: props.postalCode,
    isPhw: props.isPhw,
    startDate: props.startDate,
    endDate: props.endDate,
    schedual: props.schedual,
    facility: props.facility
  });
  let {
    id,
    first,
    last,
    dob,
    med,
    telephone,
    address,
    province,
    email,
    isInfected,
    postalCode,
    isPhw,
    startDate,
    endDate,
    schedual,
    facility
  } = person;
  let { mode } = props;
  function onChange(e) {
    let name = e.target.name;
    setPerson({ ...person, [name]: e.target.value });
  }
  return (
    <CardContainer>
      <CardContainer.Header className="title">
        <div>
          Card#
          <input
            name="med"
            onChange={onChange}
            value={med}
            readOnly={!isEdit}
          />
        </div>
        {mode !== "add" && <X />}
      </CardContainer.Header>
      {mode === "add" ? (
        <div class="crudContainer-isInfected">
          <input type="checkbox" onChange={() => {}} value={isInfected} />
          {/* todo event */}
          <label>Is Infected</label>
        </div>
      ) : (
        <Alert key={id} variant={isInfected ? "danger" : "success"}>
          {isInfected ? (
            <>
              <Frown /> Infected{" "}
            </>
          ) : (
            <>
              <Smile /> Not infected
            </>
          )}
        </Alert>
      )}

      <CardContainer.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              First
            </Form.Label>
            <Col sm="10">
              <input
                name="first"
                onChange={onChange}
                value={first}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Last
            </Form.Label>
            <Col sm="10">
              <input
                name="last"
                onChange={onChange}
                value={last}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <Calendar /> DOB
            </Form.Label>
            <Col sm="10">
              <input
                name="dob"
                onChange={onChange}
                value={dob}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <Phone /> Phone
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
              <Mail /> Email
            </Form.Label>
            <Col sm="10">
              <input
                name="email"
                onChange={onChange}
                value={email}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <Home /> Address
            </Form.Label>
            <Col sm="10">
              <input
                sie="3"
                name="address"
                onChange={onChange}
                value={address}
                readOnly={!isEdit}
              />
              <input
                size="1"
                name="province"
                onChange={onChange}
                value={province}
                readOnly={!isEdit}
              />
              <input
                size="6"
                name="postalCode"
                onChange={onChange}
                value={postalCode}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          {isPhw && (
            <Alert variant="primary">
              <Alert.Heading>Public health care worker info</Alert.Heading>
              <p>
                {first && last && <p> is a public health care worker</p>}
              </p>
              <hr />
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Calendar /> Start date
                </Form.Label>
                <Col sm="10">
                  <input
                    sie="3"
                    name="startDate"
                    onChange={onChange}
                    value={startDate}
                    readOnly={!isEdit}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Calendar /> End date
                </Form.Label>
                <Col sm="10">
                  <input
                    sie="3"
                    name="endDate"
                    onChange={onChange}
                    value={endDate}
                    readOnly={!isEdit}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Calendar /> Schedual
                </Form.Label>
                <Col sm="10">
                  <input
                    sie="3"
                    name="schedual"
                    onChange={onChange}
                    value={schedual}
                    readOnly={!isEdit}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Briefcase /> Works at
                </Form.Label>
                <Col sm="10">
                  <input
                    sie="3"
                    name="facility"
                    onChange={onChange}
                    value={facility}
                    readOnly={!isEdit}
                  />
                </Col>
              </Form.Group>
            </Alert>
          )}
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
