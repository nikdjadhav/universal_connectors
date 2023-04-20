import TkButton from "@/globalComponents/TkButton";
import TkContainer from "@/globalComponents/TkContainer";
import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React, { useEffect, useState } from "react";
import DailyEvent from "./DailyEvent";
import MonthlyEvent from "./MonthlyEvent";
import RealtimeEvent from "./RealtimeEvent";
import SingleEvent from "./SingleEvent";
import WeeklyEvent from "./WeeklyEvent";
import YearlyEvent from "./YearlyEvent";
import TkForm from "@/globalComponents/TkForm";
import { Controller, useForm } from "react-hook-form";
import TkSelect from "@/globalComponents/TkSelect";
import FormErrorText from "@/globalComponents/ErrorText";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueries } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";

const schema = Yup.object({
  integrationName: Yup.object().required("Integration name is required."),
}).required();

const EventSchedule = () => {
  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showComponent, setShowComponent] = useState("realtimeEvent");
  const [realtimeEvent, setRealtimeEvent] = useState(true);
  const [singleEvent, setSingleEvent] = useState(false);
  const [dailyEvent, setDailyEvent] = useState(false);
  const [weeklyEvent, setWeeklyEvent] = useState(false);
  const [monthlyEvent, setMonthlyEvent] = useState(false);
  const [yearlyEvent, setYearlyEvent] = useState(false);
  const [userId, setUserId] = useState(null);
  const [integrationOptions, setIntegrationOptions] = useState([]);

  const apiResults = useQueries({
    queries: [
      {
        queryKey: ["integrationData", userId],
        // queryFn: tkFetch.get(
        //   `http://localhost:4000/v1/getIntegrations/${userId}`
        // ),
        queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrations/${userId}`),
        enabled: !!userId,
      },
    ]
  })

  const [integrations] = apiResults;
  const {
    isLoading: isIntegrationsLoading,
    isError: isIntegrationsError,
    error: integrationsError,
    data: integrationsData,
  } = integrations;


  useEffect(() => {
    const userID = sessionStorage.getItem("userId");
    // setUserID(sessionStorage.getItem("userId"));

    if (userID) {
      // const id = {
      //   userId: JSON.parse(userID),
      // };
      setUserId(JSON.parse(userID));
      if (integrationsData) {
        console.log("integrationsData==>", integrationsData)
        integrationsData.map((item) => {
          setIntegrationOptions((prev) => [
            ...prev,
            { label: item.integrationName, value: item.id },
          ]);
        });
      }
    }
  }, [integrationsData]);

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

  // useEffect(() => {
  //   setValue("integrationName", "NSGS")
  // },[setValue])

  return (
    <>
      {/* dropdown for select integration */}
      {/* <TkForm onSubmit={handleSubmit(onsubmit)}> */}
        <TkRow className="mt-1">

          <TkCol lg={4}>
            <Controller
              name="integrationName"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="Integration Name"
                  id="integrationName"
                  options={integrationOptions}
                  // defaultValue={integrations[0]}
                  disabled={true}
                  value={integrationOptions[0]}
                  maxMenuHeight="120px"
                  requiredStarOnLabel={true}
                />
              )}
            />
            {errors.integrationName?.message ? (
              <FormErrorText>{errors.integrationName?.message}</FormErrorText>
            ) : null}
          </TkCol>

          {/* <TkCol lg={12} className="d-flex justify-content-center">
            <TkButton
              className="btn-success my-4"
              type="submit"
              // onClick={handleSubmit}
            >
              Next
            </TkButton>
          </TkCol> */}
        </TkRow>
      {/* </TkForm> */}

      {/* Radio buttons for selecting event type */}
      {/* <TkRow className="align-items-end mt-2">
        <TkCol lg={2}>
          <h5>Events</h5>
        </TkCol>
      </TkRow> */}

      <TkContainer className="my-5">
        <TkRow>
          <TkCol lg={3} sm={3}>

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
