import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const TkRadioButton = ({ children, type, name,onClick, checked }) => {
  return (
    <>
      <FormGroup check>
        <Label check>
          <Input type={type} name={name} onClick={onClick} checked={checked}/> 
            {children}
        </Label>
      </FormGroup>
    </>
  );
};

export default TkRadioButton;
