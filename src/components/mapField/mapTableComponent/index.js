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
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";
import { TkToastError, TkToastInfo } from "@/globalComponents/TkToastContainer";
import { useFieldArray } from "react-hook-form";

const MapTableComponent = ({ mappedRecordId, recordTypeTitle, ...other }) => {
  // const [control, setControl] = useState(null);
  const [recordType, setRecordType] = useState(null);
  const [integrationName, setIntegrationName] = useState(null);
  const [url, setUrl] = useState(null);
  const [resletOptions, setResletOptions] = useState([]);
  // const [mappedRecordData, setMappedRecordData] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  // const [restletData, setRestletData] = useState({});
  // const router = useRouter();

  const { register, handleSubmit, setValue, control, watch } = useForm();
  const [netsuiteValues, setNetsuiteValues] = useState([]);
  const [rows, setRows] = useState([]);
  const [integrationId, setIntegrationId] = useState(null);
  const [mappedRecordDetails, setMappedRecordDetails] = useState([]);
  const [configurationData, setConfigurationData] = useState(null);
  const [fieldId, setFieldId] = useState(null);

  // console.log("mappedRecordId", mappedRecordId);
  const apiResults = useQueries({
    queries: [
      {
        queryKey: ["getMappedRecordById", mappedRecordId],
        queryFn: tkFetch.get(
          `http://localhost:4000/v1/getMappedRecordById/${mappedRecordId}`
        ),
        enabled: !!mappedRecordId,
      },
      {
        queryKey: ["config", integrationId],
        queryFn: tkFetch.get(
          `http://localhost:4000/v1/getConfigurationByIntegrationId/${integrationId}`
        ),
        enabled: !!integrationId,
      },
      {
        queryKey: ["configDetails", configurationData],
        queryFn: tkFetch.get(
          // `http://localhost:4000/v1/getRecordTypes/${configurationData}`
          `http://localhost:4000/v1/getRecordTypes`,
          { params: configurationData }
        ),
        enabled: !!configurationData,
      },
      {
        queryKey: ["getFields", mappedRecordId],
        queryFn: tkFetch.get(
          `http://localhost:4000/v1/getFields/${mappedRecordId}`
        ),
        enabled: !!mappedRecordId,
      },
    ],
  });

  const [mappedRecord, config, restletData, getFields] = apiResults;
  const {
    data: mappedRecordData,
    isLoading: mappedRecordLoading,
    isError: mappedRecordError,
    error: mappedRecordErrorData,
  } = mappedRecord;
  const {
    data: configData,
    isLoading: configLoading,
    isError: configError,
    error: configErrorData,
  } = config;
  const {
    data: restletOptions,
    isLoading: restletLoading,
    isError: restletError,
    error: restletErrorData,
  } = restletData;
  const {
    data: fieldsData,
    isLoading: fieldsLoading,
    isError: fieldsError,
    error: fieldsErrorData,
  } = getFields;

  const addFields = useMutation({
    // mutationFn: tkFetch.post(`${API_BASE_URL}/addFields`),
    mutationFn: tkFetch.post("http://localhost:4000/v1/addFields"),
  });

  const deleteFields = useMutation({
    // mutationFn: tkFetch.post(`${API_BASE_URL}/deleteField`),
    mutationFn: tkFetch.post(`http://localhost:4000/v1/deleteField`),
  });

  // console.log("^^^^^^^^^^^^^^^", configData);
  // console.log("restletOptions**********", restletOptions);
  useEffect(() => {
    if (configData) {
      // console.log("available")
      configData.map((item) => {
        // console.log("item", item)
        if (item.systemName === "NetSuite™") {
          setConfigurationData({
            account: item.accountId,
            consumerKey: item.consumerKey,
            consumerSecret: item.consumerSecretKey,
            tokenId: item.accessToken,
            tokenSecret: item.accessSecretToken,
            scriptDeploymentId: "1",
            scriptId: "1529",
            resttype: "ListOfRecordField",
            recordtype: mappedRecordDetails.source,
          });
        }
      });
    }

    if (restletOptions) {
      const entries = Object.entries(restletOptions[0]?.body[0]);
      entries.map(([key, value], index) => {
        // console.log("value", value);
        setNetsuiteValues((netsuiteValues) => [
          ...netsuiteValues,
          { label: value, value: key },
        ]);
      });
      // ***set lines values in netsuiteValues
      restletOptions[0]?.lines.map((item) => {
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
  }, [configData, mappedRecordDetails.source, restletOptions]);
  // console.log("integration id==>", integrationId);
  // console.log("configurationData==>", configurationData);

  useEffect(() => {
    if (fieldsData) {
      // console.log("fieldsData", fieldsData)
      fieldsData.map((field, index) => {
        setValue(
          `destinationFieldValue[${index}]`,
          field.destinationFieldValue || field.googleSheets
        );
        setValue(`sourceFieldValue[${index}]`, {
          value: field.sourceFieldValue,
          label: field.sourceFieldValue,
        });
      });
      setRows(fieldsData);
    }
    if (mappedRecordData) {
      setMappedRecordDetails(mappedRecordData[0]);
      // console.log("mappedRecordData", mappedRecordData);
      setIntegrationId(mappedRecordData[0].integrationId);
      recordTypeTitle(mappedRecordData[0].recordTypeTitle);
      // setRecordType(mappedRecordData[0].recordTypeTitle);
    }
  }, [fieldsData, mappedRecordData, recordTypeTitle, setValue]);

  // console.log("netsuiteValues**********", netsuiteValues);

  // if (rows.length > 0) {
  //   rows.map((row, index) => {
  //     setValue(
  //       `googleSheets[${index}]`,
  //       row.destinationFieldValue || row.googleSheets
  //     );
  //     setValue(
  //       `netSuite[${index}]`,
  //       {
  //         value: row.sourceFieldValue,
  //         label: row.sourceFieldValue,
  //       } || { value: row.netSuite, label: row.netSuite }
  //     );
  //   });
  // }

  const handleChange = (index, e) => {
    const addedRow = [...rows];
    if (e.label) {
      addedRow[index].sourceFieldValue = e.label;
      setRows(addedRow);
    } else {
      // setTimeout(() => {
      addedRow[index].destinationFieldValue = e.target.value;
      setRows(addedRow);
      // }, 2000);
    }
  };

  const columns =
    //  useMemo(
    //   () =>
    [
      {
        Header: "Google Sheets™ Columns",
        accessor: "destinationFieldValue",
        Cell: ({ row }) => {
          return (
            <TkInput
              type="text"
              // name={`googleSheets[${row.index}]`}
              {...register(`destinationFieldValue[${row.index}]`)}
              disabled={row.original.destinationFieldValue ? true : false}
              // defaultValue={row && row.original.destinationFieldValue}
              // value={row.original.destinationFieldValue}
              // onChange={(e) => handleChange(row.index, e)}
            />
          );
        },
      },
      {
        Header: "NetSuite™ Fields",
        accessor: "sourceFieldValue",
        Cell: ({ row }) => {
          // console.log("props", row)
          return (
            <Controller
              control={control}
              name={`sourceFieldValue[${row.index}]`}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  options={netsuiteValues}
                  maxMenuHeight="100px"
                  isSerchable={true}
                  // defaultValue={row && row.original.sourceFieldValue}
                  // onChange={(e) => handleChange(row.index, e)}
                />
              )}
            />
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (props) => {
          // if (
          //   prop.row.original.googleSheets !== "Add" &&
          //   prop.row.original.googleSheets !== "Update" &&
          //   prop.row.original.googleSheets !== "Delete"
          // ) {
          return <i className="ri-delete-bin-5-line pe-auto px-3" onClick={() => onClickDelete(props.row.original?.id)} />;
          // } else {
          //   return null;
          // }
        },
      },
    ];
  // [control, netsuiteValues, register]
  // );
  const { append } = useFieldArray({
    control,
    name: "googleSheets",
  });
  const handleAddRow = () => {
    setRows([...rows, { googleSheets: "", netSuite: null }]);
    // append({ googleSheets: "", netSuite: null });
  };

  // *** to get formatted values from table
  const [tableRecords, setTableRecords] = useState([]);

  const onSubmit = (values) => {
    // console.log("values", values);
    const userId = sessionStorage.getItem("userId");
    const tableRecord = values.destinationFieldValue.map(
      (destinationFieldValue, index) => {
        return {
          userId: JSON.parse(userId),
          mappedRecordId: mappedRecordId,
          sourceField: "NetSuite™",
          destinationField: "Google Sheets™",
          destinationFieldValue: destinationFieldValue,
          sourceFieldValue: values.sourceFieldValue[index]?.label,
        };
      }
    );

    setTableRecords(tableRecord);
    // console.log("tableRecord", tableRecord);
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

  const onClickDelete = (fieldId) => {
    console.log("fieldId", fieldId);
    setFieldId(fieldId);
    deleteFields.mutate({id: fieldId}, {
      onSuccess: (data) => {
        TkToastInfo("Deleted Successfully", { hideProgressBar: true });
      },
      onError: (error) => {
        console.log("error", error);
        TkToastError("Error for delete fields");
      },
    });
  }

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
  // console.log("rows", rows);

  return (
    <>
      <TkRow>
        <TkCol>
          <TkLabel>
            <span className="fw-bold">
              Integration Name:{" "}
              {mappedRecordDetails.integration?.integrationName}
            </span>
            &nbsp;&nbsp;
          </TkLabel>
        </TkCol>
        <TkCol>
          <TkLabel>
            <span className="fw-bold">
              Google Sheets™ Url: {mappedRecordDetails.destination}
            </span>
            &nbsp;&nbsp;
          </TkLabel>
        </TkCol>
      </TkRow>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        {fieldsLoading ? (
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
