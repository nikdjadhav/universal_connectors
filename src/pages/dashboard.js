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

import TkContainer from "@/components/TkContainer";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkPageHead from "@/globalComponents/TkPageHead";
import Widgets from "@/components/dashboard/Widgets";
import UpgradeAccountNotice from "@/components/dashboard/UpgradeAccountNotice";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  // for testin gcan remove it
  // fetch("/api/v1/workspace", {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ test: "test" }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));

  useEffect(()=>{
    const loggedInUser = localStorage.getItem("loginCredentials");
    console.log("loggedIn User login Credentials", loggedInUser);
    if(loggedInUser === null){
      router.push("/login");
    }
  },[])
  return (
    <>
      <TkPageHead>
        <title>{"DashBoard"}</title>
      </TkPageHead>
      <div className="page-content">
        {/*IMP: Always add a breadcrumb first, before Container and after page-content class */}
        <BreadCrumb pageTitle="Dashboard" />

        <TkContainer>
          {/* TODO: apply logic to check if account is going to expire then show below component */}
          <UpgradeAccountNotice />
          {/* <div className="project-wrapper">
            <Widgets />
            <ProjectsOverview />
          </div> */}
          <ActiveProjects />

          <TkRow>
            <TkCol xl={6}>
              <MyTasks />
            </TkCol>
            <TkCol xl={6}>
              <PendingApprovals />
            </TkCol>
            <TkCol xl={6}>
              {/* <ProjectsStatus /> */}
            </TkCol>
          </TkRow>
        </TkContainer>
      </div>
    </>
  );
};

export default Dashboard;

Dashboard.options = {
  layout: true,
  auth: true,
};
