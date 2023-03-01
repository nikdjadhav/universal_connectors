import TkButton from "@/globalComponents/TkButton";
import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkDate from "@/globalComponents/TkDate";
import TkForm from "@/globalComponents/TkForm";
import TkLabel from "@/globalComponents/TkLabel";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { repeatOptions, timeOptions } from "@/utils/Constants";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import FormErrorText from "@/globalComponents/ErrorText";

const schema = Yup.object({
  startDate: Yup.date().
  required("Start date is required"),

  startTime: Yup.object().
  required("Start time is required"),
}).required();

const SingleEvent = ({toggleComponet}) => {
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const [endDateCheckbox, setEndDateCheckbox] = useState(true);
  // const [disableEndDate, setDisableEndDate] = useState(true);
  const [repeatEveryDay, setRepeatEveryDay] = useState(true);

  useEffect(() => {
    setValue("startDate", new Date)
  },[setValue])

  const repeatValue = (e) => {
    console.log('value', e.target.value);
  }

  const handleOnChange = (dates) => {
    console.log("value", dates);
    if (dates) {
      setEndDateCheckbox(false);
      // console.log('data');
    } else {
      setEndDateCheckbox(true);
      // console.log('null');
    }
    // if (e.target.checked) {
    //   setEndDateCheckbox(true);
    //   setDisableEndDate(true);
    //   setValue("endDate", null);
    // } else {
    //   setEndDateCheckbox(false);
    //   setDisableEndDate(false);
    // }
  };

  const onSubmit = (data) => {
    console.log("data", data);
    if(data.endDate){
      // console.log('end date');
      data.noEndDate = false;
    }else{
      // console.log('no end date');
      data.noEndDate = true;
    }
    toggleComponet("weeklyEvent")
  };

  const onCancel = () => {
    toggleComponet("realtimeEvent");
    // history.back();
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
              // onChange={repeatValue}
            />
            <TkLabel className="form-check-label mx-2 mb-3" id="repeatEveryDay">
              Repeat Every Day
            </TkLabel>
          </TkCol>

          {/* <TkCol lg={4} sm={4}>
          <TkSelect
            labelName="Repeat"
            id="repeat"
            name="repeat"
            className="mb-3"
            options={repeatOptions}
            maxMenuHeight="130px"
          />
        </TkCol> */}

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
                  onChange={(e)=>{handleOnChange(e); field.onChange(e)}}
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
              className="form-check-input"
              type="checkbox"
              id="noEndDate"
              checked={endDateCheckbox}
              disabled={true}
              // onChange={handleOnChange}
            />
            <TkLabel className="form-check-label mx-2" id="noEndDate">
              No End Date
            </TkLabel>
          </TkCol>

          {/* <div className="d-flex justify-content-center my-4">
          <TkButton type="submit" className="btn-success">
            Save
          </TkButton>
        </div> */}
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
    </>
  );
};

export default SingleEvent;
