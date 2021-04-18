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
    postal_code_id: props.postal_code_id,
    isPhw: props.isPhw,
    startDate: props.startDate,
    endDate: props.endDate,
    schedual: props.schedual,
    facility: props.facility,
    mother: props.mother,
    father: props.father,
    city_id: props.city_id,
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
    postal_code_id,
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
  }, [props.addPerson]);

  function editPerson() {
    fetch("http://localhost:3001/editPerson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...person,
        date_of_birth: new Date(date_of_birth).toISOString().slice(0, 10),
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
              readOnly={!isEdit}
            />
          </Col>
        </Form.Group>
        {mode === "none" && <X onClick={deletePerson} />}
      </CardContainer.Header>
      {mode === "add" ? (
        <div className="crudContainer-isInfected">
          <input
            type="checkbox"
            onChange={(e) => mode ==="add" ? 
            props.setAddPerson({ ...props.addPerson, is_infected: e.target.checked })
            : setPerson({ ...person, is_infected: e.target.checked })}
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
                onChange={(e) =>
                  mode === "add"
                    ? props.setAddPerson({
                        ...props.addPerson,
                        last_name: e.target.value,
                      })
                    : onChange(e)
                }
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
              {isEdit ? (
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
                onChange={(e) =>
                  mode === "add"
                    ? props.setAddPerson({
                        ...props.addPerson,
                        email_address: e.target.value,
                      })
                    : onChange(e)
                }
                value={email_address}
                readOnly={!isEdit}
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
                  readOnly={!isEdit}
                />
                {isEdit || mode === "add" ? (
                  listOfCities && (
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
                      value={person.city_name}
                      placeholder="Select an option"
                    />
                  )
                ) : (
                  <input
                    size="6"
                    name="city_name"
                    onChange={(e) =>
                      mode === "add"
                        ? props.setAddPerson({
                            ...props.addPerson,
                            city_name: e.target.value,
                          })
                        : onChange(e)
                    }
                    value={city_name}
                    readOnly={!isEdit}
                  />
                )}

                <input
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
                  readOnly={!isEdit}
                />
                <input
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
                  readOnly={!isEdit}
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
                readOnly={!isEdit}
              />
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
          {isPhw && mode !== "view" && (
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
