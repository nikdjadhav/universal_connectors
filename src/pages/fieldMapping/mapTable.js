import MapTableComponent from "@/components/mapField/MapTableComponent";
import TkContainer from "@/components/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import React from "react";

const mapTable = () => {
  return (
    <>
      <TkPageHead>
        <title>{`Feild Mapping`}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
        parentTitle="Field Mapping"
        parentLink="/fieldMapping"
        pageTitle="Mapping table" />

        <h5>Feild Mapping</h5>

        <TkContainer>
          <MapTableComponent />
        </TkContainer>
      </div>
    </>
  );
};

export default mapTable;

mapTable.options = {
  layout: true,
};
