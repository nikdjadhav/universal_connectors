import TkButton from "@/globalComponents/TkButton";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
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
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";
import { TkToastError, TkToastInfo } from "@/globalComponents/TkToastContainer";
import { useFieldArray } from "react-hook-form";
import TkLoader from "@/globalComponents/TkLoader";
import TkNoData from "@/globalComponents/TkNoData";
import TkAlert from "@/globalComponents/TkAlert";
import DeleteModal from "@/utils/DeleteModal";

const MapTableComponent = ({ mappedRecordId, integrationsName, ...other }) => {
  const [recordType, setRecordType] = useState(null);
  const [integrationName, setIntegrationName] = useState(null);
  const [url, setUrl] = useState(null);
  const [resletOptions, setResletOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  // const [restletData, setRestletData] = useState({});
  // const router = useRouter();
  // console.log("mappedRecordId^^^^^^^^^^^",mappedRecordId)

  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, control, watch } = useForm();
  const [netsuiteValues, setNetsuiteValues] = useState([]);
  const [rows, setRows] = useState([]);
  const [integrationId, setIntegrationId] = useState(null);
  const [mappedRecordDetails, setMappedRecordDetails] = useState([]);
  const [configurationData, setConfigurationData] = useState(null);
  const [fieldId, setFieldId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteFieldId, setDeleteFieldId] = useState();
  const [userId, setUserId] = useState(null);

  // console.log("mappedRecordId", mappedRecordId);
  const apiResults = useQueries({
    queries: [
      {
        queryKey: ["getMappedRecordById", mappedRecordId],
        // queryFn: tkFetch.get(
        //   `http://localhost:4000/v1/getMappedRecordById/${mappedRecordId}`
        // ),
        queryFn: tkFetch.get(
          `${API_BASE_URL}/getMappedRecordById/${mappedRecordId}`
        ),
        enabled: !!mappedRecordId,
      },
      {
        queryKey: ["config", integrationId],
        // queryFn: tkFetch.get(
        //   `http://localhost:4000/v1/getConfigurationByIntegrationId/${integrationId}`
        // ),
        queryFn: tkFetch.get(
          `${API_BASE_URL}/getConfigurationByIntegrationId/${integrationId}`
        ),
        enabled: !!integrationId,
      },
      {
        queryKey: ["configDetails", configurationData],
        // queryFn: tkFetch.get(
        //   `http://localhost:4000/v1/getRecordTypes`,
        //   { params: configurationData }
        // ),
        queryFn: tkFetch.get(`${API_BASE_URL}/getRecordTypes`, {
          params: configurationData,
        }),
        enabled: !!configurationData,
      },
      {
        queryKey: ["getFields", mappedRecordId],
        // queryFn: tkFetch.get(
        //   `http://localhost:4000/v1/getFields/${mappedRecordId}`
        // ),
        queryFn: tkFetch.get(`${API_BASE_URL}/getFields/${mappedRecordId}`),
        enabled: !!mappedRecordId,
      },
      {
        queryKey: ["getAccessToken", userId],
        queryFn: tkFetch.get(`${API_BASE_URL}/getAccessToken/${userId}`),
        enabled: !!userId,
      },
    ],
  });

  const [mappedRecord, config, restletData, getFields, asscessToken] =
    apiResults;
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
  const {
    isLoading: isAccessTokenLoading,
    isError: isAccessTokenError,
    error: accessTokenError,
    data: accessTokenData,
  } = asscessToken;

  const addFields = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addFields`),
  });

  const deleteFields = useMutation({
    mutationFn: tkFetch.deleteWithIdInUrl(`${API_BASE_URL}/deleteField`),
  });

  const getSheetsData = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/getSheetsData`),
  });

  useEffect(() => {
    const userID = sessionStorage.getItem("userId");

    if (userID) {
      setUserId(JSON.parse(userID));
    }
  }, []);

  // useEffect(() => {
  //   if (accessTokenData) {
  //     const data = {
  //       sheetsId: mappedRecordDetails.destination,
  //       accessToken: accessTokenData[0].access_token,
  //     };
  //     console.log("***", data);
  //     getSheetsData.mutate(data, {
  //       onSuccess: (data) => {
  //         data[0].values[0].map((item, index) => {
  //           setValue(
  //             `destinationFieldValue[${index}]`,
  //             item
  //           );
  //           setValue(`sourceFieldValue[${index}]`, null);
  //         });
  //         setRows(data[0].values[0]);
  //       },
  //       onError: (error) => {
  //         console.log("error", error);
  //       },
  //     });
  //   }
  // }, [accessTokenData, mappedRecordDetails.destination]);


  useEffect(() => {
    if (configData) {
      // console.log("available")
      configData.map((item) => {
        // console.log("item", item)
        if (item.systemName === "NetSuite™") {
          setConfigurationData({
            accountId: item.accountId,
            consumerKey: item.consumerKey,
            consumerSecretKey: item.consumerSecretKey,
            accessToken: item.accessToken,
            accessSecretToken: item.accessSecretToken,
            // scriptDeploymentId: "1",
            // scriptId: "1529",
            resttype: "ListOfRecordField",
            recordtype: mappedRecordDetails.source,
          });
        }
      });
    }

    if (restletOptions) {
      setNetsuiteValues([]);
      if (
        restletOptions[0].body.length > 0 ||
        restletOptions[0].lines.length > 0
      ) {
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
    }
  }, [configData, mappedRecordDetails.source, restletOptions]);
  // console.log("integration id==>", integrationId);
  // console.log("configurationData==>", configurationData);

  useEffect(() => {
    if (fieldsData.length) {
      console.log("data from backend")
      console.log("fieldsData", fieldsData)
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
    }else if (accessTokenData) {
      console.log("data from google sheets")
      const data = {
        sheetsId: mappedRecordDetails.destination,
        accessToken: accessTokenData[0].access_token,
      };
      console.log("***", data);
      getSheetsData.mutate(data, {
        onSuccess: (data) => {
          data[0].values[0].map((item, index) => {
            setValue(
              `destinationFieldValue[${index}]`,
              item
            );
            setValue(`sourceFieldValue[${index}]`, null);
          });
          setRows(data[0].values[0]);
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    }
    if (mappedRecordData) {
      setMappedRecordDetails(mappedRecordData[0]);
      setIntegrationId(mappedRecordData[0].integrationId);
      integrationsName(mappedRecordData[0].integration?.integrationName);
    }
  }, [fieldsData, mappedRecordData, integrationsName, setValue, accessTokenData, mappedRecordDetails.destination]);

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
          // console.log("props", row.original)
          return (
            <TkInput
              type="text"
              // name={`googleSheets[${row.index}]`}
              {...register(`destinationFieldValue[${row.index}]`)}
              disabled={(row.original||row.original.destinationFieldValue) ? true : false}
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
          return (
            <i
              className="ri-delete-bin-5-line pe-auto px-3"
              onClick={() => toggleDeleteModel(props.row.original?.id)}
            />
          );
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
          mappedRecordId: JSON.parse(mappedRecordId),
          sourceField: "NetSuite™",
          destinationField: "Google Sheets™",
          destinationFieldValue: destinationFieldValue,
          sourceFieldValue: values.sourceFieldValue[index]?.label,
        };
      }
    );

    setTableRecords(tableRecord);
    console.log("tableRecord", tableRecord);
    addFields.mutate(tableRecord, {
      onSuccess: (data) => {
        TkToastInfo("Added Successfully", { hideProgressBar: true });
        queryClient.invalidateQueries({
          queryKey: ["getFields"],
        });
      },
      onError: (error) => {
        console.log("error", error);
        TkToastError("Error for add fields");
      },
    });
  };

  const toggleDeleteModel = (fieldId) => {
    setDeleteFieldId(fieldId);
    setDeleteModal(true);
  };

  const onClickDelete = () => {
    // console.log("data deleted", deleteFieldId)
    // console.log("fieldId", fieldId);
    // setFieldId(deleteFieldId);
    deleteFields.mutate(
      { id: deleteFieldId },
      {
        onSuccess: (data) => {
          // TkToastInfo("Deleted Successfully", { hideProgressBar: true });
          queryClient.invalidateQueries({
            queryKey: ["getFields"],
          });
          setDeleteModal(false);
        },
        onError: (error) => {
          console.log("error", error);
          TkToastError("Error for delete fields");
          setDeleteModal(false);
        },
      }
    );
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
  // console.log("rows", rows);

  return (
    <>
      <TkRow>
        <TkCol>
          <TkLabel>
            <span className="fw-bold">
              Integration Name: {mappedRecordDetails.recordTypeTitle}
            </span>
            &nbsp;&nbsp;
          </TkLabel>
        </TkCol>
        <TkCol>
          <TkLabel>
            <span className="fw-bold">
              Google Sheets™ Url: {mappedRecordDetails.url}
            </span>
            &nbsp;&nbsp;
          </TkLabel>
        </TkCol>
      </TkRow>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        {fieldsLoading ? (
          <TkLoader />
        ) : integrationId ? (
          <>
            <DeleteModal
              show={deleteModal}
              onDeleteClick={onClickDelete}
              onCloseClick={() => setDeleteModal(false)}
              // loading={}
            />
            <TkTableContainer
              columns={columns}
              data={rows || []}
              showPagination={true}
              thClass="text-dark"
            />
          </>
        ) : (
          <TkNoData />
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
