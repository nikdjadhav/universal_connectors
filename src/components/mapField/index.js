import TkTableContainer from "@/globalComponents/TkTableContainer";
import { columnHead } from "@/utils/Constants";
import Link from "next/link";
import React from "react";
import { actions } from "react-table";
import { Tooltip } from "@nextui-org/react";

const FieldMappingTable = () => {

  const data = [
    {
      integrationName: "NSGS",
      creationDate: "16 Feb, 2022",
      creationTime: "12:00 AM",
      modifiedDate: "13 Feb, 2023",
      modificationTime: "2:30 PM",
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
