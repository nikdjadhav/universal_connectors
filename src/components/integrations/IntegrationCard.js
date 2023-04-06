import React, { useCallback, useEffect, useState } from "react";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import { useRouter } from "next/router";
import Image from "next/image";
import TkModal, {
  TkModalBody,
  TkModalHeader,
} from "@/globalComponents/TkModal";
import TkSelect from "@/globalComponents/TkSelect";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkLabel from "@/globalComponents/TkLabel";
import TkButton from "@/globalComponents/TkButton";
import ModalButton from "./integrationModal";
import { API_BASE_URL, destinationName, sourceName } from "@/utils/Constants";
import TkRadioButton from "@/globalComponents/TkRadioButton";
import DropdownModal from "./DropdownModal";
import TkForm from "@/globalComponents/TkForm";
import { Controller, useForm } from "react-hook-form";
import TkInput from "@/globalComponents/TkInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";

const IntegrationCard = ({ modal, toggleModal }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });

  const [oneWaySync, setOneWaySync] = useState(true);
  const [twoWaySync, setTwoWaySync] = useState(false);
  const [syncWay, setSyncWay] = useState();
  const [integrationData, setIntegrationData] = useState();
  const [userId, setUserId] = useState(null);

  // const integration = useMutation({
  //   // mutationFn: tkFetch.post("http://localhost:4000/v1/getIntegrations"),
  //   mutationFn: tkFetch.post(`${API_BASE_URL}/getIntegrations`),

  // });
  const {
    data: integrations,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["integrations", userId],
    queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrations/${userId}`),
    // queryFn: tkFetch.get(`http://localhost:4000/v1/getIntegrations/${userId}`),
    enabled: !!userId,
  });

  useEffect(() => {
    const userID = sessionStorage.getItem("userId");
    // console.log("userID", userID);
    setUserId(JSON.parse(userID));
    // const id = {
    //   "userId": JSON.parse(userID)
    // }
  }, []);

  // console.log("userId", userId);

  useEffect(() => {
    if (userId) {
      setIntegrationData(integrations);
      // integration.mutate(userId, {
      //   onSuccess: (data) => {
      //     setIntegrationData(data);
      //   },
      //   onError: (error) => {
      //     console.log("error", error);
      //   },
      // });
    }
  }, [integrations, userId]);
  // console.log("integrationData", integrationData);

  const toggleComponet = (value) => {
    setOneWaySync(value === "oneWaySync" ? true : false);
    setTwoWaySync(value === "twoWaySync" ? true : false);
    // setSyncWay(value);
    // console.log('setSyncWay in toggleComponet',value);
  };

  // ***to open dropdown modal
  const [dModal, setDModal] = useState(false);

  const dropdownToggleModal = useCallback(() => {
    if (dModal) {
      setDModal(false);

      // *** close last modal(radio btn modal)
      toggleModal();
    } else {
      setDModal(true);
    }
  }, [dModal, toggleModal]);

  //
  const router = useRouter();

  const onClickCard = (id) => {
    // console.log("Clicked", id);
    // router.push("/integrations/details");
    router.push(
      {
        pathname: "/integrations/details",
        query: { integrationId: id },
      },
      "/integrations/details"
    );
  };

  const onSubmit = (data) => {
    // console.log("radio button value", data);
    // console.log("radio button value", data.radio);
    setSyncWay(data.radio);
  };
  // console.log('setSyncWay onSubmit', syncWay);

  return (
    <>
      <TkRow>
        {isLoading ? (
          <div>loading...</div>
        ) : integrations.length ? (
          integrations.map((item) => {
            // console.log("item", item.sourceName);

            return (
              <TkCol lg={3} key={item.id}>
                <TkCard
                  className="mt-4"
                  style={{ width: "300px", boxShadow: "2px 2px 2px 2px gray" }}
                >
                  <TkCardBody
                    className="p-4"
                    onClick={() => onClickCard(item.id)}
                  >
                    <div className="text-center">
                      <Image
                        src={"/images/logo-sm.png"}
                        alt="NetSuite-img"
                        width={30}
                        height={30}
                        className="w-auto"
                      />
                      {/* <h5 className="mt-3">NetSuite™ Google Sheets™</h5> */}
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
                  </TkCardBody>
                </TkCard>
              </TkCol>
            );
          })
        ) : (
          <div className="text-center">
            <h3>No Integration Found</h3>
          </div>
        )}
      </TkRow>
      {/* *** radio button modal *** */}
      <TkModal
        isOpen={modal}
        // toggle={toggle}
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
              {/* <TkCol lg={6} className="my-3">
                <Controller
                  name="source"
                  control={control}
                  render={({ field }) => (
                    <TkSelect
                      {...field}
                      id="source"
                      labelName="Source"
                      options={sourceName}
                      maxMenuHeight="130px"
                    />
                  )}
                />
              </TkCol> */}

              {/* <TkCol lg={6} className="my-3">
              <TkSelect
                id="destination"
                name="destination"
                labelName="Destination"
                options={destinationName}
                maxMenuHeight="130px"
              />
            </TkCol> */}

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
                {/* One Way Sync
                </TkInput> */}
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
                {/* Two Way Sync
                </TkInput> */}
              </TkCol>

              <TkCol lg={12} className="my-4 d-flex justify-content-center">
                {/* <TkButton className="btn-success">Submit</TkButton> */}
                {/* <ModalButton
                modal={integrationModal}
                setModal={settntegrationModal}
                toggle={integrationToggle}
              >
                Submit
              </ModalButton> */}
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
