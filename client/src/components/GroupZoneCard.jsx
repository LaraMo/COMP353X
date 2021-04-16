import React, { useState } from "react";
import {
  Button,
  Card as CardContainer,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { X } from "react-feather";

export default function GroupZoneCard(props) {
  let [isEdit, setIsEdit] = useState(props.mode === "add");
  let [groupZone, setGroupZone] = useState({
    id: props.id,
    type: props.type,
  });
  let {
    id,
    type,
  } = groupZone;

  let { mode } = props;
  function onChange(e) {
    let name = e.target.name;
    setGroupZone({ ...groupZone, [name]: e.target.value });
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
