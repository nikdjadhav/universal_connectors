import React, { useCallback, useEffect, useState } from "react";
// import { Col, Container, Row } from "reactstrap";
// import Head from "next/head";
//import Components
import ProjectsOverview from "@/components/dashboard/ProjectsOverview";
import ActiveProjects from "@/components/dashboard/ActiveProjects";
import MyTasks from "@/components/dashboard/MyTasks";
import ProjectsStatus from "@/components/dashboard/ProjectsStatus";
import PendingApprovals from "@/components/dashboard/PendingApprovals";
import BreadCrumb from "@/utils/BreadCrumb";
// import BreadCrumb from "@/utils/BreadCrumb";

import TkContainer from "@/globalComponents/TkContainer";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkPageHead from "@/globalComponents/TkPageHead";
import Widgets from "@/components/dashboard/Widgets";
import UpgradeAccountNotice from "@/components/dashboard/UpgradeAccountNotice";
import { useRouter } from "next/router";
import TkTableContainer from "@/globalComponents/TkTableContainer";
import Dropdown from "@/globalComponents/Dropdown";
import { booleanValues, data } from "@/utils/Constants";
import Link from "next/link";
import TkInput from "@/globalComponents/TkInput";
import { Tooltip } from "@nextui-org/react";
import ModalButton from "@/components/integrations/integrationModal";

const Dashboard = () => {
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [configData, setConfigData] = useState(null);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  const dates = [
    {
      h: "04 Jan-2021 10:34AM",
      t: "10:34AM",
    },
    {
      h: "12 Feb-2023 11:00PM",
      t: "11:00PM",
    },
  ];

  const onClickOpenModal = (row) => {
    console.log("onClickOpenModal", row);
    toggle();
    setRecordId(row?.id);
    setConfigData({
      destination: { label: row?.destinationName },
      source: { label: row?.sourceName },
    });

    // setConfigData([{
    //   "source": row.sourceName,
    //   "destination": row.destinationName,
    // }])
  };

  // useEffect(() => {
  //   // const loggedInUser = localStorage.getItem("loginCredentials");
  //   const loggedInUser = sessionStorage.getItem("loginCredentials");
  //   console.log("loggedIn User login Credentials", loggedInUser);
  //   if (loggedInUser === null) {
  //     router.push("/login");
  //   }
  // }, []);

  const columns = [
    // {
    //   Header: "Integration Name",
    //   accessor: "integrationName",
    // },
    {
      Header: "Source Name",
      accessor: "sourceName",
    },
    {
      Header: "Destination Name",
      accessor: "destinationName",
    },
    {
      Header: "Creation Date",
      accessor: "creationDate",
      Cell: (props) => {
        // console.log("props==>",props.row.original?.creationTime);
        return (
          <>
            {/* {dates.map((d) => { */}
            <Tooltip
              color="invert"
              content={`${props.value} ${props.row.original?.creationTime}`}
              placement="bottom"
            >
              <div>{props.value}</div>
            </Tooltip>
            {/* })} */}
          </>
        );
      },
    },
    {
      Header: "Modified Date",
      accessor: "modifiedDate",
      Cell: (props) => {
        return (
          <Tooltip
            color="invert"
            content={`${props.value} ${props.row.original?.modificationTime}`}
            placement="bottom"
          >
            <div>{props.value}</div>
          </Tooltip>
        );
      },
    },
    {
      Header: "Schedule",
      accessor: "schedule",
      // Cell: () => {
      //   return <Dropdown data={booleanValues}/>
      // }
    },
    {
      Header: "Field Mapping",
      accessor: "fieldMapping",
      // Cell:() => {
      //   return <Dropdown data={booleanValues}/>
      // }
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Logs",
      accessor: "logs",
      Cell: () => {
        return (
          <Link href="/logs" className="text-primary">
            View Logs
          </Link>
        );
      },
    },
    // {
    //   Header: "Error",
    //   accessor: "error",
    // },
    {
      Header: "Action",
      accessor: "action",
      Cell: (props) => {
        return (
          <>
            <i className="ri-delete-bin-5-line "></i>
            {/* <Link onClick={onClickOpenModal}> */}
            {/* <i className="ri-edit-2-fill mx-2" onClick={() => onClickOpenModal(props.row.original?.id)} /> */}
            <i
              className="ri-edit-2-fill mx-2"
              onClick={() => onClickOpenModal(props.row.original)}
            />

            {/* </Link> */}
            <i className="ri-eye-fill"></i>
          </>
        );
      },
    },
  ];

  // const data = [
  //   {
  //     integrationName: "NSGS",
  //     sourceName: "NetSuite™",
  //     destinationName: "Google Sheets™",
  //     creationDate: "04 May-2021 02:00 PM",
  //     modifiedDate: "16 Jan-2022 12:00 PM",
  //     schedule: (
  //       <>
  //         <Link href="/schedule/event" className="">
  //           <span className="px-1">No</span>
  //           <i className="ri-add-fill px-2"></i>
  //         </Link>
  //       </>
  //     ),
  //     fieldMapping: (
  //       <>
  //         <Link href="/fieldMapping/mapTable" className="">
  //           <span className="px-2">Yes</span>
  //           <i className="ri-edit-2-fill px-2"></i>
  //         </Link>
  //       </>
  //     ),
  //     status: "Completed",
  //     logs: "no error message",
  //     error: 0,
  //     action: "Action",
  //   },
  // ];

  return (
    <>
      <TkPageHead>
        <title>{"Dashboard"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb pageTitle="Dashboard" searchbar="searchbar" data={data} />
        {/* <TkInput 
        type="search"
        placeholder="Search here"
        /> */}
        {/* <TkContainer>
          <p>Dashboard</p>
        </TkContainer>   */}

        {/* <Tooltip
        color="invert"
        content={data[0].creationDate}
        placement="bottom"
      /> */}
        <TkTableContainer columns={columns} data={data} tooltip="tooltip" />
      </div>

      {/* ***** */}
      {/* <TkPageHead>
        <title>{"DashBoard"}</title>
      </TkPageHead>
      <div className="page-content"> */}
      {/*IMP: Always add a breadcrumb first, before Container and after page-content class */}
      {/* <BreadCrumb pageTitle="Dashboard" />

        <TkContainer> */}
      {/* TODO: apply logic to check if account is going to expire then show below component */}
      {/* <UpgradeAccountNotice /> */}
      {/* <div className="project-wrapper">
            <Widgets />
            <ProjectsOverview />
          </div> */}
      {/* <ActiveProjects />

          <TkRow>
            <TkCol xl={6}>
              <MyTasks />
            </TkCol>
            <TkCol xl={6}>
              <PendingApprovals />
            </TkCol>
            <TkCol xl={6}> */}
      {/* <ProjectsStatus /> */}
      {/* </TkCol>
          </TkRow>
        </TkContainer>
      </div> */}

      <ModalButton
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        recordId={recordId}
        configData={configData}
      />
    </>
  );
};

export default Dashboard;

Dashboard.options = {
  layout: true,
  auth: true,
};
