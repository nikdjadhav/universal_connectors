import FieldMap from "@/components/mapField/FieldMap";
import TkContainer from "@/components/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import React from "react";

const Field = () => {
  return (
    <>
      <TkPageHead>
        <title>{`Feild Mapping`}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          parentTitle="Field Mapping"
          parentLink="/fieldMapping"
          pageTitle="Field"
        />

        <TkContainer>
          <FieldMap />
        </TkContainer>
      </div>
    </>
  );
};

export default Field;

Field.options = {
  layout: true,
  auth: true,
};
