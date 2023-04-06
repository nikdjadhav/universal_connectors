import TkTableContainer from "@/globalComponents/TkTableContainer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { actions } from "react-table";
import { Tooltip } from "@nextui-org/react";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";
import { formatDate, formatTime } from "@/utils/date";
import { TkToastError, TkToastInfo } from "@/globalComponents/TkToastContainer";

const FieldMappingTable = () => {
  const [mappedRecords, setMappedRecords] = useState([]);
  const [integrationNames, setIntegrationNames] = useState([]);
  const [mappedRecordData, setMappedRecordData] = useState([]);
  const [userId, setUserId] = useState();

  const queryClient = useQueryClient();

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    setUserId(JSON.parse(id));
  }, [])

  const deleteMappedRecord = useMutation({
    // mutationFn: tkFetch.deleteWithIdInUrl(`http://localhost:4000/v1/deleteMappedRecordByID`)
    mutationFn: tkFetch.deleteWithIdInUrl(`${API_BASE_URL}/deleteMappedRecordByID`)
  })

  const apiResult = useQueries({
    queries: [
      {
        queryKey: ["mappedFieldsDetails", userId],
        queryFn: tkFetch.get(
          // `http://localhost:4000/v1/getMappedFieldsDetails/${(userId)}`
          `${API_BASE_URL}/getMappedFieldsDetails/${(userId)}`

        ),
        enabled: !!userId,
      },
    ],
  });

  const [mappedFields] = apiResult;
  const {
    data: mappedFieldsData,
    isLoading: mappedFieldsLoading,
    isError: mappedFieldsError,
    error: mappedFieldsErrorData,
  } = mappedFields;

  useEffect(() => {
    if (mappedFieldsData) {
      // console.log("mappedFieldsData", mappedFieldsData);
      setMappedRecordData(mappedFieldsData[0]);
    }
  }, [mappedFieldsData]);
  // console.log("mappedRecordData**********", mappedRecordData);

  const columnHead = [
    {
      Header: "Integration Name",
      accessor: "integrationName",
      Cell: (props) => {
        // console.log("props", props)
        return <a>{props.row.original?.integration.integrationName}</a>;
      },
    },
    {
      Header: "Record Type",
      accessor: "recordTypeTitle",
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
            <i className="ri-delete-bin-5-line px-2" onClick={()=>onClickDelete(props.row.original.id)} />
            <Link href={`/fieldMapping/${props.row.original.id}`} >
              <i
                className="ri-eye-fill"
                // onClick={() => onClickView(props.row.original.id)}
              />
            </Link>
          </>
        );
      },
    },
  ];

  // const onClickView = (row) => {
  //   // console.log("row", row);
  // };

  const onClickDelete = (mappedRecordId) => {
    deleteMappedRecord.mutate({id: mappedRecordId}, {
      onSuccess: (data) => {
        // console.log("data", data);
        TkToastInfo("Deleted Successfully", { hideProgressBar: true });
        queryClient.invalidateQueries({
          queryKey: ["mappedFieldsDetails"],
        })
      }, onError: (error) => {
        TkToastError("Error for delete record");
      }
    })
  }

  return (
    <>
      {mappedFieldsLoading ? (
        <div className="text-center">
          <h4>Loading...</h4>
        </div>
      ) : (
        <TkTableContainer
          columns={columnHead}
          data={mappedRecordData || []}
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
