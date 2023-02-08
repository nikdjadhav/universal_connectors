import TkButton from "@/globalComponents/TkButton";
import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";
import Dropdown, { ThreeDropdowns } from "../Dropdown";
import SingleEvent from "./SingleEvent";

const YearlyEvent = () => {
  return (
    <>
      <h4 className="text-center mb-4 fw-bold">Yearly Event</h4>

      <TkRow className="mb-3">
        <TkCol lg={1} sm={1}>
          <TkRadioButton type="radio" name="yearly" className="mb-3" />
        </TkCol>

        <TkCol lg={11} sm={11}>
          <Dropdown className="mt-n2 ms-n5" />
        </TkCol>
      </TkRow>

      <TkRow>
        <TkCol lg={1} sm={1}>
          <TkRadioButton type="radio" name="yearly" className="mb-3" />
        </TkCol>

        <TkCol lg={11} sm={11}>
          <ThreeDropdowns className="mt-n2 ms-n5" />
        </TkCol>
      </TkRow>

      <SingleEvent />

      {/* <div className="d-flex justify-content-center my-4">
        <TkButton type="submit" className="btn-success">
          Save
        </TkButton>
      </div> */}
    </>
  );
};

export default YearlyEvent;
