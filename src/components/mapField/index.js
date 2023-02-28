import TkTableContainer from "@/globalComponents/TkTableContainer";
import { columnHead } from "@/utils/Constants";
import Link from "next/link";
import React from "react";
import { actions } from "react-table";

const FieldMappingTable = () => {

  const data = [
    {
      integrationName: "NSGS",
      creationDate: "16 Feb, 2022",
      modifiedDate: "13 Feb, 2023",
      systemOne: "NetSuite™",
      systemTwo: "Google Sheets™",
      action: "",
    },
  ];
  return (
    <>
      <TkTableContainer
        columns={columnHead}
        data={data}
        // defaultPageSize={10}
        // customPageSize={true}
      />
    </>
  );
};

export default FieldMappingTable;
