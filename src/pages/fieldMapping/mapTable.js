import MapTableComponent from "@/components/mapField/MapTableComponent";
import TkContainer from "@/components/TkContainer";
import TkButton from "@/globalComponents/TkButton";
import TkPageHead from "@/globalComponents/TkPageHead";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import BreadCrumb from "@/utils/BreadCrumb";
import React from "react";

const mapTable = () => {
  return (
    <>
      <TkPageHead>
        <title>{`Field Mapping`}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
        parentTitle="Field Mapping"
        parentLink="/fieldMapping"
        pageTitle="Map content" />

        {/* <TkRow className="justify-content-cente">
          <TkCol lg={5}>
          <h5>Field Mapping</h5>
          </TkCol>
          <TkCol lg={1} className="offset-6">
            <TkButton className="btn-primary">
              Add
            </TkButton>
          </TkCol>
        </TkRow> */}

        {/* <TkContainer> */}
          <MapTableComponent />
        {/* </TkContainer> */}
      </div>
    </>
  );
};

export default mapTable;

mapTable.options = {
  layout: true,
  auth: true,
};
