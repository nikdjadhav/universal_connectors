import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import React from "react";
import { genderOptions, sourceName } from "@/utils/Constants";
import { destinationName } from "@/utils/Constants";
import Select from "react-select";

const Integration = ({ onClickHandeler }) => {
  return (
    <>
      <TkRow className="justify-content-center">
        <TkCol>
          <TkCard>
            <TkCardBody>
              <TkForm>
                {/* onSubmit={handleSubmit(onSubmit)} */}
                <TkRow className="g-3">
                  <TkCol lg={12}>
                    <TkInput
                      id="integrationName"
                      type="text"
                      labelName="Integration Name"
                      placeholder="Enter integration name"
                    />
                  </TkCol>

                  <TkCol lg={12}>
                    <TkSelect
                      id="sourceName"
                      name="sourceName"
                      labelName="Source Name"
                      options={sourceName}
                      defaultValue={sourceName[0]}
                      maxMenuHeight="130px"
                    />
                  </TkCol>

                  <TkCol lg={12}>
                    <TkSelect
                      labelName="Destination Name"
                      id="destinationName"
                      name="destinationName"
                      options={destinationName}
                      maxMenuHeight="130px"
                    />
                  </TkCol>

                  {/* <TkCol lg={12}>
                    <TkButton type="submit" className="btn btn-success">
                      Authorize
                    </TkButton>
                  </TkCol> */}

                  <TkCol lg={12}>
                    <TkButton
                      type="button"
                      className="btn btn-primary float-end"
                      onClick={onClickHandeler}
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
