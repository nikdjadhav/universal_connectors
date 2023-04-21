import React from "react";
import BreadCrumb from "@/utils/BreadCrumb";
import TkPageHead from "@/globalComponents/TkPageHead";
import DashBoard from "@/components/dashboard";

const Dashboard = () => {
  return (
    <>
      <TkPageHead>
        <title>{"Dashboard"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb pageTitle="Dashboard" />
        <DashBoard />
      </div>
    </>
  );
};

export default Dashboard;

Dashboard.options = {
  layout: true,
  auth: true,
};
