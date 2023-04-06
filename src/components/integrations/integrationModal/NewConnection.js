import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import { TkToastError, TkToastInfo } from "@/globalComponents/TkToastContainer";
import { API_BASE_URL } from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { resolve } from "styled-jsx/css";
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

const NewConnection = ({ onClickHandeler, ...other }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, idDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const queryClient  = useQueryClient();

  const [integrationsData, setIntegrationsData] = useState();

  const addConfigurations = useMutation({
    // mutationFn: tkFetch.post("http://localhost:4000/v1/addConfigurations")
    mutationFn: tkFetch.post(`${API_BASE_URL}/addConfigurations`),
  });

  const updateConfiguration = useMutation({
    // mutationFn: tkFetch.putWithIdInUrl("http://localhost:4000/v1/updateConfiguration"),
    mutationFn: tkFetch.putWithIdInUrl(`${API_BASE_URL}/updateConfiguration`),
  });

  const {
    data: configurationsData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["configurationsData", other.integrationID],
    queryFn: tkFetch.get(`${API_BASE_URL}/getConfigurationById/${other.integrationID}`),
    // queryFn: tkFetch.get(
    //   `http://localhost:4000/v1/getConfigurationById/${other.integrationID}`
    // ),
    enabled: !!other.integrationID,
  });

  // console.log("configurationsData^^^^", configurationsData);

  // const integration = useMutation({
  //   // mutationFn: tkFetch.post("http://localhost:4000/v1/getIntegrationById"),
  //   mutationFn: tkFetch.post(`${API_BASE_URL}/getIntegrationById`),
  // });

  // console.log("other in new connection", other);

  useEffect(() => {
    if (other.integrationID) {
      if (configurationsData?.length) {
        configurationsData.map((item) => {
          if (item.systemName === other.title) {
            // console.log("other.title", other.title);
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
      // getConfigurationById.mutate(
      //   { integrationId: JSON.parse(other.integrationID) },
      //   {
      //     onSuccess: (data) => {
      //       // console.log("getConfigurationById NS", data);
      //       data.map((item) => {
      //         if (item.systemName === other.title) {
      //           setIntegrationsData(item);
      //           setValue("integrationName", item.integration.integrationName);
      //           setValue("accountID", item.accountId);
      //           setValue("consumerKey", item.consumerKey);
      //           setValue("consumerSecretKey", item.consumerSecretKey);
      //           setValue("accessToken", item.accessToken);
      //           setValue("accessSecretToken", item.accessSecretToken);
      //         }
      //       });
      //     },
      //     onError: (error) => {
      //       console.log("error", error);
      //     },
      //   }
      // );

      // integration.mutate(
      //   {
      //     id: other.integrationID,
      //   },
      //   {
      //     onSuccess: (data) => {
      //       // console.log("integration data*&*&", data[0]);
      //       setValue("integrationName", data[0].integrationName);
      //     },
      //     onError: (error) => {
      //       console.log("error", error);
      //     },
      //   }
      // );
    }
  }, [configurationsData, other.integrationID, other.title, setValue]);

  const [integrationID, setIntegrationID] = useState();
  // console.log("other", other);
  useEffect(() => {
    if (other.integrationID) {
      setIntegrationID(JSON.parse(other.integrationID));
    }
  }, [other.integrationID]);

  const onSubmit = (data) => {
    if (configurationsData?.length) {
      configurationsData.map((item) => {
        if (item.systemName === other.title) {
          // console.log("updated", item.systemName, "for", item.id);
          const updatedData = {
            id: item.id,
            systemName: other.title,
            // url: data.url,
            accountId: data.accountID,
            consumerKey: data.consumerKey,
            consumerSecretKey: data.consumerSecretKey,
            accessToken: data.accessToken,
            accessSecretToken: data.accessSecretToken,
            authenticationType: "abc",
          };
          // console.log("updatedData", updatedData)
          updateConfiguration.mutate(updatedData, {
            onSuccess: (data) => {
              // console.log("Updated Successfully", data);
              queryClient.invalidateQueries({
                queryKey: ["integrations"],
              })
              // TkToastInfo("Updated Successfully", { hideProgressBar: true });
            },
            onError: (error) => {
              console.log("error", error);
              TkToastError("Error: Record not updated");
            },
          });
        }
      });
    } else {
      // console.log("added");
      const userId = sessionStorage.getItem("userId");

      const configurData = {
        userId: JSON.parse(userId),
        integrationId: integrationID,
        systemName: other.title,
        // url: data.url,
        accountId: data.accountID,
        consumerKey: data.consumerKey,
        consumerSecretKey: data.consumerSecretKey,
        accessToken: data.accessToken,
        accessSecretToken: data.accessSecretToken,
        authenticationType: "xyz",
      };
      // console.log("configurData", configurData);

      addConfigurations.mutate(configurData, {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["integrations"],
          })
          // console.log("addConfigurations data", data);
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    }

    onClickHandeler();
  };

  return (
    <>
      <TkRow className="justify-content-center">
        <TkCol>
          {/* <TkCard>
            <TkCardBody> */}
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

              {/* <TkCol lg={12}>
                <TkInput
                  {...register("url")}
                  id="url"
                  type="text"
                  labelName="URL"
                  placeholder="Enter URL"
                  requiredStarOnLabel={true}
                  invalid={errors.url?.message ? true : false}
                  // disabled={viewMode}
                />
                {errors.url?.message ? (
                  <FormErrorText>{errors.url?.message}</FormErrorText>
                ) : null}
              </TkCol> */}

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
                  Next Step
                </TkButton>
              </TkCol>
            </TkRow>
            {/* <div className="d-flex mt-4 space-childern"></div> */}
          </TkForm>
          {/* </TkCardBody>
          </TkCard> */}
        </TkCol>
      </TkRow>
    </>
  );
};

export default NewConnection;
