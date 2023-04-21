import { TkCardBody } from "@/globalComponents/TkCard";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";

const TopBar = ({ onSearchChange }) => {
  return (
    <>
      <TkCardBody className="table-toolbar mb-4">
        <TkRow className="justify-content-end">
          <TkCol lg={2} className="align-self-end">
            <TkInput
              onChange={onSearchChange}
              placeholder="Search"
              type="text"
            />
          </TkCol>
        </TkRow>
      </TkCardBody>
    </>
  );
};

export default TopBar;
