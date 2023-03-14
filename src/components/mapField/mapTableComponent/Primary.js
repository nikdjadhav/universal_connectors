import TkButton from "@/globalComponents/TkButton";
import TkInput from "@/globalComponents/TkInput";
import TkLabel from "@/globalComponents/TkLabel";
import { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
import { random } from "nanoid";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Primary = ({ fieldData }) => {
  const [netsuiteValues, setNetsuiteValues] = useState([]);
  const [rows, setRows] = useState([]);
  console.log("fieldData in primary", fieldData.recordType.label);

  useEffect(() => {
    console.log("recordType in primary", fieldData.recordType.label);
    if (fieldData.recordType.label === "Customer") {
      console.log("=>", fieldData.recordType.label);
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
        {
          id: 4,
          googleSheets: "Internal Id",
          netSuite: {
            value: "internalId",
            label: "Internal Id",
          },
        },
        {
          id: 5,
          googleSheets: "External Id",
          netSuite: {
            value: "externalId",
            label: "External Id",
          },
        },
        {
          id: 6,
          googleSheets: "Name",
          netSuite: {
            value: "name",
            label: "Name",
          },
        },
        {
          id: 7,
          googleSheets: "Email",
          netSuite: {
            value: "email",
            label: "Email",
          },
        },
        {
          id: 8,
          googleSheets: "Phone",
          netSuite: {
            value: "phone",
            label: "Phone",
          },
        },
        {
          id: 9,
          googleSheets: "Address",
          netSuite: {
            value: "address",
            label: "Address",
          },
        },
      ]);

      setNetsuiteValues([
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
        {
          value: "email",
          label: "Email",
        },
        {
          value: "phone",
          label: "Phone",
        },
        {
          value: "address",
          label: "Address",
        },
      ]);
      // return;
    } else if (fieldData.recordType.label === "Employee") {
      console.log("=>", fieldData.recordType.label);
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
        {
          id: 4,
          googleSheets: "Internal Id",
          netSuite: {
            value: "internalId",
            label: "Internal Id",
          },
        },
        {
          id: 5,
          googleSheets: "External Id",
          netSuite: {
            value: "externalId",
            label: "External Id",
          },
        },
        {
          id: 6,
          googleSheets: "Email",
          netSuite: {
            value: "email",
            label: "Email",
          },
        },
        {
          id: 7,
          googleSheets: "Phone",
          netSuite: {
            value: "phone",
            label: "Phone",
          },
        },
        {
          id: 8,
          googleSheets: "Mobile Phone",
          netSuite: {
            value: "mobilePhone",
            label: "Mobile Phone",
          },
        },
        {
          id: 9,
          googleSheets: "Address",
          netSuite: {
            value: "address",
            label: "Address",
          },
        },
      ]);

      setNetsuiteValues([
        {
          value: "internalId",
          label: "Internal Id",
        },
        {
          value: "externalId",
          label: "External Id",
        },
        {
          value: "email",
          label: "Email",
        },
        {
          value: "phone",
          label: "Phone",
        },
        {
          value: "mobilePhone",
          label: "Mobile Phone",
        },
        {
          value: "address",
          label: "Address",
        },
      ]);
      // return;
    } else if (fieldData.recordType.label === "Contact") {
      console.log("=>", fieldData.recordType.label);
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
        {
          id: 4,
          googleSheets: "Internal Id",
          netSuite: {
            value: "internalId",
            label: "Internal Id",
          },
        },
        {
          id: 5,
          googleSheets: "External Id",
          netSuite: {
            value: "externalId",
            label: "External Id",
          },
        },
        {
          id: 6,
          googleSheets: "Email",
          netSuite: {
            value: "email",
            label: "Email",
          },
        },
        {
          id: 7,
          googleSheets: "Mobile Phone",
          netSuite: {
            value: "mobilePhone",
            label: "Mobile Phone",
          },
        },
        {
          id: 8,
          googleSheets: "Address",
          netSuite: {
            value: "address",
            label: "Address",
          },
        },
      ]);

      setNetsuiteValues([
        {
          value: "internalId",
          label: "Internal Id",
        },
        {
          value: "externalId",
          label: "External Id",
        },
        {
          value: "email",
          label: "Email",
        },
        {
          value: "mobilePhone",
          label: "Mobile Phone",
        },
        {
          value: "address",
          label: "Address",
        },
      ]);
    } else if (fieldData.recordType.label === "Vendor") {
      console.log("=>", fieldData.recordType.label);
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
        {
          id: 4,
          googleSheets: "Internal Id",
          netSuite: {
            value: "internalId",
            label: "Internal Id",
          },
        },
        {
          id: 5,
          googleSheets: "External Id",
          netSuite: {
            value: "externalId",
            label: "External Id",
          },
        },
        {
          id: 6,
          googleSheets: "Email",
          netSuite: {
            value: "email",
            label: "Email",
          },
        },
        {
          id: 7,
          googleSheets: "Phone",
          netSuite: {
            value: "phone",
            label: "Phone",
          },
        },
        {
          id: 8,
          googleSheets: "Address",
          netSuite: {
            value: "address",
            label: "Address",
          },
        },
        {
          id: 9,
          googleSheets: "Fax",
          netSuite: {
            value: "fax",
            label: "Fax",
          },
        },
      ]);

      setNetsuiteValues([
        {
          value: "internalId",
          label: "Internal Id",
        },
        {
          value: "externalId",
          label: "External Id",
        },
        {
          value: "email",
          label: "Email",
        },
        {
          value: "phone",
          label: "Phone",
        },
        {
          value: "address",
          label: "Address",
        },
        {
          value: "fax",
          label: "Fax",
        },
      ]);
    }
  }, [fieldData.recordType.label]);

  const { register, handleSubmit, setValue, control, watch } = useForm();

  const [num, setNum] = useState(0);
  useEffect(() => {
    rows.map((row, index) => {
      console.log("row", row.netSuite, "=>", index);
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
  const [tableRecords, setTableRecords] = useState([{}]);
  const onSubmit = (values) => {
    console.log("values", values);
    // format values in array of objects
    const tableRecord = values.googleSheets.map((googleSheets, index) => {
      return {
        googleSheets,
        netSuite: values.netSuite[index],
      };
    });
    console.log("tableRecord=>", tableRecord);
    setTableRecords(tableRecord);
    setRows(tableRecord);
  };
  console.log("tableRecords", tableRecords);

  const onClickCancel = () => {
    history.back();
  };

  const sd = {
    width: "5%",
  };
  console.log("rows", rows);
  console.log("netsuiteValues", netsuiteValues);

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
