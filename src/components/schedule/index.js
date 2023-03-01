import TkTableContainer from '@/globalComponents/TkTableContainer';
import { scheduleHead } from '@/utils/Constants';
import React from 'react'

const ScheduleTable = () => {
    const data = [
        {
          integrationName: "NSGS",
          creationDate: "16 Feb, 2022",
          creationTime: "10:34 AM",
          modifiedDate: "13 Feb, 2023",
          modificationTime: "11:00 PM",
          systemOne: "NetSuite™",
          systemTwo: "Google Sheets™",
          action: "",
        },
      ];
      return (
        <>
          <TkTableContainer
            columns={scheduleHead}
            data={data}
            // defaultPageSize={10}
            // customPageSize={true}
          />
        </>
      );
}

export default ScheduleTable
