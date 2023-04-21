import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";
import InputBox from "../InputBox";
import SingleEvent from "./SingleEvent";

const DailyEvent = () => {
  return (
    <>
      <h4 className="text-center mb-4 fw-bold">Daily Event</h4>

      <TkRow>
        <TkCol lg={1} sm={1}>
          <TkRadioButton
            type="radio"
            name="daily"
            label="Repeat Every Day(s)"
            value="repeatEveryDay"
            className="mb-3"
          ></TkRadioButton>
        </TkCol>
        <TkCol lg={5} sm={5} className="ms-n4">
          <InputBox
            firstLabel="Repeat Every"
            secondLabel="Day(s)"
            className="mt-n2"
          />
        </TkCol>

        <TkCol lg={12} sm={12}>
          <TkRadioButton
            type="radio"
            name="daily"
            label="Repeat Every Weekday"
            value="repeatEveryWeekday"
            className="mb-3 me-4"
          >
            Repeat Every Weekday
          </TkRadioButton>
        </TkCol>
      </TkRow>

      <SingleEvent />
    </>
  );
};

export default DailyEvent;
