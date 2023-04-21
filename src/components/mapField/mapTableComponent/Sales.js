import TkButton from "@/globalComponents/TkButton";
import TkInput from "@/globalComponents/TkInput";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
import { API_BASE_URL } from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Sales = ({ mappedRecordId }) => {
  const { register, handleSubmit, setValue, control } = useForm();

  const netsuiteValues = useMemo(
    () => [
      {
        value: "employee",
        label: "Employee",
      },
      {
        value: "salesRole",
        label: "Sales Role",
      },
      {
        value: "conntribution",
        label: "Conntribution",
      },
    ],
    []
  );

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
                field.FieldType === "Sales" &&
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
          },
          onError: (error) => {
            console.log("error in primary", error);
          },
        }
      );
    }
  }, [mappedRecordId]);

  const columns = useMemo(
    () => [
      {
        Header: "Google Sheets™",
        accessor: "googleSheets",
        Cell: ({ row }) => (
          <TkInput
            type="text"
            {...register(`googleSheets[${row.index}]`)}
            defaultValue={row.original.googleSheets}
            disabled={row.original.googleSheets ? true : false}
          />
        ),
      },
      {
        Header: "NetSuite™",
        accessor: "netSuite",
        Cell: ({ row }) => {
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
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (prop) => {
          return (
            <>
              <i
                className="ri-delete-bin-5-line pe-auto px-3"
                onClick={() => onClickDelete(prop.row.original)}
              ></i>
            </>
          );
        },
      },
    ],
    [control, netsuiteValues, register]
  );

  const handleAddRow = () => {
    setRows([...rows, { googleSheets: "", netSuite: "" }]);
  };

  // *** to get formatted values from table
  const onSubmit = (values) => {

    const userId = sessionStorage.getItem("userId");
    const tableRecord = values.googleSheets.map((googleSheets, index) => {
      return {
        id: index,
        userId: JSON.parse(userId),
        mappedRecordId: mappedRecordId,
        FieldType: "Sales",
        sourceField: "NetSuite™",
        destinationField: "Google Sheets™",
        destinationFieldValue: googleSheets,
        sourceFieldValue: values.netSuite[index]?.label,
      };
    });

    addFields.mutate(tableRecord, {
      onSuccess: (data) => {
        setValue("netSuite", data.netSuite);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });

    const tableRows = values.googleSheets.map((googleSheets, index) => {
      return {
        id: index,
        userId: JSON.parse(userId),
        mappedRecordId: mappedRecordId,
        FieldType: "Sales",
        sourceField: "NetSuite™",
        destinationField: "Google Sheets™",
        googleSheets: googleSheets,
        sourceFieldValue: values.netSuite[index],
      };
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
          thClass="text-dark"
        />

        <TkButton className="btn-success my-2 me-2" onClick={handleAddRow}>
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

export default Sales;
