import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PHCRCard from "../components/PHCRCard";
import CrudTitle from "../molecules/CrudTitle";

function PublicHealthCareRecsCrud() {
  const [isAdd, setIsAdd] = useState(false);
  let [publicHealthRec, setPublicHealthRec] = useState([]);
  let [addPHCR, setAddPHCR] = useState([]);



  function add() {
    fetch('http://localhost:3001/addPHRecs', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({reccomendation_text: addPHCR.reccomendation, substeps: addPHCR.steps.split("|")}),
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
    fetch('http://localhost:3001/selectPHRecs')
    .then(response => response.json())
    .then(data => setPublicHealthRec(data.data))
  })

  return (
    <div className="crudContainer">
      <CrudTitle
        title="Public Health Care Recs ✔️"
        subTitle="Add, delete, edit and view"
        addAction={() => setIsAdd(true)}
      />
      {publicHealthRec.map((x, i) => {
        return <PHCRCard mode="none" key={i} {...x} />;
      })}
        <Modal show={isAdd} onHide={() => setIsAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Public Health Care Rec.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <PHCRCard {...publicHealthRec} addPHCR={addPHCR} setAddPHCR={setAddPHCR} mode="add"/>
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


export default PublicHealthCareRecsCrud;
