import React, { useCallback, useEffect, useState } from "react";
import TkContainer from "../TkContainer";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import Image from "next/image";
import TkButton from "@/globalComponents/TkButton";
import ModalButton from "./integrationModal";
import { useQuery } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";

const IntegrationDetails = ({id}) => {
  const [integrationData, setIntegrationData] = useState();
  const [integrationID, setIntegrationID] = useState();

  const {
    data: integration,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getIntegration", id],
    queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrationById/${id}`),
    // queryFn: tkFetch.get(`http://localhost:4000/v1/getIntegrationById/${integrationID}`),
    enabled: !!id,
  });

  useEffect(() => {
    if (id) {
      // const id = {
      //   id: integrationID,
      // };
      setIntegrationData(integration);
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
  }, [id, integration]);

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

  return (
    <>
      <TkContainer>
        <TkCard className="p-3">
          <TkCardBody>
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
                  {integrationData && integrationData[0]?.sourceName} to{" "}
                  {integrationData && integrationData[0]?.destinationName}
                  Two Way Integration for Smooth, Effortless & Swift Data Sync.
                </h5>
                <p>
                  So, you’re seeking to Data Sync from NetSuite™ to Google
                  Sheets™ or vice versa. Luckily, NSGS evolved an add-on that
                  permits you to automate the system of going from NetSuite™ to
                  Google Sheets™ and vice versa. Even more, you could get began
                  out unfastened with a restrained trial. Import NetSuite™
                  records right into Google Sheets™ and vice versa in real-time.
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
        integrationID={id}
      />
    </>
  );
};

export default IntegrationDetails;
