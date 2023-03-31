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
import { API_BASE_URL } from "@/utils/Constants";
import { TkToastError, TkToastInfo } from "@/globalComponents/TkToastContainer";

const MapTableComponent = ({ mappedRecordId, ...other }) => {
  // const [control, setControl] = useState(null);
  const [recordType, setRecordType] = useState(null);
  const [integrationName, setIntegrationName] = useState(null);
  const [url, setUrl] = useState(null);
  const [resletOptions, setResletOptions] = useState([]);
  const [mappedRecordData, setMappedRecordData] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [restletData, setRestletData] = useState({});
  // const router = useRouter();

  const { register, handleSubmit, setValue, control, watch } = useForm();
  const [netsuiteValues, setNetsuiteValues] = useState([]);
  const [rows, setRows] = useState([]);

  const getMappedRecordById = useMutation({
    // mutationFn: tkFetch.post(`http://localhost:4000/v1/getMappedRecordById`),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getMappedRecordById`),
  });

  const getMappedFieldsDetails = useMutation({
    // mutationFn: tkFetch.post("http://localhost:4000/v1/getFields"),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getFields`),
  });

  const addFields = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addFields`),
    // mutationFn: tkFetch.post("http://localhost:4000/v1/addFields"),
  });

  // *** resle API
  const getResletOptions = useMutation({
    // mutationFn: tkFetch.post(`http://localhost:4000/v1/getOptions`),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getOptions`),
  });
  const getConfigurationDetails = useMutation({
    // mutationFn: tkFetch.post(
    //   "http://localhost:4000/v1/getConfigurationByIntegrationId"
    // ),
    mutationFn: tkFetch.post(
      `${API_BASE_URL}/getConfigurationByIntegrationId`
    ),
  });

  useEffect(() => {
    if (mappedRecordId) {
      getMappedRecordById.mutate(
        { mappedRecordId: mappedRecordId },
        {
          onSuccess: (data) => {
            setMappedRecordData(data[0]);
            setRecordType(data[0].source);
          },
          onError: (error) => {
            console.log("error in getMappedRecordById", error);
          },
        }
      );
    }
  }, [mappedRecordId]);

  // *** get mapped fields details
  useEffect(() => {
    if (mappedRecordId) {
      getMappedFieldsDetails.mutate(
        { mappedRecordId: mappedRecordId },
        {
          onSuccess: (data) => {
            setRows(data);
          },
          onError: (error) => {
            console.log("error in get mapped fields", error);
          },
        }
      );
    }
  }, [mappedRecordId]);

  useEffect(() => {
    if (recordType) {
      console.log("available", recordType);
      getConfigurationDetails.mutate(
        { integrationId: mappedRecordData.integrationId },
        {
          onSuccess: (data) => {
            data.map((item) => {
              if (item.systemName === "NetSuite™") {
                const restletData = {
                  account: item.accountId,
                  consumerKey: item.consumerKey,
                  consumerSecret: item.consumerSecretKey,
                  tokenId: item.accessToken,
                  tokenSecret: item.accessSecretToken,
                  scriptDeploymentId: "1",
                  scriptId: "1529",
                  resttype: "ListOfRecordField",
                  recordtype: recordType,
                };

                // *** get reslet options
                getResletOptions.mutate(restletData, {
                  onSuccess: (data) => {
                    // *** loop to object
                    if (data.length > 0) {
                      // ***set body values in netsuiteValues
                      const entries = Object.entries(data[0]?.body[0]);
                      entries.map(([key, value], index) => {
                        // console.log("value", value);
                        setNetsuiteValues((netsuiteValues) => [
                          ...netsuiteValues,
                          { label: value, value: key },
                        ]);
                      });

                      // ***set lines values in netsuiteValues
                      data[0]?.lines.map((item) => {
                        const lineEntries = Object.entries(item);
                        lineEntries.map(([key, value], index) => {
                          //  console.log("value", value);
                          const valueEntries = Object.entries(value);
                          valueEntries.map(([key1, value1], index) => {
                            // console.log("value1", value1);
                            const value1Entries = Object.entries(value1);
                            value1Entries.map(([key2, value2], index) => {
                              // console.log("value2", value2);
                              setNetsuiteValues((netsuiteValues) => [
                                ...netsuiteValues,
                                { label: value2, value: key2 },
                              ]);
                            });
                          });
                        });
                      });
                    }
                  },
                  onError: (error) => {
                    console.log("error in getResletOptions", error);
                  },
                });
              }
            });
          },
          onError: (error) => {
            console.log("error in getConfigurationDetails", error);
          },
        }
      );
    }
  }, [recordType]);

  // console.log("netsuiteValues**********", netsuiteValues);

  if (rows.length > 0) {
    rows.map((row, index) => {
      setValue(
        `googleSheets[${index}]`,
        row.destinationFieldValue || row.googleSheets
      );
      setValue(
        `netSuite[${index}]`,
        {
          value: row.sourceFieldValue,
          label: row.sourceFieldValue,
        } || { value: row.netSuite, label: row.netSuite }
      );
    });
  }

  const handleChange = (index, e) => {
    const addedRow = [...rows];
    if (e.label) {
      addedRow[index].sourceFieldValue = e.label;
      setRows(addedRow);
    } else {
      setTimeout(() => {
        addedRow[index].destinationFieldValue = e.target.value;
        setRows(addedRow);
      }, 2000);
    }
  };

  const columns =
    //  useMemo(
    //   () =>
    [
      {
        Header: "Google Sheets™ Columns",
        accessor: "googleSheets",
        Cell: ({ row }) => {
          return (
            <TkInput
              type="text"
              name={`googleSheets[${row.index}]`}
              {...register(`googleSheets[${row.index}]`)}
              disabled={row.original.destinationFieldValue ? true : false}
              onChange={(e) => handleChange(row.index, e)}
            />
          );
        },
      },
      {
        Header: "NetSuite™ Fields",
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
                  maxMenuHeight="100px"
                  onChange={(e) => handleChange(row.index, e)}
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
          // if (
          //   prop.row.original.googleSheets !== "Add" &&
          //   prop.row.original.googleSheets !== "Update" &&
          //   prop.row.original.googleSheets !== "Delete"
          // ) {
          return <i className="ri-delete-bin-5-line pe-auto px-3" />;
          // } else {
          //   return null;
          // }
        },
      },
    ];
  // [control, netsuiteValues, register]
  // );

  const handleAddRow = () => {
    setRows([...rows, { googleSheets: "", netSuite: "" }]);
  };

  // *** to get formatted values from table
  const [tableRecords, setTableRecords] = useState([]);

  const onSubmit = (values) => {
    const userId = sessionStorage.getItem("userId");
    const tableRecord = values.googleSheets.map((googleSheets, index) => {
      return {
        userId: JSON.parse(userId),
        mappedRecordId: mappedRecordId,
        sourceField: "NetSuite™",
        destinationField: "Google Sheets™",
        destinationFieldValue: googleSheets,
        sourceFieldValue: values.netSuite[index]?.label,
      };
    });

    setTableRecords(tableRecord);

    addFields.mutate(tableRecord, {
      onSuccess: (data) => {
        TkToastInfo("Added Successfully", { hideProgressBar: true });
      },
      onError: (error) => {
        console.log("error", error);
        TkToastError("Error for add fields");
      },
    });
  };

  const onClickCancel = () => {
    history.back();
  };

  // //  ***  change rows on click of record type "sales"
  // const onClickSales = () => {
  //   setControl("sales");
  // };

  // //  ***  change rows on click of record type "address"
  // const onClickAddress = () => {
  //   setControl("address");
  // };

  // ***
  // const onClickPrimary = () => {
  //   setControl("primary");
  // };
  // console.log("rows ==>", rows);
  // console.log("netsuiteValues", netsuiteValues);

  // const tabs = {
  //   Primary: 1,
  //   Sales: 2,
  //   Address: 3,
  // };

  // const [activeTab, setActiveTab] = useState(tabs.Primary);

  // const toggleTab = (tab) => {
  //   if (activeTab !== tab) {
  //     setActiveTab(tab);
  //   }
  // };

  // const onClickHandeler = () => {
  //   if (activeTab === tabs.Primary) {
  //     setActiveTab(tabs.Sales);
  //   }
  //   if (activeTab === tabs.Sales) {
  //     setActiveTab(tabs.Address);
  //   }
  //   if (activeTab === tabs.Address) {
  //     toggle();
  //   }
  // };

  return (
    <>
      <TkRow>
        <TkCol>
          <TkLabel>
            <span className="fw-bold">
              Integration Name: {mappedRecordData.integration?.integrationName}
            </span>
            &nbsp;&nbsp;
          </TkLabel>
        </TkCol>
        <TkCol>
          <TkLabel>
            <span className="fw-bold">
              Google Sheets™ Url: {mappedRecordData.destination}
            </span>
            &nbsp;&nbsp;
          </TkLabel>
        </TkCol>
      </TkRow>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        {rows.length === 0 ? (
          <div>
            {/* no data found */}
            <div className="text-center py-4">
              <h4>Loadding...</h4>
            </div>
          </div>
        ) : (
          <>
            <TkTableContainer
              columns={columns}
              data={rows || []}
              showPagination={true}
              thClass="text-dark"
            />
          </>
        )}
        {/* <TkTableContainer
          columns={columns}
          data={rows || []}
          showPagination={true}
          thClass="text-dark"
        /> */}

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

      {/* <TabContent activeTab={activeTab}>
        <TabPane tabId={tabs.Primary}>
          <Primary
            onClickHandeler={onClickHandeler}
            mappedRecordId={mappedRecordId}
          />
        </TabPane>

        <TabPane tabId={tabs.Sales}>
          <Sales
            onClickHandeler={onClickHandeler}
            mappedRecordId={mappedRecordId}
          />
        </TabPane>

        <TabPane tabId={tabs.Address}>
          <Address
            onClickHandeler={onClickHandeler}
            mappedRecordId={mappedRecordId}
          />
        </TabPane>
      </TabContent> */}
    </>
  );
};
export default MapTableComponent;
