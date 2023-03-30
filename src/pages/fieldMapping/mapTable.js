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
  // const [recordType, setRecorsType] = useState();
  const [parsedData, setParsedData] = useState(null);
  // get data from router
  // mappedrecordid = 1
  const router = useRouter();
  console.log("router", router);
  const { mappedRecordId } = router.query;
  console.log("mappedRecordId", mappedRecordId);

  let pageTitle = "";


  return (
    <>
      <TkPageHead>
        <title>{`Field Mapping`}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          parentTitle="Record /Field Mapping"
          parentLink="/fieldMapping"
          // pageTitle="Map content"
          pageTitle={pageTitle}
        />

        {/* <TkRow className="justify-content-cente">
          <TkCol lg={5}>
          <h5>Field Mapping</h5>
          </TkCol>
          <TkCol lg={1} className="offset-6">
            <TkButton className="btn-primary">
              Add
            </TkButton>
          </TkCol>
        </TkRow> */}

        <TkContainer>
          {/* <MapTableComponent data={parsedData} /> */}
          {mappedRecordId ? (
            <MapTableComponent 
            mappedRecordId={JSON.parse(mappedRecordId)}
            mappedRecordType={router.query.mappedRecordType}
            // mappedRecordId={4}
            // data={JSON.parse(recordType)} 
            />
          ): null}
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
