import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import React, { useEffect, useState } from "react";
import { genderOptions, sourceName } from "@/utils/Constants";
import { destinationName } from "@/utils/Constants";
import Select from "react-select";
import TkLabel from "@/globalComponents/TkLabel";

const Integration = ({ onClickHandeler, syncWay }) => {
  const [firstLabel, setFirstTitle] = useState();
  const [secondLabel, setSecondTitle] = useState();

  useEffect(() => {
    if(syncWay === "twoWaySync"){
      setFirstTitle("System One");
      setSecondTitle("System Two");
    }else{
      setFirstTitle("Source");
      setSecondTitle("Destination");
    }
  });

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
                    <TkLabel id="sourceName">{firstLabel}</TkLabel>
                    <TkSelect
                      id="sourceName"
                      name="sourceName"
                      // labelName="Source Name"
                      options={sourceName}
                      defaultValue={sourceName[0]}
                      maxMenuHeight="130px"
                    />
                  </TkCol>

                  <TkCol lg={12}>
                    <TkLabel id="destinationName">{secondLabel}</TkLabel>
                    <TkSelect
                      // labelName="Destination Name"
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
