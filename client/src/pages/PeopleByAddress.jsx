import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PersonCard from "../components/PersonCard";
import CrudTitle from "../molecules/CrudTitle";


function PeopleByAddress() {
    let[search, setSearch] = useState();
  return (
    <div className="crudContainer">
    <CrudTitle
        title="Search for people 🕵️"
        subTitle="Search for people by their address"
      />
    <Form>
      <Form.Group size="lg" controlId="user">
        <Form.Label>Search by address</Form.Label>
        <Form.Control
          autoFocus
          type="user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </Form.Group>
        {tempData.map(x => {
           return <PersonCard mode="view" isPhw={false} {...x}/>
        })}
    </Form>
    </div>
  );
}


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
      father: "Jim Morris",
      mother: "Maya Jaejo"
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
      father: "Maod Morris",
      mother: "Kopr Jaejo"
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
      father: "Priyapus Morris",
      mother: "Date Jaejo"
    },
  ];
  

export default PeopleByAddress;
