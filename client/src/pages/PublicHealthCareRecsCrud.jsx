import React, { useState } from "react";
import PHCRCard from "../components/PHCRCard";
import CrudTitle from "../molecules/CrudTitle";

function PublicHealthCareRecsCrud() {
  let [publicHealthRec, setPublicHealthRec] = useState({
    id: "",
    title: "",
    step: [],
  });

  return (
    <div className="crudContainer">
      <CrudTitle
        title="Public Health Care Recs ✔️"
        subTitle="Delete, edit and view"
      />
      {tempData.map((x, i) => {
        return <PHCRCard mode="none" key={i} {...x} />;
      })}
    </div>
  );
}

export default PublicHealthCareRecsCrud;

const tempData = [
  {
    id: "1",
    title: "Dont go out",
    steps: ["We meed to wash our hands", "We need to do this"]
  },
  {
    id: "2",
    title: "Dont go out",
    steps: ["We meed to wash our hands", "We need to do this"]
  },
];
