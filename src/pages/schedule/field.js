import Field from "@/components/schedule/Field";
import TkContainer from "@/components/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import React from "react";

const field = () => {
  return (
    <>
      <TkPageHead>
        <title>{"Field"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          parentTitle="Schedule"
          parentLink="/schedule"
          pageTitle="Field"
        />

        <TkContainer>
          <Field />
        </TkContainer>
      </div>
    </>
  );
};

export default field;

field.options = {
  layout: true,
  auth: true,
};
