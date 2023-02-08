import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";
import Dropdown, { ThreeDropdowns } from "../Dropdown";
import SingleEvent from "./SingleEvent";

const YearlyEvent = () => {
  return (
    <>
      <h4 className="text-center mb-4">Yearly Event</h4>

      <TkRow className="mb-3">
        <TkCol lg={1} sm={1}>
          <TkRadioButton type="radio" name="yearly" className="mb-3" />
        </TkCol>

        <TkCol lg={11} sm={11}>
        <Dropdown className="mt-n2" />
        </TkCol>
      </TkRow>

      <TkRow>
        <TkCol lg={1} sm={1}>
          <TkRadioButton type="radio" name="yearly" className="mb-3" />
        </TkCol>

        <TkCol lg={11} sm={11}>
          <ThreeDropdowns className="mt-n2" />
        </TkCol>
      </TkRow>

      <SingleEvent />
    </>
  );
};

export default YearlyEvent;


