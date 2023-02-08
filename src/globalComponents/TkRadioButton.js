import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const TkRadioButton = ({ children, type, name,onClick, checked, className }) => {
  return (
    <>
      <FormGroup check>
        <Label check>
          <Input type={type} name={name} onClick={onClick} checked={checked} className={className} /> 
            {children}
        </Label>
      </FormGroup>
    </>
  );
};

export default TkRadioButton;
