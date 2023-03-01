import TkButton from "@/globalComponents/TkButton";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
import { netsuiteValues } from "@/utils/Constants";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTable } from "react-table";
import { Table } from "reactstrap";

const MapTableComponent = ({ recordType }) => {
  const [data, setData] = useState([{ googleSheets: "", netSuite: "" }]);

  const [rows, setRows] = useState([
    {
      id: 1,
      googleSheets: "Internal Id",
      netSuite: {
        value: "internalId",
        label: "Internal Id",
      },
    },
    {
      id: 2,
      googleSheets: "Name",
      netSuite: {
        value: "name",
        label: "Name",
      },
    },
    {
      id: 3,
      googleSheets: "Email",
      netSuite: {
        value: "email",
        label: "Email",
      },
    },
  ]);

const onClickDelete = useCallback(rowValue => {
  console.log("row", rowValue);
  const deleted = rows.filter(item => item.id !== rowValue.id);
  setRows(deleted);
  console.log('deleted', deleted);
}, [rows]);
console.log('rows', rows);

  const { register, handleSubmit, control } = useForm();
  // const mapTableColumns = ["Google Sheets", "NetSuite", "Action"];

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
          // <TkRow>
          //   <TkCol lg={4}>
          <TkInput
            type="text"
            {...register(`googleSheets[${row.index}]`)}
            defaultValue={row.original.googleSheets}
            // defaultValue={rowData.googleSheets}
          />
          // </TkCol>
          // </TkRow>
        ),
      },
      {
        Header: "NetSuite™",
        accessor: "netSuite",
        Cell: ({ row }) => (
          <Controller
            control={control}
            name={`netSuite[${row.index}]`}
            defaultValue={row.original.netSuite}
            render={({ field }) => (
              <TkSelect
                {...field}
                options={netsuiteValues}
                maxMenuHeight="80px"
              />
              // <select {...field}>
              //   <option value="option1">Internal Id</option>
              //   <option value="option2">Name</option>
              //   <option value="option3">Email</option>
              // </select>
            )}
          />
        ),
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
    [control, register, onClickDelete]
  );

  const tableInstance = useTable({ columns, data });

  // const { getTableProps, getTableBodyProps, rows, prepareRow } = tableInstance;

  const handleAddRow = () => {
    setRows([...rows, { googleSheets: "", netSuite: "" }]);
  };
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
  console.log("tableRecords", tableRecords);
  

  return (
    <>
      {/* {recordType === "Customer" ? (
        <TkButton className="btn-info">Sales</TkButton>
      ) : null} */}

      <TkRow className="justify-content-cente">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TkRow>
            <TkTableContainer columns={columns} data={rows} />
          </TkRow>
          {/* <TkRow>
            <TkCol lg={2}> */}
              <TkButton className="btn-success my-2 me-2" onClick={handleAddRow}>
                Add Row
              </TkButton>
            {/* </TkCol> */}
          {/* </TkRow>
          <TkRow> */}
            {/* <TkCol lg={2}> */}
              <TkButton className="btn-success m-2" type="submit">
                Submit
              </TkButton>
            {/* </TkCol>
          </TkRow> */}
        </form>
      </TkRow>
    </>
  );
};
export default MapTableComponent;

{
  /* <Table {...getTableProps()}>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th className="col-lg-2" key={column.accessor}>
                      {column.Header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <>
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <>
                              <td className="" {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            </>
                          );
                        })}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table> */
}
