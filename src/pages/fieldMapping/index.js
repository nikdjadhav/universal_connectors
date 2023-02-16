import React from "react";
import TkContainer from "@/components/TkContainer";
import BreadCrumb from "@/utils/BreadCrumb";
import TkPageHead from "@/globalComponents/TkPageHead";
import FieldMap from "@/components/mapField/FieldMap";
import FieldMapping from '@/components/mapField';
import { useRouter } from "next/router";

const FeildMapping = () => {
  const router = useRouter();
  const addFieldMapping = () => {
    router.push("/fieldMapping/field")
  }

  return (
    <>
      <TkPageHead>
        <title>{`Feild Mapping`}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb 
        pageTitle="Field Mapping"
        buttonText={"Add Field Mapping"}
        onButtonClick={addFieldMapping}
        />

        <h5> Field Mapping </h5>
        <TkContainer>
          {/* <FieldMap route="/fieldMapping/mapTable" /> */}
          <FieldMapping />
        </TkContainer>
      </div>
    </>
  );
};

export default FeildMapping;

FeildMapping.options = {
  layout: true,
  auth: true,
};
