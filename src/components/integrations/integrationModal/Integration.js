import TkButton from "@/globalComponents/TkButton";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import React, { useEffect, useState } from "react";
import { API_BASE_URL, sourceName } from "@/utils/Constants";
import { destinationName } from "@/utils/Constants";
import TkLabel from "@/globalComponents/TkLabel";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/globalComponents/ErrorText";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { TkToastError } from "@/globalComponents/TkToastContainer";
import useFullPageLoader from "@/globalComponents/useFullPageLoader";

const schema = Yup.object({
  integrationName: Yup.string().required("Integration name is required."),
}).required();

const Integration = ({
  onClickHandler,
  syncWay,
  configData,
  toggle,
  getIntegrationDetails,
  integrationID,
}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [integrationsData, setIntegrationsData] = useState();
  const [firstLabel, setFirstTitle] = useState();
  const [secondLabel, setSecondTitle] = useState();
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const queryClient = useQueryClient();

  const updateIntegration = useMutation({
    mutationFn: tkFetch.putWithIdInUrl(`${API_BASE_URL}/updateIntegration`),
  });

  const {
    data: integration,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getIntegrationId", integrationID],
    queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrationById/${integrationID}`),
    enabled: !!integrationID,
  });

  useEffect(() => {
    if (configData && syncWay) {
      setValue("sourceName", { label: configData.source });
      setValue("destinationName", { label: configData.destination });
      if (syncWay === "twoWaySync") {
        setFirstTitle("System One");
        setSecondTitle("System Two");
      } else {
        setFirstTitle("Source");
        setSecondTitle("Destination");
      }
    }
  }, [configData, setValue, syncWay]);

  useEffect(() => {
    if (integrationID) {
      if (integration?.length) {
        setIntegrationsData(integration[0]);
        setValue("integrationName", integration[0]?.integrationName);
        setValue("sourceName", { label: integration[0]?.sourceName });
        setValue("destinationName", { label: integration[0]?.destinationName });

        if (integration[0]?.syncWay === "twoWaySync") {
          setFirstTitle("System One");
          setSecondTitle("System Two");
        } else {
          setFirstTitle("Source");
          setSecondTitle("Destination");
        }
      }
    }
  }, [integration, integrationID, setValue]);

  const onSubmit = (data) => {
    showLoader();
    const userId = sessionStorage.getItem("userId");

    // to update existing integration
    if (integrationID) {
      const updatedIntegration = {
        id: integrationID,
        integrationName: data.integrationName,
        sourceName: data.sourceName.label,
        destinationName: data.destinationName.label,
      };
      updateIntegration.mutate(updatedIntegration, {
        onSuccess: (data) => {
          hideLoader();
          queryClient.invalidateQueries({
            queryKey: ["integrations"],
          });
          onClickHandler();
          // sessionStorage.setItem("integrationId", integrationID);
        },
        onError: (error) => {
          console.log(error)
          hideLoader();
          TkToastError("Error in updating record");
          toggle();
        },
      });
    } else {
      // to add new integration
      const integrationData = {
        userId: JSON.parse(userId),
        integrationName: data.integrationName,
        sourceName: data.sourceName.label,
        destinationName: data.destinationName.label,
        syncWay: syncWay,
      };
      getIntegrationDetails(integrationData);
      hideLoader();
    }
  };

  const OnClickExit = () => {
    toggle();
  };

  return (
    <>
      <TkRow className="justify-content-center">
        <TkCol>
          <TkForm onSubmit={handleSubmit(onSubmit)}>
            <TkRow className="g-3">
              <TkCol lg={12}>
                <TkInput
                  {...register("integrationName")}
                  id="integrationName"
                  type="text"
                  labelName="Integration Name"
                  placeholder="Enter integration name"
                  requiredStarOnLabel={true}
                  invalid={errors.integrationName?.message ? true : false}
                  disabled={integrationsData ? true : false}
                />
                {errors.integrationName?.message ? (
                  <FormErrorText>
                    {errors.integrationName?.message}
                  </FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={12}>
                <Controller
                  name="sourceName"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TkLabel id="sourceName">{firstLabel}</TkLabel>
                      <TkSelect
                        {...field}
                        id="sourceName"
                        options={sourceName}
                        maxMenuHeight="130px"
                        disabled={integrationsData || configData ? true : false}
                      />
                    </>
                  )}
                />
              </TkCol>

              <TkCol lg={12}>
                <Controller
                  name="destinationName"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TkLabel id="destinationName">{secondLabel}</TkLabel>
                      <TkSelect
                        {...field}
                        id="destinationName"
                        options={destinationName}
                        maxMenuHeight="130px"
                        disabled={integrationsData || configData ? true : false}
                      />
                    </>
                  )}
                />
              </TkCol>
            </TkRow>
            <TkRow className="mt-4 justify-content-end">
              <TkCol lg={2}>
                <TkButton
                  type="button"
                  className="btn-success float-end"
                  onClick={OnClickExit}
                >
                  Back
                </TkButton>
              </TkCol>
              <TkCol lg={2}>
                <TkButton type="submit" className="btn-success float-end">
                  Next Step
                </TkButton>
              </TkCol>
            </TkRow>
          </TkForm>
        </TkCol>
        {loader}
      </TkRow>
    </>
  );
};

export default Integration;
