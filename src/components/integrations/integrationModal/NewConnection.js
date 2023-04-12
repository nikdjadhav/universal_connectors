import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import { TkToastError } from "@/globalComponents/TkToastContainer";
import useFullPageLoader from "@/globalComponents/useFullPageLoader";
import { API_BASE_URL } from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object({
  integrationName: Yup.string().required("Integration name is required."),

  // url: Yup.string().required("URL is required."),

  accountID: Yup.string().required("Account ID is required."),

  consumerKey: Yup.string().required("Consumer Key is required."),

  consumerSecretKey: Yup.string().required("Consumer Secret Key is required."),

  accessToken: Yup.string().required("Access Token is required."),

  accessSecretToken: Yup.string().required("Access Secret Token is required."),
}).required();

const NewConnection = ({
  onClickHandeler,
  integrationDetails,
  integrationID,
  toggle,
  title,
  getIntegrationId,
}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, idDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [integrationsData, setIntegrationsData] = useState();

  const authentication = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/restletAuthentication`),
  });

  const addConfigurations = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addConfigurations`),
  });

  const updateConfiguration = useMutation({
    mutationFn: tkFetch.putWithIdInUrl(`${API_BASE_URL}/updateConfiguration`),
  });

  const addIntegration = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addIntegration`),
  });

  const {
    data: configurationsData,
    isError: configError,
    isLoading: configLoading,
    error: configErrorData,
  } = useQuery({
    queryKey: ["configurationsData", integrationID],
    queryFn: tkFetch.get(
      `${API_BASE_URL}/getConfigurationById/${integrationID}`
    ),
    enabled: !!integrationID,
  });

  useEffect(() => {
    if (configurationsData?.length) {
      configurationsData.map((item) => {
        if (item.systemName === title) {
          setIntegrationsData(item);
          setValue("integrationName", item.integration.integrationName);
          setValue("accountID", item.accountId);
          setValue("consumerKey", item.consumerKey);
          setValue("consumerSecretKey", item.consumerSecretKey);
          setValue("accessToken", item.accessToken);
          setValue("accessSecretToken", item.accessSecretToken);
        }
      });
    }
  }, [configurationsData, setValue, title]);

  const onSubmit = (values) => {
    // console.log("values in ns", values)
    const userId = sessionStorage.getItem("userId");
    showLoader();
    const recordTypeCredentials = {
      accountId: values.accountID,
      consumerKey: values.consumerKey,
      consumerSecretKey: values.consumerSecretKey,
      accessToken: values.accessToken,
      accessSecretToken: values.accessSecretToken,
      authenticationType: "abc",
      resttype: "ListOfRecordType",
    };

    authentication.mutate(recordTypeCredentials, {
      onSuccess: (data) => {
        //  update configuration
        if (configurationsData?.length) {
          configurationsData.map((item) => {
            if (item.systemName === title) {
              console.log("updated ns data");
              const updateConfigData = {
                id: item.id,
                accountId: values.accountID,
                consumerKey: values.consumerKey,
                consumerSecretKey: values.consumerSecretKey,
                accessToken: values.accessToken,
                accessSecretToken: values.accessSecretToken,
                authenticationType: "xyz",
              };
              updateConfiguration.mutate(updateConfigData, {
                onSuccess: (data) => {
                  queryClient.invalidateQueries({
                    queryKey: ["configurationsData"],
                  });
                  onClickHandeler();
                },
                onError: (error) => {
                  toggle();
                  TkToastError("Error in updating configuration");
                },
              });
            }
          });
        } else {
          console.log("added ns data");
          addIntegration.mutate(integrationDetails, {
            onSuccess: (data) => {
              const addConfigData = {
                userId: JSON.parse(userId),
                integrationId: data[0].id,
                systemName: title,
                accountId: values.accountID,
                consumerKey: values.consumerKey,
                consumerSecretKey: values.consumerSecretKey,
                accessToken: values.accessToken,
                accessSecretToken: values.accessSecretToken,
                authenticationType: "abc",
              };
              getIntegrationId(data[0].id);
              addConfigurations.mutate(addConfigData, {
                onSuccess: (data) => {
                  onClickHandeler();
                  queryClient.invalidateQueries({
                    queryKey: ["configurationsData"],
                  });
                },
                onError: (error) => {
                  toggle();
                  TkToastError("Error in adding integration");
                },
              });
              queryClient.invalidateQueries({
                queryKey: ["integrations"],
              });
            },
            onError: (error) => {
              toggle();
              TkToastError("Error in adding integration");
            },
          });
        }
        hideLoader();
      },
      onError: (error) => {
        hideLoader();
        toggle();
        TkToastError("Error in authentication");
      },
    });
  };

  return (
    <>
      <TkRow className="justify-content-center">
        <TkCol>
          <TkForm onSubmit={handleSubmit(onSubmit)} className="my-3">
            <TkRow className="g-3">
              <TkCol lg={12}>
                <TkInput
                  {...register("integrationName")}
                  id="integrationName"
                  type="text"
                  labelName="Integration Name"
                  placeholder="Enter integration name"
                  requiredStarOnLabel={true}
                  invalid={errors.integrationName?.message ? true : false}
                  // disabled={viewMode}
                  disabled={integrationsData ? true : false}
                />
                {errors.integrationName?.message ? (
                  <FormErrorText>
                    {errors.integrationName?.message}
                  </FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={12}>
                <TkInput
                  {...register("accountID")}
                  id="accountID"
                  type="text"
                  labelName="Account ID"
                  placeholder="Enter account id"
                  requiredStarOnLabel={true}
                  invalid={errors.accountID?.message ? true : false}
                  // disabled={viewMode}
                />
                {errors.accountID?.message ? (
                  <FormErrorText>{errors.accountID?.message}</FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={12}>
                <TkInput
                  {...register("consumerKey")}
                  id="consumerKey"
                  type="text"
                  labelName="Consumer Key"
                  placeholder="Enter consumer key"
                  requiredStarOnLabel={true}
                  invalid={errors.consumerKey?.message ? true : false}
                  // disabled={viewMode}
                />
                {errors.consumerKey?.message ? (
                  <FormErrorText>{errors.consumerKey?.message}</FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={12}>
                <TkInput
                  {...register("consumerSecretKey")}
                  id="consumerSecretKey"
                  type="text"
                  labelName="Consumer Secret Key"
                  placeholder="Enter consumer secret key"
                  requiredStarOnLabel={true}
                  invalid={errors.consumerSecretKey?.message ? true : false}
                  // disabled={viewMode}
                />
                {errors.consumerSecretKey?.message ? (
                  <FormErrorText>
                    {errors.consumerSecretKey?.message}
                  </FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={12}>
                <TkInput
                  {...register("accessToken")}
                  id="accessToken"
                  type="text"
                  labelName="Access Token"
                  placeholder="Enter access token"
                  requiredStarOnLabel={true}
                  invalid={errors.accessToken?.message ? true : false}
                  // disabled={viewMode}
                />
                {errors.accessToken?.message ? (
                  <FormErrorText>{errors.accessToken?.message}</FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={12}>
                <TkInput
                  {...register("accessSecretToken")}
                  id="accessSecretToken"
                  type="text"
                  labelName="Access Secret Token"
                  placeholder="Enter access secret token"
                  requiredStarOnLabel={true}
                  invalid={errors.accessSecretToken?.message ? true : false}
                  // disabled={viewMode}
                />
                {errors.accessSecretToken?.message ? (
                  <FormErrorText>
                    {errors.accessSecretToken?.message}
                  </FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={12}>
                <TkButton type="submit" className="btn-success float-end">
                  Configure
                </TkButton>
              </TkCol>
            </TkRow>
          </TkForm>
        </TkCol>
        {loader}
      </TkRow>
    </>
  );
};

export default NewConnection;
