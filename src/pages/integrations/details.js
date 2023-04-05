import React, { useCallback, useEffect, useState } from "react";
import TkPageHead from "@/globalComponents/TkPageHead";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import ModalButton from "@/components/integrations/integrationModal";
import TkContainer from "@/globalComponents/TkContainer";
import BreadCrumb from "@/utils/BreadCrumb";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import Image from "next/image";
import TkButton from "@/globalComponents/TkButton";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";
// import TkButton from "@/globalComponents/TkButton";
// import { useRouter } from "next/router";

const Details = () => {
  // useEffect(() => {
  //   const { data } = getQueryParams(window.location.search);
  // }, []);

  const router = useRouter();
  const [integrationData, setIntegrationData] = useState();
  const [integrationID, setIntegrationID] = useState();
  // const { integrationId } = router.query;
  // console.log("router.query", router.query.integrationId);
  useEffect(() => {
    if (router.query.integrationId) {
      setIntegrationID(JSON.parse(router.query.integrationId));
    }
  }, []);
  // console.log("integration id", integrationID);

  // const integration = useQuery({
  //   queryKey: ["integration", integrationId],
  //   queryFn: tkFetch.get(`http://localhost:4000/v1/getIntegrationById${integrationId}}`)
  // })

  // useEffect(() => {
  //   if (integration.data) {
  //     console.log("integration data", integration.data);
  //   }
  // })

  // const integration = useMutation({
  //   // mutationFn: tkFetch.post("http://localhost:4000/v1/getIntegrationById"),
  //   mutationFn: tkFetch.post(`${API_BASE_URL}/getIntegrationById`),
  // });
  const {data: integration, isError, isLoading, error} = useQuery({
    queryKey: ["getIntegration", integrationID],
    // queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrationById${integrationID}`),
    queryFn: tkFetch.get(`http://localhost:4000/v1/getIntegrationById/${integrationID}`),
    enabled: !!integrationID,
  })

  useEffect(() => {
    if (integrationID) {
      // const id = {
      //   id: integrationID,
      // };
      setIntegrationData(integration)
      // integration.mutate(id, {
      //   onSuccess: (data) => {
      //     console.log("data", data);
      //     setIntegrationData(data);
      //   },
      //   onError: (error) => {
      //     console.log("error", error);
      //   },
      // });
    }
  }, [integration, integrationID]);

  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  const onSubmit = () => {
    // console.log("id", id);
    toggle();
  };
  // console.log("integration data==>", integrationData);

  // const router = useRouter();

  return (
    <>
      <TkPageHead>
        <title>{"Integrations"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          parentTitle="Integrations"
          parentLink="/integrations"
          pageTitle="Details"
          // buttonText={"Add Integration"}
          // onButtonClick={toggle}
        />

        <h4 className="mb-5">Integration Details</h4>
        <TkContainer>
          <TkCard className="p-3">
            <TkCardBody >
              <TkRow>
                <TkCol lg={6} sm={6}>
                  <Image
                    src={"/images/nsgs.png"}
                    alt="NetSuite-img"
                    width={200}
                    height={150}
                    className="w-auto"
                  />
                </TkCol>
                <TkCol lg={6} sm={6}>
                  <h5>
                    {/* NetSuite™ to Google Sheets™ Two Way Integration for Smooth,
                    Effortless & Swift Data Sync. */}
                    {/* {integrationData.sourceName} to {integrationData.destinationName} */}
                    {integrationData && integrationData[0]?.sourceName} to { integrationData && integrationData[0]?.destinationName}
                    Two Way Integration for Smooth, Effortless & Swift Data
                    Sync.
                  </h5>
                  <p>
                    So, you’re seeking to Data Sync from NetSuite™ to Google
                    Sheets™ or vice versa. Luckily, NSGS evolved an add-on that
                    permits you to automate the system of going from NetSuite™
                    to Google Sheets™ and vice versa. Even more, you could get
                    began out unfastened with a restrained trial. Import
                    NetSuite™ records right into Google Sheets™ and vice versa
                    in real-time.
                  </p>
                  <TkButton className="btn-success" onClick={onSubmit}>
                    Procced
                  </TkButton>
                  {/* <ModalButton
                    modal={modal}
                    setModal={setModal}
                    toggle={toggle}
                  >
                  </ModalButton> */}
                </TkCol>
              </TkRow>
            </TkCardBody>
          </TkCard>
        </TkContainer>
        <ModalButton
          modal={modal}
          setModal={setModal}
          toggle={toggle}
          integrationID={integrationID}
        />

        {/* <TkButton
          className="btn-success"
          onClick={() => {
            console.log("clicked");
            router.push("/integrations/NSGS?credentials=1");
          }}
        >
          Info
        </TkButton> */}
      </div>
    </>
  );
};

export default Details;

Details.options = {
  layout: true,
  auth: true,
};
