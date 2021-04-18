import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  Alert,
  Button,
  Card as CardContainer,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { Briefcase, Calendar, Frown, Home, Mail, Phone, Smile, X } from "react-feather";

export default function PersonCard(props) {
  let [listOfCities, setListOfCities] = useState([]);
  let [isEdit, setIsEdit] = useState(props.mode === "add");
  let [person, setPerson] = useState({
    id: props.id,
    first_name: props.first_name,
    last_name: props.last_name,
    date_of_birth: props.date_of_birth,
    medicare_number: props.medicare_number,
    citizenship: props.citizenship,
    telephone_number: props.telephone_number,
    address: props.address,
    province: props.province,
    city_name: props.name,
    email_address: props.email_address,
    is_infected: props.is_infected,
    postal_code: props.postal_code,
    postal_code_id: props.postal_code,
    isPhw: props.isPhw,
    startDate: props.startDate,
    endDate: props.endDate,
    schedual: props.schedual,
    facility: props.facility,
    mother: props.mother,
    father: props.father,
    city_id: props.city_id
  });
  let {
    id,
    first_name,
    last_name,
    date_of_birth,
    medicare_number,
    telephone_number,
    address,
    province,
    citizenship,
    email_address,
    is_infected,
    postal_code,
    isPhw,
    startDate,
    endDate,
    schedual,
    facility,
    mother,
    father,
    city_id,
    city_name, 
    postal_code_id
  } = person;
  let { mode } = props;
  
  function onChange(e) {
    let name = e.target.name;
    setPerson({ ...person, [name]: e.target.value });
  }

  useEffect(() => {
    fetch('http://localhost:3001/selectCity')
    .then(response => response.json())
    .then(data => setListOfCities(data.data.map(x => {
      return {value: x.id, label: x.name}
    })
  ))})
  function editPerson() {
    fetch("http://localhost:3001/editPerson", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...person, date_of_birth: new Date().toISOString().slice(0, 10)}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deletePerson() {
    fetch("http://localhost:3001/deletePerson", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ person_id: id, postal_code_id: postal_code_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <CardContainer className="mb-10">
      <CardContainer.Header className="title">
        <div>
          Card#
          <input
            name="medicare_number"
            onChange={onChange}
            value={medicare_number}
            readOnly={!isEdit}
          />
        </div>
        {mode === "none" && <X onClick={deletePerson} />}
      </CardContainer.Header>
      {mode === "add" ? (
        <div class="crudContainer-isInfected">
          <input type="checkbox" onChange={() => {}} value={is_infected} />
          {/* todo event */}
          <label>Is Infected</label>
        </div>
      ) : (
        <Alert key={id} variant={is_infected ? "danger" : "success"}>
          {is_infected ? (
            <>
              <Frown /> Infected{" "}
            </>
          ) : (
            <>
              <Smile /> Not infected
            </>
          )}
        </Alert>
      )}

      <CardContainer.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              First
            </Form.Label>
            <Col sm="10">
              <input
                name="first_name"
                onChange={onChange}
                value={first_name}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Last
            </Form.Label>
            <Col sm="10">
              <input
                name="last_name"
                onChange={onChange}
                value={last_name}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <Calendar /> DOB
            </Form.Label>
            <Col sm="10">
              <input
                name="date_of_birth"
                onChange={onChange}
                value={new Date(date_of_birth).toLocaleDateString()}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <Phone /> Phone
            </Form.Label>
            <Col sm="10">
              <input
                name="telephone_number"
                onChange={onChange}
                value={telephone_number}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <Mail /> Email Address
            </Form.Label>
            <Col sm="10">
              <input
                name="email_address"
                onChange={onChange}
                value={email_address}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          {mode !== "view" &&
          <Form.Group as={Row}>
          <Form.Label column sm="2">
            <Home /> Address
          </Form.Label>
          <Col sm="10">
            <input
              sie="3"
              name="address"
              onChange={onChange}
              value={address}
              readOnly={!isEdit}
            />
            {isEdit ?
              listOfCities && 
              <Dropdown
              options={listOfCities}
              onChange={(x)=>setPerson({...person,city_name:x.label})}
              value={person.city_name}
              placeholder="Select an option"
             />
             :
             <input
             size="6"
             name="city_name"
             onChange={onChange}
             value={city_name}
             readOnly={!isEdit}
           />
            }

            <input
              size="1"
              name="province"
              onChange={onChange}
              value={province}
              readOnly={!isEdit}
            />
            <input
              size="6"
              name="postal_code"
              onChange={onChange}
              value={postal_code}
              readOnly={!isEdit}
            />
          </Col>
        </Form.Group>
          }
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Citizenship
            </Form.Label>
            <Col sm="10">
              <input
                name="citizenship"
                onChange={onChange}
                value={citizenship}
                readOnly={!isEdit}
              />
            </Col>
          </Form.Group>
          {mode === "view" && 
          <>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Mother
            </Form.Label>
            <Col sm="10">
              <input
                value={mother}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Father
            </Form.Label>
            <Col sm="10">
              <input
                value={father}
                readOnly
              />
            </Col>
          </Form.Group>
          </>
          }
          {isPhw && mode !== "view" && 
            <Alert variant="primary">
              <Alert.Heading>Public health care worker info</Alert.Heading>
              <p>
                {first_name && last_name && <p> is a public health care worker</p>}
              </p>
              <hr />
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Calendar /> Start date
                </Form.Label>
                <Col sm="10">
                  <input
                    sie="3"
                    name="startDate"
                    onChange={onChange}
                    value={startDate}
                    readOnly={!isEdit}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Calendar /> End date
                </Form.Label>
                <Col sm="10">
                  <input
                    sie="3"
                    name="endDate"
                    onChange={onChange}
                    value={endDate}
                    readOnly={!isEdit}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Calendar /> Schedual
                </Form.Label>
                <Col sm="10">
                  <input
                    sie="3"
                    name="schedual"
                    onChange={onChange}
                    value={schedual}
                    readOnly={!isEdit}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Briefcase /> Works at
                </Form.Label>
                <Col sm="10">
                  <input
                    sie="3"
                    name="facility"
                    onChange={onChange}
                    value={facility}
                    readOnly={!isEdit}
                  />
                </Col>
              </Form.Group>
            </Alert>
          }
        </Form>
      </CardContainer.Body>

      {mode === "none" && (
        <div>
          {isEdit && (
            <Button onClick={() => {setIsEdit(false); editPerson()}} variant="primary">
              {" "}
              Save{" "}
            </Button>
          )}
          {!isEdit && (
            <Button onClick={() => setIsEdit(true)} variant="primary">
              {" "}
              Edit{" "}
            </Button>
          )}
        </div>
      )}
    </CardContainer>
  );
}
