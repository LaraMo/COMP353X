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
    reccomendation: props.reccomendation,
    steps: props.steps,
  });
  let {
    id,
    reccomendation,
    steps,
  } = phcr;

  let { mode } = props;
  function onChange(e) {
    let name = e.target.name;
    setPhcr({ ...phcr, [name]: e.target.value });
  }
  return (
    <CardContainer>
      <CardContainer.Header className="title">
        <div></div>
        {mode === "none" && <X onClick={()=>{}}/>}
      </CardContainer.Header>
      <CardContainer.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <input
                name="reccomendation"
                onChange={(e) => mode ==="add" ? 
                props.setAddPHCR({ ...props.addPHCR, reccomendation: e.target.value })
                : onChange(e)}
                value={reccomendation}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          {steps &&
          <Form.Group as={Row}>
            <Form.Label column sm="2">
             Steps
            </Form.Label>
            <Col sm="10">
              {steps.map((x, i) => {
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
          </Form.Group>}
          {mode === "add" &&
          <Form.Group as={Row}>
            <Form.Label column sm="2">
             Steps
            </Form.Label>
            <Col sm="10">
              <small>Make sure to seperate all steps with a |</small>
                <input
                name={'steps'}
                onChange={(e) => props.setAddPHCR({ ...props.addPHCR, steps: e.target.value })} 
                value={steps}
              />
            </Col>
          </Form.Group>}
        </Form>
      </CardContainer.Body>
      {mode === "none" && (
        <div>
          {isEdit && (
            <Button onClick={() => {setIsEdit(false)}} variant="primary">
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
