import React, { useState } from "react";
import Login from "../components/Login";
import FollowUpFormContainer from "../components/FollowUpFormContainer";
import { ProgressBar, Step } from "react-step-progress-bar";
import CrudTitle from "../molecules/CrudTitle";
import "react-step-progress-bar/styles.css";
import { Alert } from "react-bootstrap";

function FollowUpForm() {
  let [followupForm, setFollowUpForm] = useState({
    level: "",
    id: "",
    color: "light",
    name: "",
    measures: "",
    region: {},
    progress: 0,
  });

  return (
    <div className="crudContainer">
      <CrudTitle
        title="Follow up form 📝"
        subTitle="follow up form with person"
      />
      <ProgressBar
        percent={followupForm.progress}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        <Step transition="scale">{({ accomplished }) => <div>🔓</div>}</Step>
        <Step transition="scale">{({ accomplished }) => <div>✍🏻</div>}</Step>
        <Step transition="scale">{({ accomplished }) => <div>✔️</div>}</Step>
      </ProgressBar>
      {followupForm.progress === 0 ? (
        <Login
          followupForm={followupForm}
          setFollowUpForm={setFollowUpForm}
        />
      ) : followupForm.progress === 50 ? (
        <FollowUpFormContainer id={followupForm.id} onSubmit={() => setFollowUpForm({ ...followupForm, progress: 100 })}/>
      ) : (
        <Alert variant="sucessful">Submited</Alert>
      )}
    </div>
  );
}

export default FollowUpForm;
