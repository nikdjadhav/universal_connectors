import TkButton from "@/globalComponents/TkButton";
import TkContainer from "@/globalComponents/TkContainer";
import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React, { useState } from "react";
import DailyEvent from "./DailyEvent";
import MonthlyEvent from "./MonthlyEvent";
import RealtimeEvent from "./RealtimeEvent";
import SingleEvent from "./SingleEvent";
import WeeklyEvent from "./WeeklyEvent";
import YearlyEvent from "./YearlyEvent";

const EventSchedule = () => {
  const [showComponent, setShowComponent] = useState("realtimeEvent");
  const [realtimeEvent, setRealtimeEvent] = useState(true);
  const [singleEvent, setSingleEvent] = useState(false);
  const [dailyEvent, setDailyEvent] = useState(false);
  const [weeklyEvent, setWeeklyEvent] = useState(false);
  const [monthlyEvent, setMonthlyEvent] = useState(false);
  const [yearlyEvent, setYearlyEvent] = useState(false);

  const toggleComponet = (value) => {
    // console.log("yftdyd",value);
    setShowComponent(value);
    setRealtimeEvent(value === "realtimeEvent" ? true : false);
    setSingleEvent(value === "singleEvent" ? true : false);
    // setDailyEvent(value === "dailyEvent" ? true : false);
    setWeeklyEvent(value === "weeklyEvent" ? true : false);
    // setMonthlyEvent(value === "monthlyEvent" ? true : false);
    // setYearlyEvent(value === "yearlyEvent" ? true : false);
  };

  return (
    <>
      <TkRow className="align-items-end">
        <TkCol lg={2}>
          <h5>Events</h5>
        </TkCol>
      </TkRow>

      {/* *** Radio buttons for selecting event type *** */}
      <TkContainer className="my-5">
        <TkRow>
          <TkCol lg={3} sm={3}>
            <TkButton type="button" className="btn-success btn-sm ms-4 mb-3">
              Sync now
            </TkButton>

            <TkRadioButton
              type="radio"
              name="event"
              label="Realtime Event"
              value="realtimeEvent"
              className="mb-3"
              checked={realtimeEvent}
              onChange={() => toggleComponet("realtimeEvent")}
            >
              Realtime Event
            </TkRadioButton>

            <TkRadioButton
              type="radio"
              name="event"
              label="Single Event"
              value="singleEvent"
              checked={singleEvent}
              className="mb-3"
              onChange={() => toggleComponet("singleEvent")}
            >
              Single Event
            </TkRadioButton>

            {/* <TkRadioButton
              type="radio"
              name="event"
              label="Daily Event"
              value="dailyEvent"
              className="mb-3"
              onClick={() => toggleComponet("dailyEvent")}
            >
              Daily Event
            </TkRadioButton> */}

            <TkRadioButton
              type="radio"
              name="event"
              label="Weekly Event"
              value="weeklyEvent"
              checked={weeklyEvent}
              className="mb-3"
              onChange={() => toggleComponet("weeklyEvent")}
            >
              Weekly Event
            </TkRadioButton>

            {/* <TkRadioButton
              type="radio"
              name="event"
              label="Monthly Event"
              value="monthlyEvent"
              className="mb-3"
              onClick={() => toggleComponet("monthlyEvent")}
            >
              Monthly Event
            </TkRadioButton> */}

            {/* <TkRadioButton
              type="radio"
              name="event"
              label="Yearly Event"
              value="yearlyEvent"
              className="mb-3"
              onClick={() => toggleComponet("yearlyEvent")}
            >
              Yearly Event
            </TkRadioButton> */}
          </TkCol>

          {/* *** Event form *** */}
          <TkCol lg={9} sm={9}>
            {showComponent === "realtimeEvent" ? (
              // <div>Realtime Event</div>
              <RealtimeEvent toggleComponet={toggleComponet} />
            ) : showComponent === "singleEvent" ? (
              <SingleEvent toggleComponet={toggleComponet} />
            ) : showComponent === "dailyEvent" ? (
              <DailyEvent />
            ) : showComponent === "weeklyEvent" ? (
              <WeeklyEvent toggleComponet={toggleComponet} />
            ) : showComponent === "monthlyEvent" ? (
              <MonthlyEvent />
            ) : showComponent === "yearlyEvent" ? (
              <YearlyEvent />
            ) : (
              <SingleEvent />
            )}

            {/* {showComponent === "singleEvent" ? (
              //   <div>Single Event</div>
              <SingleEvent heading="Single Event" />
            ) : showComponent === "dailyEvent" ? (
              <DailyEvent />
            ) : showComponent === "weeklyEvent" ? (
              <WeeklyEvent />
            ) : showComponent === "monthlyEvent" ? (
              <MonthlyEvent />
            ) : showComponent === "yearlyEvent" ? (
              <YearlyEvent />
            ) : (
              <SingleEvent />
            )} */}

            {/* *** common save button for all events *** */}
            {/* <div className="d-flex justify-content-center my-4">
              <TkButton type="submit" className="btn-success">
                Save
              </TkButton>
            </div> */}
          </TkCol>
        </TkRow>

        {/* <TkRow className="justify-content-center">
          <TkCol lg={1} sm={1} className="">
            <TkButton type="submit" className="btn-success">
              Save
            </TkButton>
          </TkCol>
        </TkRow> */}
      </TkContainer>
    </>
  );
};

export default EventSchedule;
