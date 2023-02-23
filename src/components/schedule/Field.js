import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkForm from "@/globalComponents/TkForm";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { integrations } from "@/utils/Constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object({
  integrationName: Yup.object().required("Integration name is required."),
}).required();

const Field = () => {
  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onsubmit = (data) => {
    console.log("data", data);
    router.push("/schedule/event");
  };

  return (
    <>
    <TkForm onSubmit={handleSubmit(onsubmit)}>
        <TkRow className="mt-5 justify-content-center">

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
                  maxMenuHeight="120px"
                  requiredStarOnLabel={true}
                />
              )}
            />
            {errors.integrationName?.message ? (
              <FormErrorText>{errors.integrationName?.message}</FormErrorText>
            ) : null}
          </TkCol>

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

export default Field;
