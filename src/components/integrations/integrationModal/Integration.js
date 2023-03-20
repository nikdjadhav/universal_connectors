import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import React, { useEffect, useState } from "react";
import { API_BASE_URL, genderOptions, sourceName } from "@/utils/Constants";
import { destinationName } from "@/utils/Constants";
import Select from "react-select";
import TkLabel from "@/globalComponents/TkLabel";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/globalComponents/ErrorText";
import { useMutation } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";

const schema = Yup.object({
  integrationName: Yup.string().required("Integration name is required."),

  // sourceName: Yup.object().required("Field is required."),

  // destinationName: Yup.object().required("Field is required."),
}).required();

const Integration = ({
  onClickHandeler,
  syncWay,
  configData,
  toggle,
  ...other
}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [integrationsData, setIntegrationsData] = useState();
  const [integrationID, setIntegrationID] = useState();

  const integration = useMutation({
    // mutationFn: tkFetch.post("http://localhost:4000/v1/getIntegrationById"),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getIntegrationById`),

  });
  console.log("int==>",other);

  useEffect(() => {
    if (other.integrationID) {
      const id = {
        id: JSON.parse(other.integrationID),
      };
      integration.mutate(id, {
        onSuccess: (data) => {
          console.log("data",  sourceName);
          setIntegrationsData(data);
          setIntegrationID(data[0]?.id);
          setValue("integrationName", data[0]?.integrationName);
          setValue("sourceName", { label: data[0]?.sourceName });
          setValue("destinationName", { label: data[0]?.destinationName });

          if (data[0]?.syncWay === "twoWaySync") {
            setFirstTitle("System One");
            setSecondTitle("System Two");
          } else {
            setFirstTitle("Source");
            setSecondTitle("Destination");
          }
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    }
  }, []);

  // console.log('integration',configData.source.label,configData.destination.label);
  const [firstLabel, setFirstTitle] = useState();
  const [secondLabel, setSecondTitle] = useState();

  useEffect(() => {
    if (syncWay === "twoWaySync") {
      setFirstTitle("System One");
      setSecondTitle("System Two");
    } else {
      setFirstTitle("Source");
      setSecondTitle("Destination");
    }

    if (configData) {
      setValue("sourceName", { label: configData.source });
      setValue("destinationName", { label: configData.destination });
      // setValue("integrationName", configData.integrationName)
      // setValue("sourceName", { label: configData.source.label } || { label: configData.source });
      // setValue("destinationName", { label: configData.destination.label } || { label: configData.destination });
    }
  }, [configData, setValue, syncWay]);

  const addIntegration = useMutation({
    // mutationFn: tkFetch.post("http://localhost:4000/v1/addIntegration"),
    mutationFn: tkFetch.post(`${API_BASE_URL}/addIntegration`),
  });

  const onSubmit = (data) => {
    // console.log("integration nav submitted data", data);
    const userId = sessionStorage.getItem("userId");
    const integrationData = {
      userId: JSON.parse(userId),
      integrationName: data.integrationName,
      sourceName: data.sourceName.label,
      destinationName: data.destinationName.label,
      syncWay: syncWay,
    };
    addIntegration.mutate(integrationData, {
      onSuccess: (data) => {
        // console.log("ittegration added==>", data);
        setIntegrationID(data[0]?.id);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });

    // console.log("integration nav submitted data", integrationData);
    onClickHandeler();
  };

  const OnClickExit = () => {
    // history.back();
    toggle();
  };

  console.log("integrationsData", integrationsData);

  return (
    <>
      <TkRow className="justify-content-center">
        <TkCol>
          {/* <TkCard>
            <TkCardBody> */}
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
                  // className={errors.integrationName?.message && "form-control is-invalid"}
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
                        // labelName="Source Name"
                        options={sourceName}
                        // defaultValue={sourceName[0]}
                        maxMenuHeight="130px"
                        disabled={true}
                        // disabled={integrationsData ? true : false}
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
                        // labelName="Destination Name"
                        id="destinationName"
                        options={destinationName}
                        // defaultValue={destinationName[0]}
                        maxMenuHeight="130px"
                        disabled={true}
                        // disabled={integrationsData ? true : false}
                      />
                    </>
                  )}
                />
              </TkCol>

              {/* <TkCol lg={12}>
                    <TkButton type="submit" className="btn btn-success">
                      Authorize
                    </TkButton>
                  </TkCol> */}
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
                <TkButton
                  type="submit"
                  className="btn-success float-end"
                  // onClick={onClickHandeler}
                >
                  Next Step
                </TkButton>
              </TkCol>
            </TkRow>
          </TkForm>
          {/* </TkCardBody>
          </TkCard> */}
        </TkCol>
      </TkRow>
    </>
  );
};

export default Integration;
