import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function FollowUpFormContainer(props) {
  const [symptomes, setSymptomes] = useState([]);
  const [formStatus, setFormSetup] = useState({ temperature: "", other: "", symptoms:"", id:props.id});
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
    fetch("http://localhost:3001/followUpForm", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formStatus, symptoms: Object.keys(formStatus.symptoms)}),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success){
          props.onSubmit();
        }
        else {
          alert("Error submiting form")
        } 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  }

  return (
    <Form>
      {/* what to do about date and time?! */}
      <Form.Group size="lg" controlId="user">
        <Form.Label>Temperature</Form.Label>
        <Form.Control
          autoFocus
          type="number"
          name="temperature"
          value={formStatus.temperature}
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
                    delete formStatus.symptoms[e.target.name]
                  }
                  else{ 
                    setFormSetup({ ...formStatus, symptoms: {...formStatus.symptoms, [e.target.name]: e.target.checked }})
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
