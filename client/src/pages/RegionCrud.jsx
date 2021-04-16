import React, { useState } from "react";
import RegionCard from "../components/RegionCard";
import { Button, Modal } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function RegionCrud() {
  const [isAdd, setIsAdd] = useState(false);
  let [region, setRegion] = useState({
    id: "",
    city: "",
    postalCode: "",
  });

  return (
    <div className="crudContainer">
      <CrudTitle
        title="Region 🗺️"
        subTitle="Add, delete, edit and view"
        addAction={() => setIsAdd(true)}
      />
      {tempData.map((x, i) => {
        return <RegionCard mode="none" key={i} {...x} />;
      })}
      <Modal show={isAdd} onHide={() => setIsAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Region</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegionCard {...region} mode="add"/>
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

export default RegionCrud;

const tempData = [
  {
    id: "1",
    city: "Montreal",
    postalCode: "H3J H2J"
  },
  {
    id: "2",
    city: "Laval",
    postalCode: "8H3 S9N"
  },
];
