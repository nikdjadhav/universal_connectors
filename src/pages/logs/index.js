import React from "react";
import TkContainer from "@/components/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import LogTable from "@/components/logs";

const Logs = () => {
  return (
    <>
      <TkPageHead>
        <title>{`Logs`}</title>
      </TkPageHead>
      <div className="page-content">
        <BreadCrumb pageTitle={"Logs"} />

        {/* <TkContainer> */}
          <LogTable />
        {/* </TkContainer> */}
      </div>
    </>
  );
};

export default Logs;

Logs.options = {
  layout: true,
  auth: true,
};
