import TkTableContainer from "@/globalComponents/TkTableContainer";
import React from "react";
import { actions } from "react-table";

const FieldMappingTable = () => {
  const columnsHead = [
    {
      Header: "Integration Name",
      accessor: "integrationName",
    },
    {
      Header: "Created Date",
      accessor: "createdDate",
    },
    {
      Header: "Modified Date",
      accessor: "modifiedDate",
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
      Cell: () => {
        return (
          <>
            <i className="ri-delete-bin-5-line "></i>
            <i className="ri-edit-2-fill mx-2"></i>
            <i className="ri-eye-fill"></i>
          </>
        );
      },
    },
  ];

  const data = [
    {
      integrationName: "First",
      createdDate: "16 Feb, 2022",
      modifiedDate: "13 Feb, 2023",
      systemOne: "NetSuite",
      systemTwo: "Google Sheet",
      action: ""
    }
  ]
  return (
    <>
      <TkTableContainer
        columns={columnsHead}
        data={data}
        defaultPageSize={10}
        customPageSize={true}
      />
    </>
  );
};

export default FieldMappingTable;
