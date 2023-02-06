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

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loginCredentials");
    console.log("loggedIn User login Credentials", loggedInUser);
    if (loggedInUser === null) {
      router.push("/login");
    }
  }, []);

  const columns = [
    {
      Header: "Source Name",
      accessor: "sourceName",
    },
    {
      Header: "Integration Name",
      accessor: "integrationName",
    },
    {
      Header: "Destination Name",
      accessor: "destinationName",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Modified Date",
      accessor: "modifiedDate", 
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: () => {
        return(
          <>
          <i className="ri-delete-bin-5-line mx-1 "></i>
          <i className="ri-edit-2-fill mx-1"></i>
          </>
        );
      }
    },
    {
      Header: "Shedule",
      accessor: "shedule",
    },
    {
      Header: "Field Mapping",
      accessor: "fieldMapping",
    }
  ];

  const data = [
    {
      sourceName: "NetSuite",
      integrationName: "netSuite",
      destinationName: "Google Sheets",
      date: "2021-05-05",
      modifiedDate: "2022-08-02",
      action: "Action",
      shedule: "Shedule",
      fieldMapping: "Field Mapping"
    }
  ]

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

        <TkTableContainer
          columns={columns}
          data={data}
        />
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
