import TkTableContainer from "@/globalComponents/TkTableContainer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import {
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";
import { formatDate, formatTime } from "@/utils/date";
import { TkToastError } from "@/globalComponents/TkToastContainer";
import TkLoader from "@/globalComponents/TkLoader";
import TkNoData from "@/globalComponents/TkNoData";
import DeleteModal from "@/utils/DeleteModal";

const FieldMappingTable = () => {
  const [mappedRecordData, setMappedRecordData] = useState([]);
  const [userId, setUserId] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteFieldId, setDeleteFieldId] = useState();

  const queryClient = useQueryClient();

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    setUserId(JSON.parse(id));
  }, []);

  const deleteMappedRecord = useMutation({
    mutationFn: tkFetch.deleteWithIdInUrl(
      `${API_BASE_URL}/deleteMappedRecordByID`
    ),
  });

  const apiResult = useQueries({
    queries: [
      {
        queryKey: ["mappedFieldsDetails", userId],
        queryFn: tkFetch.get(
          `${API_BASE_URL}/getMappedFieldsDetails/${userId}`
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
      setMappedRecordData(mappedFieldsData[0]);
    }
  }, [mappedFieldsData]);

  const columnHead = [
    {
      Header: "Integration Name",
      accessor: "integrationName",
      Cell: (props) => {
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
            <i
              className="ri-delete-bin-5-line px-2"
              onClick={() => toggleDeleteModel(props.row.original.id)}
            />
            <Link href={`/fieldMapping/${props.row.original.id}`}>
              <i className="ri-eye-fill" />
            </Link>
          </>
        );
      },
    },
  ];

  const toggleDeleteModel = (fieldId) => {
    setDeleteFieldId(fieldId);
    setDeleteModal(true);
  };

  const onClickDelete = () => {
    deleteMappedRecord.mutate(
      { id: deleteFieldId },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["mappedFieldsDetails"],
          });
          queryClient.invalidateQueries({
            queryKey: ["integrations"],
          });
          setDeleteModal(false);
        },
        onError: (error) => {
          console.log("error", error);
          TkToastError("Error for delete record");
          setDeleteModal(false);
        },
      }
    );
  };

  return (
    <>
      {mappedFieldsLoading ? (
        <TkLoader />
      ) : mappedRecordData.length > 0 ? (
        <>
          <DeleteModal
            show={deleteModal}
            onDeleteClick={onClickDelete}
            onCloseClick={() => setDeleteModal(false)}
          />
          <TkTableContainer
            columns={columnHead}
            data={mappedRecordData || []}
            showPagination={true}
          />
        </>
      ) : (
        <TkNoData />
      )}
    </>
  );
};

export default FieldMappingTable;
