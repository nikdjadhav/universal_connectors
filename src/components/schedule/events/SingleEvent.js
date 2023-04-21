import TkButton from "@/globalComponents/TkButton";
import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkDate from "@/globalComponents/TkDate";
import TkForm from "@/globalComponents/TkForm";
import TkLabel from "@/globalComponents/TkLabel";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { timeOptions } from "@/utils/Constants";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import FormErrorText from "@/globalComponents/ErrorText";

const schema = Yup.object({
  startDate: Yup.date().required("Start date is required"),

  startTime: Yup.object().required("Start time is required"),
}).required();

const SingleEvent = ({ toggleComponet }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [endDateCheckbox, setEndDateCheckbox] = useState(true);
  const [repeatEveryDay, setRepeatEveryDay] = useState(true);

  useEffect(() => {
    setValue("startDate", new Date());
  }, [setValue]);


  const handleOnChange = (dates) => {
    if (dates) {
      setEndDateCheckbox(false);
    } else {
      setEndDateCheckbox(true);
    }
  };

  const onSubmit = (data) => {
    if (data.endDate) {
      data.noEndDate = false;
    } else {
      data.endDate = null;
      data.noEndDate = true;
    }
    toggleComponet("weeklyEvent");
  };

  const onCancel = () => {
    toggleComponet("realtimeEvent");
  };

  return (
    <>
      <h4 className="text-center mb-4 fw-bold">Single Event</h4>

      <TkForm onSubmit={handleSubmit(onSubmit)}>
        <TkRow>
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

          <TkCol lg={6} sm={6}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="Start Time"
                  id="startTime"
                  className="mb-3"
                  requiredStarOnLabel={true}
                  options={timeOptions}
                  maxMenuHeight="130px"
                />
              )}
            />
            {errors.startTime?.message ? (
              <FormErrorText>{errors.startTime?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={6} sm={6}>
            <TkCheckBox
              {...register("repeatEveryDay")}
              className="form-check-input mb-3"
              type="checkbox"
              id="repeatEveryDay"
              defaultChecked={repeatEveryDay}
            />
            <TkLabel className="form-check-label mx-2 mb-3" id="repeatEveryDay">
              Repeat Every Day
            </TkLabel>
          </TkCol>

          <TkCol lg={12} sm={12}>
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
              className="form-check-input"
              type="checkbox"
              id="noEndDate"
              checked={endDateCheckbox}
              disabled={true}
            />
            <TkLabel className="form-check-label mx-2" id="noEndDate">
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

export default SingleEvent;
