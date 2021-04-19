import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import DatePicker from "react-date-picker";
import "react-dropdown/style.css";
import {
  Alert,
  Button,
  Card as CardContainer,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import {
  Briefcase,
  Calendar,
  Frown,
  Home,
  Mail,
  Phone,
  Smile,
  X,
} from "react-feather";

export default function PublicHealthWorker(props) {
  let [listOfFacilities, setListOfFacilities] = useState([]);
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
    postal_code_id: props.postal_code_id,
    isPhw: props.isPhw,
    start_date: props.start_date,
    end_date: props.end_date,
    schedule: props.schedule,
    phc_id: props.phc_id,
    mother: props.mother,
    father: props.father,
    city_id: props.city_id,
    phw_id: props.worker_id,
    facility: props.facility,
    new_phc_id: props.new_phc_id
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
    start_date,
    end_date,
    schedule,
    phc_id,
    mother,
    father,
    city_id,
    city_name,
    postal_code_id,
    phw_id,
    facility,
    new_phc_id
  } = person;
  let { mode } = props;

  function onChange(e) {
    let name = e.target.name;
    setPerson({ ...person, [name]: e.target.value });
  }

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

  function editPerson() {
    fetch("http://localhost:3001/editPhcw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...person,
        start_date: new Date(start_date).toISOString().slice(0, 10),
        end_date: new Date(end_date).toISOString().slice(0, 10),
      }),
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
    fetch("http://localhost:3001/deletePhcw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: phw_id }),
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
        <Form.Group as={Row}>
          <Form.Label column sm="10">
            Medicare Card #
          </Form.Label>
          <Col sm="10">
            <input name="medicare_number" value={medicare_number} readOnly />
          </Col>
        </Form.Group>
        {mode === "none" && <X onClick={deletePerson} />}
      </CardContainer.Header>
      {mode === "add" ? (
        <div className="crudContainer-isInfected">
          <input type="checkbox" value={is_infected} />
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
              <input name="first_name" value={first_name} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Last
            </Form.Label>
            <Col sm="10">
              <input name="last_name" value={last_name} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <Calendar /> DOB
            </Form.Label>
            <Col sm="10">
              <input
                value={new Date(date_of_birth).toLocaleDateString()}
                readOnly
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
                value={telephone_number}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <Mail /> Email Address
            </Form.Label>
            <Col sm="10">
              <input name="email_address" value={email_address} readOnly />
            </Col>
          </Form.Group>
          {mode !== "view" && (
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                <Home /> Address
              </Form.Label>
              <Col sm="10">
                <input size="3" name="address" value={address} readOnly />
                <input size="6" name="city_name" value={city_name} readOnly />

                <input size="1" name="province" value={province} readOnly />
                <input
                  size="6"
                  name="postal_code"
                  value={postal_code}
                  readOnly
                />
              </Col>
            </Form.Group>
          )}
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Citizenship
            </Form.Label>
            <Col sm="10">
              <input name="citizenship" value={citizenship} readOnly />
            </Col>
          </Form.Group>
          {mode === "view" && (
            <>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Mother
                </Form.Label>
                <Col sm="10">
                  <input value={mother} readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Father
                </Form.Label>
                <Col sm="10">
                  <input value={father} readOnly />
                </Col>
              </Form.Group>
            </>
          )}
          {mode !== "view" && (
            <Alert variant="primary">
              <Alert.Heading>Public health care worker info</Alert.Heading>
              <p>
                {first_name && last_name && (
                  <p> is a public health care worker</p>
                )}
              </p>
              <hr />
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Calendar /> Start date
                </Form.Label>
                <Col sm="10">
                  {isEdit ? (
                    <DatePicker
                      disbaled={!isEdit}
                      onChange={(v) =>
                        mode === "add"
                          ? props.setAddPerson({
                              ...props.addPerson,
                              start_date: v,
                            })
                          : setPerson({ ...person, start_date: v })
                      }
                      value={
                        mode === "add"
                          ? props.addPerson && props.addPerson.start_date
                            ? new Date(props.addPerson.start_date)
                            : ""
                          : start_date
                          ? new Date(start_date)
                          : ""
                      }
                    />
                  ) : (
                    <input
                      value={
                        start_date
                          ? new Date(start_date).toLocaleDateString()
                          : ""
                      }
                      readOnly
                    />
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Calendar /> End date
                </Form.Label>
                <Col sm="10">
                  {isEdit ? (
                    <DatePicker
                      disbaled={!isEdit}
                      onChange={(v) =>
                        mode === "add"
                          ? props.setAddPerson({
                              ...props.addPerson,
                              end_date: v,
                            })
                          : setPerson({ ...person, end_date: v })
                      }
                      value={
                        mode === "add"
                          ? props.addPerson && props.addPerson.end_date
                            ? new Date(props.addPerson.end_date)
                            : ""
                          : end_date
                          ? new Date(end_date)
                          : ""
                      }
                    />
                  ) : (
                    <input
                      value={
                        end_date
                          ? new Date(end_date).toLocaleDateString()
                          : "Present"
                      }
                      readOnly
                    />
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Calendar /> Schedule
                </Form.Label>
                <Col sm="10">
                  <input
                    sie="3"
                    name="schedule"
                    onChange={onChange}
                    value={schedule}
                    readOnly={!isEdit}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  <Briefcase /> Works at
                </Form.Label>
                <Col sm="10">

                  {isEdit ? (
                    listOfFacilities && (
                      <Dropdown
                        options={listOfFacilities}
                        onChange={(x) =>
                          setPerson({
                            ...person,
                            phc_id: phc_id,
                            facility: x.label,
                            new_phc_id: x.value,
                          })
                        }
                        value={{ label: facility, value: new_phc_id }}
                        placeholder="Select an option"
                      />
                    )
                  ) : (
                    <input
                      size="3"
                      name="facility"
                      onChange={onChange}
                      value={facility}
                      readOnly={!isEdit}
                    />
                  )}
                </Col>
              </Form.Group>
            </Alert>
          )}
        </Form>
      </CardContainer.Body>

      {mode === "none" && (
        <div>
          {isEdit && (
            <Button
              onClick={() => {
                setIsEdit(false);
                editPerson();
              }}
              variant="primary"
            >
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
