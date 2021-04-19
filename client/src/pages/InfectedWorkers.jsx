import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DatePicker from "react-date-picker";

function InfectedWorkers() {
  let [listOfFacilities, setListOfFacilities] = useState([]);
  let [chosen, setChosen] = useState([]);
  let [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/selectFacility")
      .then((response) => response.json())
      .then((data) =>
        setListOfFacilities(
          data.data.map((x) => {
            return { value: x.id, label: x.name };
          })
        )
      );
  });

  function search() {
    let date = new Date(chosen.date).toISOString().slice(0, 10);
    fetch(
      "http://localhost:3001/infcetedWorkers?id=" +
        chosen.value +
        "&date=" +
        date
    )
      .then((response) => response.json())
      .then((data) => setData(data.data));
  }

  return (
    <div className="crudContainer">
      <CrudTitle
        title="Infected Workers 🧪"
        subTitle="View all workers and their colleauges sorted by date and facility"
      />
      <Dropdown
        options={listOfFacilities}
        onChange={(x) => setChosen({ label: x.label, value: x.value })}
        value={chosen.label ? chosen : { label: "Choose", value: "" }}
        placeholder="Select an option"
      />
      <DatePicker
        onChange={(v) => setChosen({ ...chosen, date: v })}
        value={chosen.date}
      />
      {data &&
        data.map((x) => {
          return (
            <Card className="marginBottom">
              <Card.Header>
                {x["infected first name"]} {x["infected last name"]}
                <br/>
                <small>
                <span>
                  Tested at: <span style={{ color: "blue" }}>{x.tested_at_facility}</span>
                </span>
                </small>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Works at: {x.works_at_facility}
                  <br/>
                  Workers with: {x["Infected Colleagues"]}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      <Button onClick={search}>Search</Button>
    </div>
  );
}

export default InfectedWorkers;
