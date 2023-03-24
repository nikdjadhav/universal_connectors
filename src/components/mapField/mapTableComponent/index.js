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
import Primary from "./Primary";
import Sales from "./Sales";
import Address from "./Address";
import classnames from "classnames";
import TkLabel from "@/globalComponents/TkLabel";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
// import { useLocation } from 'react-router-dom';

// const schema = Yup.object({
//   googleSheets: "",
//   netSuite: "",
// }).required();

const MapTableComponent = ({ data, mappedRecordId }) => {
  const [control, setControl] = useState(null);
  const [recordType, setRecordType] = useState(null);
  const [integrationName, setIntegrationName] = useState(null);
  const [url, setUrl] = useState(null);
  const router = useRouter();

  console.log("mappedRecordId in maptablecomponent", mappedRecordId);

  const getMappedRecordById = useMutation({
    mutationFn: tkFetch.post(`http://localhost:4000/v1/getMappedRecordById`),
  });

  const getIntegrationById = useMutation({
    mutationFn: tkFetch.post(`http://localhost:4000/v1/getIntegrationById`),
  });

  useEffect(() => {
    if (mappedRecordId) {
      getMappedRecordById.mutate(
        { mappedRecordId: mappedRecordId },
        {
          onSuccess: (data) => {
            console.log("data in getMappedRecordById", data[0]);
            setRecordType(data[0].recordType);
            setUrl(data[0].url);

            getIntegrationById.mutate(
              { id: data[0].integrationId },
              {
                onSuccess: (data) => {
                  console.log("data in getIntegrationById", data[0]);
                  setIntegrationName(data[0].integrationName);
                },
                onError: (error) => {
                  console.log("error in getIntegrationById", error);
                },
              }
            );
            // setControl(data.data[0].recordType);
            // setRecordType(data.data[0].recordType);
          },
          onError: (error) => {
            console.log("error in getMappedRecordById", error);
          },
        }
      );
    }
  }, []);

  //  ***  change rows on click of record type "sales"
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

  // console.log("recordType==>==>",data);
  // console.log("recordType==>==>",data?.recordType);

  // // console.log("recordType==>==>", data?.recordType.label);
  // useEffect(() => {
  //   if (data?.recordType.label) {
  //     setRecordType(data?.recordType.label);
  //     console.log("first", data);
  //   } else {
  //     setRecordType(data?.recordType);
  //     console.log("second", data);
  //   }
  // }, [data]);

  console.log("recordType==>==>", recordType);
  // // setRecordType(data?.recordType.label);

  return (
    <>
      {/* {recordType === "Contact" || "Customer" &&()} */}
      {/* {recordType === "Customer" && ( */}
      <Nav className="nav-tabs dropdown-tabs nav-tabs-custom mb-3 fs-5">
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
        ) : recordType === "Employee" || recordType === "Vendor" ? (
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

      <TkRow>
        <TkCol>
          <TkLabel>
            <span className="fw-bold">Integration Name: {integrationName}</span>
            &nbsp;&nbsp;
            {/* <span>{data?.integrationName.label || data?.integrationName}</span> */}
          </TkLabel>
        </TkCol>
        <TkCol>
          <TkLabel>
            <span className="fw-bold">Google Sheets™ Url: {url}</span>
            &nbsp;&nbsp;
            {/* <span> {data?.googleSheetUrl || ""}</span> */}
          </TkLabel>
        </TkCol>
      </TkRow>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={tabs.Primary}>
          {/* {recordType ? ( */}
            <Primary
              onClickHandeler={onClickHandeler}
              mappedRecordId={mappedRecordId}
              // recordType={recordType}
              // fieldData={data}
            />
          {/* ) : null} */}
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
