import React, { useCallback, useEffect, useState } from "react";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import Image from "next/image";
import TkModal, {
  TkModalBody,
  TkModalHeader,
} from "@/globalComponents/TkModal";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkLabel from "@/globalComponents/TkLabel";
import { API_BASE_URL } from "@/utils/Constants";
import DropdownModal from "./DropdownModal";
import TkForm from "@/globalComponents/TkForm";
import { useForm } from "react-hook-form";
import TkInput from "@/globalComponents/TkInput";
import { useQuery } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import Link from "next/link";
import TkLoader from "@/globalComponents/TkLoader";
import TkNoData from "@/globalComponents/TkNoData";
import TkContainer from "../TkContainer";

const IntegrationCard = ({ modal, toggleModal }) => {
  const {
    
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm({});

  const [oneWaySync, setOneWaySync] = useState(true);
  const [twoWaySync, setTwoWaySync] = useState(false);
  const [syncWay, setSyncWay] = useState();
  const [userId, setUserId] = useState(null);

  const {
    data: integrations,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["integrations", userId],
    queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrations/${userId}`),
    enabled: !!userId,
  });

  useEffect(() => {
    const userID = sessionStorage.getItem("userId");
    setUserId(JSON.parse(userID));
  }, []);

  const toggleComponet = (value) => {
    setOneWaySync(value === "oneWaySync" ? true : false);
    setTwoWaySync(value === "twoWaySync" ? true : false);
  };

  const [dModal, setDModal] = useState(false);

  const dropdownToggleModal = useCallback(() => {
    if (dModal) {
      setDModal(false);

      toggleModal();
    } else {
      setDModal(true);
    }
  }, [dModal, toggleModal]);


  const onSubmit = (data) => {
    setSyncWay(data.radio);
  };

  return (
    <>
      <TkRow>
        {isLoading ? (
          <TkLoader />
        ) : integrations.length > 0 ? (
          integrations.map((item) => {
            return (
              <TkCol lg={3} key={item.id}>
                <TkCard
                  className="mt-4"
                  style={{ width: "300px", boxShadow: "2px 2px 2px 2px gray" }}
                >
                  <TkCardBody className="p-4">
                    <Link href={`/integrations/${item.id}`}>
                      <div className="text-center">
                        <Image
                          src={"/images/logo-sm.png"}
                          alt="NetSuite-img"
                          width={30}
                          height={30}
                          className="w-auto"
                        />
                        <h5 className="mt-3">
                          {item.sourceName} {item.destinationName}
                        </h5>
                        <Image
                          src={"/images/img/line-graph.jpg"}
                          alt="graph-img"
                          width={120}
                          height={120}
                          className="w-auto"
                          unoptimized={true}
                        />
                      </div>
                    </Link>
                  </TkCardBody>
                </TkCard>
              </TkCol>
            );
          })
        ) : (
          <TkContainer>
            <TkNoData />
          </TkContainer>
        )}
      </TkRow>
      {/* *** radio button modal *** */}
      <TkModal
        isOpen={modal}
        centered
        size="lg"
        className="border-0"
        modalClassName="modal fade zoomIn"
      >
        <TkModalHeader className="p-3 bg-soft-info" toggle={toggleModal}>
          {"Select the way"}
        </TkModalHeader>

        <TkModalBody className="modal-body">
          <TkForm onSubmit={handleSubmit(onSubmit)}>
            <TkRow className="justify-content-center">
              <TkCol lg={12} className="my-2 d-flex justify-content-center">
                <TkInput
                  {...register("radio")}
                  type="radio"
                  id="oneWaySync"
                  label="One Way Sync"
                  value="oneWaySync"
                  className="mb-3 me-2"
                  checked={oneWaySync}
                  onClick={() => toggleComponet("oneWaySync")}
                />
                <TkLabel id="oneWaySync">One Way Sync</TkLabel>
              </TkCol>

              <TkCol lg={12} className="my-2 d-flex justify-content-center">
                <TkInput
                  {...register("radio")}
                  type="radio"
                  id="twoWaySync"
                  label="Two Way Sync"
                  value="twoWaySync"
                  className="mb-3 me-2"
                  checked={twoWaySync}
                  onClick={() => toggleComponet("twoWaySync")}
                />
                <TkLabel id="twoWaySync">Two Way Sync</TkLabel>
              </TkCol>

              <TkCol lg={12} className="my-4 d-flex justify-content-center">
                <DropdownModal
                  dModal={dModal}
                  dropdownToggleModal={dropdownToggleModal}
                  syncWay={syncWay}
                >
                  Next
                </DropdownModal>
              </TkCol>
            </TkRow>
          </TkForm>
        </TkModalBody>
      </TkModal>
    </>
  );
};

export default IntegrationCard;
