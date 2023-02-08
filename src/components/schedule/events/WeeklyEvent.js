import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkInput from "@/globalComponents/TkInput";
import TkLabel from "@/globalComponents/TkLabel";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";
import InputBox from "../InputBox";
import SingleEvent from "./SingleEvent";

const WeeklyEvent = () => {
  return (
    <>
      <h4 className="text-center mb-4">Weekly Event</h4>

      <TkRow>
        <TkCol lg={5} sm={5}>
          <InputBox className="mb-2" firstLabel="Repeat Every" secondLabel="Week(s)" />
        </TkCol>
      </TkRow>

      <TkRow>
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
      </TkRow>

      <SingleEvent />
    </>
  );
};

export default WeeklyEvent;
