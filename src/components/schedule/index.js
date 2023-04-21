import TkTableContainer from "@/globalComponents/TkTableContainer";
import { scheduleHead } from "@/utils/Constants";
import React, { useCallback, useState } from "react";

const data = [
  {
    id: 1,
    integrationName: "NSGS",
    event: "Single Event",
    startDate: "16 Feb, 2022",
    endDate: "13 Feb, 2023",
    action: "",
  },
  {
    id: 2,
    integrationName: "NSGS",
    event: "Single Event",
    startDate: "16 Feb, 2022",
    endDate: "13 Feb, 2023",
    action: "",
  },
];

const ScheduleTable = () => {
  const [checkboxSelected, setCheckboxSelected] = useState([]);

  const selectedRowsId = useCallback((rows) => {
    const ids = data.map((row) => row.id);
    setCheckboxSelected(ids);
  }, []);

  return (
    <>
      <TkTableContainer
        columns={scheduleHead}
        data={data}
        rowSelection={true}
        onRowSelection={selectedRowsId}
      />
    </>
  );
};

export default ScheduleTable;
