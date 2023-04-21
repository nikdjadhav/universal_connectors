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
import { Controller, useForm } from "react-hook-form";
import TkSelect from "@/globalComponents/TkSelect";
import FormErrorText from "@/globalComponents/ErrorText";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueries } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";
import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkLabel from "@/globalComponents/TkLabel";

const schema = Yup.object({
  integrationName: Yup.object().required("Integration name is required."),
}).required();

const EventSchedule = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showComponent, setShowComponent] = useState("realtimeEvent");
  const [realtimeEvent, setRealtimeEvent] = useState(true);
  const [singleEvent, setSingleEvent] = useState(false);
  const [weeklyEvent, setWeeklyEvent] = useState(false);
  const [userId, setUserId] = useState(null);
  const [integrationOptions, setIntegrationOptions] = useState([]);
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  const apiResults = useQueries({
    queries: [
      {
        queryKey: ["integrationData", userId],
        queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrations/${userId}`),
        enabled: !!userId,
      },
    ],
  });

  const [integrations] = apiResults;
  const {
    isLoading: isIntegrationsLoading,
    isError: isIntegrationsError,
    error: integrationsError,
    data: integrationsData,
  } = integrations;

  useEffect(() => {
    const userID = sessionStorage.getItem("userId");

    if (userID) {
      setUserId(JSON.parse(userID));
      if (integrationsData) {
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
    setShowComponent(value);
    setRealtimeEvent(value === "realtimeEvent" ? true : false);
    setSingleEvent(value === "singleEvent" ? true : false);
    setWeeklyEvent(value === "weeklyEvent" ? true : false);
  };

  return (
    <>
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
      </TkRow>

      <TkRow className="mt-2">
        <TkCol lg={4}>
          <TkCheckBox 
          {...register("realtime")}
          type="checkbox"
          id="realtime"
          checked={checkBoxValue}
          onChange={() => setCheckBoxValue(!checkBoxValue)}
          />
          <TkLabel id="realtime" className="form-check-label mx-2 h5">Realtime</TkLabel>
        </TkCol>
      </TkRow>

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
              disabled={checkBoxValue ? true : false}
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
              disabled={checkBoxValue ? true : false}
            >
              Single Event
            </TkRadioButton>

            <TkRadioButton
              type="radio"
              name="event"
              label="Weekly Event"
              value="weeklyEvent"
              checked={weeklyEvent}
              className="mb-3"
              onChange={() => toggleComponet("weeklyEvent")}
              disabled={checkBoxValue ? true : false}
            >
              Weekly Event
            </TkRadioButton>
          </TkCol>

          <TkCol lg={9} sm={9}>
            {showComponent === "realtimeEvent" ? (
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
          </TkCol>
        </TkRow>
      </TkContainer>
    </>
  );
};

export default EventSchedule;
