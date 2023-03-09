import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import {
  destinationName,
  integrations,
  recordType,
  sourceName,
} from "@/utils/Constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object({
  integrationName: Yup.object().required("Integration name is required."),
  recordType: Yup.object().required("Record type is required."),
  googleSheetUrl: Yup.string().required("Google sheet url is required."),
}).required();

const FieldMap = () => {
  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("integrationName", integrations[0])
  })

  const router = useRouter();

  const onsubmit = (data) => {
    console.log("data==", data);
    router.push(
      {
        pathname: "/fieldMapping/mapTable",
        // query: { recordType: data.recordType.label },
        query: {recordType: JSON.stringify(data)},
        // query: { recordType: data },
      },
      "/fieldMapping/mapTable"
    );
  };

  // const handleSubmit = () => {
  //   router.push(route);
  // };

  return (
    <>
      <TkForm onSubmit={handleSubmit(onsubmit)}>
        <TkRow className="mt-5 justify-content-center">
          {/* <TkCol lg={4}>
          <TkSelect
            id="sourceName"
            name="sourceName"
            labelName="Source Integration Name"
            options={sourceName}
            maxMenuHeight="120px"
          />
        </TkCol> */}

          <TkCol lg={4}>
            <Controller
              name="integrationName"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="Integration Name"
                  id="integrationName"
                  options={integrations}
                  // defaultValue={integrations[0]}
                  disabled={true}
                  maxMenuHeight="120px"
                  requiredStarOnLabel={true}
                />
              )}
            />
            {errors.integrationName?.message ? (
              <FormErrorText>{errors.integrationName?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={4}>
            <Controller
              name="recordType"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="NetSuite™ Record Type"
                  id="recordType"
                  options={recordType}
                  maxMenuHeight="120px"
                  requiredStarOnLabel={true}
                />
              )}
            />
            {errors.recordType?.message ? (
              <FormErrorText>{errors.recordType?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={4}>
            <TkInput
              {...register("googleSheetUrl")}
              id="googleSheetUrl"
              type="text"
              labelName="Google Sheets™ Url"
              placeholder="Enter Google Sheets™ url"
              requiredStarOnLabel={true}
              invalid={errors.googleSheetUrl?.message ? true : false}
              // className={errors.integrationName?.message && "form-control is-invalid"}
            />
            {errors.googleSheetUrl?.message ? (
              <FormErrorText>{errors.googleSheetUrl?.message}</FormErrorText>
            ) : null}
          </TkCol>
          {/* </TkRow> */}

          {/* <TkRow className="mt-3 justify-content-center"> */}
          <TkCol lg={12} className="d-flex justify-content-center">
            <TkButton
              className="btn-success my-4"
              type="submit"
              // onClick={handleSubmit}
            >
              Next
            </TkButton>
          </TkCol>
        </TkRow>
      </TkForm>
    </>
  );
};

export default FieldMap;
