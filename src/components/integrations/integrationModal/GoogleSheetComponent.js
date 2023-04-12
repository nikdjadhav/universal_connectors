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
}).required();

const GoogleSheetComponent = ({
  onClickHandeler,
  toggle,
  integrationID,
  title,
  addedIntegrationsId,
}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [integrationsData, setIntegrationsData] = useState();

  const addConfigurations = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addConfigurations`),
  });

  const updateConfiguration = useMutation({
    mutationFn: tkFetch.putWithIdInUrl(`${API_BASE_URL}/updateConfiguration`),
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
        }
      });
    }
  }, [configurationsData, integrationID, setValue, title]);

  const onSubmit = (data) => {
    // console.log("data", data);
    showLoader();
    const userId = sessionStorage.getItem("userId");
    if (configurationsData?.length) {
      configurationsData.map((item) => {
        if (item.systemName === title) {
          const updatedData = {
            id: item.id,
            authenticationType: "xyz",
          };
          console.log("updatedData in gs");
          updateConfiguration.mutate(updatedData, {
            onSuccess: (data) => {
              hideLoader();
              queryClient.invalidateQueries({
                queryKey: ["configurationsData"],
              });
              onClickHandeler();
            },
            onError: (error) => {
              // console.log("error", error);
              hideLoader();
              toggle();
              TkToastError("Error: Record not updated");
            },
          });
        }
      });
    } else {
      const configurData = {
        userId: JSON.parse(userId),
        integrationId: addedIntegrationsId,
        systemName: title,
        authenticationType: "abc",
      };
      console.log("added in gs");

      addConfigurations.mutate(configurData, {
        onSuccess: (data) => {
          hideLoader();
          queryClient.invalidateQueries({
            queryKey: ["configurationsData"],
          });
          onClickHandeler();
        },
        onError: (error) => {
          // console.log("error", error);
          hideLoader();
          toggle();
          TkToastError("Error: Record not added");
        },
      });
    }
  };

  return (
    <>
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
              disabled={integrationsData ? true : false}
            />
            {errors.integrationName?.message ? (
              <FormErrorText>{errors.integrationName?.message}</FormErrorText>
            ) : null}
          </TkCol>

          <TkCol lg={12}>
            <TkButton type="submit" className="btn-success float-end">
              Authorize
            </TkButton>
          </TkCol>
          {loader}
        </TkRow>
      </TkForm>
    </>
  );
};

export default GoogleSheetComponent;
