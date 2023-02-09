import { useRouter } from "next/router";
import React from "react";

const IntegrationName = () => {
  const router = useRouter();
  console.log(router.query);
  const { integrationName } = router.query;
  const { credentials } = router.query;

  return (
    <>
      <div className="page-content">
        <h1>Integration Name: {integrationName}</h1>
        <p>
            {router.query.credentials} - {integrationName}
        </p>
      </div>
    </>
  );
};

export default IntegrationName;
IntegrationName.options = {
  layout: true,
};
