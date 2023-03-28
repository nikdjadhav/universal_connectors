import TkButton from "@/globalComponents/TkButton";
import TkInput from "@/globalComponents/TkInput";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
import { API_BASE_URL } from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Address = ({ mappedRecordId }) => {
  console.log("mappedRecordId in address", mappedRecordId);
  const { register, handleSubmit, setValue, control } = useForm();

  const netsuiteValues = useMemo(
    () => [
      // {
      //   value: "name",
      //   label: "Name",
      // },
      {
        value: "address",
        label: "Address",
      },
      {
        value: "phone",
        label: "Phone",
      },
    ],
    []
  );

  const [rows, setRows] = useState([
    // {
    //   id: 1,
    //   googleSheets: "Name",
    //   netSuite: {
    //     value: "name",
    //     label: "Name",
    //   },
    // },
    // {
    //   id: 1,
    //   googleSheets: "Address",
    //   netSuite: {
    //     value: "address",
    //     label: "Address",
    //   },
    // },
    // {
    //   id: 2,
    //   googleSheets: "Phone",
    //   netSuite: {
    //     value: "phone",
    //     label: "Phone",
    //   },
    // },
  ]);

  const addFields = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addFields`)
    // mutationFn: tkFetch.post("http://localhost:4000/v1/addFields"),
  });

  const getFields = useMutation({
    // mutationFn: tkFetch.post(`http://localhost:4000/v1/getFields`),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getFields`),

  });

  useEffect(() => {
    if (mappedRecordId) {
      setRows([]);
      getFields.mutate(
        { mappedRecordId: mappedRecordId },
        {
          onSuccess: (data) => {
            console.log("get data in primary==>", data);
            data.map((field, index) => {
              if (field.FieldType === "Address" && field.mappedRecordId === mappedRecordId) {
                console.log("field in primary==>", field);
                const dieldDetails = {
                  googleSheets: field.destinationFieldValue,
                  netsuite: field.sourceFieldValue,
                };
                setValue(`netSuite[${index}]`, field.sourceFieldValue);
                setRows((prev) => [...prev, dieldDetails]);
                // setRows([dieldDetails]);
              }
              // else{
              //   setRows([
              //     {
              //       id: 1,
              //       googleSheets: "Add",
              //     },
              //     {
              //       id: 2,
              //       googleSheets: "Update",
              //     },
              //     {
              //       id: 3,
              //       googleSheets: "Delete",
              //     },
              //   ]);
              // }
            });
            // if (data.length == 0) {
            //   // console.log("rows in primary==>", data.length);
            //   setRows([
            //     {
            //       id: 1,
            //       googleSheets: "Add",
            //     },
            //     {
            //       id: 2,
            //       googleSheets: "Update",
            //     },
            //     {
            //       id: 3,
            //       googleSheets: "Delete",
            //     },
            //   ]);
            // }
            // setRows(data);
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
      // {
      //   Header: "ID",
      //   accessor: "id",
      // },
      {
        Header: "Google Sheets™",
        accessor: "googleSheets",
        Cell: ({ row }) => (
          <TkInput
            type="text"
            {...register(`googleSheets[${row.index}]`)}
            // value={row.original.googleSheets}
            defaultValue={row.original.googleSheets}
            disabled={row.original.googleSheets ? true : false}
            // onchange={(e) => {setValue(`googleSheets[${row.index}]`, e.target.value)}}
            // onChange={(e) => {
            //   row.original.googleSheets = e.target.value;
            //   console.log("value", e.target.value);
            // }}
          />
        ),
      },
      {
        Header: "NetSuite™",
        accessor: "netSuite",
        Cell: ({ row }) => {
          //   console.log("props--", row.original.netSuite);
          return (
            <Controller
              control={control}
              name={`netSuite[${row.index}]`}
              defaultValue={row.original.netSuite}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  options={netsuiteValues}
                  //   value={row.original.netSuite}
                  // onChange={row.original.netSuite}
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
          // console.log("row data", prop.row.original)
          return (
            <>
              <i
                className="ri-delete-bin-5-line pe-auto px-3"
                onClick={() => onClickDelete(prop.row.original)}
              ></i>
              {/* <i
             className="ri-edit-2-fill mx-2"
             onClick={() => onClickEdit(prop.row.original)}
            ></i> */}
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
  const [tableRecords, setTableRecords] = useState([]);
  const onSubmit = (values) => {
    // ***addFields
    console.log("values", values);
    // format values in array of objects
    const userId = sessionStorage.getItem("userId");
    const tableRecord = values.googleSheets.map((googleSheets, index) => {
      return {
        id: index,
        userId: JSON.parse(userId),
        mappedRecordId: mappedRecordId,
        FieldType: "Address",
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
        FieldType: "Address",
        sourceField: "NetSuite™",
        destinationField: "Google Sheets™",
        googleSheets: googleSheets,
        sourceFieldValue: values.netSuite[index],
      };
    });
    console.log("tableRecord=>", tableRecord);
    setTableRecords(tableRecord);
    // setRows(tableRecord);
    addFields.mutate(tableRecord, {
      onSuccess: (data) => {
        console.log("**data==>", data);
        setValue("netSuite", data.netSuite);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
    setRows(tableRows);

    // fieldData
  };
  //   console.log("tableRecords", tableRecords);

  const onClickCancel = () => {
    history.back();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TkTableContainer columns={columns} data={rows} thClass="text-dark" />

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

export default Address;
