import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { PrjectsStatusCharts } from "./DashboardProjectCharts";
import { projectStatus, projectStatusOptions } from "../test-data/dashboard";

import TkCard, { TkCardBody, TkCardHeader, TkCardTitle } from "@/globalComponents/TkCard";
import TkIcon from "@/globalComponents/TkIcon";
import { TkDropdownItem, TkDropdownMenu, TkDropdownToggle, TkUncontrolledDropdown } from "@/globalComponents/TkDropdown";

const ProjectsStatus = () => {
  const [chartData, setchartData] = useState(projectStatus["all"]);
  const [seletedMonth, setSeletedMonth] = useState("All Time");
  const onChangeChartPeriod = (pType) => {
    setSeletedMonth(projectStatusOptions[pType]);
    setchartData(projectStatus[pType]);
  };

  return (
    <React.Fragment>
      <TkCard className="card-height-100">
        <TkCardHeader className="align-items-center d-flex">
          <TkCardTitle tag="h4" className="mb-0 flex-grow-1">Projects Status</TkCardTitle>
          <div className="flex-shrink-0">
            <TkUncontrolledDropdown className="card-header-dropdown">
              <TkDropdownToggle tag="a" className="dropdown-btn text-muted" role="button">
                {seletedMonth.charAt(0).toUpperCase() + seletedMonth.slice(1)}{" "}
                <TkIcon className="mdi mdi-chevron-down ms-1"></TkIcon>
              </TkDropdownToggle>
              <TkDropdownMenu className="dropdown-menu-end">
                <TkDropdownItem
                  onClick={() => {
                    onChangeChartPeriod("all");
                  }}
                  className={seletedMonth === "all" ? "active" : ""}
                >
                  All Time
                </TkDropdownItem>
                <TkDropdownItem
                  onClick={() => {
                    onChangeChartPeriod("week");
                  }}
                  className={seletedMonth === "week" ? "active" : ""}
                >
                  Last 7 Days
                </TkDropdownItem>
                <TkDropdownItem
                  onClick={() => {
                    onChangeChartPeriod("month");
                  }}
                  className={seletedMonth === "month" ? "active" : ""}
                >
                  Last 30 Days
                </TkDropdownItem>
                <TkDropdownItem
                  onClick={() => {
                    onChangeChartPeriod("quarter");
                  }}
                  className={seletedMonth === "quarter" ? "active" : ""}
                >
                  Last 90 Days
                </TkDropdownItem>
              </TkDropdownMenu>
            </TkUncontrolledDropdown>
          </div>
        </TkCardHeader>

        <TkCardBody>
          <PrjectsStatusCharts
            series={chartData}
            dataColors='["--vz-success", "--vz-primary", "--vz-warning", "--vz-danger"]'
          />
          <div className="mt-3">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <h2 className="me-3 ff-secondary mb-0">
                {chartData[0] + chartData[1] + chartData[2] + chartData[3] || 784}
              </h2>
              <div>
                <p className="text-muted mb-0">Total Projects</p>
                <p className="text-success fw-medium mb-0">
                  <span className="badge badge-soft-success p-1 rounded-circle">
                    <TkIcon className="ri-arrow-right-up-line"></TkIcon>
                  </span>{" "}
                  +3 New
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
              <p className="fw-medium mb-0">
                <TkIcon className="ri-checkbox-blank-circle-fill text-success align-middle me-2"></TkIcon>{" "}
                Completed
              </p>
              <div>
                <span className="text-muted pe-5">{chartData[0]} Projects</span>
                <span className="text-success fw-medium fs-12">15870hrs</span>
              </div>
            </div>
            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
              <p className="fw-medium mb-0">
                <TkIcon className="ri-checkbox-blank-circle-fill text-primary align-middle me-2"></TkIcon> In
                Progress
              </p>
              <div>
                <span className="text-muted pe-5">{chartData[1]} Projects</span>
                <span className="text-success fw-medium fs-12">243hrs</span>
              </div>
            </div>
            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
              <p className="fw-medium mb-0">
                <TkIcon className="ri-checkbox-blank-circle-fill text-warning align-middle me-2"></TkIcon> Yet
                to Start
              </p>
              <div>
                <span className="text-muted pe-5">{chartData[2]} Projects</span>
                <span className="text-success fw-medium fs-12">~2050hrs</span>
              </div>
            </div>
            <div className="d-flex justify-content-between py-2">
              <p className="fw-medium mb-0">
                <TkIcon className="ri-checkbox-blank-circle-fill text-danger align-middle me-2"></TkIcon>{" "}
                Cancelled
              </p>
              <div>
                <span className="text-muted pe-5">{chartData[3]} Projects</span>
                <span className="text-success fw-medium fs-12">~900hrs</span>
              </div>
            </div>
          </div>
        </TkCardBody>
      </TkCard>
    </React.Fragment>
  );
};

export default ProjectsStatus;
