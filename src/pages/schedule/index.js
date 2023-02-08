import FieldMap from "@/components/mapField/FieldMap";
import TkContainer from "@/components/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import React from "react";

const Schedule = () => {
  return (
    <>
      <TkPageHead>
        <title>{"Schedule"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb pageTitle="Schedule" />

        <TkContainer>
          <FieldMap route="/schedule/event" />
        </TkContainer>
      </div>
    </>
  );
};

export default Schedule;
Schedule.options = {
  layout: true,
  auth: true,
};
