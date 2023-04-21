import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkForm from "@/globalComponents/TkForm";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { sourceName } from "@/utils/Constants";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object({
  connection: Yup.object().nullable().required("Field is required."),
}).required();

const ExistConnection = ({ onClickHandler }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onClickHandler();
  };
  return (
    <>
      <TkForm onSubmit={handleSubmit(onSubmit)} className="my-3">
        <TkRow>
          <TkCol lg={12} className="my-2">
            <Controller
              name="connection"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  id="connection"
                  labelName="Select Connection"
                  requiredStarOnLabel={true}
                  options={sourceName}
                />
              )}
            />
            {errors.connection?.message ? (
              <FormErrorText>{errors.connection?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={12} className="my-2">
            <TkButton type="submit" className="btn-success float-end">
              Next Step
            </TkButton>
          </TkCol>
        </TkRow>
      </TkForm>
    </>
  );
};

export default ExistConnection;
