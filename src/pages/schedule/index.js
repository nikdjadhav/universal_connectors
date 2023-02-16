import FieldMap from "@/components/mapField/FieldMap";
import TkContainer from "@/components/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import React from "react";
import FieldMapping from '@/components/mapField';
import { useRouter } from "next/router";

const Schedule = () => {
  const router = useRouter();
  const addSchedule = () => {
    router.push("/schedule/field")
  }
  return (
    <>
      <TkPageHead>
        <title>{"Schedule"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb 
        pageTitle="Schedule"
        buttonText={"Add Schedule"}
        onButtonClick={addSchedule}
         />

        <TkContainer>
        <FieldMapping />
          {/* <FieldMap route="/schedule/event" /> */}
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
