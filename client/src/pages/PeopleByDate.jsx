import React, { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { Frown, Smile } from "react-feather";
import PersonCard from "../components/PersonCard";
import CrudTitle from "../molecules/CrudTitle";

function PeopleByDate() {
  let [selected, setSelected] = useState();
  let [results, setResults] = useState([]);

  function search() {
    let date = new Date(selected).toISOString().slice(0, 10);
    fetch("http://localhost:3001/peopleByDate?date=" + date)
      .then((response) => response.json())
      .then((data) => setResults(data.data));
    console.log(results);
  }

  return (
    <div className="crudContainer">
      <CrudTitle
        title="Infected/Not Infected People 😷"
        subTitle="View list of people who are infected or not filtered by date"
      />
      <DatePicker onChange={(v) => setSelected(v)} value={selected} />
      {results.length === 0 && <span>No results found</span> }
      {results && results.map((x) => {
        return (
          <Card className="mb-10">
            <Card.Header className="title">
              {x.first_name} {x.last_name}
            </Card.Header>
            <Alert variant={x.is_infected ? "danger" : "success"}>
              {x.is_infected ? (
                <>
                  <Frown /> Infected{" "}
                </>
              ) : (
                <>
                  <Smile /> Not infected
                </>
              )}
            </Alert>
            <Card.Body>
              DOB: {new Date(x.date_of_birth).toLocaleDateString()}
              <br />
              Email Address: {x.email_address}
              <br />
              Phone Number: {x.telephone_number}
            </Card.Body>
          </Card>
        );
      })}
      <Button onClick={search}>Search</Button>
    </div>
  );
}

export default PeopleByDate;
