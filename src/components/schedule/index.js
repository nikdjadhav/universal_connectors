import TkButton from "@/globalComponents/TkButton";
import TkContainer from "@/globalComponents/TkContainer";
import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React, { useState } from "react";
import DailyEvent from "./events/DailyEvent";
import MonthlyEvent from "./events/MonthlyEvent";
import SingleEvent from "./events/SingleEvent";
import WeeklyEvent from "./events/WeeklyEvent";
import YearlyEvent from "./events/YearlyEvent";

const EventSchedule = () => {
  const [showComponent, setShowComponent] = useState("singleEvent");
  const [singleEvent, setSingleEvent] = useState(true);
  const [dailyEvent, setDailyEvent] = useState(false);
  const [weeklyEvent, setWeeklyEvent] = useState(false);
  const [monthlyEvent, setMonthlyEvent] = useState(false);
  const [yearlyEvent, setYearlyEvent] = useState(false);

  const toggleComponet = (value) => {
    // console.log(value);
    setShowComponent(value);
    setSingleEvent(value === "singleEvent" ? true : false);
    setDailyEvent(value === "dailyEvent" ? true : false);
    setWeeklyEvent(value === "weeklyEvent" ? true : false);
    setMonthlyEvent(value === "monthlyEvent" ? true : false);
    setYearlyEvent(value === "yearlyEvent" ? true : false);
  };

  return (
    <>
      <h5>Events</h5>

      {/* *** Radio buttons for selecting event type *** */}
      <TkContainer className="my-5">
        <TkRow>
          <TkCol lg={3}>
            <TkRadioButton
              type="radio"
              name="event"
              label="Single Event"
              value="singleEvent"
              className="mb-3"
              checked={singleEvent}
              onClick={() => toggleComponet("singleEvent")}
            >
              Single Event
            </TkRadioButton>

            <TkRadioButton
              type="radio"
              name="event"
              label="Daily Event"
              value="dailyEvent"
              className="mb-3"
              onClick={() => toggleComponet("dailyEvent")}
            >
              Daily Event
            </TkRadioButton>

            <TkRadioButton
              type="radio"
              name="event"
              label="Weekly Event"
              value="weeklyEvent"
              className="mb-3"
              onClick={() => toggleComponet("weeklyEvent")}
            >
              Weekly Event
            </TkRadioButton>

            <TkRadioButton
              type="radio"
              name="event"
              label="Monthly Event"
              value="monthlyEvent"
              className="mb-3"
              onClick={() => toggleComponet("monthlyEvent")}
            >
              Monthly Event
            </TkRadioButton>

            <TkRadioButton
              type="radio"
              name="event"
              label="Yearly Event"
              value="yearlyEvent"
              className="mb-3"
              onClick={() => toggleComponet("yearlyEvent")}
            >
              Yearly Event
            </TkRadioButton>
          </TkCol>

          {/* *** Event form *** */}
          <TkCol lg={9}>
            {showComponent === "singleEvent" ? (
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
            )}

            {/* *** common save button for all events *** */}
            <div className="d-flex justify-content-center my-4">
              <TkButton type="submit" className="btn-success">
                Save
              </TkButton>
            </div>
          </TkCol>
        </TkRow>
      </TkContainer>
    </>
  );
};

export default EventSchedule;
