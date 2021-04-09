import React, { useState } from "react";
import PersonCard from "../components/PersonCard";
import { Button, Modal } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function PersonCrud() {
  const [isAdd, setIsAdd] = useState(false)
  let [person, setPerson]=useState(
    {id: "", first: "", last: "", dob: "", med: "", telephone: "", 
        address: "", provice: "",
    email: "" , isInfected: false, postalCode: ""});
  return (
    <div className="personCardContainer">
      <CrudTitle
        title="Person 🧍"
        subTitle="Add, delete, edit and view people in our database"
        addAction={()=>setIsAdd(true)}
      />     
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
            Add           
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
      //   <Modal 
      //   show={isAdd} 
      //   title="Add New Person"
      //   closeAction={()=> setIsAdd(false)}
      //   addAction={()=> setIsAdd(false)}
      //   >
      //     <PersonCard {...person} mode="add"/>
      // </Modal>
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