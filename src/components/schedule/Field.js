import TkButton from "@/globalComponents/TkButton";
import TkInput from "@/globalComponents/TkInput";
import TkLabel from "@/globalComponents/TkLabel";
import TkModal, {
  TkModalBody,
  TkModalFooter,
  TkModalHeader,
} from "@/globalComponents/TkModal";
import TkRadioButton from "@/globalComponents/TkRadioButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { API_BASE_URL } from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueries } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Field = ({ mappedRecordId }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });

  const [userId, setUserId] = useState(null);
  const [integrationId, setIntegrationId] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [netsuiteOptions, setNetsuiteOptions] = useState([]);
  const [sheetsParameters, setSheetsParameters] = useState(null);
  const [googleSheetOptions, setGoogleSheetOptions] = useState([]);
  const [dropdownFieldValue, setDropdownFieldValue] = useState(true);
  const [inputBoxFieldValue, setInputBoxFieldValue] = useState(false);
  const [checkedValue, setCheckedValue] = useState("dropdownField");

  const operators = [
    { label: "is", value: 1 },
    { label: "equalTo", value: 2 },
    { label: "contain", value: 3 },
    { label: "startsWith", value: 4 },
    { label: "anyOf", value: 5 },
    { label: "noneOf", value: 6 },
    { label: "on", value: 7 },
    { label: "empty", value: 8 },
    { label: "notEmpty", value: 9 },
  ];

  const apiResults = useQueries({
    queries: [
      {
        queryKey: ["mappedRecord", mappedRecordId],
        queryFn: tkFetch.get(
          `${API_BASE_URL}/getMappedRecordById/${mappedRecordId}`
        ),
        enabled: !!mappedRecordId,
      },
      {
        queryKey: ["config", integrationId],
        queryFn: tkFetch.get(
          `${API_BASE_URL}/getConfigurationByIntegrationId/${integrationId}`
        ),
        enabled: !!integrationId,
      },
      {
        queryKey: ["configDetails", credentials],
        queryFn: tkFetch.get(`${API_BASE_URL}/getRecordTypes`, {
          params: credentials,
        }),
        enabled: !!credentials,
      },
      {
        queryKey: ["getAccessToken", userId],
        queryFn: tkFetch.get(`${API_BASE_URL}/getAccessToken/${userId}`),
        enabled: !!userId,
      },
      {
        queryKey: ["getSheetsData", sheetsParameters],
        queryFn: tkFetch.get(`${API_BASE_URL}/getSheetsData`, {
          params: sheetsParameters,
        }),
        enabled: !!sheetsParameters,
      },
    ],
  });

  const [mappedRecord, config, restletData, asscessToken, googleSheetApi] =
    apiResults;
  const { data: mappedRecordData, isLoading: mappedRecordLoading } =
    mappedRecord;
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
    isLoading: isAccessTokenLoading,
    isError: isAccessTokenError,
    error: accessTokenError,
    data: accessTokenData,
  } = asscessToken;
  const {
    isLoading: excelSheetLoading,
    isError: excelSheetError,
    error: excelSheetErrorData,
    data: excelSheetData,
  } = googleSheetApi;

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    setUserId(JSON.parse(userId));
    if (mappedRecordData) {
      setIntegrationId(mappedRecordData[0]?.integrationId);
    }
    if (accessTokenData && mappedRecordData) {
      setSheetsParameters({
        sheetsId: mappedRecordData[0].destination,
        accessToken: accessTokenData[0].access_token,
      });
    }
  }, [accessTokenData, mappedRecordData]);

  useEffect(() => {
    if (configData) {
      configData.map((item) => {
        if (item.systemName === "NetSuite™") {
          setCredentials({
            accountId: item.accountId,
            consumerKey: item.consumerKey,
            consumerSecretKey: item.consumerSecretKey,
            accessToken: item.accessToken,
            accessSecretToken: item.accessSecretToken,
            resttype: "ListOfRecordField",
            recordtype: mappedRecordData[0]?.source,
          });
        }
      });
    }
  }, [configData, mappedRecordData]);

  useEffect(() => {
    if (restletOptions) {
      setNetsuiteOptions([]);
      if (
        restletOptions[0].body.length > 0 ||
        restletOptions[0].lines.length > 0
      ) {
        const entries = Object.entries(restletOptions[0]?.body[0]);
        entries.map(([key, value], index) => {
          setNetsuiteOptions((netsuiteValues) => [
            ...netsuiteValues,
            { label: value, value: key },
          ]);
        });
        restletOptions[0]?.lines.map((item) => {
          const lineEntries = Object.entries(item);
          lineEntries.map(([key, value], index) => {
            const valueEntries = Object.entries(value);
            valueEntries.map(([key1, value1], index) => {
              const value1Entries = Object.entries(value1);
              value1Entries.map(([key2, value2], index) => {
                setNetsuiteOptions((netsuiteValues) => [
                  ...netsuiteValues,
                  { label: key + ": " + value2, value: key + "__" + key2 },
                ]);
              });
            });
          });
        });
      }
    }
  }, [restletOptions]);

  useEffect(() => {
    if (excelSheetData) {
      setGoogleSheetOptions([]);
      excelSheetData[0]?.values[0].map((item, index) => {
        setGoogleSheetOptions((googleSheetValues) => [
          ...googleSheetValues,
          { label: item, value: index },
        ]);
      });
    }
  }, [excelSheetData]);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const onClickModal = () => {
    toggle();
  };

  const toggleComponent = (value) => {
    setCheckedValue(value);
    setDropdownFieldValue(value === "dropdownField" ? true : false);
    setInputBoxFieldValue(value === "inputBoxField" ? true : false);
    toggle();
  };

  return (
    <>
      <TkRow className="mt-1 mb-5">
        <TkCol lg={4}>
          <Controller
            name="netsuiteFields"
            control={control}
            render={({ field }) => (
              <TkSelect
                {...field}
                labelName="Netsuite fields"
                id="netsuiteFields"
                options={netsuiteOptions}
                maxMenuHeight="100px"
                requiredStarOnLabel={true}
              />
            )}
          />
        </TkCol>

        <TkCol lg={4}>
          <Controller
            name="operator"
            control={control}
            render={({ field }) => (
              <TkSelect
                {...field}
                labelName="Operator"
                id="operator"
                options={operators}
                maxMenuHeight="100px"
                requiredStarOnLabel={true}
              />
            )}
          />
        </TkCol>

        <TkCol lg={4}>
          <TkLabel>Google sheet fields</TkLabel>
          <div className="d-flex">
            {checkedValue === "dropdownField" ? (
              <Controller
                name="googleSheetFields"
                control={control}
                render={({ field }) => (
                  <TkSelect
                    {...field}
                    // labelName="Google sheet fields"
                    id="googleSheetFields"
                    options={googleSheetOptions}
                    maxMenuHeight="100px"
                    requiredStarOnLabel={true}
                  />
                )}
              />
            ) : (
              <TkInput
                {...register("GoogleSheetFields")}
                id="GoogleSheetFields"
                type="text"
                // labelName="Google sheet fields"
                placeholder="Enter Google sheet field"
                requiredStarOnLabel={true}
              />
            )}
            <i class="ri-settings-3-line fs-2" onClick={onClickModal} />
          </div>
        </TkCol>

        <TkCol lg={3}>
          <TkButton className="btn-success my-5 me-3">Save</TkButton>
        {/* </TkCol>

        <TkCol lg={3}> */}
          <TkButton className="btn-success my-5" type="button" onClick={()=>history.back()}>Cancel</TkButton>
        </TkCol>
      </TkRow>

      <TkModal isOpen={modal} centered={true}>
        <TkModalHeader toggle={toggle}></TkModalHeader>
        <TkModalBody className="modal-body">
          <TkRow>
            <TkCol lg={6}>
              <TkLabel></TkLabel>

              <TkRadioButton
                type="radio"
                name="fieldType"
                label="Field"
                value="dropdownField"
                className="mb-3"
                checked={dropdownFieldValue}
                onChange={() => toggleComponent("dropdownField")}
              >
                Field
              </TkRadioButton>

              <TkRadioButton
                type="radio"
                name="fieldType"
                label="Value"
                value="inputBoxField"
                className="mb-3"
                checked={inputBoxFieldValue}
                onChange={() => toggleComponent("inputBoxField")}
              >
                Value
              </TkRadioButton>
            </TkCol>
          </TkRow>
        </TkModalBody>
      </TkModal>
    </>
  );
};

export default Field;
