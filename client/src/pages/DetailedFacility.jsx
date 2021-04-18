import React, { useState } from "react";
import FacilityCard from "../components/FacilityCard";
import { Button, Modal } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function DetailedFacility() {
  const [isAdd, setIsAdd] = useState(false);
  let [facility, setFacility] = useState({
    id: "",
    name: "",
    telephone: "",
    url: "",
    type: "",
    isDrive:"",
    numberHealthCareWorkers:"",
    appointementType:"",
  });

  return (
    <div className="crudContainer">
      <CrudTitle
        title="DETAILED Facility 🏥"
        subTitle="View detailed facility"
      />
      {tempData.map((x, i) => {
        return <FacilityCard mode="detailed" key={i} {...x} />;
      })}
    </div>
  );
}

export default DetailedFacility;

const tempData = [
  {
    id: "1",
    name: "Saint Marry",
    telephone: "7387 2947284",
    url: "www.com@gmai",
    type: "private",
    isDrive: false,
    numberHealthCareWorkers:35,
    appointementType:"Walk-in",
  },
  {
    id: "2",
    name: "Saint Joe's",
    telephone: "73872844",
    url: "www.com@gmai",
    type: "public",
    isDrive: true,
    numberHealthCareWorkers: 43,
    appointementType:"Walk-in",
  },
];
