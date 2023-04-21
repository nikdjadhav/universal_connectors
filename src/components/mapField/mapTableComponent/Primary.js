import TkButton from "@/globalComponents/TkButton";
import TkInput from "@/globalComponents/TkInput";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
import { API_BASE_URL } from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Primary = ({ mappedRecordId }) => {
  const { register, handleSubmit, setValue, control } = useForm();
  const [netsuiteValues, setNetsuiteValues] = useState([
    {
      value: "internalId",
      label: "Internal Id",
    },
    {
      value: "externalId",
      label: "External Id",
    },
    {
      value: "name",
      label: "Name",
    },
  ]);
  const [rows, setRows] = useState([]);

  const addFields = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addFields`),
  });

  const getFields = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/getFields`),
  });

  useEffect(() => {
    if (mappedRecordId) {
      setRows([]);
      getFields.mutate(
        { mappedRecordId: mappedRecordId },
        {
          onSuccess: (data) => {
            data.map((field, index) => {
              if (
                field.FieldType === "Primary" &&
                field.mappedRecordId === mappedRecordId
              ) {
                const dieldDetails = {
                  googleSheets: field.destinationFieldValue,
                  netsuite: field.sourceFieldValue,
                };
                setValue(`netSuite[${index}]`, field.sourceFieldValue);
                setRows((prev) => [...prev, dieldDetails]);
              }
            });
            if (data.length == 0) {
              setRows([
                {
                  id: 1,
                  googleSheets: "Add",
                },
                {
                  id: 2,
                  googleSheets: "Update",
                },
                {
                  id: 3,
                  googleSheets: "Delete",
                },
              ]);
            }
          },
          onError: (error) => {
            console.log("error in primary", error);
          },
        }
      );
    }
  }, [mappedRecordId]);

  useEffect(() => {
    rows.map((row, index) => {
      setValue(`googleSheets[${index}]`, row.googleSheets);
      setValue(`netSuite[${index}]`, row.netSuite);
    });
  });

  const columns = useMemo(
    () => [
      {
        Header: "Google Sheets™ Columns",
        accessor: "googleSheets",
        Cell: ({ row }) => {
          return (
            <TkInput
              type="text"
              name={`googleSheets[${row.index}]`}
              {...register(`googleSheets[${row.index}]`)}
              disabled={row.original.googleSheets ? true : false}
            />
          );
        },
      },
      {
        Header: "NetSuite™ Fields",
        accessor: "netSuite",
        Cell: ({ row }) => {
          if (
            row.original.googleSheets !== "Add" &&
            row.original.googleSheets !== "Update" &&
            row.original.googleSheets !== "Delete"
          ) {
            return (
              <Controller
                control={control}
                name={`netSuite[${row.index}]`}
                render={({ field }) => (
                  <TkSelect
                    {...field}
                    options={netsuiteValues}
                    maxMenuHeight="80px"
                  />
                )}
              />
            );
          } else {
            return null;
          }
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (prop) => {
          if (
            prop.row.original.googleSheets !== "Add" &&
            prop.row.original.googleSheets !== "Update" &&
            prop.row.original.googleSheets !== "Delete"
          ) {
            return <i className="ri-delete-bin-5-line pe-auto px-3" />;
          } else {
            return null;
          }
        },
      },
    ],
    [control, netsuiteValues, register]
  );

  const handleAddRow = () => {
    setRows([...rows, { googleSheets: "", netSuite: "" }]);
  };

  // *** to get formatted values from table
  const [tableRecords, setTableRecords] = useState([]);
  const onSubmit = (values) => {
    // format values in array of objects
    const userId = sessionStorage.getItem("userId");
    const tableRecord = values.googleSheets.map((googleSheets, index) => {
      return {
        id: index,
        userId: JSON.parse(userId),
        mappedRecordId: mappedRecordId,
        FieldType: "Primary",
        sourceField: "NetSuite™",
        destinationField: "Google Sheets™",
        destinationFieldValue: googleSheets,
        sourceFieldValue: values.netSuite[index]?.label,
      };
    });
    const tableRows = values.googleSheets.map((googleSheets, index) => {
      return {
        id: index,
        userId: JSON.parse(userId),
        mappedRecordId: mappedRecordId,
        FieldType: "Primary",
        sourceField: "NetSuite™",
        destinationField: "Google Sheets™",
        googleSheets: googleSheets,
        sourceFieldValue: values.netSuite[index],
      };
    });
    setTableRecords(tableRecord);
    addFields.mutate(tableRecord, {
      onSuccess: (data) => {
        setValue("netSuite", data.netSuite);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
    setRows(tableRows);
  };

  const onClickCancel = () => {
    history.back();
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TkTableContainer
          columns={columns}
          data={rows || []}
          showPagination={true}
          thClass="text-dark"
        />

        <TkButton
          className="btn-success my-2 me-2"
          onClick={handleAddRow}
          type="button"
        >
          Add Row
        </TkButton>
        <TkButton className="btn-success m-2" type="submit">
          Submit
        </TkButton>
        <TkButton
          className="btn-success m-2"
          type="button"
          onClick={onClickCancel}
        >
          Cancel
        </TkButton>
      </form>
    </>
  );
};

export default Primary;
