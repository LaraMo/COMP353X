import React, { useState } from "react";
import '../../scss/personCard.scss';
import '../../scss/app.scss';
import PersonCard from "../PersonCard";
import { Button, Modal } from "react-bootstrap";

function PersonCrud() {
  const [isAdd, setIsAdd] = useState(false)
  let [person, setPerson]=useState(
    {id: "", first: "", last: "", dob: "", med: "", telephone: "", 
        address: "", provice: "",
    email: "" , isInfected: false, postalCode: ""});
let {id, first, last, dob, med, telephone, address, province, email, isInfected, postalCode} = person;
  return (
    <div className="personCardContainer">
      <div className="personCard-title">
        <div>
          <h1>Person 🧍</h1>
          <p style={{color: 'gray'}}>Add, delete, edit and view people in our database</p>
        </div>
        <Button onClick={()=>setIsAdd(true)}>Add</Button>
      </div>
     
      <hr/>
      {tempData.map((x, i) => {
        return <PersonCard mode="none" key={i} {...x}/>
      })}
      
      <Modal show={isAdd} onHide={()=> setIsAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PersonCard {...person} mode="add"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setIsAdd(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> setIsAdd(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PersonCrud;


const tempData = [
  {
    id: '1',
    first: 'Layla',
    last: 'Manoo',
    dob: '16/31/44',
    med: '349-23-2444',
    telephone:'439-435-222',
    address: 'Maple Street 35',
    provice:'QC',
    email:'Layla@gmail.com',
    isInfected: true,
    postalCode: 'H38-WH2'
  },
  {
    id: '2',
    first: 'Layla',
    last: 'Manoo',
    dob: '16/31/44',
    med: '349-23-2444',
    telephone:'439-435-222',
    address: 'Maple Street 35',
    provice:'QC',
    email:'Layla@gmail.com',
    isInfected: false,
    postalCode: 'H38-WH2'
  },
  {
    id: '3',
    first: 'Layla',
    last: 'Manoo',
    dob: '16/31/44',
    med: '349-23-2444',
    telephone:'439-435-222',
    address: 'Maple Street 35',
    provice:'QC',
    email:'Layla@gmail.com',
    isInfected: false,
    postalCode: 'H38-WH2'
  }
]