import MapTableComponent from "@/components/mapField/mapTableComponent";
import TkContainer from "@/components/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import { useRouter } from "next/router";
import React, { useState } from "react";

const MapTable = () => {
  const router = useRouter();
  const { rId } = router.query;

  const [recordType, setRecordType] = useState(null);

  const pull_data = (data) => {
    setRecordType(data);
  };

  return (
    <>
      <TkPageHead>
        <title>{`Field Mapping`}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          parentTitle="Record /Field Mapping"
          parentLink="/fieldMapping"
          pageTitle={recordType}
        />

        <TkContainer>
          <MapTableComponent
            mappedRecordId={rId}
            integrationsName={pull_data}
          />
        </TkContainer>
      </div>
    </>
  );
};

export default MapTable;

MapTable.options = {
  layout: true,
  auth: true,
};
