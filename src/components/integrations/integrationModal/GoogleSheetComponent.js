import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { TkToastError } from "@/globalComponents/TkToastContainer";
import { API_BASE_URL, netsuiteRecordTypes } from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object({
  integrationName: Yup.string().required("Integration name is required."),

  googleSheetUrl: Yup.string().required("Google sheet url is required."),
}).required();

const GoogleSheetComponent = ({ onClickHandeler, ...other }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [integrationID, setIntegrationID] = useState();
  const [integrationsData, setIntegrationsData] = useState();

  const addConfigurations = useMutation({
    // mutationFn: tkFetch.post("http://localhost:4000/v1/addConfigurations")
    mutationFn: tkFetch.post(`${API_BASE_URL}/addConfigurations`),
  });

  const updateConfiguration = useMutation({
    // mutationFn: tkFetch.putWithIdInUrl("http://localhost:4000/v1/updateConfiguration"),
    mutationFn: tkFetch.post(`${API_BASE_URL}/updateConfiguration`),
  });
  // console.log("other", other);

  // const getConfigurationById = useMutation({
  //   // mutationFn: tkFetch.post("http://localhost:4000/v1/getConfigurationById")
  //   mutationFn: tkFetch.post(`${API_BASE_URL}/getConfigurationById`),
  // });
  const {data: configurationsData, isError, isLoading, error} = useQuery({
    queryKey: ["configurations", other.integrationID],
    queryFn: tkFetch.post(`${API_BASE_URL}/getConfigurationById/${other.integrationID}`),
    // queryFn: tkFetch.get(`http://localhost:4000/v1/getConfigurationById/${other.integrationID}`),
    enabled: !!other.integrationID,
  });
  // console.log("configurationsData^^^^^^^^^^",other.integrationID, "^^", configurationsData);

  // const integration = useMutation({
  //   // mutationFn: tkFetch.post("http://localhost:4000/v1/getIntegrationById"),
  //   mutationFn: tkFetch.post(`${API_BASE_URL}/getIntegrationById`),
  // });

  useEffect(() => {
    if (other.integrationID) {
      setIntegrationID(JSON.parse(other.integrationID));

      if(configurationsData?.length){
        configurationsData.map((item) => {
          // console.log("GS item", item, "and", other.title)
          if (item.systemName === other.title) {
            // console.log("item GS", item);
            setIntegrationsData(item);
            setValue("integrationName", item.integration.integrationName);
            setValue("googleSheetUrl", item.url);
          }
        });
      }
    }

    // if (other.integrationID) {
      
      // getConfigurationById.mutate(
      //   { integrationId: JSON.parse(other.integrationID) },
      //   {
      //     onSuccess: (data) => {
      //       // console.log("getConfigurationById GS", data);
      //       data.map((item) => {
      //         if (item.systemName === other.title) {
      //           // console.log("item GS", item);
      //           setIntegrationsData(item);
      //           setValue("integrationName", item.integration.integrationName);
      //           setValue("googleSheetUrl", item.url);
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
      //       // console.log("integration data", data[0]);
      //       setValue("integrationName", data[0].integrationName);
      //     },
      //     onError: (error) => {
      //       console.log("error", error);
      //     },
      //   }
      // );
    // }
  }, [configurationsData, other.integrationID, other.title, setValue]);

  const onSubmit = (data) => {
    // console.log("data", data);
    if (configurationsData?.length) {
      configurationsData.map((item) => {
        if (item.systemName === other.title) {
          console.log("updated", item.systemName, "for", item.id);
          const updatedData = {
            id: item.id,
            systemName: other.title,
            url: data.googleSheetUrl,
            authenticationType: "abc",
          };
          console.log("updatedData", updatedData)
          updateConfiguration.mutate(updatedData, {
            onSuccess: (data) => {
              console.log("Updated Successfully", data);
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
      console.log("added");
      const userId = sessionStorage.getItem("userId");

      const configurData = {
        userId: JSON.parse(userId),
        integrationId: integrationID,
        systemName: other.title,
        url: data.googleSheetUrl,
        authenticationType: "xyz",
      };
      // console.log("configurData", configurData);

      addConfigurations.mutate(configurData, {
        onSuccess: (data) => {
          // console.log("addConfigurations data", data);
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    }

    onClickHandeler();
    // // console.log("data", data);
    // const userId = sessionStorage.getItem("userId");
    // const configurData = {
    //   userId: JSON.parse(userId),
    //   integrationId: integrationID,
    //   systemName: other.title,
    //   url: data.googleSheetUrl,
    // };
    // // console.log("configurData", configurData);
    // addConfigurations.mutate(configurData, {
    //   onSuccess: (data) => {
    //     // console.log("data", data);
    //   },
    //   onError: (error) => {
    //     console.log("error", error);
    //   },
    // });

    // onClickHandeler();
  };

  return (
    <>
      {/* <h5 className="text-center">Google Sheet Configuration</h5> */}
      {/* <TkCard>
        <TkCardBody> */}
      <TkForm onSubmit={handleSubmit(onSubmit)}>
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

          {/* <TkCol lg={12}>
                <TkSelect
                  id="netsuiteRecordType"
                  name="netsuiteRecordType"
                  labelName="NetSuite Record Type"
                  options={netsuiteRecordTypes}
                  defaultValue={netsuiteRecordTypes[0]}
                  maxMenuHeight="130px"
                />
              </TkCol> */}

          <TkCol lg={12}>
            <TkInput
              {...register("googleSheetUrl")}
              id="googleSheetUrl"
              type="text"
              labelName="Google Sheets™ Url"
              placeholder="Enter google sheet url"
              requiredStarOnLabel={true}
              invalid={errors.googleSheetUrl?.message ? true : false}
            />
            {errors.googleSheetUrl?.message ? (
              <FormErrorText>{errors.googleSheetUrl?.message}</FormErrorText>
            ) : null}
          </TkCol>

          {/* <TkCol lg={12}>
                <TkButton type="submit" className="btn btn-success">
                  Authorize
                </TkButton>
              </TkCol> */}

          <TkCol lg={12}>
            <TkButton
              type="submit"
              className="btn-success float-end"
              // onClick={onClickHandeler}
            >
              {/* Next Step */}
              Authorize
            </TkButton>
          </TkCol>
        </TkRow>
      </TkForm>
      {/* </TkCardBody>
      </TkCard> */}
    </>
  );
};

export default GoogleSheetComponent;

// import TkButton from "@/globalComponents/TkButton";
// import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
// import TkForm from "@/globalComponents/TkForm";
// import TkInput from "@/globalComponents/TkInput";
// import TkRow, { TkCol } from "@/globalComponents/TkRow";
// import React from "react";

// const GoogleSheetComponent = ({ onClickHandeler }) => {
//   return (
//     <>
//       <h5 className="text-center">Google Sheet Configuration</h5>

//       <TkRow className="justify-content-center">
//         <TkCol>
//           <TkCard>
//             <TkCardBody>
//               <TkForm>
//                 <TkRow className="g-3">
//                   <TkCol lg={12}>
//                     <TkInput
//                       // {...register("clientName")}
//                       id="integrationName"
//                       type="text"
//                       labelName="Integration Name"
//                       placeholder="Enter integration name"
//                       // requiredStarOnLabel={true}
//                       // disabled={viewMode}
//                     />
//                   </TkCol>

//                   <TkCol lg={12}>
//                     <TkInput
//                       // {...register("clientName")}
//                       id="netsuiteRecordType"
//                       type="text"
//                       labelName="Netsuite record type"
//                       placeholder="Enter netsuite record type"
//                       // requiredStarOnLabel={true}
//                       // disabled={viewMode}
//                     />
//                   </TkCol>

//                   <TkCol lg={12}>
//                     <TkInput
//                       // {...register("clientName")}
//                       id="googleSheetUrl"
//                       type="text"
//                       labelName="Google sheet URL"
//                       placeholder="Enter google sheet URL"
//                       // requiredStarOnLabel={true}
//                       // disabled={viewMode}
//                     />
//                   </TkCol>

//                   <TkCol lg={2}>
//                     <TkButton
//                       color="success"
//                       className="btn btn-success"
//                       type="submit"
//                     >
//                       Authorize
//                     </TkButton>
//                   </TkCol>

//                   <TkCol lg={2}>
//                     <TkButton
//                       color="success"
//                       className="btn btn-success"
//                       // type="submit"
//                       // onClick={onClickHandeler}
//                     >
//                       Next Step
//                     </TkButton>
//                   </TkCol>

//                 </TkRow>
//               </TkForm>
//             </TkCardBody>
//           </TkCard>
//         </TkCol>
//       </TkRow>
//     </>
//   );
// };

// export default GoogleSheetComponent;
