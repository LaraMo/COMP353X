import React, { useEffect, useState } from "react";
import FacilityCard from "../components/FacilityCard";
import { Button, Modal } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function FacilityCrud() {
  const [isAdd, setIsAdd] = useState(false);
  let [facility, setFacility] = useState([]);
  let [addFacility, setAddFacility] = useState([]);


  
  useEffect(() => {
    fetch('http://localhost:3001/selectFacility')
    .then(response => response.json())
    .then(data => setFacility(data.data))
  })


  function add() {
    fetch('http://localhost:3001/addFacility', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...addFacility}),
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
    <div className="crudContainer">
      <CrudTitle
        title="Facility 🏥"
        subTitle="Add, delete, edit and view"
        addAction={() => setIsAdd(true)}
      />
      {facility.map((x, i) => {
        return <FacilityCard mode="none" key={i} {...x} />;
      })}
      <Modal show={isAdd} onHide={() => setIsAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FacilityCard addFacility={addFacility} setAddFacility={setAddFacility} {...facility} mode="add"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsAdd(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {setIsAdd(false);add()}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FacilityCrud;
