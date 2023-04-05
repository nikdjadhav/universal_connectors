import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { TkToastError } from "@/globalComponents/TkToastContainer";
import field from "@/pages/schedule/field";
import {
  API_BASE_URL,
  destinationName,
  integrations,
  recordType,
  sourceName,
} from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object({
  integrationName: Yup.object()
    .nullable()
    .required("Integration name is required."),
  recordType: Yup.object().required("Record type is required."),
  googleSheetUrl: Yup.string().required("Google sheet url is required."),
}).required();

const FieldMap = () => {
  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [userID, setUserID] = useState();
  const [integrationOptions, setIntegrationOptions] = useState([]);
  // const [recordTypes, setRecordTypes] = useState();
  const [records, setRecords] = useState([]);
  const [googleSheetUrl, setGoogleSheetUrl] = useState([]);
  const [integrationName, setIntegrationName] = useState();
  const [integrationId, setIntegrationId] = useState(null);
  const [configurationData, setConfigurationData] = useState(null);
  const [userId, setUserId] = useState(null);

  const addMappedRecord = useMutation({
    // mutationFn: tkFetch.post("http://localhost:4000/v1/addMappedRecord"),
    mutationFn: tkFetch.post(`${API_BASE_URL}/addMappedRecord`),
  });

  const apiResults = useQueries({
    queries: [
      {
        queryKey: ["integrations", integrationId],
        queryFn: tkFetch.get(
          // `http://localhost:4000/v1/getConfigurationByIntegrationId/${integrationId}`
          `${API_BASE_URL}/getConfigurationByIntegrationId/${integrationId}`
        ),
        enabled: !!integrationId,
      },
      {
        queryKey: ["configData", configurationData],
        // queryFn: tkFetch.get(`http://localhost:4000/v1/getRecordTypes`, {
        //   params: configurationData,
        // }),
        queryFn: tkFetch.get(`${API_BASE_URL}/getRecordTypes`, {
          params: configurationData,
        }),
        enabled: !!configurationData,
      },
      {
        queryKey: ["integrationData", userId],
        // queryFn: tkFetch.get(
        //   `http://localhost:4000/v1/getIntegrations/${userId}`
        // ),
        queryFn: tkFetch.get(
          `${API_BASE_URL}/getIntegrations/${userId}`
        ),
        enabled: !!userId,
      },
    ],
  });

  const [config, restlet, integrations] = apiResults;
  const {
    isLoading: isconfigLoading,
    isError: isConfigError,
    error: configError,
    data: configData,
  } = config;
  const {
    isLoading: isRestletLoading,
    isError: isRestletError,
    error: restletError,
    data: restletRecordTypes,
  } = restlet;
  const {
    isLoading: isIntegrationsLoading,
    isError: isIntegrationsError,
    error: integrationsError,
    data: integrationsData,
  } = integrations;

  // console.log("integrationsData", integrationsData);

  useEffect(() => {
    if (configData) {
      if (configData) {
        configData.map((item) => {
          // console.log("==item==>", item);
          if (item.systemName === "NetSuite™") {
            // console.log("==item==>", item);

            setConfigurationData({
              account: item.accountId,
              consumerKey: item.consumerKey,
              consumerSecret: item.consumerSecretKey,
              tokenId: item.accessToken,
              tokenSecret: item.accessSecretToken,
              scriptDeploymentId: "1",
              scriptId: "1529",
              resttype: "ListOfRecordType",
            });
            // console.log("configData", configData);
            // console.log("restletOptions", restletRecordTypes);
          } else {
            setValue("googleSheetUrl", item.url);
          }
        });
      }
      if (restletRecordTypes) {
        restletRecordTypes[0].list.map((item) => {
          // console.log("item==", item);
          setRecords((prev) => [...prev, { label: item.text, value: item.id }]);

          // if(item.id === "customer"){
          //   console.log("==item==", item);
          // }
        });
      } else {
        setRecords([]);
      }
    }
  }, [configData, restletError, restletRecordTypes, setValue]);
  // console.log("configig data", configurationData);

  useEffect(() => {
    const userID = sessionStorage.getItem("userId");
    // setUserID(sessionStorage.getItem("userId"));

    if (userID) {
      // const id = {
      //   userId: JSON.parse(userID),
      // };
      setUserId(JSON.parse(userID));
      if (integrationsData) {
        integrationsData.map((item) => {
          setIntegrationOptions((prev) => [
            ...prev,
            { label: item.integrationName, value: item.id },
          ]);
        });
      }
    }
  }, [integrationsData, userID]);

  // console.log("recordTypes==", recordTypes);
  // console.log("records==", records);

  const handleOnChange = (e) => {
    setRecords([]);
    if (e) {
      // console.log("e==", e.value);
      setIntegrationId(e.value);
    }
  };

  const onsubmit = (data) => {
    // console.log("data==", data);
    // const userID = sessionStorage.getItem("userId");
    const mapprdRecord = {
      // userId: JSON.parse(userID),
      userId: userId,
      integrationId: data.integrationName.value,
      recordType: data.recordType.value,
      recordTypeTitle: data.recordType.label,
      url: data.googleSheetUrl,
    };
    // console.log("mapprdRecord==>", mapprdRecord);
    addMappedRecord.mutate(mapprdRecord, {
      onSuccess: (data) => {
        // console.log("data==", data);
        router.push(
          {
            pathname: "/fieldMapping/mapTable",
            query: { mappedRecordId: JSON.stringify(data[0].id) },
            // query: { mappedRecordId: JSON.stringify(4) }
          },
          "/fieldMapping/mapTable"
        );
      },
      onError: (error) => {
        console.log("error==", error);
      },
    });
  };

  return (
    <>
      <TkForm onSubmit={handleSubmit(onsubmit)}>
        <TkRow className="mt-5 justify-content-center">
          {/* <TkCol lg={4}>
          <TkSelect
            id="sourceName"
            name="sourceName"
            labelName="Source Integration Name"
            options={sourceName}
            maxMenuHeight="120px"
          />
        </TkCol> */}

          <TkCol lg={4}>
            <Controller
              name="integrationName"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="Integration Name"
                  id="integrationName"
                  // options={integrations}
                  options={integrationOptions || []}
                  maxMenuHeight="120px"
                  requiredStarOnLabel={true}
                  onChange={(e) => {
                    field.onChange(e);
                    handleOnChange(e);
                  }}
                  isSearchable={true}
                  // value={integrationName}
                />
              )}
            />
            {errors.integrationName?.message ? (
              <FormErrorText>{errors.integrationName?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={4}>
            <Controller
              name="recordType"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="NetSuite™ Record Type"
                  id="recordType"
                  // options={recordType}
                  options={records || []}
                  maxMenuHeight="120px"
                  requiredStarOnLabel={true}
                />
              )}
            />
            {errors.recordType?.message ? (
              <FormErrorText>{errors.recordType?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={4}>
            <TkInput
              {...register("googleSheetUrl")}
              id="googleSheetUrl"
              type="text"
              labelName="Google Sheets™ Url"
              placeholder="Enter Google Sheets™ url"
              requiredStarOnLabel={true}
              invalid={errors.googleSheetUrl?.message ? true : false}
              // className={errors.integrationName?.message && "form-control is-invalid"}
            />
            {errors.googleSheetUrl?.message ? (
              <FormErrorText>{errors.googleSheetUrl?.message}</FormErrorText>
            ) : null}
          </TkCol>
          {/* </TkRow> */}

          {/* <TkRow className="mt-3 justify-content-center"> */}
          <TkCol lg={12} className="d-flex justify-content-center">
            <TkButton
              className="btn-success my-4"
              type="submit"
              // onClick={handleSubmit}
            >
              Next
            </TkButton>
          </TkCol>
        </TkRow>
      </TkForm>
    </>
  );
};

export default FieldMap;
