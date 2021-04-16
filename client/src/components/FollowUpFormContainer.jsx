import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";

export default function FollowUpFormContainer(props) {
   const [formStatus, setFormSetup] = useState({fever:""});
   function onChange(e) {
    let name = e.target.name;
    console.log(name, e.target.value);
    setFormSetup({ ...formStatus, [name]: e.target.value });
  }
  return (
    <Form>
      {/* what to do about date and time?! */}
      <Form.Group size="lg" controlId="user">
        <Form.Label>Temperature</Form.Label>
        <Form.Control
          autoFocus
          type="fever"
          value={formStatus.fever}
          onChange={onChange}
        />
      </Form.Group>
      {symptomes.map((x, i) => {
      return <Form.Group key={i} controlId="formBasicCheckbox">
        <Form.Check onChange={onChange} type="checkbox" label={x} name={x}/>
      </Form.Group>
      })}
      <Button onClick={props.onSubmit}>
        Submit
      </Button>
    </Form>
  );
}


const symptomes = [
  "cough", "sneeze", "cold", "shevers"
]