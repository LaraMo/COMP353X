import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function WorkersPerFacility() {
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
    fetch("http://localhost:3001/getWorkersPerFacility?id=" + chosen.value)
      .then((response) => response.json())
      .then((data) => setData(data.data));
  }


  return (
    <div className="crudContainer">
      <CrudTitle
        title="Workers per Facility 🏥"
        subTitle="View all workers per a chosen facility"
      />
      <Dropdown
        options={listOfFacilities}
        onChange={(x) =>
          setChosen({label: x.label, value: x.value})
        }
        value={chosen.label? chosen :{label: "Choose", value: ""}}
        placeholder="Select an option"
      />
      {data[0]?
            <Card className="marginBottom">
              <Card.Header>
                {data[0].facility}
                <small> 👩‍⚕️ {data[0].workers.split(",").length} people work here</small>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {data[0].workers.split(",").map(x => {
                    return <div>{x}</div>
                  })}
                </Card.Text>
              </Card.Body>
            </Card>
            :
            <span>No current workers<br/></span>
        }
        <Button onClick={search}>Search</Button>
    </div>
  );
}

export default WorkersPerFacility;
