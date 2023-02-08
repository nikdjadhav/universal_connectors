import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";

const InputBox = ({ className, firstLabel, secondLabel }) => {
  return (
    <>
      <TkRow className={className}>
        <TkCol lg={4} sm={4} className="align-self-center pe-0">
          {firstLabel}
        </TkCol>

        <TkCol lg={2} sm={2} className="px-0">
          <TkInput
            type="number"
            name="repeatEveryDay"
            // min="1"
            // max="365"
          />
        </TkCol>

        <TkCol lg={2} sm={2} className="align-self-center">
          {secondLabel}
        </TkCol>
      </TkRow>
    </>
  );
};

export function TwoInputBoxes({ className }) {
  return (
    <>
      <TkRow className={className}>
        <TkCol lg={1} sm={1} className="align-self-center px-4">
          Day
        </TkCol>

        <TkCol lg={1} sm={1} className="px-0">
          <TkInput
            type="number"
            name="repeatEveryDay"
            // min="1"
            // max="365"
          />
        </TkCol>

        <TkCol lg={2} sm={2} className="align-self-center px-4">
          of every
        </TkCol>

        <TkCol lg={1} sm={1} className="px-0">
          <TkInput
            type="number"
            name="repeatEveryDay"
            // min="1"
            // max="365"
          />
        </TkCol>

        <TkCol lg={2} sm={2} className="align-self-center">
          month(s)
        </TkCol>
      </TkRow>
    </>
  );
}

export default InputBox;
