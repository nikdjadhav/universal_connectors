import TkButton from "@/globalComponents/TkButton";
import TkInput from "@/globalComponents/TkInput";
import TkLabel from "@/globalComponents/TkLabel";
import { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
import { random } from "nanoid";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// const netsuiteValues = [
//   {
//     value: "internalId",
//     label: "Internal Id",
//   },
//   {
//     value: "externalId",
//     label: "External Id",
//   },
//   {
//     value: "name",
//     label: "Name",
//   },
//   {
//     value: "email",
//     label: "Email",
//   },
// ];

const Primary = ({ recordType }) => {
  const [netsuiteValues, setNetsuiteValues] = useState([
    // {
    //   value: "internalId",
    //   label: "Internal Id",
    // },
    // {
    //   value: "externalId",
    //   label: "External Id",
    // },
  ]);
  const [rows, setRows] = useState([
    // {
    //   id: 1,
    //   googleSheets: "Add",
    // },
    // {
    //   id: 2,
    //   googleSheets: "Update",
    // },
    // {
    //   id: 3,
    //   googleSheets: "Delete",
    // },
    // {
    //   id: 4,
    //   googleSheets: "Internal Id",
    //   netSuite: {
    //     value: "internalId",
    //     label: "Internal Id",
    //   },
    // },
    // {
    //   id: 5,
    //   googleSheets: "External Id",
    //   netSuite: {
    //     value: "externalId",
    //     label: "External Id",
    //   },
    // },
  ]);

  useEffect(() => {
    console.log("recordType in primary", recordType);
    if (recordType === "Customer") {
      console.log("=>", recordType);
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
          }
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

      setNetsuiteValues( [
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
        }
      ])
      // return;
    } else if (recordType === "Employee") {
      console.log("=>", recordType);
      setRows( [
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

      setNetsuiteValues( [
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
        }
      ])
      // return;
    } else if (recordType === "Contact") {
      console.log("=>", recordType);
      setRows( [
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
        }
      ])
    } else if (recordType === "Vendor") {
      console.log("=>", recordType);
      setRows( [
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
        }
      ])
    }
  }, [recordType]);
  

  // useEffect(() => {
  //   if(recordType === "Customer"){
  //     console.log("recordType in primary", recordType);
  //     // add new rows in existing rows
  //     setRows([
  //       ...rows,
  //       {
  //         id: 6,
  //         googleSheets: "Name",
  //         netSuite: {
  //           value: "name",
  //           label: "Name",
  //         },
  //       },
  //       {
  //         id: 7,
  //         googleSheets: "Email",
  //         netSuite: {
  //           value: "email",
  //           label: "Email",
  //         },
  //       }
  //     ])
  //   }
  // }, [recordType, rows])

  // if (recordType === "Customer") {
  //   console.log("recordType in primary", recordType);
  //   // add new rows in existing rows
  //   setRows([
  //     ...rows,
  //     {
  //       id: 6,
  //       googleSheets: "Name",
  //       netSuite: {
  //         value: "name",
  //         label: "Name",
  //       },
  //     },
  //     {
  //       id: 7,
  //       googleSheets: "Email",
  //       netSuite: {
  //         value: "email",
  //         label: "Email",
  //       },
  //     },
  //   ]);
  // }

  const { register, handleSubmit, setValue, control, watch } = useForm();

  // const netsuiteValues = useMemo(
  //   () => [
  //     {
  //       value: "internalId",
  //       label: "Internal Id",
  //     },
  //     {
  //       value: "externalId",
  //       label: "External Id",
  //     },
  //     {
  //       value: "name",
  //       label: "Name",
  //     },
  //     {
  //       value: "email",
  //       label: "Email",
  //     },
  //   ],
  //   []
  // );
const [num, setNum] = useState(0);
  useEffect(() => {
    rows.map((row, index) => {
      console.log("row", row.netSuite , "=>", index);
      setValue(`googleSheets[${index}]`, row.googleSheets);
      setValue(`netSuite[${index}]`, row.netSuite);
    })
  })

  const columns = useMemo(
    () => [
      {
        Header: "Google Sheets™ Columns",
        accessor: "googleSheets",
        Cell: ({ row }) => {
          // console.log("row", row);
          // console.log("row", `googleSheets[${row.index}]`);
          return(
          <TkInput
            type="text"
            name = {`googleSheets[${row.index}]`}
            {...register(`googleSheets[${row.index}]`)}
            // defaultValue={row.original.googleSheets}
            // value={row.original.googleSheets}
            disabled={row.original.googleSheets ? true : false}
          />
        )},
      },
      {
        Header: "NetSuite™ Fields",
        accessor: "netSuite",
        Cell: ({ row }) => {
          // row.original.googleSheets === "Address" ? console.log('address') : console.log('not address')
          // if (row.original.netSuite) {
            if ((row.original.googleSheets !== "Add") && (row.original.googleSheets !== "Update") && (row.original.googleSheets !== "Delete")) {
            return (
              <Controller
                control={control}
                name={`netSuite[${row.index}]`}
                render={({ field, }) => (
                  <TkSelect
                    {...field}
                    options={netsuiteValues}
                    // defaultValue={row.original.netSuite}
                     // value={row.original.netSuite}
                    // disabled={row.original.netSuite ? true : false}
                    // onChange={row.original.netSuite}
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
          // console.log("row data", prop.row.original);
          if ((prop.row.original.googleSheets !== "Add") && (prop.row.original.googleSheets !== "Update") && (prop.row.original.googleSheets !== "Delete")) {
          // if (prop.row.original.netSuite) {
            return (
              <i
                className="ri-delete-bin-5-line pe-auto px-3"
                // onClick={() => onClickDelete(prop.row.original)}
              />
            );
          } else {
            return null;
          }

          {
            /* <i
             className="ri-edit-2-fill mx-2"
             onClick={() => onClickEdit(prop.row.original)}
            ></i> */
          }
        },
      },
    ],
    [control, netsuiteValues, register]
  );

  const handleAddRow = () => {
    // create random number for id
    // const randomNumber = Math.floor(Math.random() * 1000); 
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
        <TkTableContainer columns={columns} data={rows || []} showPagination={true} thClass="text-dark" />

        <TkButton className="btn-success my-2 me-2" onClick={handleAddRow} type="button">
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
