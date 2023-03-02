import TkButton from "@/globalComponents/TkButton";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
// import { netsuiteValues } from "@/utils/Constants";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTable } from "react-table";
import { Nav, NavItem, NavLink, TabContent, Table, TabPane } from "reactstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Primary from "./Primary";
import Sales from "./Sales";
import Address from "./Address";
import classnames from "classnames";

// const schema = Yup.object({
//   googleSheets: "",
//   netSuite: "",
// }).required();

const MapTableComponent = ({ recordType }) => {
  const [control, setControl] = useState(null);
  // const { register, handleSubmit, setValue, control } = useForm();
  // const [data, setData] = useState([{ googleSheets: "", netSuite: "" }]);

  // const [rows, setRows] = useState([]);
  // const [netsuiteValues, setNetsuiteValues] = useState([]);
  // const [inputValues, setInputValues] = useState([
  //   "internalId",
  //   "name",
  //   "email",
  // ]);
  // useEffect(() => {
  //   setRows([
  //     {
  //       id: 1,
  //       googleSheets: "Internal Id",
  //       netSuite: {
  //         value: "internalId",
  //         label: "Internal Id",
  //       },
  //     },
  //     {
  //       id: 2,
  //       googleSheets: "Name",
  //       netSuite: {
  //         value: "name",
  //         label: "Name",
  //       },
  //     },
  //     {
  //       id: 3,
  //       googleSheets: "Email",
  //       netSuite: {
  //         value: "email",
  //         label: "Email",
  //       },
  //     },
  //   ]);

  //   setNetsuiteValues([
  //     {
  //       value: "internalId",
  //       label: "Internal Id",
  //     },
  //     {
  //       value: "name",
  //       label: "Name",
  //     },
  //     {
  //       value: "email",
  //       label: "Email",
  //     },
  //   ]);

  //   // setInputValues(["internalId", "name", "email"]);
  // }, []);

  // const handleInputChange = useCallback(
  //   (event) => {
  //     const newInputValues = [...inputValues];
  //     newInputValues[index] = event.target.value;
  //     setInputValues(newInputValues);
  //   },
  //   [inputValues]
  // );

  // const onClickDelete = useCallback(
  //   (rowValue) => {
  //     console.log("row", rowValue);
  //     const deleted = rows.filter((item) => item.id !== rowValue.id);
  //     setRows(deleted);
  //     console.log("deleted", deleted);
  //   },
  //   [rows]
  // );

  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "ID",
  //       accessor: "id",
  //     },
  //     {
  //       Header: "Google Sheets™",
  //       accessor: "googleSheets",
  //       Cell: ({ row }) => (
  //         <TkInput
  //           type="text"
  //           {...register(`googleSheets[${row.index}]`)}
  //           // value={row.original.googleSheets}
  //           defaultValue={row.original.googleSheets}
  //           // onchange={(e) => {setValue(`googleSheets[${row.index}]`, e.target.value)}}
  //           onChange={(e) => {
  //             row.original.googleSheets = e.target.value;
  //             console.log("value", e.target.value);
  //           }}
  //         />
  //       ),
  //     },
  //     // {
  //     //   Header: "Google Sheets™",
  //     //   accessor: "googleSheets",
  //     //   Cell: ({ row }) => {
  //     //     console.log("row.value", row);
  //     //     // inputValues.map((item, index) => {
  //     //     //   console.log("item", item);
  //     //     // return <TkInput {...register(`googleSheets[${row.index}]`)} // {...register(`googleSheets[${index}]`)}
  //     //     // // key={index}
  //     //     // id={`googleSheets[${row.index}]`}
  //     //     // type="text"
  //     //     // // value={row.original.googleSheets}

  //     //     // />; // });
  //     //     return <span>{row.values.googleSheets}</span>;
  //     //   },
  //     // },
  //     {
  //       Header: "NetSuite™",
  //       accessor: "netSuite",
  //       Cell: ({ row }) => {
  //         // console.log("props--", row);
  //         return (
  //           <Controller
  //             control={control}
  //             name={`netSuite[${row.index}]`}
  //             render={({ field }) => (
  //               <TkSelect
  //                 {...field}
  //                 options={netsuiteValues}
  //                 defaultValue={row.original.netSuite} // value={row.original.netSuite}
  //                 // onChange={row.original.netSuite}
  //                 maxMenuHeight="80px"
  //               />
  //             )}
  //           />
  //         );
  //       },
  //     },
  //     {
  //       Header: "Action",
  //       accessor: "action",
  //       Cell: (prop) => {
  //         // console.log("row data", prop.row.original)
  //         return (
  //           <>
  //             <i
  //               className="ri-delete-bin-5-line pe-auto px-3"
  //               onClick={() => onClickDelete(prop.row.original)}
  //             ></i>
  //             {/* <i
  //        className="ri-edit-2-fill mx-2"
  //        onClick={() => onClickEdit(prop.row.original)}
  //       ></i> */}
  //           </>
  //         );
  //       },
  //     },
  //   ],
  //   [control, netsuiteValues, onClickDelete, register]
  // );

  // // const tableInstance = useTable({ columns, data });

  // // const { getTableProps, getTableBodyProps, rows, prepareRow } = tableInstance;

  // // *** to add new row
  // const handleAddRow = () => {
  //   setRows([...rows, { googleSheets: "", netSuite: "" }]);
  // };

  // // *** to get formatted values from table
  // const [tableRecords, setTableRecords] = useState([{}]);
  // const onSubmit = (values) => {
  //   console.log("values", values);
  //   // format values in array of objects
  //   const tableRecords = values.googleSheets.map((googleSheets, index) => {
  //     return {
  //       googleSheets,
  //       netSuite: values.netSuite[index],
  //     };
  //   });
  //   setTableRecords(tableRecords);
  // };
  // // console.log("tableRecords", tableRecords);

  // const onClickCancel = () => {
  //   history.back();
  // };

  // //  ***  change rows on click of record type "sales"
  const onClickSales = () => {
    setControl("sales");
    //   console.log("sales");
    //   // setRows(...rows,[])
    //   setRows([
    //     {
    //       id: 1,
    //       googleSheets: "Employee",
    //       netSuite: {
    //         value: "employee",
    //         label: "Employee",
    //       },
    //     },
    //     {
    //       id: 2,
    //       googleSheets: "Sales Role",
    //       netSuite: {
    //         value: "salesRole",
    //         label: "Sales Role",
    //       },
    //     },
    //     {
    //       id: 3,
    //       googleSheets: "Conntribution",
    //       netSuite: {
    //         value: "conntribution",
    //         label: "Conntribution",
    //       },
    //     },
    //   ]);

    //   setNetsuiteValues([
    //     {
    //       value: "employee",
    //       label: "Employee",
    //     },
    //     {
    //       value: "salesRole",
    //       label: "Sales Role",
    //     },
    //     {
    //       value: "conntribution",
    //       label: "Conntribution",
    //     },
    //   ]);
  };

  // //  ***  change rows on click of record type "address"
  const onClickAddress = () => {
    setControl("address");
    //   console.log("address");
    //   setRows([
    //     {
    //       id: 1,
    //       googleSheets: "Name",
    //       netSuite: {
    //         value: "name",
    //         label: "Name",
    //       },
    //     },
    //     {
    //       id: 2,
    //       googleSheets: "Address",
    //       netSuite: {
    //         value: "address",
    //         label: "Address",
    //       },
    //     },
    //     {
    //       id: 3,
    //       googleSheets: "Phone",
    //       netSuite: {
    //         value: "phone",
    //         label: "Phone",
    //       },
    //     },
    //   ]);

    //   setNetsuiteValues([
    //     {
    //       value: "name",
    //       label: "Name",
    //     },
    //     {
    //       value: "address",
    //       label: "Address",
    //     },
    //     {
    //       value: "phone",
    //       label: "Phone",
    //     },
    //   ]);
  };

  const onClickPrimary = () => {
    setControl("primary");
  };
  // console.log("rows ==>", rows);
  // console.log("netsuiteValues", netsuiteValues);

  const tabs = {
    Primary: 1,
    Sales: 2,
    Address: 3,
  };

  const [activeTab, setActiveTab] = useState(tabs.Primary);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onClickHandeler = () => {
    if (activeTab === tabs.Primary) {
      setActiveTab(tabs.Sales);
    }
    if (activeTab === tabs.Sales) {
      setActiveTab(tabs.Address);
    }
    if (activeTab === tabs.Address) {
      toggle();
    }
  };

  console.log("recordType==>", recordType);

  return (
    <>
      {/* {recordType === "Contact" || "Customer" &&()} */}
      {/* {recordType === "Customer" && ( */}
      <Nav className="nav-tabs dropdown-tabs nav-tabs-custom mb-3">
        {recordType === "Customer" ? (
          <>
            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Primary,
                })}
                onClick={() => {
                  toggleTab(tabs.Primary);
                }}
              >
                Primary
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Sales,
                })}
                onClick={() => {
                  toggleTab(tabs.Sales);
                }}
              >
                Sales
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Address,
                })}
                onClick={() => {
                  toggleTab(tabs.Address);
                }}
              >
                Address
              </NavLink>
            </NavItem>
          </>
        ) : recordType === "Employee" || recordType === "Vender" ? (
          <>
            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Primary,
                })}
                onClick={() => {
                  toggleTab(tabs.Primary);
                }}
              >
                Primary
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Address,
                })}
                onClick={() => {
                  toggleTab(tabs.Address);
                }}
              >
                Address
              </NavLink>
            </NavItem>
          </>
        ) : recordType === "Contact" ? (
          <>
            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Primary,
                })}
                onClick={() => {
                  toggleTab(tabs.Primary);
                }}
              >
                Primary
              </NavLink>
            </NavItem>
          </>
        ) : (
          <NavItem>
            <NavLink
              href="#"
              className={classnames({
                active: activeTab === tabs.Primary,
              })}
              onClick={() => {
                toggleTab(tabs.Primary);
              }}
            >
              Primary
            </NavLink>
          </NavItem>
        )}
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={tabs.Primary}>
          <Primary onClickHandeler={onClickHandeler} />
        </TabPane>

        <TabPane tabId={tabs.Sales}>
          <Sales onClickHandeler={onClickHandeler} />
        </TabPane>

        <TabPane tabId={tabs.Address}>
          <Address onClickHandeler={onClickHandeler} />
        </TabPane>
      </TabContent>
      {/* )} */}

      {/* #### */}
      {/* {recordType === "Customer" ? (
        <>
          <Nav className="nav-tabs dropdown-tabs nav-tabs-custom mb-3">
            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Primary,
                })}
                onClick={() => {
                  toggleTab(tabs.Primary);
                }}
              >
                Primary
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Sales,
                })}
                onClick={() => {
                  toggleTab(tabs.Sales);
                }}
              >
                Sales
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Address,
                })}
                onClick={() => {
                  toggleTab(tabs.Address);
                }}
              >
                Address
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId={tabs.Primary}>
              <Primary onClickHandeler={onClickHandeler} />
            </TabPane>

            <TabPane tabId={tabs.Sales}>
              <Sales onClickHandeler={onClickHandeler} />
            </TabPane>

            <TabPane tabId={tabs.Address}>
              <Address onClickHandeler={onClickHandeler} />
            </TabPane>
          </TabContent>
        </>
      ) : (
        <Primary />
      )} */}
    </>
  );
};
export default MapTableComponent;

{
  /* ***** */
}
{
  /* {recordType === "Customer" ? (
        <>
          <TkButton className="btn-info me-2" onClick={onClickPrimary}>
            Primary
          </TkButton>
          <TkButton className="btn-info me-2" onClick={onClickSales}>
            Sales
          </TkButton>
          <TkButton className="btn-info mx-2" onClick={onClickAddress}>
            Address
          </TkButton>
        </>
      ) : null} */
}
{
  /* {control === "sales" ? (
        <Sales />
      ) : control === "address" ? (
        <Address />
      ) : (
        <Primary />
      )} */
}
