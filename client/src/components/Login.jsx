import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";

export default function Login(props) {
   const [user, setUser] = useState();
   const [password, setPassword] = useState();

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
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button onClick={props.login}>
        Login
      </Button>
    </Form>
  );
}
