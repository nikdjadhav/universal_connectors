import FormErrorText, { FormErrorBox } from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkDate from "@/globalComponents/TkDate";
import TkForm from "@/globalComponents/TkForm";
import TkLabel from "@/globalComponents/TkLabel";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object({
  startDate: Yup.date().required("Start date is required"),
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

  // const cDate = date.split(" ");
  // const dateArray = [cDate[1], cDate[2], cDate[3]];
  // console.log("formatted date", dateArray);
  // dateArray.push()
  // const [currentDate, setCurrentDate] = useState();

  const [checkboxValue, setCheckboxValue] = useState(true);
  // const [disableEndDate, setDisableEndDate] = useState(true);
  console.log("checkboxValue", checkboxValue);
  useEffect(() => {
    setValue("startDate", new Date());
  }, []);

  const handleOnChange = (dates) => {
    console.log("value", dates);
    if (dates) {
      setCheckboxValue(false);
      // console.log('data');
    } else {
      setCheckboxValue(true);
      // console.log('null');
    }
    // ***
    // if (e.target.checked) {
    //   setCheckboxValue(true);
    //   setDisableEndDate(true);
    //   setValue("endDate", null);
    // } else {
    //   setCheckboxValue(false);
    //   setDisableEndDate(false);
    // }
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
    toggleComponet("singleEvent");
    // if (checkboxValue === true) {
    //   data.endDate = null;
    // }
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
                    // minDate: "today",
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
            {/* {startDate.isError ? <FormErrorBox errMessage={startDate.error?.message} /> : null} */}
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
                  labelName="End Date"
                  id="endDate"
                  placeholder="End Date"
                  // disabled={disableEndDate}
                  className="mb-3"
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
            <TkButton type="reset" className="btn-success">
              Cancel
            </TkButton>
          </TkCol>
        </TkRow>
      </TkForm>
    </>
  );
};

export default RealtimeEvent;
