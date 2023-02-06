import React from "react";
import TkContainer from "@/components/TkContainer";
import BreadCrumb from "@/utils/BreadCrumb";
import TkPageHead from "@/globalComponents/TkPageHead";
import FieldMap from "@/components/mapField/FieldMap";

const FeildMapping = () => {
  return (
    <>
      <TkPageHead>
        <title>{`Feild Mapping`}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb pageTitle="Field Mapping" />

        <h5> Feild Mapping </h5>
        <TkContainer>
          <FieldMap />
        </TkContainer>
      </div>
    </>
  );
};

export default FeildMapping;

FeildMapping.options = {
  layout: true,
};
