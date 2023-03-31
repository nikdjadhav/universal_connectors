import TkTableContainer from "@/globalComponents/TkTableContainer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { actions } from "react-table";
import { Tooltip } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";

const FieldMappingTable = () => {
  const [mappedRecords, setMappedRecords] = useState([]);
  const [integrationNames, setIntegrationNames] = useState([]);

  const mappedFieldsDetails = useMutation({
    // mutationFn: tkFetch.post(
    //   " http://localhost:4000/v1/getMappedFieldsDetails"
    // ),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getMappedFieldsDetails`),
  });

  useEffect(() => {
    const userID = {
      userId: JSON.parse(sessionStorage.getItem("userId")),
    };

    mappedFieldsDetails.mutate(userID, {
      onSuccess: (data) => {
        console.log("data", data);
        setMappedRecords(data[0]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }, []);

  console.log("mappedRecords", mappedRecords);
  console.log("integrationNames", integrationNames);

  const columnHead = [
    {
      Header: "Integration Name",
      accessor: "integrationName",
      Cell: (props) => {
        return (
          // <Link href={`/mapField/${props.row.original?.id}`}>
          <a>{props.row.original?.integration.integrationName}</a>
          // </Link>
        );
      },
    },
    {
      Header: "Record Type",
      accessor: "source",
    },
    {
      Header: "Creation Date",
      accessor: "creationDate",
      Cell: (props) => {
        // console.log("props==>",props.row.original);
        const dateTime = props.row.original?.creationDate;
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
      accessor: "modificationDate",
      Cell: (props) => {
        const dateTime = props.row.original?.modificationDate;
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
      Header: "System One",
      accessor: "systemOne",
      Cell: (props) => {
        return <a>{props.row.original?.integration.sourceName}</a>;
      },
    },
    {
      Header: "System Two",
      accessor: "systemTwo",
      Cell: (props) => {
        return <a>{props.row.original?.integration.destinationName}</a>;
      },
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (props) => {
        return (
          <>
            <i className="ri-delete-bin-5-line px-2" />
            {/* <Link href="/fieldMapping/mapTable">
              <i className="ri-edit-2-fill mx-2" />
            </Link> */}
            {/* hide props from link */}
            <Link
              href={{
                pathname: "/fieldMapping/mapTable",
                // query: { recordType: props.row.original },
                // query: { mappedRecordId: JSON.stringify(props.row.original) },
                // query: {data: props.row.original}
                query: {
                  mappedRecordId: JSON.stringify(props.row.original.id),
                },
              }}
              as="/fieldMapping/mapTable"
            >
              <i
                className="ri-eye-fill"
                onClick={() => onClickView(props.row.original.id)}
              />
            </Link>
          </>
        );
      },
    },
  ];

  const onClickView = (row) => {
    console.log("row", row);
  };

  return (
    <>
      {mappedRecords.length === 0 ? (
        <div className="text-center">
          <h4>No Data Found</h4>
        </div>
      ) : (
        <TkTableContainer
          columns={columnHead}
          data={mappedRecords || []}
          // isSearch={true}
          // isFilters={true}
          // defaultPageSize={10}
          // customPageSize={true}
        />
      )}
    </>
  );
};

export default FieldMappingTable;
