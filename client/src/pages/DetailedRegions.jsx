import React, { useEffect, useState } from "react";
import {Card} from 'react-bootstrap';
import CrudTitle from "../molecules/CrudTitle";

function DetailedRegion() {
  let [facility, setFacility] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3001/detailRegion")
  //     .then((response) => response.json())
  //     .then((d) => console.log(d))
  //     // .then((data) =>setRegion(data.data));
  // },[]);

  return (
    <div className="crudContainer">
      <CrudTitle
        title="DETAILED Region 🗺️"
        subTitle="View detailed region"
      />
         {region.map((x) => {
          return (
            <Card className="marginBottom">
              <Card.Header>
                {x.name}
                <small> 👩‍⚕️ {x.number_of_workers} people work here</small>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Has drivethrough: {x.has_drivethrough? "yes": "no"}
                  <br />
                  Type: {x.type}
                  <br />
                  DOB: {new Date(x.date_of_birth).toLocaleDateString()}
                  <br />
                  URL: <a href={x.web_address}>Click here</a>
                  <br />
                  Address: {x.address}
                  <br />
                  Phone number: {x.phone_number}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
}

export default DetailedRegion;
