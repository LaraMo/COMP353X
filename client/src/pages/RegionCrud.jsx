import React, { useEffect, useState } from "react";
import RegionCard from "../components/RegionCard";
import { Button, Modal } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";
import { alerts } from "../data/alert";

function RegionCrud() {
  const [isAdd, setIsAdd] = useState(false);
  let [region, setRegion] = useState([]);
  let [addRegion, setAddRegion] = useState({level:1, name:""});

  useEffect(() => {
    fetch('http://localhost:3001/selectRegion')
    .then(response => response.json())
    .then(data => setRegion(data.data))
  })


  function add() {
    fetch('http://localhost:3001/addRegion', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({region_name: addRegion.name, alert_id: addRegion.level}),
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
        title="Region 🗺️"
        subTitle="Add, delete, edit and view"
        addAction={() => setIsAdd(true)}
      />
      {region.map((x, i) => {
        return <RegionCard mode="none" key={i} {...x} />;
      })}
      <Modal show={isAdd} onHide={() => setIsAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Region</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegionCard {...region} addRegion={addRegion} setAddRegion={setAddRegion} mode="add"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsAdd(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {add(); setIsAdd(false)}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RegionCrud;

