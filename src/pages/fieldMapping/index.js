import React from "react";
import BreadCrumb from "@/utils/BreadCrumb";
import TkPageHead from "@/globalComponents/TkPageHead";
import FieldMapping from "@/components/mapField";
import { useRouter } from "next/router";

const FeildMapping = () => {
  const router = useRouter();
  const addFieldMapping = () => {
    router.push("/fieldMapping/field");
  };

  return (
    <>
      <TkPageHead>
        <title>{`Record/Field Mapping`}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          pageTitle="Record / Field Mapping"
          buttonText={"Add Mapping"}
          onButtonClick={addFieldMapping}
        />

        <FieldMapping />
      </div>
    </>
  );
};

export default FeildMapping;

FeildMapping.options = {
  layout: true,
  auth: true,
};
