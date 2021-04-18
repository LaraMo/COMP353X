import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function AddAlert() {
  let [regions, setRegions] = useState([])
  let [addAlert, setAddAlert] = useState({
    message: "",
    region: '',
  });

  
  function add() {
    fetch('http://localhost:3001/addAlert', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...addAlert}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetch('http://localhost:3001/selectRegion')
    .then(response => response.json())
    .then(data => setRegions(data.data.map(x => {
      return {value: x.id, label: x.name}
    })
  ))})

  return (
    <div className="crudContainer">
      <CrudTitle title="Add Alert ⚠️" subTitle="Add an alert" />        
      <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Region</Form.Label>
            {regions && 
                          <Dropdown
                          options={regions}
                          onChange={(x)=>setAddAlert({...addAlert,region:x})}
                          value={addAlert.region}
                          placeholder="Select an option"
                        />
            }
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              value={addAlert.message}
              name="message"
              onChange={(e)=>setAddAlert({...addAlert, message: e.target.value})}
              type="text"
            />
          </Form.Group>
          <Button onClick={add}>Add</Button>
        </Form>
    </div>
  );
}

export default AddAlert;
