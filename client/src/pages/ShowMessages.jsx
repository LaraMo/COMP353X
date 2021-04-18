import React, { useEffect, useState } from "react";
import DateTimePicker from 'react-datetime-picker';
import { Alert, Col, Form } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";
import moment from 'moment';
moment().format();
function DatePeopleSymptoms() {

const [startDate, setStartDate] = useState();
const [endDate, setEndDate] = useState();
const [messages, setMessages] = useState([]);
useEffect(() => {
  let start = startDate? new Date(startDate).toISOString().slice(0, 10)+ " " +new Date(startDate).toLocaleTimeString(): '';
  let end = endDate? new Date(endDate).toISOString().slice(0, 10)+ " " +new Date(endDate).toLocaleTimeString(): '';

  console.log(startDate, messages)
    fetch("http://localhost:3001/showMessages?start_date="+start+"&end_date="+end)
      .then((response) => response.json())
      .then((data) => setMessages(data.data));
  }, [endDate]);

  return (
    <div className="crudContainer">
      <CrudTitle
        title="Messages 💬"
        subTitle="search for messages by time"
      />
      <Form.Group>
        <Form.Group as={Col}>
            <Form.Label column sm="2">
              Start date
            </Form.Label>
            <DateTimePicker
              onChange={(v) => setStartDate(v)}
              value={startDate}
              />
          </Form.Group>
      </Form.Group>

      <Form.Group>
        <Form.Group as={Col}>
            <Form.Label column sm="2">
              End date
            </Form.Label>
            <DateTimePicker
              onChange={(v) => setEndDate(v)}
              value={endDate}
              />
          </Form.Group>
      </Form.Group>
      {messages.length ===0? 
      <div>No Results</div>
      :
      messages.map((x) => {
        return (
          <Alert key={x.id} variant="info">
          <small>{x.message}</small>
        </Alert> 
        );
      })
      }
    </div>
  );
}


export default DatePeopleSymptoms;
