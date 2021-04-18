import React, { useState } from "react";
import TimePicker from 'react-time-picker';
import { Alert, Form } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function ShowMessages() {
  const [value, onChange] = useState('10:00');

  return (
    <div className="crudContainer">
      <CrudTitle
        title="Messages 💬"
        subTitle="search for messages by time"
      />
      <Form.Group>
        <Form.Label>🔍time  </Form.Label>
        <TimePicker
        onChange={((value)=>onChange(value))}
        value={value}
        />
      </Form.Group>
      {tempResults.length ===0? 
      <div>No Results</div>
      :
      tempResults.map((x) => {
        return (
          <Alert key={x.id} variant="info">
          <small>{x.date}-{x.time}-{x.region}</small>
          <br/>
          {x.message}
        </Alert> 
        );
      })
      }
    </div>
  );
}

const tempResults = [
  {
    id: 1,
    message: "this is a cool message, this is so nice!",
    date: "15/05/24",
    time: "12:34",
    region: "Montreal",
  },
  {
    id: 2,
    message: "This is another message",
    date: "15/05/24",
    time: "03:24",
    region: "Montreal",
  },
];

export default ShowMessages;
