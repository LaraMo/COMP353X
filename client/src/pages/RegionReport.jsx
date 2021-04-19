import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { Alert, Card, Button, Col, Form } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";
import moment from "moment";
moment().format();
function DatePeopleSymptoms() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [results, setResults] = useState([]);

  function search() {
    let start = startDate
      ? new Date(startDate).toISOString().slice(0, 10) +
        " " +
        new Date(startDate).toLocaleTimeString()
      : "";
    let end = endDate
      ? new Date(endDate).toISOString().slice(0, 10) +
        " " +
        new Date(endDate).toLocaleTimeString()
      : "";

    fetch(
      "http://localhost:3001/regionReport?start_date=" +
        start +
        "&end_date=" +
        end
    )
      .then((response) => response.json())
      .then((data) => setResults(data.data[0]));
  }

  return (
    <div className="crudContainer">
      <CrudTitle title="Region Report ✍️" subTitle="Report about the region" />
      <Form.Group>
        <Form.Group as={Col}>
          <Form.Label column sm="2">
            Start date
          </Form.Label>
          <DateTimePicker onChange={(v) => setStartDate(v)} value={startDate} />
        </Form.Group>
      </Form.Group>

      <Form.Group>
        <Form.Group as={Col}>
          <Form.Label column sm="2">
            End date
          </Form.Label>
          <DateTimePicker onChange={(v) => setEndDate(v)} value={endDate} />
        </Form.Group>
      </Form.Group>
      {results.regName && (
        <Card className="marginBottom">
          <Card.Header>About {results.regName}</Card.Header>
          <Card.Body>
            <Card.Text>
              Healthy: {results.healthy}
              <br />
              Infected: {results.infected}
              <br />
              Region: {results.regName}
              <br />
            </Card.Text>
            {results.allmessages.split("|").map((x) => {
              return <Alert variant="info">{x}</Alert>;
            })}
          </Card.Body>
        </Card>
      )}
      <Button onClick={search}>Search</Button>
    </div>
  );
}

export default DatePeopleSymptoms;
