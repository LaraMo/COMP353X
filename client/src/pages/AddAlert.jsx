import React, { useState } from "react";
import CrudTitle from "../molecules/CrudTitle";

function FollowUpForm() {
  let [addAlert, setAddAlert] = useState({
    level: "",
    color: "light",
    name: "",
    measures: "",
    region:{}
  });
  function onChange(e) {
    let name = e.target.name;
    console.log(name, e.target.value )
    setAddAlert({ ...addAlert, [name]: e.target.value });
  }
  return (
    <div className="crudContainer">
      <CrudTitle
        title="Add Alert 🏥"
        subTitle="Add an alert"
      />
     <Steps current={1}>
      <Steps.Step title="first" />
      <Steps.Step title="second" />
      <Steps.Step title="third" />
    </Steps>
    </div>
  );
}

let regions = [{id:1, name:'reg1'}, {id:2, name:'reg2'}]
let colors = ['primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark']
export default FollowUpForm;
