import React, { useState } from "react";
import GroupZoneCard from "../components/GroupZoneCard";
import { Button, Modal } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function GroupZoneCrud() {
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
        title="GroupZone 👪"
        subTitle="Add, delete, edit and view"
        addAction={() => setIsAdd(true)}
      />
      {tempData.map((x, i) => {
        return <GroupZoneCard mode="none" key={i} {...x} />;
      })}
      <Modal show={isAdd} onHide={() => setIsAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New GroupZone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupZoneCard {...facility} mode="add"/>
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

export default GroupZoneCrud;

const tempData = [
  {
    id: "1",
    type: "private"
  },
  {
    id: "2",
    type: "public"
  },
];
