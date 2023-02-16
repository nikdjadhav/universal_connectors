import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import React, { useEffect, useState } from "react";
import { genderOptions, sourceName } from "@/utils/Constants";
import { destinationName } from "@/utils/Constants";
import Select from "react-select";
import TkLabel from "@/globalComponents/TkLabel";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/globalComponents/ErrorText";

const schema = Yup.object({
  integrationName: Yup.string().required("Integration name is required."),

  // sourceName: Yup.object().required("Field is required."),

  // destinationName: Yup.object().required("Field is required."),
}).required();

const Integration = ({ onClickHandeler, syncWay, configData }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      setValue("sourceName",{label: configData.source.label});
      setValue("destinationName", {label: configData.destination.label});
    }
  });

  const onSubmit = (data) => {
    console.log("integration nav submitted data", data);
    onClickHandeler();
  };

  return (
    <>
      <TkRow className="justify-content-center">
        <TkCol>
          <TkCard>
            <TkCardBody>
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
                            defaultValue={sourceName[0]}
                            maxMenuHeight="130px"
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
                            maxMenuHeight="130px"
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

                  <TkCol lg={12}>
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
            </TkCardBody>
          </TkCard>
        </TkCol>
      </TkRow>
    </>
  );
};

export default Integration;