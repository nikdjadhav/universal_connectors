import TkTableContainer from "@/globalComponents/TkTableContainer";
import {
  API_BASE_URL,
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
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import ModalButton from "../integrations/integrationModal";
import TopBar from "../topBar";
import { useMutation, useQuery } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import Link from "next/link";
import { formatDate, formatTime } from "@/utils/date";
import TkLoader from "@/globalComponents/TkLoader";
import TkNoData from "@/globalComponents/TkNoData";

const DashBoard = () => {
  const [integrationData, setIntegrationData] = useState();
  const [integrationID, setIntegrationID] = useState();
  const [userId, setUserId] = useState(null);

  const { data: integrations, isLoading } = useQuery({
    queryKey: ["integrations", userId],
    queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrations/${userId}`),

    enabled: !!userId,
  });

  useEffect(() => {
    const userID = sessionStorage.getItem("userId");
    if (userID) {
      setUserId(JSON.parse(userID));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      setIntegrationData(integrations);
    }
  }, [integrations, userId]);

  const [searchText, setSearchText] = useState("");
// TODO: check updateFilter function
  const [filters, updateFilters] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      [filterFields.dashboard.integrationName]: null,
    }
  );

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
      setIntegrationData(integrations || []);
      return;
    }

    if (isSearchonUI(integrationData)) {
      const newData = searchAndFilterData(
        integrationData,
        searchText,
        serachFields.dashboard,
        filters
      );
      setIntegrationData(newData);
    } else {
      const urlParamString = convertToURLParamsString({
        [searchParamName]: searchText,
        ...filters,
      });
    }
  }, [filters, integrationData, integrations, searchText]);
  const searchonUI = isSearchonUI(integrationData);

  const [modal, setModal] = useState(false);

  const updateSearchText = (e) => {
    if (e.target.value.length >= minSearchLength) {
      setSearchText(e.target.value);
    } else {
      setSearchText("");
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
    toggle();
    setIntegrationID(id);
  };

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
            <Tooltip
              color="invert"
              content={`${date} ${time}`}
              placement="bottom"
            >
              <div>{date}</div>
            </Tooltip>
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
            <Link href="/schedule/event" >
              <span >Yes</span>
              <i className="ri-edit-2-fill ps-2"></i>
            </Link>
          );
        } else {
          return (
            <Link href="/schedule/event" >
              <span >No</span>
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
            <Link href="/fieldMapping" >
              <span >Yes</span>
              <i className="ri-edit-2-fill ps-2"></i>
            </Link>
          );
        } else {
          return (
            <Link href="/fieldMapping" >
              <span >No</span>
              <i className="ri-add-fill ps-2"></i>
            </Link>
          );
        }
      },
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (props) => {
        return (
          <>
            <i
              className="ri-edit-2-fill mx-2 pointer-event avatar-xs table-text rounded-circle bg-light border d-flex justify-content-center align-items-center cursor-pointer"
              onClick={() => onClickOpenModal(props.row.original?.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <TkLoader />
      ) : integrationData.length > 0 ? (
        <>
        {/* TODO: if search data not found display blank table */}
          <TopBar
            onSearchChange={searchDebounce(updateSearchText, searchonUI)}
          />
          <TkTableContainer
            columns={columns}
            data={integrationData || []}
            tooltip="tooltip"
            showPagination={true}
          />
        </>
      ) : (
        <TkNoData />
      )}

      <ModalButton
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        integrationID={integrationID}
      />
    </>
  );
};

export default DashBoard;
