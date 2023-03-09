import TkTableContainer from "@/globalComponents/TkTableContainer";
import Link from "next/link";
import React from "react";
import { actions } from "react-table";
import { Tooltip } from "@nextui-org/react";

const FieldMappingTable = () => {
  const columnHead = [
    {
      Header: "Integration Name",
      accessor: "integrationName",
    },
    {
      Header: "Record Type",
      accessor: "recordType",
    },
    {
      Header: "Creation Date",
      accessor: "creationDate",
      Cell: (props) => {
        return (
          <>
            <Tooltip
              color="invert"
              content={`${props.value} ${props.row.original?.creationTime}`}
              placement="bottom"
            >
              <span>{props.value}</span>
            </Tooltip>
          </>
        );
      },
    },
    {
      Header: "Modified Date",
      accessor: "modifiedDate",
      Cell: (props) => {
        return (
          <>
            <Tooltip
              color="invert"
              content={`${props.value} ${props.row.original?.modificationTime}`}
              placement="bottom"
            >
              <span>{props.value}</span>
            </Tooltip>
          </>
        );
      },
    },
    {
      Header: "System One",
      accessor: "systemOne",
    },
    {
      Header: "System Two",
      accessor: "systemTwo",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (props) => {
        return (
          <>
            <i className="ri-delete-bin-5-line px-2" />
            {/* <Link href="/fieldMapping/mapTable">
              <i className="ri-edit-2-fill mx-2" />
            </Link> */}
            {/* hide props from link */}
            <Link
              href={{
                pathname: "/fieldMapping/mapTable",
                // query: { recordType: props.row.original },
                query: { recordType: JSON.stringify(props.row.original) },
                // query: {data: props.row.original}
              }}
            >
              <i
                className="ri-eye-fill"
                onClick={() => onClickView(props.row.original)}
              />
            </Link>
          </>
        );
      },
    },
  ];

  const data = [
    {
      integrationName: "NSGS",
      recordType: "Customer",
      creationDate: "16 Feb, 2022",
      creationTime: "12:00 AM",
      modifiedDate: "13 Feb, 2023",
      modificationTime: "2:30 PM",
      systemOne: "NetSuite™",
      systemTwo: "Google Sheets™",
      action: "",
    },
    // {
    //   integrationName: "NSGS",
    //   recordType: "Employee",
    //   creationDate: "10 Jan, 2023",
    //   creationTime: "11:30 AM",
    //   modifiedDate: "21 Jan, 2023",
    //   modificationTime: "1:00 PM",
    //   systemOne: "Microsoft Dynamics™",
    //   systemTwo: "Google Sheets™",
    //   action: "",
    // },
  ];

  const onClickView = (row) => {
    console.log("row", row);
  };

  return (
    <>
      <TkTableContainer
        columns={columnHead}
        data={data}
        // isSearch={true}
        // isFilters={true}
        // defaultPageSize={10}
        // customPageSize={true}
      />
    </>
  );
};

export default FieldMappingTable;
