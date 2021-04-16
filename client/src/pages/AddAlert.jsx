import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function AddAlert() {
  let [addAlert, setAddAlert] = useState({
    level: "",
    color: "light",
    name: "",
    measures: "",
    region:{}
  });
  function onChange(e) {
    let name = e.target.name;
    console.log(name, e.target.value )
    setAddAlert({ ...addAlert, [name]: e.target.value });
  }
  return (
    <div className="crudContainer">
      <CrudTitle
        title="Add Alert 🏥"
        subTitle="Add an alert"
      />
      <Alert variant={addAlert.color}>
      <Form>
      <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select Region</Form.Label>
          <Form.Control onChange={onChange}  value={addAlert.region} as="select">
            {regions.map((x, i) => {
              return <option name="region" key={i} value={x.id}>{x.name}</option>
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Level</Form.Label>
          <Form.Control value={addAlert.level} name="level" onChange={onChange}type="text" placeholder="Warning, Danger..." />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Colors</Form.Label>
          <Form.Control name="color" onChange={onChange} value={addAlert.color} as="select">
            {colors.map((x, i) => {
              return <option key={i} value={x}>{x}</option>
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control value={addAlert.name} name="name" onChange={onChange}type="text"/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Measures</Form.Label>
          <Form.Control value={addAlert.measures} name="measures" onChange={onChange}type="text" />
        </Form.Group>
        <Button>Add</Button>
      </Form>
      </Alert>
    </div>
  );
}

let regions = [{id:1, name:'reg1'}, {id:2, name:'reg2'}]
let colors = ['primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark']
export default AddAlert;
