import TkDate from "@/globalComponents/TkDate";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";

const RealtimeEvent = () => {
  return (
    <>
      <h4 className="text-center mb-4 fw-bold"> Realtime Event </h4>

      <TkRow className="justify-content-center">
        <TkCol lg={6} sm={6}>
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
      </TkRow>

      <TkRow className="justify-content-center">
        <TkCol lg={6} sm={6}>
          <TkDate
            labelName="End Date"
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
        </TkCol>
      </TkRow>
    </>
  );
};

export default RealtimeEvent;
