import React from "react";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";

import { useRouter } from "next/router";
import IntegrationDetails from "@/components/integrations/IntegrationDetails";

const Details = () => {
  const router = useRouter();
  const { iId } = router.query;

  return (
    <>
      <TkPageHead>
        <title>{"Integrations"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          parentTitle="Integrations"
          parentLink="/integrations"
          pageTitle="Details"
        />

        <h4 className="mb-5">Integration Details</h4>
        <IntegrationDetails id={iId} />
      </div>
    </>
  );
};

export default Details;

Details.options = {
  layout: true,
  auth: true,
};
