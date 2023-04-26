import TkTableContainer from "@/globalComponents/TkTableContainer";
import Link from "next/link";
import React, { useCallback } from "react";

const data = [
  {
    id: 1,
    integrationName: "NSGS",
    integrationId: 1,
    event: "Single Event",
    startDate: "16 Feb, 2022",
    endDate: "13 Feb, 2023",
    action: "",
  },
  {
    id: 2,
    integrationName: "test",
    integrationId: 3,
    event: "Single Event",
    startDate: "16 Feb, 2022",
    endDate: "13 Feb, 2023",
    action: "",
  },
];

const scheduleHead = [
  {
    Header: "Integration Name",
    accessor: "integrationName",
  },
  {
    Header: "Event",
    accessor: "event",
  },
  {
    Header: "Start Date",
    accessor: "startDate",
  },
  {
    Header: "End Date",
    accessor: "endDate",
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: (props) => {
      return (
        <>
          <i className="ri-delete-bin-5-line" />
          <Link href="/schedule/event">
            <i className="ri-edit-2-fill mx-2" />
          </Link>
          {/* <Link href="/schedule/event">
            <i className="ri-eye-fill" />
          </Link> */}
        </>
      );
    },
  },
];

const ScheduleTable = () => {

  const selectedRowsId = useCallback((rows) => {
    const ids = data.map((row) => row.id);
  }, []);

  return (
    <>
      <TkTableContainer
        columns={scheduleHead}
        data={data}
        rowSelection={true}
        onRowSelection={selectedRowsId}
        showPagination={true}
      />
    </>
  );
};

export default ScheduleTable;
