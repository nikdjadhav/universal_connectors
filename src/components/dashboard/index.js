import TkTableContainer from "@/globalComponents/TkTableContainer";
import {
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
import { useMutation } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { FormErrorBox } from "@/globalComponents/ErrorText";
import Link from "next/link";

const DashBoard = () => {
  const [integrationData, setIntegrationData] = useState();
  const [integrationID, setIntegrationID] = useState();
  const [syncWay, setSyncWay] = useState();
  const integration = useMutation({
    // queryKey: "integrations",
    mutationFn: tkFetch.post("http://localhost:4000/v1/getIntegrations"),
    // enabled:  !!userID
  });

  const [id, setId] = useState(null);
  useEffect(() => {
    const userID = sessionStorage.getItem("userId");
    // console.log("userID", userID);
    setId({
      userId: JSON.parse(userID),
    });
    // const id = {
    //   "userId": JSON.parse(userID)
    // }
  }, []);

  useEffect(() => {
    if (id) {
      integration.mutate(id, {
        onSuccess: (data) => {
          // console.log("data", data);
          setIntegrationData(data);
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    }
  }, [id]);
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
    // console.log("onClickOpenModal", row);
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
      accessor: "createdAt",
      Cell: (props) => {
        // console.log("props==>",props.row.original);
        const dateTime = props.row.original?.createdAt;
        const date = dateTime.split("T")[0];
        const time = dateTime.split("T")[1];
        // console.log("date==>", time);

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
      accessor: "modifiedDate",
      Cell: (props) => {
        const dateTime = props.row.original?.updatedAt;
        const date = dateTime.split("T")[0];
        const time = dateTime.split("T")[1];
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

      <TkTableContainer
        columns={columns}
        data={integrationData || []}
        tooltip="tooltip"
        // Toolbar={<TableToolBar onSearchChange={searchDebounce(updateSearchText, searchonUI)} />}
      />

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

