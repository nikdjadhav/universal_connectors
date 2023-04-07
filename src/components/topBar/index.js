import { TkCardBody } from "@/globalComponents/TkCard";
import TkDate from "@/globalComponents/TkDate";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";

const TopBar = ({ onSearchChange, onDateChange }) => {
  return (
    <>
      <TkCardBody className="table-toolbar mb-4">
        <TkRow className="justify-content-end">
          {/* <TkCol lg={2}>
            <TkDate
              className="form-control"
              placeholder="Select Date Range"
              options={{
                mode: "range",
                dateFormat: "d M, Y",
              }}
              // defaultValue={new Date().toDateString()}
              // value={new Date().toDateString()}
              onChange={onDateChange}
            />
          </TkCol> */}

          <TkCol lg={2} className="align-self-end">
            <TkInput
              onChange={onSearchChange}
              placeholder="Search"
              type="text"
              // isSearchField={true}
            />
          </TkCol>
        </TkRow>
      </TkCardBody>
    </>
  );
};

export default TopBar;
