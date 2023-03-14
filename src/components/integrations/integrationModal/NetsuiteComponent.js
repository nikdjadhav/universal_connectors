import TkButton from "@/globalComponents/TkButton";
import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React, { useState } from "react";
import ExistConnection from "./ExistConnection";
import NewConnection from "./NewConnection";

const NetsuiteComponent = ({ onClickHandeler, ...other }) => {
  const [showComponent, setShowComponent] = useState("one");
  const [newTab, setNewTab] = useState(true);
  const [existTab, setExistTab] = useState(false);
  console.log("nc==>", other);

  const toggleComponet = (value) => {
    // console.log(value);
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
      {/* <h5 className="text-center">NetSuite™ Configuration</h5> */}

      <TkRow>
        <TkCol lg={6}>
          <TkRadioButton
            type="radio"
            name="connection"
            // checked="true"
            checked={newTab}
            onChange={() => toggleComponet("one")}
          >
            Set up new connection
          </TkRadioButton>
          <TkRadioButton
            type="radio"
            name="connection"
            checked={existTab}
            disabled
            onChange={() => toggleComponet("two")}
          >
            Use existing connection
          </TkRadioButton>
        </TkCol>

        {showComponent === "one" ? (
          <NewConnection
            onClickHandeler={onClickHandeler}
            integrationID={other.integrationID}
            title={other.title}
          />
        ) : (
          <ExistConnection
            onClickHandeler={onClickHandeler}
            // integrationID={other.integrationID}
          />
        )}

        {/* <TkCol lg={12}>
          <TkButton type="submit" className="btn btn-success">
            Authorize
          </TkButton>
        </TkCol> */}

        {/* <TkCol lg={12}>
          <TkButton
            type="button"
            className="btn-success float-end"
            onClick={onClickHandeler}
          >
            Next Step
          </TkButton> */}
        {/* </TkCol> */}
      </TkRow>
    </>
  );
};

export default NetsuiteComponent;
