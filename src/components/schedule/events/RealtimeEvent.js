import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkDate from "@/globalComponents/TkDate";
import TkForm from "@/globalComponents/TkForm";
import TkLabel from "@/globalComponents/TkLabel";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object({
  startDate: Yup.date().nullable().required("Start date is required"),
}).required();

const RealtimeEvent = ({ toggleComponet }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [checkboxValue, setCheckboxValue] = useState(false);
  useEffect(() => {
    setValue("startDate", new Date());
    setValue("endDate", new Date());
  }, [setValue]);

  const handleOnChange = (dates) => {
    if (dates) {
      setCheckboxValue(false);
    } else {
      setCheckboxValue(true);
    }
  };

  const handleOnChangeCheckbox = (e) => {
    if (e.target.checked) {
      setCheckboxValue(true);
      setValue("endDate", null);
    } else {
      setCheckboxValue(false);
      setValue("endDate", new Date());
    }
  };

  const onSubmit = (data) => {
    if (data.endDate) {
      data.noEndDate = false;
      setCheckboxValue(false);
    } else {
      // data.endDate = null;
      data.noEndDate = true;
      setCheckboxValue(true);
    }
    toggleComponet("singleEvent");
  };
  const onCancel = () => {
    history.back();
  };

  return (
    <>
      <h4 className="text-center mb-4 fw-bold"> Realtime Event </h4>

      <TkForm className="mb-4" onSubmit={handleSubmit(onSubmit)}>
        <TkRow className="justify-content-center">
          <TkCol lg={6} sm={6}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <TkDate
                  {...field}
                  labelName="Start Date"
                  id="startDate"
                  placeholder="Start Date"
                  className="mb-3"
                  requiredStarOnLabel={true}
                  options={{
                    minDate: "today",
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "d M, Y",
                  }}
                />
              )}
            />
            {errors.startDate?.message ? (
              <FormErrorText>{errors.startDate?.message}</FormErrorText>
            ) : null}
          </TkCol>
        </TkRow>

        <TkRow className="justify-content-center">
          <TkCol lg={6} sm={6}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <TkDate
                  {...field}
                  labelName="End By"
                  id="endDate"
                  placeholder="End Date"
                  className="mb-3"
                  onChange={(e) => {
                    handleOnChange(e);
                    field.onChange(e);
                  }}
                  options={{
                    minDate: "today",
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "d M, Y",
                  }}
                />
              )}
            />

            <TkCheckBox
              {...register("noEndDate")}
              className="form-check-input mb-3"
              type="checkbox"
              id="noEndDate"
              checked={checkboxValue}
              // disabled={true}
              onChange={handleOnChangeCheckbox}
            />
            <TkLabel className="form-check-label mx-2 mb-3" id="noEndDate">
              No End Date
            </TkLabel>
          </TkCol>
        </TkRow>

        <TkRow className="justify-content-center mt-2">
          <TkCol lg={1} sm={2} className="">
            <TkButton type="submit" className="btn-success">
              Save
            </TkButton>
          </TkCol>

          <TkCol lg={2} sm={4} className="">
            <TkButton type="button" onClick={onCancel} className="btn-success">
              Cancel
            </TkButton>
          </TkCol>
        </TkRow>
      </TkForm>
    </>
  );
};

export default RealtimeEvent;
