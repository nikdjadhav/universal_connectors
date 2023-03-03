import TkTableContainer from "@/globalComponents/TkTableContainer";
import { logsHead } from "@/utils/Constants";
import React from "react";

const LogTable = () => {
  const data = [
    {
      id: 1,
      integrationName: "NSGS",
      recordType: "Contact",
      syncDate: "10 Aug, 2021",
      syncTime: "10:34 AM",
      lastSyncDate: "12 Oct, 2021",
      lastSyncTime: "11:00 PM",
      status: "Error",
      message: "Error for updating the records",
      // message: (
      //   <span className="text-danger">Error for updating the records</span>
      // ),
      action: "",
      details: "Contact records not updated successfully for NSGS",
    },
    {
      id: 2,
      integrationName: "NSGS",
      recordType: "Vender",
      syncDate: "09 Nov, 2022",
      syncTime: "12:47 AM",
      lastSyncDate: "12 Aug, 2023",
      lastSyncTime: "11:39 PM",
      status: "Success",
      message: "50 records updated successfully out of 50",
      // message: (
      //   <span className="text-success">
      //     50 records updated successfully out of 50
      //   </span>
      // ),
      action: "",
      details: "All NSGS Vender records updated successfully",
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
