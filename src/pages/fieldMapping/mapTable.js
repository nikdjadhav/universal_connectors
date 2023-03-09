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
  const router = useRouter();
  const { recordType } = router.query;
  console.log("recordType in maptable", recordType);
  // useEffect(() => {
  //   console.log("route==>", router.query.recordType);
  //   if (router.query.recordType) {
  //     const data = JSON.parse(router.query.recordType);
  //     console.log("data", data);
  //     setParsedData(data);
  //     // console.log("setParsedData",parsedData);

  //     // if (data) {
  //     //   setRecorsType(data.recordType.label || data.recordType);
  //     // }
  //   }
  //   // if (router.query.recordType) {
  //   //   console.log("route==>", router.query.recordType);
  //   //   setRecorsType(router.query.recordType);
  //   // }
  // }, [router.query.recordType]);
  // console.log("recordType=======", recordType);

  let pageTitle = "";
  if (recordType) {
    pageTitle =
      JSON.parse(recordType).recordType.label ||
      JSON.parse(recordType).recordType;
  }

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
          {recordType ? (
            <MapTableComponent data={JSON.parse(recordType)} />
          ) : null}
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
