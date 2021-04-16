import React, { useState } from "react";
import FacilityCard from "../components/FacilityCard";
import { Button, Modal } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function FacilityCrud() {
  const [isAdd, setIsAdd] = useState(false);
  let [facility, setFacility] = useState({
    id: "",
    name: "",
    telephone: "",
    url: "",
    type: ""
  });

  return (
    <div className="crudContainer">
      <CrudTitle
        title="Facility 🏥"
        subTitle="Add, delete, edit and view"
        addAction={() => setIsAdd(true)}
      />
      {tempData.map((x, i) => {
        return <FacilityCard mode="none" key={i} {...x} />;
      })}
      <Modal show={isAdd} onHide={() => setIsAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FacilityCard {...facility} mode="add"/>
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

export default FacilityCrud;

const tempData = [
  {
    id: "1",
    name: "Saint Marry",
    telephone: "7387 2947284",
    url: "www.com@gmai",
    type: "private"
  },
  {
    id: "2",
    name: "Saint Joe's",
    telephone: "73872844",
    url: "www.com@gmai",
    type: "public"
  },
];
