import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React, { useState } from "react";
import ExistConnection from "./ExistConnection";
import NewConnection from "./NewConnection";

const NetsuiteComponent = ({
  onClickHandler,
  toggle,
  integrationDetails,
  integrationID,
  title,
  getIntegrationId,
}) => {
  const [showComponent, setShowComponent] = useState("one");
  const [newTab, setNewTab] = useState(true);
  const [existTab, setExistTab] = useState(false);

  const toggleComponet = (value) => {
    setShowComponent(value);
    setNewTab(value === "one" ? true : false);
    setExistTab(value === "two" ? true : false);
  };

  return (
    <>
      <TkRow>
        <TkCol lg={6}>
          <TkRadioButton
            type="radio"
            name="connection"
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
            onClickHandler={onClickHandler}
            integrationID={integrationID}
            title={title}
            integrationDetails={integrationDetails}
            toggle={toggle}
            getIntegrationId={getIntegrationId}
          />
        ) : (
          <ExistConnection onClickHandler={onClickHandler} />
        )}
      </TkRow>
    </>
  );
};

export default NetsuiteComponent;
