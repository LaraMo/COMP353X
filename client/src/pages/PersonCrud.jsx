import React, { useEffect, useState } from "react";
import PersonCard from "../components/PersonCard";
import { Button, Modal } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function PersonCrud(props) {
  const isPhw = props.phw;
  const [isAdd, setIsAdd] = useState(false);
  let [addPerson, setAddPerson] = useState();
  let [person, setPerson] = useState([]);


  function add() {
    console.log(addPerson)
    fetch('http://localhost:3001/addPerson', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...addPerson, date_of_birth: new Date(addPerson.date_of_birth).toISOString().slice(0, 10)}),
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
    fetch('http://localhost:3001/selectPerson')
    .then(response => response.json())
    .then(data => setPerson(data.data))
  })

  return (
    <div className="crudContainer">
      <CrudTitle
        title={isPhw ? "Public Health worker ⚕️" : "Person 🧍"}
        subTitle="Add, delete, edit and view"
        addAction={() => setIsAdd(true)}
      />
      {person.map((x, i) => {
        return <PersonCard mode="none" key={i} {...x} />;
      })}
      <Modal show={isAdd} onHide={() => setIsAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PersonCard addPerson={addPerson} setAddPerson={setAddPerson} mode="add" isPhw={isPhw}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsAdd(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {add();setIsAdd(false)}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PersonCrud;