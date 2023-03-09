import TkTableContainer from '@/globalComponents/TkTableContainer'
import { data, filterFields, minSearchLength, serachFields } from '@/utils/Constants'
import { convertToURLParamsString, isSearchonUI, searchAndFilterData, searchDebounce } from '@/utils/utilsFunctions'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Tooltip } from "@nextui-org/react";
import ModalButton from '../integrations/integrationModal'
import TopBar from '../topBar'

const DashBoard = () => {
    const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [dashboardData, setDashboardData] = useState(data);
  const [urlParamsStr, setUrlParamsStr] = React.useState("");

  const [filters, updateFilters] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      [filterFields.dashboard.startDate]: null,
      [filterFields.dashboard.endDate]: null,
      // [filterFields.projects.status]: null,
    }
  );

  // useEffect(() => {
  //   if (data) {
  //     setDashboardData(data);
  //   }
  // }, [data]);

  useEffect(() => {
    let doSearch = true;
    let doFilter = true;
    if (searchText === "") {
      doSearch = false;
    }
    if (Object.values(filters).every((val) => val === null || val === undefined || val === "")) {
      doFilter = false;
    }

    if (!doSearch && !doFilter) {
      // if data is undefined then set it to empty array
      setDashboardData(data || []);
      setUrlParamsStr("");
      return;
    }

    if (isSearchonUI(data)) {
      const newData = searchAndFilterData(
        data,
        searchText,
        serachFields.dashboard,
        filters
      );
      setDashboardData(newData);
    } else {
      const urlParamString = convertToURLParamsString({
        [searchParamName]: searchText,
        ...filters,
      });
      setUrlParamsStr(urlParamString);
    }
  }, [filters, searchText]);
  const searchonUI = isSearchonUI(data);

  const [modal, setModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [configData, setConfigData] = useState(null);

  const updateSearchText = (e) => {
    if (e.target.value.length >= minSearchLength) {
      // console.log("updateSearchText", e.target.value);
      setSearchText(e.target.value);
    } else {
      // console.log("updateSearchText", e.target.value);
      setSearchText(""); // dont pass any search text to search filter if saerch text is less than minSearchLength (currently 3)(at time of wirting this comment)
    }
  };

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
    // {
    //   Header: "Logs",
    //   accessor: "logs",
    //   Cell: () => {
    //     return (
    //       <Link href="/logs" className="text-primary">
    //         View Logs
    //       </Link>
    //     );
    //   },
    // },
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
            {/* <i className="ri-delete-bin-5-line "></i> */}
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
      <TopBar
        onSearchChange={searchDebounce(updateSearchText, searchonUI)}
        // onDateChange={(dates) => {
        //   updateFilters({
        //     [filterFields.dashboard.startDate]: dates ? dates[0] : null,
        //   });
        //   updateFilters({
        //     [filterFields.dashboard.endDate]: dates ? dates[1] : null,
        //   });
        // }}
      />
      <TkTableContainer
        columns={columns}
        data={dashboardData}
        tooltip="tooltip"
        // Toolbar={<TableToolBar onSearchChange={searchDebounce(updateSearchText, searchonUI)} />}
      />

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
  )
}

export default DashBoard
