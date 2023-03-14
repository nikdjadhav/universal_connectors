import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { resolve } from "styled-jsx/css";
import * as Yup from "yup";

const schema = Yup.object({
  integrationName: Yup.string().required("Integration name is required."),

  url: Yup.string().required("URL is required."),

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
    formState: { errors, idDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [integrationID, setIntegrationID] = useState();
console.log("other", other);
  useEffect(() => {
    if (other.integrationID) {
      setIntegrationID(JSON.parse(other.integrationID));
    }
  }, [other.integrationID])

  const onSubmit = (data) => {
    // console.log("Set up new connection data", data);
    const userId = sessionStorage.getItem("userId");

    const configurData = {
      userId: JSON.parse(userId),
      integrationId: integrationID,
      systemName: other.title,
      url: data.url,
      accountId: data.accountID,
      consumerKey: data.consumerKey,
      consumerSecretKey: data.consumerSecretKey,
      accessToken: data.accessToken,
      accessSecretToken: data.accessSecretToken,
      // authenticationType: 
    }
    console.log("configurData", configurData);

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
                />
                {errors.integrationName?.message ? (
                  <FormErrorText>
                    {errors.integrationName?.message}
                  </FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={12}>
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
