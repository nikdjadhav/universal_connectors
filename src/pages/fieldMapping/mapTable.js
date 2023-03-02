import MapTableComponent from "@/components/mapField/mapTableComponent";
import TkContainer from "@/components/TkContainer";
import TkButton from "@/globalComponents/TkButton";
import TkPageHead from "@/globalComponents/TkPageHead";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import BreadCrumb from "@/utils/BreadCrumb";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MapTable = () => {
  const [recordType, setRecorsType] = useState();
  // get data from router
  const router = useRouter();
  useEffect(() => {
    // console.log("route==>", router.query);
    if (router.query.recordType) {
      const parseData = JSON.parse(router.query.recordType);
      console.log("parse==>", parseData);
      // console.log('recordType==>', parseData.recordType.label);
      setRecorsType(parseData.recordType.label);
    }
  }, [router.query]);
  return (
    <>
      <TkPageHead>
        <title>{`Field Mapping`}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          parentTitle="Field Mapping"
          parentLink="/fieldMapping"
          pageTitle="Map content"
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
          <MapTableComponent recordType={recordType} />
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
