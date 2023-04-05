import TkTableContainer from "@/globalComponents/TkTableContainer";
import {
  API_BASE_URL,
  data,
  filterFields,
  minSearchLength,
  serachFields,
} from "@/utils/Constants";
import {
  convertToURLParamsString,
  isSearchonUI,
  searchAndFilterData,
  searchDebounce,
} from "@/utils/utilsFunctions";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import ModalButton from "../integrations/integrationModal";
import TopBar from "../topBar";
import { useMutation, useQuery } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { FormErrorBox } from "@/globalComponents/ErrorText";
import Link from "next/link";
import { Spinner } from "reactstrap";
import { formatDate, formatTime } from "@/utils/date";

const DashBoard = () => {
  const [integrationData, setIntegrationData] = useState();
  const [integrationID, setIntegrationID] = useState();
  const [syncWay, setSyncWay] = useState();
  const [userId, setUserId] = useState(null);

  // const integration = useMutation({
  //   // queryKey: "integrations",
  //   // mutationFn: tkFetch.post("http://localhost:4000/v1/getIntegrations"),
  //   mutationFn: tkFetch.post(`${API_BASE_URL}/getIntegrations`),

  //   // enabled:  !!userID
  // });

  const {
    data: integrations,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["integrations", userId],
    // queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrations/${userId}`),
    queryFn: tkFetch.get(`http://localhost:4000/v1/getIntegrations/${userId}`),

    enabled: !!userId,
  });

  useEffect(() => {
    const userID = sessionStorage.getItem("userId");
    // console.log("userID", userID);
    setUserId(JSON.parse(userID));
    // const id = {
    //   "userId": JSON.parse(userID)
    // }
  }, []);

  useEffect(() => {
    if (userId) {
      setIntegrationData(integrations);
      // integration.mutate(userId, {
      //   onSuccess: (data) => {
      //     // console.log("data", data);
      //     setIntegrationData(data);
      //   },
      //   onError: (error) => {
      //     console.log("error", error);
      //   },
      // });
    }
  }, [integrations, userId]);
  // console.log("integrationData", integrationData);

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
    if (
      Object.values(filters).every(
        (val) => val === null || val === undefined || val === ""
      )
    ) {
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

  const onClickOpenModal = (id) => {
    // console.log("onClickOpenModal", id);
    toggle();
    setIntegrationID(id);
    // setRecordId(row?.id);
    // setConfigData({
    //   integrationName: row?.integrationName,
    //   destination: { label: row?.destinationName },
    //   source: { label: row?.sourceName },
    // });
    // setSyncWay(row?.syncWay);
    // setConfigData({
    //   integrationName: row?.integrationName,
    //   destination: row?.destinationName,
    //   source: row?.sourceName,
    // });
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
      Cell: (props) => {
        const date = formatDate(props.row.original?.creationDate);
        const time = formatTime(props.row.original?.creationDate);
        return (
          <>
            {/* {dates.map((d) => { */}
            <Tooltip
              color="invert"
              content={`${date} ${time}`}
              placement="bottom"
            >
              <div>{date}</div>
            </Tooltip>
            {/* })} */}
          </>
        );
      },
    },
    {
      Header: "Modified Date",
      accessor: "modificationDate",
      Cell: (props) => {
        const date = formatDate(props.row.original?.modificationDate);
        const time = formatTime(props.row.original?.modificationDate);

        return (
          <Tooltip
            color="invert"
            content={`${date} ${time}`}
            placement="bottom"
          >
            <div>{date}</div>
          </Tooltip>
        );
      },
    },
    {
      Header: "Schedule",
      accessor: "schedule",
      Cell: (props) => {
        if (props.value) {
          return (
            <Link href="/schedule/event" className="">
              <span className="">Yes</span>
              <i className="ri-edit-2-fill ps-2"></i>
            </Link>
          );
        } else {
          return (
            <Link href="/schedule/event" className="">
              <span className="">No</span>
              <i className="ri-add-fill ps-2"></i>
            </Link>
          );
        }
      },
    },
    {
      Header: "Field Mapping",
      accessor: "fieldMapping",
      Cell: (props) => {
        if (props.value) {
          return (
            <Link href="/fieldMapping/mapTable" className="">
              <span className="">Yes</span>
              <i className="ri-edit-2-fill ps-2"></i>
            </Link>
          );
        } else {
          return (
            <Link href="/fieldMapping/mapTable" className="">
              <span className="">No</span>
              <i className="ri-add-fill ps-2"></i>
            </Link>
          );
        }
      },
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
        // console.log("props.row.original?.id", props.row.original);
        return (
          <>
            {/* <i className="ri-delete-bin-5-line "></i> */}
            {/* <Link onClick={onClickOpenModal}> */}
            {/* <i className="ri-edit-2-fill mx-2" onClick={() => onClickOpenModal(props.row.original?.id)} /> */}
            <i
              className="ri-edit-2-fill mx-2"
              onClick={() => onClickOpenModal(props.row.original?.id)}
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
      <TopBar onSearchChange={searchDebounce(updateSearchText, searchonUI)} />
      {integrationData ? (
        <TkTableContainer
          columns={columns}
          data={integrationData || []}
          tooltip="tooltip"
          // Toolbar={<TableToolBar onSearchChange={searchDebounce(updateSearchText, searchonUI)} />}
        />
      ) : (
        <div
          className="d-flex justify-content-center "
          style={{ height: "100vh" }}
        >
          {/* <Spinner /> */}
          <h4 className="text-center">No Data Found</h4>
        </div>
      )}

      <ModalButton
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        integrationID={integrationID}
        // recordId={recordId}
        // configData={configData}
        // syncWay={syncWay}
      />
    </>
  );
};

export default DashBoard;
