import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";
import Dropdown from "../Dropdown";
import { TwoInputBoxes } from "../InputBox";
import SingleEvent from "./SingleEvent";

const MonthlyEvent = () => {
  return (
    <>
      <h4 className="text-center mb-4 fw-bold">Monthly Event</h4>

      <TkRow className="mb-3">
        <TkCol lg={1} sm={1}>
          <TkRadioButton type="radio" name="monthly" className="mb-3" />
        </TkCol>

        <TkCol lg={11} sm={11} className="mb-3 ms-n5">
          <TwoInputBoxes className="mt-n2" />
        </TkCol>
      </TkRow>

      <TkRow>
        <TkCol lg={1} sm={1}>
          <TkRadioButton
            type="radio"
            name="monthly"
            label="day"
            className="mb-3"
          />
        </TkCol>

        <TkCol lg={11} sm={11} className="ms-n5">
          <Dropdown
            className="mt-n2"
            firstTitle="The"
            secondTitle="of every"
            thirdTitle="month(s)"
            secondDropdown={true}
          />
        </TkCol>
      </TkRow>

      <SingleEvent />
    </>
  );
};

export default MonthlyEvent;
