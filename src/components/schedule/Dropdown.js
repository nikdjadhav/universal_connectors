import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { days, months, options } from "@/utils/Constants";
import React from "react";
import InputBox from "./InputBox";

const Dropdown = ({
  className,
  secondDropdown,
  firstTitle,
  secondTitle,
  thirdTitle,
}) => {
  return (
    <>
      {/* *** "secondDropdown" is used to determine whether to render the second dropdown or not. *** */}
      <TkRow className={className}>
        {secondDropdown && (
          <TkCol lg={1} sm={1} className="align-self-center px-4">
            {firstTitle}
          </TkCol>
        )}

        <TkCol lg={3} sm={3} className="px-1">
          <TkSelect
            id="number"
            name="number"
            // options={options}
            options={secondDropdown ? options : months}
            maxMenuHeight="130px"
          />
        </TkCol>

        {secondDropdown && (
          <>
            <TkCol lg={3} sm={3}>
              <TkSelect
                id="number"
                name="number"
                options={days}
                maxMenuHeight="130px"
              />
            </TkCol>

            <TkCol lg={1} sm={1} className="align-self-center px-0">
              {secondTitle}
            </TkCol>
          </>
        )}

        <TkCol lg={1} sm={1} className="px-0">
          <TkInput type="number" name="days" />
        </TkCol>

        <TkCol lg={2} sm={2} className="align-self-center">
          {thirdTitle}
        </TkCol>
      </TkRow>
    </>
  );
};

export function ThreeDropdowns({ className }) {
  return (
    <>
      <TkRow className={className}>
        <TkCol lg={1} sm={1} className="align-self-center pe-0">
          The
        </TkCol>

        <TkCol lg={3} sm={3} className="px-0">
          <TkSelect
            id="number"
            name="number"
            options={options}
            maxMenuHeight="130px"
          />
        </TkCol>

        <TkCol lg={3} sm={3}>
          <TkSelect
            id="number"
            name="number"
            options={days}
            maxMenuHeight="130px"
          />
        </TkCol>

        <TkCol lg={1} sm={1} className="align-self-center px-3">
          of
        </TkCol>

        <TkCol lg={3} sm={3} className="px-0">
          <TkSelect
            id="number"
            name="number"
            options={months}
            maxMenuHeight="130px"
          />
        </TkCol>
      </TkRow>
    </>
  );
}

export default Dropdown;
