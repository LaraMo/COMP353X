import React, { useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import { Alert, Button, Col, Form, Card } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";
import Dropdown from "react-dropdown";



function DatePeopleSymptoms() {
const [chosen, setChosen]= useState({person_id:"", label: "",  date:""});
let [results, setResults]= useState([])
let[ people, setPeople] = useState([]);

useEffect(() => {
  fetch("http://localhost:3001/infectedPeople")
    .then((response) => response.json())
    .then((data) =>
    setPeople(
        data.data.map((x) => {
          return { value: x.id, label: x.first_name + " " + x.last_name };
        })
      )
    );
});


  function search(){
    let date = chosen.date? new Date(chosen.date).toISOString().slice(0, 10): '';
    fetch("http://localhost:3001/datePeopleSymptoms?id="+chosen.person_id+"&date="+date)
    .then((response) => response.json())
    .then((data) => setResults(data.data));
  }

  return (
    <div className="crudContainer">
      <CrudTitle
        title="Symptoms Tracker 📈" 
        subTitle="Search for people by their name, choose a date, and see a list of detailed symptomes"
      />
      <Form.Group>
        <Form.Group className="flex" as={Col}>
            <Form.Label column sm="2">
              Person Name
            </Form.Label>
            <Dropdown
                      className="marginBottom"
                      options={people}
                      onChange={(x) => setChosen({...chosen, label: x.label, person_id: x.value})}
                      value={{value: chosen.person_id? chosen.person_id: 'Choose', label: chosen.label? chosen.label: 'Choose a person' }}
                      placeholder="Select an option"
                    />
          </Form.Group>
      </Form.Group>

      <Form.Group>
        <Form.Group as={Col}>
            <Form.Label column sm="2">
              Tested on
            </Form.Label>
            <DatePicker
              onChange={(v) => setChosen({...chosen, date:v})}
              value={chosen.date}
            />
          </Form.Group>
          <br/>
          <Button onClick={search}>Search</Button>
          <br/>
          {results.length ===0? 
          <div>No Results</div>
          :
          <>
          <br/>
              <Card>
              <Card.Header>{results[0].first_name} {results[0].last_name}</Card.Header>
              <Card.Body>
                <Card.Text>
                  Common: {results[0]["Common Symptom"]}
                  <br/>
                  Other: {results[0]["Other Symptoms"]}
                </Card.Text>
              </Card.Body>
            </Card>
          </>
          }
      </Form.Group>
    </div>
  );
}


export default DatePeopleSymptoms;
