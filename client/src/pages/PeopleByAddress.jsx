import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function PeopleByAddress() {
  let [address, setAddress] = useState();
  let [results, setResults] = useState([]);

  function search() {
    fetch("http://localhost:3001/peopleByAddress?address=" + address)
      .then((response) => response.json())
      .then((data) => setResults(data.data));
  }

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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        {results.map((x) => {
          return (
            <Card className="marginBottom">
              {console.log(x)}
              <small>{x.parent1 && x.parent2 && <span>Child of: {x.parent1} and {x.parent2}</span>}</small>
              <Card.Header>
                {x.first_name} {x.last_name} -{" "}
                <span style={{ color: "blue" }}>#{x.medicare_number}</span>{" "}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Email: {x.email_address}
                  <br />
                  Phone: {x.telephone_number}
                  <br />
                  DOB: {new Date(x.date_of_birth).toLocaleDateString()}
                  <br />
                  Citizenship: {x.citizenship}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
        <Button onClick={search}>Search</Button>
      </Form>
    </div>
  );
}

export default PeopleByAddress;
