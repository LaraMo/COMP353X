import React, { useEffect, useState } from "react";
import PersonCard from "../components/PersonCard";
import { Button, Modal } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function PersonCrud(props) {
  const isPhw = props.phw;
  const [isAdd, setIsAdd] = useState(false);
  let [addPerson, setAddPerson] = useState();
  let [person, setPerson] = useState([]);


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
          <PersonCard {...person} mode="add" isPhw={isPhw}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsAdd(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setIsAdd(false)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PersonCrud;

const tempData = [
  {
    id: "1",
    first: "Layla",
    last: "Manoo",
    dob: "16/31/44",
    med: "349-23-2444",
    telephone: "439-435-222",
    address: "Maple Street 35",
    province: "QC",
    email: "Layla@gmail.com",
    isInfected: true,
    citizenship:"Canadian",
    postalCode: "H38-WH2",
  },
  {
    id: "2",
    first: "Layla",
    last: "Manoo",
    dob: "16/31/44",
    med: "349-23-2444",
    telephone: "439-435-222",
    address: "Maple Street 35",
    province: "QC",
    email: "Layla@gmail.com",
    isInfected: false,
    citizenship:"Canadian",
    postalCode: "H38-WH2",
  },
  {
    id: "3",
    first: "Layla",
    last: "Manoo",
    dob: "16/31/44",
    med: "349-23-2444",
    telephone: "439-435-222",
    address: "Maple Street 35",
    province: "QC",
    citizenship:"Canadian",
    email: "Layla@gmail.com",
    isInfected: false,
    isPhw: true,
    startDate: "16/31/44",
    endDate: "16/31/44",
    schedual: "Monday - Friday",
    facility: "Saint Marry",
    postalCode: "H38-WH2",
  },
];
