import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";

export default function Login(props) {
   const [user, setUser] = useState();
   const [password, setPassword] = useState();


   function login() {
    fetch("http://localhost:3001/isLoggedIn", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date_of_birth: new Date(password), medicare_number: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success){
          props.login();
        }
        else {
          alert("Error login in")
        } 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  return (
    <Form>
      <Form.Group size="lg" controlId="user">
        <Form.Label>Username (MedCard)</Form.Label>
        <Form.Control
          autoFocus
          type="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="password">
        <Form.Label>Password (DOB)</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button onClick={login}>
        Login
      </Button>
    </Form>
  );
}
