import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function FollowUpFormContainer(props) {
  const [symptomes, setSymptomes] = useState([]);
  const [formStatus, setFormSetup] = useState({ fever: "", other: "", symptomes:""});
  function onChange(e) {
    let name = e.target.name;
    console.log(name, e.target.value);
    setFormSetup({ ...formStatus, [name]: e.target.value });
  }

  useEffect(() => {
    fetch("http://localhost:3001/selectSymptomes")
      .then((response) => response.json())
      .then((data) =>
        setSymptomes(
          data.data.map((x) => {
            return { value: x.id, label: x.symptom };
          })
        )
      );
  });

  function submit() {
    console.log(formStatus);
    // props.onSubmit
  }

  return (
    <Form>
      {/* what to do about date and time?! */}
      <Form.Group size="lg" controlId="user">
        <Form.Label>Temperature</Form.Label>
        <Form.Control
          autoFocus
          type="number"
          name="fever"
          value={formStatus.fever}
          onChange={onChange}
        />
      </Form.Group>
      {symptomes.map((x, i) => {
        return (
          <Form.Group key={i} controlId="formBasicCheckbox">
            <Form.Check
              onChange={(e) =>
                {
                  if(!e.target.checked){
                    delete formStatus.symptomes[e.target.name]
                  }
                  else{ 
                    setFormSetup({ ...formStatus, symptomes: {...formStatus.symptomes, [e.target.name]: e.target.checked }})
                  }
                }
              }
              type="checkbox"
              label={x.label}
              name={x.value}
            />
          </Form.Group>
        );
      })}
      <Form.Group size="lg" controlId="user">
        <Form.Label>Other</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          name="other"
          value={formStatus.other}
          onChange={onChange}
        />
        <small>Enter comma separated values</small>
      </Form.Group>
      <Button onClick={submit}>Submit</Button>
    </Form>
  );
}
