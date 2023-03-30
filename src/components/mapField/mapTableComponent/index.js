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
  // const router = useRouter();

  const { register, handleSubmit, setValue, control, watch } = useForm();
  const [netsuiteValues, setNetsuiteValues] = useState([
    // {
    //   label: "Address",
    //   value: "address",
    // },
    // {
    //   label: "Email",
    //   value: "email",
    // },
  ]);
  const [rows, setRows] = useState([]);
  // console.log("mappedRecordId in maptablecomponent", mappedRecordId);
  // console.log('typrof mappedRecordId', typeof(mappedRecordId));

  const getResletRecordType = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/getRecordTypes`),
  });

  const getMappedRecordById = useMutation({
    // mutationFn: tkFetch.post(`http://localhost:4000/v1/getMappedRecordById`),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getMappedRecordById`),
  });

  const getIntegrationById = useMutation({
    // mutationFn: tkFetch.post(`http://localhost:4000/v1/getIntegrationById`),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getIntegrationById`),
  });

  const addFields = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addFields`),
    // mutationFn: tkFetch.post("http://localhost:4000/v1/addFields"),
  });

  const getMappedFieldsDetails = useMutation({
    // mutationFn: tkFetch.post("http://localhost:4000/v1/getFields"),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getFields`),
  });

  // *** resle API
  const getResletOptions = useMutation({
    // mutationFn: tkFetch.post(`http://localhost:4000/v1/getOptions`),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getOptions`),
  });

  useEffect(() => {
    if (mappedRecordId) {
      getMappedRecordById.mutate(
        { mappedRecordId: mappedRecordId },
        {
          onSuccess: (data) => {
            // console.log("data in getMappedRecordById", data[0]);
            // setRecordType(data[0].recordType);
            setUrl(data[0].url);
            setMappedRecordData(data[0]);

            // *** get integration details
            getIntegrationById.mutate(
              { id: data[0].integrationId },
              {
                onSuccess: (data) => {
                  // console.log("data in getIntegrationById", data[0]);
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
  }, [mappedRecordId]);

  console.log("mappedRecordData^^^^^^^^^^^^^^^", mappedRecordData);

  useEffect(() => {
    const getFieldsData = {
      account: "TSTDRV1423092",
      consumerKey:
        "7c5f5179740c2fd6bb6c73a6c1235d369ccc61f608abed76acf7cc1bc0245caf",
      consumerSecret:
        "f02dc5c3720c99b35efd1713941477e7bd34c9467d43727199a222d3596b11a3",
      tokenId:
        "df85b218f1627ea731b61d503330947261b512ca88a5e12beaa4a4316ee0cbe6",
      tokenSecret:
        "508004293fd1a44799817805c39208d781f909e69456f3b9d0184a54d51739ea",
      scriptDeploymentId: "1",
      scriptId: "1529",
      base_url:
        "https://tstdrv1423092.restlets.api.netsuite.com/app/site/hosting/restlet.nl",
      resttype: "ListOfRecordType",
    };
    getResletRecordType.mutate(getFieldsData, {
      onSuccess: (data) => {
        // console.log("data==", data);
        // setRecordTypes(data[0]);
        data[0].list.map((item) => {
          // console.log(
          //   "mappedRecordData.recordType******",
          //   mappedRecordData.recordType
          // );
          if (item.text === mappedRecordData.recordType) {
            console.log("==item==", item);
            setRecordType(item.id);
          }
        });
      },
      onError: (error) => {
        console.log("error==", error);
      },
    });
  }, [mappedRecordData.recordType]);

  // *** get mapped fields details
  useEffect(() => {
    if (mappedRecordId) {
      getMappedFieldsDetails.mutate(
        { mappedRecordId: mappedRecordId },
        {
          onSuccess: (data) => {
            // console.log("get mapped fields", data);
            setRows(data);
          },
          onError: (error) => {
            console.log("error in get mapped fields", error);
          },
        }
      );
    }
  }, [mappedRecordId]);
  // console.log("MappedFieldsData", mappedFieldsData);

  useEffect(() => {
    // for reslet record types data

    const restletData = {
      account: "TSTDRV1423092",
      consumerKey:
        "7c5f5179740c2fd6bb6c73a6c1235d369ccc61f608abed76acf7cc1bc0245caf",
      consumerSecret:
        "f02dc5c3720c99b35efd1713941477e7bd34c9467d43727199a222d3596b11a3",
      tokenId:
        "df85b218f1627ea731b61d503330947261b512ca88a5e12beaa4a4316ee0cbe6",
      tokenSecret:
        "508004293fd1a44799817805c39208d781f909e69456f3b9d0184a54d51739ea",
      scriptDeploymentId: "1",
      scriptId: "1529",
      resttype: "ListOfRecordField",
      recordtype: recordType,
      // // recordtype: recordType
    };
    console.log("restletData", restletData);
    if (recordType !== null) {
      console.log("^^^^^^^^^^")
      getResletOptions.mutate(restletData, {
        onSuccess: (data) => {
          // *** loop to object
          if (data.length > 0) {
            // const entries = Object.entries(data[0]?.body[0]);
            // entries.map(([key, value], index) => {
            //   // *** set the value in the netsuiteValues
            //   netsuiteValues.push({
            //     label: value,
            //     value: key,
            //   });
            // });

            // ****
            // using foreach
            data.forEach((element) => {
              console.log("element", element);
              // loop to element object
              const entries = Object.entries(element);

              entries.map((item, index) => {
                console.log("item***", item);
                console.log("item[1]***", typeof item[1]);
                if(item[0] == "body"){
                  console.log("******body")
                  item[1].map((options, i) => {
                    const bodyEntries = Object.entries(options);
                    bodyEntries.map(([key, value], index) => {
                      netsuiteValues.push({
                        label: value,
                        value: key,
                      });
                    });
                  });
                } else{
                  console.log("******else", )
                  item[1].map((items, i) => {
                    console.log("items", items);
                    const bodyEntries = Object.entries(items);
                    bodyEntries.map(([key, value], index) => {
                      if(Object.entries(value)){
                        const otherEntries = Object.entries(value);
                        otherEntries.map(([key, value], index) => {
                          netsuiteValues.push({
                            label: value,
                            value: key,
                          });
                        });
                      }else{
                        netsuiteValues.push({
                          label: value,
                          value: key,
                        });
                      }
                  });
                });
                }

                // item[1].map((options, i) => {
                //   console.log("options******", options);
                //   // loop to options object
                //   // const optionsEntries = Object.entries(options);
                //   // optionsEntries.map((option, index) => {
                //   //   if (option[1]) {
                //   //     console.log("option A", option);
                //   //     console.log("typeof A", typeof option);
                //   //     console.log("option[1]", option[1]);
                //   //   } else {
                //   //     console.log("option B", option);
                //   //     console.log("typeof B", typeof option);
                //   //   }
                //   // });


                // });
              });
            });

            // ****
            // const entries = Object.entries(data[0]?.body[0]);
            // entries.map(([key, value], index) => {

            //   // *** set the value in the netsuiteValues
            //   netsuiteValues.push({
            //     label: value,
            //     value: key,
            //   });
            // });
          }
        },
        onError: (error) => {
          console.log("error in getResletOptions", error);
        },
      });
    }
  }, [recordType]);

  console.log("netsuiteValues**********", netsuiteValues);

  if (rows.length > 0) {
    rows.map((row, index) => {
      // console.log("row*****************", row);
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
    console.log("***e", e);
    const addedRow = [...rows];
    if (e.label) {
      // addedRow[index].netSuite = e.label;
      addedRow[index].sourceFieldValue = e.label;
      setRows(addedRow);
    } else {
      // addedRow[index].googleSheets= e.target.value;
      // settimeout to set the value
      setTimeout(() => {
        addedRow[index].destinationFieldValue = e.target.value;
        setRows(addedRow);
      }, 2000);
    }
    // setRows(addedRow);
  };
  // console.log("*************rows***********", rows);

  const columns =
    //  useMemo(
    //   () =>
    [
      {
        Header: "Google Sheets™ Columns",
        accessor: "googleSheets",
        Cell: ({ row }) => {
          // console.log("row.original", row.original);
          return (
            <TkInput
              type="text"
              name={`googleSheets[${row.index}]`}
              {...register(`googleSheets[${row.index}]`)}
              // disabled={row.original.googleSheets ? true : false}
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
          // } else {
          //   return null;
          // }
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

  // console.log("before add", rows);
  const handleAddRow = () => {
    setRows([...rows, { googleSheets: "", netSuite: "" }]);
  };
  // console.log("after add", rows);

  // *** to get formatted values from table
  const [tableRecords, setTableRecords] = useState([]);

  const onSubmit = (values) => {
    // ***addFields
    // e.preventDefault();
    console.log("values", values);
    // format values in array of objects
    const userId = sessionStorage.getItem("userId");
    const tableRecord = values.googleSheets.map((googleSheets, index) => {
      return {
        // id: index,
        userId: JSON.parse(userId),
        mappedRecordId: mappedRecordId,
        // FieldType: "Primary",
        sourceField: "NetSuite™",
        destinationField: "Google Sheets™",
        destinationFieldValue: googleSheets,
        sourceFieldValue: values.netSuite[index]?.label,
      };
    });

    // console.log("tableRecord=>", tableRecord);

    setTableRecords(tableRecord);

    // setRows(tableRecord);
    addFields.mutate(tableRecord, {
      onSuccess: (data) => {
        // console.log("**data==>", data);
        // setValue("netSuite", data.netSuite);
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

  console.log("tableRecords", tableRecords);
  console.log("rows", rows);
  console.log("netsuiteValues", netsuiteValues);

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

  console.log("recordType==>==>", recordType);

  return (
    <>
      <TkRow>
        <TkCol>
          <TkLabel>
            <span className="fw-bold">Integration Name: {integrationName}</span>
            &nbsp;&nbsp;
          </TkLabel>
        </TkCol>
        <TkCol>
          <TkLabel>
            <span className="fw-bold">Google Sheets™ Url: {url}</span>
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
