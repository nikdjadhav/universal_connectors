import React, { useCallback, useEffect, useState } from "react";
import TkPageHead from "@/globalComponents/TkPageHead";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import ModalButton from "@/components/integrations/integrationModal";
import TkContainer from "@/globalComponents/TkContainer";
import BreadCrumb from "@/utils/BreadCrumb";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";

import TkButton from "@/globalComponents/TkButton";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";
import IntegrationDetails from "@/components/integrations/IntegrationDetails";
// import TkButton from "@/globalComponents/TkButton";

const Details = () => {

  const router = useRouter();
  const  {iId}  = router.query;

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
          // buttonText={"Add Integration"}
          // onButtonClick={toggle}
        />

        <h4 className="mb-5">Integration Details</h4>
       <IntegrationDetails id={iId}/>
      </div>
    </>
  );
};

export default Details;

Details.options = {
  layout: true,
  auth: true,
};
