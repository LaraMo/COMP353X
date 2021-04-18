import React, { useEffect, useState } from "react";
import GroupZoneCard from "../components/GroupZoneCard";
import { Button, Modal } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function GroupZoneCrud() {
  const [isAdd, setIsAdd] = useState(false);
  let [groupZone, setGroupZone] = useState([]);
  let [addGroupZone, setAddGroupZone] = useState();

  useEffect(() => {
    fetch('http://localhost:3001/selectGz')
    .then(response => response.json())
    .then(data => setGroupZone(data.data))
  })


  function add() {
    fetch('http://localhost:3001/addGz', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({type: addGroupZone.type}),
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
        title="GroupZone 👪"
        subTitle="Add, delete, edit and view"
        addAction={() => setIsAdd(true)}
      />
      {groupZone.map((x, i) => {
        return <GroupZoneCard mode="none" key={i} {...x} />;
      })}
      <Modal show={isAdd} onHide={() => setIsAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New GroupZone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupZoneCard addGroupZone={addGroupZone}  setAddGroupZone={setAddGroupZone} mode="add"/>
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

export default GroupZoneCrud;