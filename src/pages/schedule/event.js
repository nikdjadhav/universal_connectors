import EventSchedule from "@/components/schedule/events";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import React from "react";

const Event = () => {
  return (
    <>
      <TkPageHead>
        <title>{"Event"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          parentTitle="Schedule"
          parentLink="/schedule"
          pageTitle="Event"
        />

        <EventSchedule />
      </div>
    </>
  );
};

export default Event;
Event.options = {
  layout: true,
  auth: true,
};
