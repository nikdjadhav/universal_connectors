import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkForm from "@/globalComponents/TkForm";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { API_BASE_URL, sourceName } from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueries } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object({
  connection: Yup.object().nullable().required("Field is required."),
}).required();

const ExistConnection = ({ onClickHandler }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [integrationOptions, setIntegrationOptions] = useState([]);
  const [userId, setUserId] = useState(null);

  const apiResults = useQueries({
    queries: [
      {
        queryKey: ["integrationData", userId],
        queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrations/${userId}`),
        enabled: !!userId,
      },
    ],
  });

  const [integrations] = apiResults;
  const {
    data: integrationsData,
    isLoading: integrationsLoading,
    error: integrationsError,
  } = integrations;

  useEffect(() => {
    const userID = sessionStorage.getItem("userId");

    if (userID) {
      setUserId(JSON.parse(userID));
      if (integrationsData) {
        setIntegrationOptions(
          integrationsData.map((item) => ({
            label: item.integrationName,
            value: item.id,
          }))
        );
        // integrationsData.map((item) => {
        //   // TODO: edit this
        //   setIntegrationOptions((prev) => [
        //     ...prev,
        //     { label: item.integrationName, value: item.id },
        //   ]);
        // });
      }
    }
  }, [integrationsData]);

  const onSubmit = (data) => {
    onClickHandler();
  };
  return (
    <>
      <TkForm onSubmit={handleSubmit(onSubmit)} className="my-3">
        <TkRow>
          <TkCol lg={12} className="my-2">
            <Controller
              name="connection"
              control={control}
              render={({ field }) => (
                <TkSelect
                  {...field}
                  id="connection"
                  labelName="Connection List"
                  requiredStarOnLabel={true}
                  options={integrationOptions}
                />
              )}
            />
            {errors.connection?.message ? (
              <FormErrorText>{errors.connection?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={12} className="my-2">
            <TkButton type="submit" className="btn-success float-end">
              Next Step
            </TkButton>
          </TkCol>
        </TkRow>
      </TkForm>
    </>
  );
};

export default ExistConnection;
