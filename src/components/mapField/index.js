import TkTableContainer from "@/globalComponents/TkTableContainer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { actions } from "react-table";
import { Tooltip } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";
import { formatDate, formatTime } from "@/utils/date";

const FieldMappingTable = () => {
  const [mappedRecords, setMappedRecords] = useState([]);
  const [integrationNames, setIntegrationNames] = useState([]);
  const [mappedRecordData, setMappedRecordData] = useState([]);

  const mappedFieldsDetails = useMutation({
    // mutationFn: tkFetch.post(
    //   " http://localhost:4000/v1/getMappedFieldsDetails"
    // ),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getMappedFieldsDetails`),
  });

  // const getConfigurationDetails = useMutation({
  //   // mutationFn: tkFetch.post(
  //   //   "http://localhost:4000/v1/getConfigurationByIntegrationId"
  //   // ),
  //   mutationFn: tkFetch.post(`${API_BASE_URL}/getConfigurationByIntegrationId`),
  // });
// let temp = 1;
//   const { data, isLoading, isFetched, isError, error } = useQuery({
//     queryKey: ["integration", temp],

//     queryFn: tkFetch.get(
//       `http://localhost:4000/v1/getConfigurationByIntegrationId/${temp}`
//     ),
//   });
// console.log("using get", data);
  const getResletRecordType = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/getRecordTypes`),
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

  // useEffect(() => {
  //   if (mappedRecords.length > 0) {
  //     mappedRecords.map((item) => {
  //       console.log("first loop", item);
  //       getConfigurationDetails.mutate(
  //         { integrationId: item.integrationId },
  //         {
  //           onSuccess: (data) => {
  //             console.log("getConfigurationDetails", data);
  //             data.map((configItem) => {
  //               if (configItem.systemName === "NetSuite™") {
  //                 console.log("second loop", configItem);
  //                 const restletData = {
  //                   account: configItem.accountId,
  //                   consumerKey: configItem.consumerKey,
  //                   consumerSecret: configItem.consumerSecretKey,
  //                   tokenId: configItem.accessToken,
  //                   tokenSecret: configItem.accessSecretToken,
  //                   scriptDeploymentId: "1",
  //                   scriptId: "1529",
  //                   resttype: "ListOfRecordType",
  //                 };

  //                 getResletRecordType.mutate(restletData, {
  //                   onSuccess: (data) => {
  //                     console.log("restlet data", item.source);
  //                     data[0]?.list.map((restletItem) => {
  //                       if (restletItem.id === item.source) {
  //                         console.log("third loop", restletItem);
  //                         console.log("match^^^^^^", restletItem.id);
  //                         setMappedRecordData([
  //                           ...mappedRecordData,
  //                           {
  //                             id: item.id,
  //                             integrationName: item.integration.integrationName,
  //                             creationDate: item.creationDate,
  //                             modificationDate: item.modificationDate,
  //                             systemOne: item.integration.sourceName,
  //                             systemTwo: item.integration.destinationName,
  //                             recordType: restletItem.text,
  //                           },
  //                         ]);
  //                       }
  //                     });
  //                   },
  //                   onError: (error) => {
  //                     console.log(error);
  //                   },
  //                 });
  //               }
  //             });
  //           },
  //           onError: (error) => {
  //             console.log(error);
  //           },
  //         }
  //       );
  //     });
  //   }
  // }, [mappedRecords]);

  console.log("mappedRecordData**********", mappedRecordData);

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
        // const dateTime = props.row.original?.creationDate;
        // const date = dateTime.split("T")[0];
        // const time = dateTime.split("T")[1];
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
