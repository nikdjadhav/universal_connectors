import TkButton from "@/globalComponents/TkButton";
import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React, { useState } from "react";
import ExistConnection from "./ExistConnection";
import NewConnection from "./NewConnection";

const NetsuiteComponent = ({ onClickHandeler }) => {
  const [showComponent, setShowComponent] = useState("one");
  const [newTab, setNewTab] = useState(true);
  const [existTab, setExistTab] = useState(false);

  const toggleComponet = (value) => {
    console.log(value);
    setShowComponent(value);
    setNewTab(value === "one" ? true : false);
    setExistTab(value === "two" ? true : false);
  };

  // const onClickNew = () => {
  //   console.log("new");
  //   // return <NewConnection />;
  // };

  // const onClickExist = () => {
  //   console.log("exist");
  // };

  return (
    <>
      <h5 className="text-center">Netsuite Configuration</h5>

      <TkRow>
        <TkCol lg={6}>
          <TkRadioButton
            type="radio"
            name="connection"
            // checked="true"
            checked={newTab}
            onClick={() => toggleComponet("one")}
          >
            Set up new connection
          </TkRadioButton>
          <TkRadioButton
            type="radio"
            name="connection"
            checked={existTab}
            onClick={() => toggleComponet("two")}
          >
            Use existing connection
          </TkRadioButton>
        </TkCol>

        {showComponent === "one" ? <NewConnection /> : <ExistConnection />}

        {/* <TkCol lg={12}>
          <TkButton type="submit" className="btn btn-success">
            Authorize
          </TkButton>
        </TkCol> */}

        <TkCol lg={12}>
          <TkButton
            type="button"
            className="btn btn-primary float-end"
            onClick={onClickHandeler}
          >
            Next Step
          </TkButton>
        </TkCol>
      </TkRow>
    </>
  );
};

export default NetsuiteComponent;
