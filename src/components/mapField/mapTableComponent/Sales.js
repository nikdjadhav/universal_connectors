import TkButton from "@/globalComponents/TkButton";
import TkInput from "@/globalComponents/TkInput";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Sales = () => {
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
          // console.log("props--", row);
          return (
            <Controller
              control={control}
              name={`netSuite[${row.index}]`}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  options={netsuiteValues}
                  defaultValue={row.original.netSuite} // value={row.original.netSuite}
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

  const [rows, setRows] = useState([
    {
      id: 1,
      googleSheets: "Employee",
      netSuite: {
        value: "employee",
        label: "Employee",
      },
    },
    {
      id: 2,
      googleSheets: "Sales Role",
      netSuite: {
        value: "salesRole",
        label: "Sales Role",
      },
    },
    {
      id: 3,
      googleSheets: "Conntribution",
      netSuite: {
        value: "conntribution",
        label: "Conntribution",
      },
    },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { googleSheets: "", netSuite: "" }]);
  };

  // *** to get formatted values from table
  const [tableRecords, setTableRecords] = useState([{}]);
  const onSubmit = (values) => {
    console.log("values", values);
    // format values in array of objects
    const tableRecords = values.googleSheets.map((googleSheets, index) => {
      return {
        googleSheets,
        netSuite: values.netSuite[index],
      };
    });
    setTableRecords(tableRecords);
  };
  // console.log("tableRecords", tableRecords);

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

export default Sales;
