import TkContainer from "@/globalComponents/TkContainer";
import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React, { useEffect, useState } from "react";
import RealtimeEvent from "./RealtimeEvent";
import SingleEvent from "./SingleEvent";
import WeeklyEvent from "./WeeklyEvent";
import { Controller, useForm } from "react-hook-form";
import TkSelect from "@/globalComponents/TkSelect";
import FormErrorText from "@/globalComponents/ErrorText";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";
import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkLabel from "@/globalComponents/TkLabel";
import { useRouter } from "next/router";
import TkInput from "@/globalComponents/TkInput";
import TkForm from "@/globalComponents/TkForm";
import TkButton from "@/globalComponents/TkButton";

const schema = Yup.object({
  integrationName: Yup.object().nullable().required("Integration is required."),
  mappedRecords: Yup.object().nullable().required("Mapped record is required."),
}).required();

const EventSchedule = () => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [showComponent, setShowComponent] = useState("realtimeEvent");
  const [realtimeEvent, setRealtimeEvent] = useState(true);
  const [singleEvent, setSingleEvent] = useState(false);
  const [weeklyEvent, setWeeklyEvent] = useState(false);
  const [userId, setUserId] = useState();
  const [integrationOptions, setIntegrationOptions] = useState([]);
  const [mappedRecordOptions, setMappedRecordOptions] = useState([]);
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [mappedRecordId, setMappedRecordId] = useState(null);
  const [integrationId, setIntegrationId] = useState();
  const queryClient = useQueryClient();
  const apiResults = useQueries({
    queries: [
      {
        queryKey: ["integrationData", userId],
        queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrations/${userId}`),
        enabled: !!userId,
      },
      {
        queryKey: ["mappedRecordData", integrationId],
        queryFn: tkFetch.get(`${API_BASE_URL}/getMappedRecordByIntegrationId`, {
          params: integrationId,
        }),
        enabled: !!integrationId,
      },
    ],
  });

  const [integrations, getMappedRecordData] = apiResults;
  const {
    isLoading: isIntegrationsLoading,
    isError: isIntegrationsError,
    error: integrationsError,
    data: integrationsData,
  } = integrations;
  const {
    isLoading: isMappedRecordDataLoading,
    isError: isMappedRecordDataError,
    error: mappedRecordDataError,
    data: mappedRecordData,
  } = getMappedRecordData;

  useEffect(() => {
    const userID = sessionStorage.getItem("userId");

    if (userID) {
      setUserId(JSON.parse(userID));
      if (integrationsData) {
        if (integrationsData.length === 1) {
          setValue("integrationName", {
            label: integrationsData[0].integrationName,
            value: integrationsData[0].id,
          });

          setIntegrationId({
            id: userId,
            integrationId: integrationsData[0].id,
          });
        }

        setIntegrationOptions(
          integrationsData.map((item) => ({
            label: item.integrationName,
            value: item.id,
          }))
        );
      }
    }
  }, [integrationsData, setValue, userId]);

  useEffect(() => {
    if (mappedRecordData) {
      if (mappedRecordData.length === 1) {
        setValue("mappedRecords", {
          label: mappedRecordData[0].name,
          value: mappedRecordData[0].id,
        });
        setMappedRecordId(mappedRecordData[0].id);
      }

      setMappedRecordOptions(
        mappedRecordData?.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
  }, [mappedRecordData, setValue]);

  const toggleComponet = (value) => {
    setShowComponent(value);
    setRealtimeEvent(value === "realtimeEvent" ? true : false);
    setSingleEvent(value === "singleEvent" ? true : false);
    setWeeklyEvent(value === "weeklyEvent" ? true : false);
  };

  const onClickFilter = (data) => {
    router.push(`/schedule/${mappedRecordId}`);
  };

  const onChangeIntegration = (e) => {
    queryClient.invalidateQueries({
      queryKey: ["mappedRecordData", integrationId],
    });
    setValue("mappedRecords", null);
    if (e) {
      setIntegrationId({
        id: userId,
        integrationId: e.value,
      });
    }
  };

  return (
    <>
      <TkForm onSubmit={handleSubmit(onClickFilter)}>
        <TkRow className="my-1">
          <TkCol lg={4}>
            <Controller
              name="integrationName"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="Integration"
                  id="integrationName"
                  options={integrationOptions}
                  maxMenuHeight="120px"
                  requiredStarOnLabel={true}
                  onChange={(e) => {
                    field.onChange(e);
                    onChangeIntegration(e);
                  }}
                />
              )}
            />
            {errors.integrationName?.message ? (
              <FormErrorText>{errors.integrationName?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={4}>
            <Controller
              name="mappedRecords"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="Mapped Records"
                  id="mappedRecords"
                  options={mappedRecordOptions}
                  maxMenuHeight="120px"
                  requiredStarOnLabel={true}
                  onChange={(e) => {
                    field.onChange(e);
                    if (e) {
                      setMappedRecordId(e.value);
                    }
                  }}
                />
              )}
            />
            {errors.mappedRecords?.message ? (
              <FormErrorText>{errors.mappedRecords?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={4}>
            <TkLabel htmlFor="filter" requiredStarOnLabel={true}>
              How can we find existing records
            </TkLabel>

            <div className="d-flex">
              <TkInput
                {...register("filter")}
                id="filter"
                type="text"
                disabled={true}
              />
              {/* btn-light */}
              <TkButton className="btn btn-light" type="submit">
                <i className="ri-filter-2-fill" />
              </TkButton>
            </div>
          </TkCol>
        </TkRow>
      </TkForm>

      <TkRow className="my-1">
        <TkCol lg={1}>
          <TkLabel className="my-2">Operations :</TkLabel>
        </TkCol>

        <TkCol lg={3} className="d-flex align-self-center">
          <TkRadioButton
            type="radio"
            name="operations"
            label="Add Operation"
            value="addOperation"
            className="me-2"
          >
            Add
          </TkRadioButton>

          <TkRadioButton
            type="radio"
            name="operations"
            label="Update Operation"
            value="updateOperation"
            className="mx-1"
          >
            Update
          </TkRadioButton>

          <TkRadioButton
            type="radio"
            name="operations"
            label="Delete Operation"
            value="deleteOperation"
            className="mx-1"
          >
            Delete
          </TkRadioButton>
        </TkCol>
      </TkRow>
      <hr />

      <TkRow className="mt-2">
        <TkCol lg={4}>
          <TkCheckBox
            {...register("realtime")}
            type="checkbox"
            id="realtime"
            checked={checkBoxValue}
            onChange={() => setCheckBoxValue(!checkBoxValue)}
          />
          <TkLabel id="realtime" className="form-check-label mx-2 h5">
            Realtime
          </TkLabel>
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
              disabled={checkBoxValue}
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
              disabled={checkBoxValue}
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
              disabled={checkBoxValue}
            >
              Weekly Event
            </TkRadioButton>
          </TkCol>

          <TkCol lg={9} sm={9}>
            {showComponent === "realtimeEvent" ? (
              <RealtimeEvent
                toggleComponet={toggleComponet}
                checkBoxValue={checkBoxValue}
              />
            ) : showComponent === "singleEvent" ? (
              <SingleEvent toggleComponet={toggleComponet} />
            ) : showComponent === "weeklyEvent" ? (
              <WeeklyEvent toggleComponet={toggleComponet} />
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
