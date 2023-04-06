import MapTableComponent from "@/components/mapField/mapTableComponent";
import TkContainer from "@/components/TkContainer";
import TkButton from "@/globalComponents/TkButton";
import TkPageHead from "@/globalComponents/TkPageHead";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import BreadCrumb from "@/utils/BreadCrumb";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";

const MapTable = () => {
  const router = useRouter();
  const  {rId}  = router.query;
  console.log("rId", rId);

  const [parsedData, setParsedData] = useState(null);
  const [recordType, setRecordType] = useState(null);
  const { mappedRecordId } = router.query;

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
          {/* {mappedRecordId ? ( */}
            <MapTableComponent
              mappedRecordId={rId}
              // mappedRecordType={router.query.mappedRecordType}
              recordTypeTitle={pull_data}
            />
          {/* ) : null} */}
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
