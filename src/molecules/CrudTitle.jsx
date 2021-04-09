import Reac from "react";
import { Button } from "react-bootstrap";

function CrudTitle(props) {
  let {title, subTitle, addAction} = props;
  return (
    <>
      <div className="title">
        <div>
          <h1>{title}</h1>
          <p style={{color: 'gray'}}>{subTitle}</p>
        </div>
        <Button onClick={addAction}>Add</Button>
      </div>
      <hr/>
    </> 
  );
}

export default CrudTitle;