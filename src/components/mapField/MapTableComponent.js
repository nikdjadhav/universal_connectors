import TkCard, {
  TkCardBody,
  TkCardHeader,
  TkCardTitle,
} from "@/globalComponents/TkCard";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
// import { editValue } from "@/utils/Constants";
import React from "react";
import Dropdown from "./Dropdown";
import { editValue, netsuiteValues } from '@/utils/Constants'

const MapTableComponent = () => {
  const columnsHead = [
    {
      Header: "Google Sheets",
      accessor: "googleSheets",
    },
    {
      Header: "NetSuite",
      accessor: "netSuite",
      Cell: (props) => {
        return <Dropdown data={netsuiteValues} />
      }
    },
    {
      Header: "NetSuite Field Default Value",
      accessor: "netSuiteFieldDefaultValue",
       Cell: (props) => {
        return <Dropdown data={editValue} defaultValue={editValue[1]}/>;}
    },
  ];
  const data = [
    {
      googleSheets: "Delete",
      netSuite: "",
      netSuiteFieldDefaultValue: '',
    },
    {
      googleSheets: "Update",
      netSuite: "",
      netSuiteFieldDefaultValue: '',
    },
  ];

  return (
    <>
      <TkCard id="tasksList">
        <TkCardHeader className="border-0">
          <div className="d-flex align-items-center">
            <TkCardTitle tag="h5" className="mb-0 flex-grow-1">
              All Projects
            </TkCardTitle>
          </div>
        </TkCardHeader>
        <TkCardBody>
          <TkTableContainer
            columns={columnsHead}
            data={data}
            // isSearch={true}
            defaultPageSize={10}
            customPageSize={true}
            // isFilters={true}
            // showPagination={true}
            // rowSelection={true}
            // showSelectedRowCount={true}
          />
        </TkCardBody>
      </TkCard>
    </>
  );
};

export default MapTableComponent;

 

