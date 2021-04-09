import React, { useState } from 'react';
import { Alert, Button, Card as CardContainer, Col, Form, Row} from 'react-bootstrap';
import { Calendar, Frown, Home, Mail, Phone, Smile, X } from 'react-feather';

export default function PersonCard(props) {
    let [isEdit, setIsEdit]=useState(props.mode ==="add");
    let [person, setPerson]=useState(
        {id: props.id, first: props.first, last: props.last, dob: props.dob, med: props.med, telephone: props.telephone, 
            address: props.address, provice: props.province,
        email: props.email , isInfected: props.isInfected, postalCode: props.postalCode});
    let {id, first, last, dob, med, telephone, address, province, email, isInfected, postalCode} = person;
    let {mode} = props;
    function onChange(e) {
        let name = e.target.name;
        setPerson({...person, [name]: e.target.value});
    }
    return (
        <CardContainer>
            <CardContainer.Header className="title">
                <div>
                    Card#
                    <input name="first" onChange={onChange} value={med} readOnly={!isEdit}/>
                </div>
                {mode !== "add" && <X/>}
            </CardContainer.Header>
            {mode === "add" ?
              <div class="personCard-isInfected">
                <input type="checkbox" onChange={()=>{}}value={isInfected}/> 
                {/* todo event */}
                <label>Is Infected</label>
            </div>
            :
            <Alert key={id} variant={isInfected? 'danger': 'success'}>
                {isInfected? <><Frown/> Infected </>: <><Smile/> Not infected</>}
            </Alert>
            }

            <CardContainer.Body>    
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            First
                        </Form.Label>
                        <Col sm="10">
                        <input name="first" onChange={onChange} value={first} readOnly={!isEdit}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Last
                        </Form.Label>
                        <Col sm="10">
                        <input name="last" onChange={onChange} value={last} readOnly={!isEdit}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            <Calendar/> DOB
                        </Form.Label>
                        <Col sm="10">
                            <input name="dob" onChange={onChange} value={dob} readOnly={!isEdit}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            <Phone/> Phone
                        </Form.Label>
                        <Col sm="10">
                            <input name="telephone" onChange={onChange} value={telephone} readOnly={!isEdit}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            <Mail/> Email
                        </Form.Label>
                        <Col sm="10">
                            <input name="email" onChange={onChange} value={email} readOnly={!isEdit}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            <Home/> Address
                        </Form.Label>
                        <Col sm="10">
                            <input sie="3" name="address" onChange={onChange} value={address} readOnly={!isEdit}/>
                            <input size="1" name="province" onChange={onChange} value={province} readOnly={!isEdit}/>
                            <input size="6"name="postalCode" onChange={onChange} value={postalCode} readOnly={!isEdit}/>
                        </Col>
                    </Form.Group>
                </Form>
            </CardContainer.Body>

            {mode !== "add" && 
            <div>
                {isEdit && <Button  onClick={() => setIsEdit(false)} variant="primary"> Save </Button>}
                {!isEdit && <Button  onClick={() => setIsEdit(true)} variant="primary"> Edit </Button>}
            </div>}
        </CardContainer>
    );
  }


