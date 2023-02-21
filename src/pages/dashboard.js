import React, { useEffect } from "react";
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
import { booleanValues } from "@/utils/Constants";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();

  // useEffect(() => {
  //   // const loggedInUser = localStorage.getItem("loginCredentials");
  //   const loggedInUser = sessionStorage.getItem("loginCredentials");
  //   console.log("loggedIn User login Credentials", loggedInUser);
  //   if (loggedInUser === null) {
  //     router.push("/login");
  //   }
  // }, []);

  const columns = [
    {
      Header: "Integration Name",
      accessor: "integrationName",
    },
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
    },
    {
      Header: "Modified Date",
      accessor: "modifiedDate",
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
      accessor: "status"
    },
    {
      Header: "Logs",
      accessor: "logs"
    },
    {
      Header: "Error",
      accessor: "error"
    }
  ];

  const data = [
    {
      integrationName: "NSGS",
      sourceName: "NetSuite",
      destinationName: "Google Sheets",
      creationDate: "04 May-2021 02:00 PM",
      modifiedDate: "16 Jan-2022 12:00 PM",
      action: "Action",
      schedule: (
        <>
          <Link href="/schedule/event" className="">
            <span className="px-1">No</span>
            <i className="ri-add-fill px-2"></i>
          </Link>
        </>
      ),
      fieldMapping: (
        <>
          <Link href="/fieldMapping/mapTable" className="">
            <span className="px-2">Yes</span>
            <i className="ri-edit-2-fill px-2"></i>
          </Link>
        </>
      ),
      status: "Completed",
      logs: "no error message",
      error: 0
    },
  ];

  return (
    <>
      <TkPageHead>
        <title>{"DashBoard"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb pageTitle="dashboard" />

        {/* <TkContainer>
          <p>Dashboard</p>
        </TkContainer>   */}

        <TkTableContainer columns={columns} data={data} />
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
    </>
  );
};

export default Dashboard;

Dashboard.options = {
  layout: true,
  auth: true,
};


