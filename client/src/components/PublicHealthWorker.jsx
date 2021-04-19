import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import DatePicker from "react-date-picker";
import { Alert, Button, Card as CardContainer, Col, Form, Row } from "react-bootstrap";
import { Briefcase, Calendar, Frown, Home, Mail, Phone, Smile, X } from "react-feather";
import "react-dropdown/style.css";


export default function PublicHealthWorker(props) {
  let [listOfCities, setListOfCities] = useState([]);
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
    facility: props.facility,
    city_id: props.city_id,
    start_date: props.start_date,
    end_date: props.end_date,
    schedule: props.schedule,
    phc_id: props.phc_id,
    phw_id: props.worker_id
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
    facility,
    end_date,
    start_date,
    city_name,
    postal_code_id,
    schedule, 
    phc_id,
    phw_id,
    new_phc_id
  } = person;
  let { mode } = props;

  function onChange(e) {
    let name = e.target.name;
    setPerson({ ...person, [name]: e.target.value });
  }

  useEffect(() => {
    fetch("http://localhost:3001/selectCity")
      .then((response) => response.json())
      .then((data) =>
        setListOfCities(
          data.data.map((x) => {
            return { value: x.id, label: x.name };
          })
        )
      );
      fetch("http://localhost:3001/selectFacility")
      .then((response) => response.json())
      .then((data) =>
        setListOfFacilities(
          data.data.map((x) => {
            return { value: x.id, label: x.name };
          })
        )
      );
  }, [props.addPerson]);

  function editPerson() {
    fetch("http://localhost:3001/editPhcw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...person,
        phw_id: phw_id,
        phc_id: phc_id,
        start_date: new Date(start_date).toISOString().slice(0, 10),
        end_date: new Date(end_date).toISOString().slice(0, 10)
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
        <Form.Group as={Row}>
          <Form.Label column sm="10">
            Medicare Card #
          </Form.Label>
          <Col sm="10">
            <input
              name="medicare_number"
              onChange={(e) =>
                mode === "add"
                  ? props.setAddPerson({
                      ...props.addPerson,
                      medicare_number: e.target.value,
                    })
                  : onChange(e)
              }
              value={medicare_number}
              readOnly={mode !== "add"}
            />
          </Col>
        </Form.Group>
        {mode === "none" && <X onClick={deletePerson} />}
      </CardContainer.Header>
      {mode === "add" ? (
        <div className="crudContainer-isInfected">
          <input
            type="checkbox"
            onChange={(e) =>
              mode === "add"
                ? props.setAddPerson({
                    ...props.addPerson,
                    is_infected: e.target.checked,
                  })
                : setPerson({ ...person, is_infected: e.target.checked })
            }
            value={is_infected}
          />
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
                onChange={(e) =>
                  mode === "add"
                    ? props.setAddPerson({
                        ...props.addPerson,
                        first_name: e.target.value,
                      })
                    : onChange(e)
                }
                value={first_name}
                readOnly={mode !== "add"}
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
                onChange={(e) =>
                  mode === "add"
                    ? props.setAddPerson({
                        ...props.addPerson,
                        last_name: e.target.value,
                      })
                    : onChange(e)
                }
                value={last_name}
                readOnly={mode !== "add"}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <Calendar /> DOB
            </Form.Label>
            <Col sm="10">
              {mode === "add" ? (
                <DatePicker
                  disbaled={!isEdit}
                  onChange={(v) =>
                    mode === "add"
                      ? props.setAddPerson({
                          ...props.addPerson,
                          date_of_birth: v,
                        })
                      : setPerson({ ...person, date_of_birth: v })
                  }
                  value={
                    mode === "add"
                      ? props.addPerson && props.addPerson.date_of_birth
                        ? new Date(props.addPerson.date_of_birth)
                        : ""
                      : date_of_birth
                      ? new Date(date_of_birth)
                      : ""
                  }
                />
              ) : (
                <input
                  value={
                    date_of_birth
                      ? new Date(date_of_birth).toLocaleDateString()
                      : ""
                  }
                  readOnly
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <Phone /> Phone
            </Form.Label>
            <Col sm="10">
              <input
                name="telephone_number"
                onChange={(e) =>
                  mode === "add"
                    ? props.setAddPerson({
                        ...props.addPerson,
                        telephone_number: e.target.value,
                      })
                    : onChange(e)
                }
                value={telephone_number}
                readOnly={mode !== "add"}
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
                onChange={(e) =>
                  mode === "add"
                    ? props.setAddPerson({
                        ...props.addPerson,
                        email_address: e.target.value,
                      })
                    : onChange(e)
                }
                value={email_address}
                readOnly={mode !== "add"}
              />
            </Col>
          </Form.Group>
          {mode !== "view" && (
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                <Home /> Address
              </Form.Label>
              <Col sm="10">
                <input
                  size="3"
                  name="address"
                  onChange={(e) =>
                    mode === "add"
                      ? props.setAddPerson({
                          ...props.addPerson,
                          address: e.target.value,
                        })
                      : onChange(e)
                  }
                  value={address}
                  readOnly={mode !== "add"}
                  />
                {mode === "add" ? (
                  listOfCities && (
                    <>
                      <small>City Name</small>

                      <Dropdown
                        className="marginBottom"
                        options={listOfCities}
                        onChange={(x) =>
                          mode === "add"
                            ? props.setAddPerson({
                                ...props.addPerson,
                                city_id: x.value,
                                city_name: x.label,
                              })
                            : setPerson({
                                ...person,
                                city_name: x.label,
                                city_id: x.value,
                              })
                        }
                        value={mode === "add"? props.addPerson?.city_name: person.city_name}
                        placeholder="Select an option"
                      />
                    </>
                  )
                ) : (
                  <>
                    <small>City Name</small>

                    <input
                      size="6"
                      name="city_name"
                      value={city_name}
                      readOnly
                      />
                  </>
                )}
                <small>Province</small>

                <input
                  autocomplete="off"
                  size="1"
                  name="province"
                  onChange={(e) =>
                    mode === "add"
                      ? props.setAddPerson({
                          ...props.addPerson,
                          province: e.target.value,
                        })
                      : onChange(e)
                  }
                  value={province}
                  readOnly={mode !== "add"}
                  />
                <small>Postal code</small>
                <input
                  autocomplete="off"
                  size="6"
                  name="postal_code"
                  onChange={(e) =>
                    mode === "add"
                      ? props.setAddPerson({
                          ...props.addPerson,
                          postal_code: e.target.value,
                        })
                      : onChange(e)
                  }
                  value={postal_code}
                  readOnly={mode !== "add"}
                  />
              </Col>
            </Form.Group>
          )}
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Citizenship
            </Form.Label>
            <Col sm="10">
              <input
                autocomplete="off"
                name="citizenship"
                onChange={(e) =>
                  mode === "add"
                    ? props.setAddPerson({
                        ...props.addPerson,
                        citizenship: e.target.value,
                      })
                    : onChange(e)
                }
                value={citizenship}
                readOnly={mode !== "add"}
              />
            </Col>
          </Form.Group>
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
                    onChange={(e) =>
                      mode === "add"
                        ? props.setAddPerson({
                            ...props.addPerson,
                            schedule: e.target.value,
                          })
                        : onChange(e)
                    }
                    value={mode === "add" ? props.addPerson?.schedule: schedule}
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
                          mode === "add"?
                          props.setAddPerson({
                              ...props.addPerson,
                              phc_id: x.value,
                              facility: x.label,
                            })
                          :
                          setPerson({
                            ...person,
                            phc_id: phc_id,
                            facility: x.label,
                            new_phc_id: x.value,
                          })
                        }
                        value={mode === "add"?{ label: props.addPerson?.facility, value: props.addPerson?.phc_id } :  { label: facility, value: new_phc_id }}
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
              Save
            </Button>
          )}
          {!isEdit && (
            <Button onClick={() => setIsEdit(true)} variant="primary">
              Edit
            </Button>
          )}
        </div>
      )}
    </CardContainer>
  );
}
