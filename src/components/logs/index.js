import TkTableContainer from "@/globalComponents/TkTableContainer";
import { logsHead } from "@/utils/Constants";
import React from "react";

const LogTable = () => {
  const data = [
    {
      id: 1,
      integrationName: "Google",
      creationDate: "2021-08-10",
      modifiedDate: "2021-10-12",
      status: "Error",
      message: "Error for updating the records",
      // message: (
      //   <span className="text-danger">Error for updating the records</span>
      // ),
    },
    {
      id: 2,
      integrationName: "Netsuite",
      creationDate: "2022-11-09",
      modifiedDate: "2023-08-12",
      status: "Success",
      message: "30 records updated successfully out of 50",
      // message: (
      //   <span className="text-success">
      //     30 records updated successfully out of 50
      //   </span>
      // ),
    },
  ];
  return (
    <>
      {data.length ? (
        <TkTableContainer columns={logsHead} data={data} />
      ) : (
        "No data found"
      )}
    </>
  );
};

export default LogTable;
