import React, { useCallback, useEffect, useReducer, useState } from "react";
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
import {
  booleanValues,
  data,
  filterFields,
  minSearchLength,
  serachFields,
} from "@/utils/Constants";
import Link from "next/link";
import TkInput from "@/globalComponents/TkInput";
import { Tooltip } from "@nextui-org/react";
import ModalButton from "@/components/integrations/integrationModal";
import { TkCardBody } from "@/globalComponents/TkCard";
import {
  isSearchonUI,
  searchAndFilterData,
  searchDebounce,
} from "@/utils/utilsFunctions";
import TopBar from "@/components/topBar";
import DashBoard from "@/components/dashboard";

// ###
// function TableToolBar({ onSearchChange }) {
//   return (
//     <>
//       <TkCardBody className="table-toolbar mt-3">
//         <TkRow className="mb-3">
//           <TkCol lg={2}>
//             <TkInput
//               onChange={onSearchChange}
//               placeholder="Search Projects"
//               isSearchField={true}
//             />
//           </TkCol>
//         </TkRow>
//       </TkCardBody>
//     </>
//   );
// }
// ###

const Dashboard = () => {

  return (
    <>
      <TkPageHead>
        <title>{"Dashboard"}</title>
      </TkPageHead>

      <div className="page-content">
      {/* searchbar="searchbar" data={data} */}
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
