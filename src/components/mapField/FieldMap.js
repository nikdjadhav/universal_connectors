import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkForm from "@/globalComponents/TkForm";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import {
  API_BASE_URL,
} from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueries } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object({
  integrationName: Yup.object()
    .nullable()
    .required("Integration name is required."),
  recordType: Yup.object().required("Record type is required."),
  googleSheetUrl: Yup.object().required("Google sheet url is required."),
}).required();

const FieldMap = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [integrationOptions, setIntegrationOptions] = useState([]);
  const [records, setRecords] = useState([]);
  const [googleSheetUrl, setGoogleSheetUrl] = useState([]);
  const [integrationId, setIntegrationId] = useState(null);
  const [configurationData, setConfigurationData] = useState(null);
  const [userId, setUserId] = useState(null);

  const addMappedRecord = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addMappedRecord`),
  });

  const getFiles = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/getFiles`),
  });

  const apiResults = useQueries({
    queries: [
      {
        queryKey: ["integrations", integrationId],
        queryFn: tkFetch.get(
          `${API_BASE_URL}/getConfigurationByIntegrationId/${integrationId}`
        ),
        enabled: !!integrationId,
      },
      {
        queryKey: ["configData", configurationData],
        queryFn: tkFetch.get(`${API_BASE_URL}/getRecordTypes`, {
          params: configurationData,
        }),
        enabled: !!configurationData,
      },
      {
        queryKey: ["integrationData", userId],
        queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrations/${userId}`),
        enabled: !!userId,
      },
      {
        queryKey: ["getAccessToken", userId],
        queryFn: tkFetch.get(`${API_BASE_URL}/getAccessToken/${userId}`),
        enabled: !!userId,
      },
    ],
  });

  const [config, restlet, integrations, asscessToken] = apiResults;
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
  const {
    isLoading: isAccessTokenLoading,
    isError: isAccessTokenError,
    error: accessTokenError,
    data: accessTokenData,
  } = asscessToken;

  useEffect(() => {
    if (accessTokenData) {
      getFiles.mutate(
        { accessToken: accessTokenData[0].access_token },
        {
          onSuccess: (data) => {
            data[0].files.map((item) => {
              if (item.mimeType === "application/vnd.google-apps.spreadsheet") {
                setGoogleSheetUrl((prev) => [
                  ...prev,
                  { label: item.name, value: item.id },
                ]);
              }
            });
          },
          onError: (error) => {
            console.log("error", error);
          },
        }
      );
    }
  }, [accessTokenData]);


  // *** record types
  useEffect(() => {
    if (configData) {
      configData.map((item) => {
        if (item.systemName === "NetSuite™") {
          setConfigurationData({
            accountId: item.accountId,
            consumerKey: item.consumerKey,
            consumerSecretKey: item.consumerSecretKey,
            accessToken: item.accessToken,
            accessSecretToken: item.accessSecretToken,
            resttype: "ListOfRecordType",
          });
        }
      });
    }
    if (restletRecordTypes) {
      restletRecordTypes[0].list.map((item) => {
        setRecords((prev) => [...prev, { label: item.text, value: item.id }]);
      });
    } else {
      setRecords([]);
    }
  }, [configData, restletError, restletRecordTypes, setValue]);

  // *** integration names
  useEffect(() => {
    const userID = sessionStorage.getItem("userId");

    if (userID) {
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
  }, [integrationsData]);

  const handleOnChange = (e) => {
    setRecords([]);
    if (e) {
      setIntegrationId(e.value);
    }
  };

  const onsubmit = (data) => {
    const mapprdRecord = {
      userId: userId,
      integrationId: data.integrationName.value,
      recordType: data.recordType.value,
      recordTypeTitle: data.recordType.label,
      url: data.googleSheetUrl.value,
      urlTitle: data.googleSheetUrl.label,
    };
    addMappedRecord.mutate(mapprdRecord, {
      onSuccess: (data) => {
        router.push(`/fieldMapping/${data[0].id}`);
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
          <TkCol lg={4}>
            <Controller
              name="integrationName"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="Integration Name"
                  id="integrationName"
                  options={integrationOptions || []}
                  maxMenuHeight="120px"
                  requiredStarOnLabel={true}
                  onChange={(e) => {
                    field.onChange(e);
                    handleOnChange(e);
                  }}
                  isSearchable={true}
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
            <Controller
              name="googleSheetUrl"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  labelName="Google Sheets™ Url"
                  id="googleSheetUrl"
                  options={googleSheetUrl}
                  maxMenuHeight="120px"
                  requiredStarOnLabel={true}
                />
              )}
            />
            {errors.googleSheetUrl?.message ? (
              <FormErrorText>{errors.googleSheetUrl?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={12} className="d-flex justify-content-center">
            <TkButton className="btn-success my-4" type="submit">
              Next
            </TkButton>
          </TkCol>
        </TkRow>
      </TkForm>
    </>
  );
};

export default FieldMap;
