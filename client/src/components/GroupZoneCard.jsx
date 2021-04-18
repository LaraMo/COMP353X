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

  function editGroupZone() {
    fetch("http://localhost:3001/editGz", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: type, id:id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteGroupZone() {
    fetch("http://localhost:3001/deleteGz", {
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
  return (
    <CardContainer>
      <CardContainer.Header className="title">
        <div></div>
        {mode !== "add" && <X onClick={deleteGroupZone}/>}
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
                onChange={(e) => mode ==="add" ? 
                props.setAddGroupZone({ ...props.addGroupzone, type: e.target.value })
                : onChange(e)}
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
            <Button onClick={() => {setIsEdit(false); editGroupZone()}} variant="primary">
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
