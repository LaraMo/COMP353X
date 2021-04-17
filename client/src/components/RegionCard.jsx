import React, { useState } from "react";
import {
  Button,
  Card as CardContainer,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { X } from "react-feather";
import { alerts } from "../data/alert";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

export default function RegionCard(props) {
  let [isEdit, setIsEdit] = useState(props.mode === "add");
  let [region, setRegion] = useState({
    id: props.id,
    name: props.name,
    color: props.color,
    level: props.level,
  });

  let { id, name, color, level } = region;
  let { mode } = props;

  function editRegion() {
    fetch("http://localhost:3001/editRegion", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ region_name: name, alert_id: level, id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function onChange(e) {
    let name = e.target.name;
    console.log(name, e.target.value)
    setRegion({ ...region, [name]: e.target.value });
  }
  function deleteRegion() {
    fetch("http://localhost:3001/deleteRegion", {
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
        {mode !== "add" && <X onClick={deleteRegion}/>}
      </CardContainer.Header>
      <CardContainer.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <input
                name="name"
                onChange={(e) => mode ==="add" ? 
                props.setAddRegion({ ...props.addRegion, name: e.target.value })
                : onChange(e)}
                value={name}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          {!isEdit ? (
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Alert Level
              </Form.Label>
              <Col sm="10">
                <div style={{ background: `${alerts[level - 1].color}` }}>
                  {level}-{alerts[level - 1].desc}
                </div>
              </Col>
            </Form.Group>
          ) : (
            <Form.Group as={Row}>
            <Form.Label column sm="2">
              Alert Level
            </Form.Label>
            <Col sm="10">
              <Dropdown options={alerts}
              onChange={
                (x) => {
                  console.log(x.value)
                mode === "add" ? 
                props.setAddRegion({ ...props.addRegion, level: x.value }): 
                setRegion({ ...region, level: x.value })
              }}
              value={mode==="add" ? props.addRegion.id: alerts[level - 1]} placeholder="Select an option" />
            </Col>
          </Form.Group>
          )}
        </Form>
      </CardContainer.Body>
      {mode !== "add" && (
        <div>
          {isEdit && (
            <Button
              onClick={() => {
                setIsEdit(false);
                editRegion();
              }}
              variant="primary"
            >
              Save
            </Button>
          )}
          {!isEdit && (
            <Button onClick={() => setIsEdit(true)} variant="primary">
              Edit
            </Button>
          )}
        </div>
      )}
    </CardContainer>
  );
}
