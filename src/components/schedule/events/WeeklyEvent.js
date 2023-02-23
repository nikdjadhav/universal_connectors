import TkButton from "@/globalComponents/TkButton";
import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkDate from "@/globalComponents/TkDate";
import TkForm from "@/globalComponents/TkForm";
import TkLabel from "@/globalComponents/TkLabel";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { days, timeOptions } from "@/utils/Constants";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorText from "@/globalComponents/ErrorText";

const schema = Yup.object({
  startDate: Yup.date().required("Start date is required"),

  startTime: Yup.object().required("Start time is required"),

  days: Yup.object().required("Day is required"),
}).required();

const WeeklyEvent = ({ toggleComponet }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isDirty) {
      setValue("startDate", new Date());
    }
  }, [isDirty, setValue]);

  const [checkboxValue, setCheckboxValue] = useState(true);
  // const [disableEndDate, setDisableEndDate] = useState(true);

  const handleOnChange = (dates) => {
    console.log("value", dates);
    if (dates) {
      setCheckboxValue(false);
      // console.log('data');
    } else {
      setCheckboxValue(true);
      // console.log('null');
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    if (data.endDate) {
      // console.log('end date');
      data.noEndDate = false;
    } else {
      // console.log('no end date');
      data.noEndDate = true;
    }
  };

  const onCancel = () => {
    toggleComponet("singleEvent");
  };

  return (
    <>
      <h4 className="text-center mb-4 fw-bold">Weekly Event</h4>

      <TkForm className="mb-4" onSubmit={handleSubmit(onSubmit)}>
        <TkRow>
          <TkCol lg={5} sm={5} className="mb-2 fw-bold">
            Repeat Every 1 Week
            {/* <InputBox
            className="mb-2"
            firstLabel="Repeat Every"
            secondLabel="Week(s)"
          /> */}
          </TkCol>
        </TkRow>

        {/* <TkRow>
        <TkCol lg={4} className="my-1">
          <TkCheckBox
            className="form-check-input"
            type="checkbox"
            id="sunday"
          />
          <TkLabel className="form-check-label mx-2" id="sunday">
            Sunday
          </TkLabel>
        </TkCol>

        <TkCol lg={4} className="my-1">
          <TkCheckBox
            className="form-check-input"
            type="checkbox"
            id="monday"
          />
          <TkLabel className="form-check-label mx-2" id="monday">
            Monday
          </TkLabel>
        </TkCol>
        <TkCol lg={4} className="my-1">
          <TkCheckBox
            className="form-check-input"
            type="checkbox"
            id="tuesday"
          />
          <TkLabel className="form-check-label mx-2" id="tuesday">
            Tuesday
          </TkLabel>
        </TkCol>

        <TkCol lg={4} className="my-1">
          <TkCheckBox
            className="form-check-input"
            type="checkbox"
            id="wednesday"
          />
          <TkLabel className="form-check-label mx-2" id="wednesday">
            Wednesday
          </TkLabel>
        </TkCol>

        <TkCol lg={4} className="my-1">
          <TkCheckBox
            className="form-check-input"
            type="checkbox"
            id="thursday"
          />
          <TkLabel className="form-check-label mx-2" id="thursday">
            Thursday
          </TkLabel>
        </TkCol>

        <TkCol lg={4} className="my-1">
          <TkCheckBox
            className="form-check-input"
            type="checkbox"
            id="friday"
          />
          <TkLabel className="form-check-label mx-2" id="friday">
            Friday
          </TkLabel>
        </TkCol>

        <TkCol lg={4} className="my-1">
          <TkCheckBox
            className="form-check-input"
            type="checkbox"
            id="saturday"
          />
          <TkLabel className="form-check-label mx-2" id="saturday">
            Saturday
          </TkLabel>
        </TkCol>
      </TkRow> */}
        <TkRow>
          <TkCol lg={4} sm={4}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <TkDate
                  {...field}
                  labelName="Start Date"
                  id="startDate"
                  // name="startDate"
                  placeholder="Start Date"
                  className="mb-3"
                  requiredStarOnLabel={true}
                  options={{
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

          <TkCol lg={4} sm={4}>
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

          <TkCol lg={4} sm={4}>
            <Controller
              name="days"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="Days"
                  id="days"
                  className="mb-3"
                  options={days}
                  maxMenuHeight="130px"
                  requiredStarOnLabel={true}
                />
              )}
            />
            {errors.days?.message ? (
              <FormErrorText>{errors.days?.message}</FormErrorText>
            ) : null}
          </TkCol>
        </TkRow>

        <TkRow>
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
                  // disabled={disableEndDate}
                  onChange={(e) => {
                    handleOnChange(e);
                    field.onChange(e);
                  }}
                  options={{
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
              disabled={true}
              // onChange={handleOnChange}
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
          {/* <TkCol lg={2} sm={4} className="">
            <TkButton type="button" className="btn-success">
              Sync now
            </TkButton>
          </TkCol> */}

          <TkCol lg={2} sm={4} className="">
            <TkButton type="button" onClick={onCancel} className="btn-success">
              Cancel
            </TkButton>
          </TkCol>
        </TkRow>
      </TkForm>

      {/* <SingleEvent /> */}

      {/* <div className="d-flex justify-content-center my-4">
        <TkButton type="submit" className="btn-success">
          Save
        </TkButton>
      </div> */}
    </>
  );
};

export default WeeklyEvent;
