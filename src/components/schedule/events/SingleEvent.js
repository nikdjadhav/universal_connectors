import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkDate from "@/globalComponents/TkDate";
import { TkDropdown } from "@/globalComponents/TkDropdown";
import TkInput from "@/globalComponents/TkInput";
import TkLabel from "@/globalComponents/TkLabel";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { repeatOptions, timeOptions } from "@/utils/Constants";
import React, { Children } from "react";

const SingleEvent = ({ heading }) => {
  return (
    <>
      <h4 className="text-center mb-4">{ heading }</h4>

      <TkRow>
        <TkCol lg={4} sm={4} >
          <TkDate
            labelName="Start Date"
            id="startDate"
            name="startDate"
            placeholder="Start Date"
            className="mb-3"
            requiredStarOnLabel={true}
            options={{
              altInput: true,
              altFormat: "d M, Y",
              dateFormat: "d M, Y",
            }}
          />
        </TkCol>

        <TkCol lg={4} sm={4}>
          <TkSelect
            labelName="Start Time"
            id="startTime"
            name="startTime"
            className="mb-3"
            options={timeOptions}
            maxMenuHeight="130px"
          />
        </TkCol>

        <TkCol lg={4} sm={4}>
          <TkSelect
            labelName="Repeat"
            id="repeat"
            name="repeat"
            className="mb-3"
            options={repeatOptions}
            maxMenuHeight="130px"
          />
        </TkCol>

        <TkCol lg={12} sm={12}>
          <TkDate
            labelName="End By"
            id="endDate"
            name="endDate"
            placeholder="End Date"
            className="mb-3"
            options={{
              altInput: true,
              altFormat: "d M, Y",
              dateFormat: "d M, Y",
            }}
          />

          <TkCheckBox
            className="form-check-input"
            type="checkbox"
            id="noEndDate"
          />
          <TkLabel className="form-check-label mx-2" id="noEndDate">
            No End Date
          </TkLabel>
        </TkCol>
      </TkRow>
    </>
  );
};

export default SingleEvent;
