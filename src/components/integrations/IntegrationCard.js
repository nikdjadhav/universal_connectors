import React, { useCallback, useState } from "react";
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
import { destinationName, sourceName } from "@/utils/Constants";
import TkRadioButton from "@/globalComponents/TkRadioButton";
import DropdownModal from "./DropdownModal";
import TkForm from "@/globalComponents/TkForm";
import { Controller, useForm } from "react-hook-form";
import TkInput from "@/globalComponents/TkInput";

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
  }, [dModal]);

  //
  const router = useRouter();
  // const [integrationModal, settntegrationModal] = useState(false);
  // const integrationToggle = useCallback(() => {
  //   if (integrationModal) {
  //     settntegrationModal(false);
  //     toggleModal();
  //   } else {
  //     settntegrationModal(true);
  //   }
  // }, [integrationModal]);

  const onClickCard = () => {
    console.log("Clicked");
    router.push("/integrations/details");
  };

  const onSubmit = (data) => {
    console.log("radio button value", data);
    // console.log("radio button value", data.radio);
    setSyncWay(data.radio);
  };
  console.log('setSyncWay onSubmit', syncWay);

  return (
    <>
      <TkCard className="mt-4" style={{ width: "300px" }}>
        <TkCardBody className="p-4" onClick={onClickCard}>
          <div className="text-center">
            <Image
              src={"/images/logo-sm.png"}
              alt="Netsuite-img"
              width={30}
              height={30}
              className="w-auto"
            />
            <h5 className="mt-3">Netsuite Google Sheet</h5>
            {/* <img src="/images/img/line-graph.jpg" style={{ width: "250px" }} /> */}
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
                <TkLabel id="oneWaySync">
                One Way Sync
                </TkLabel>
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
                <TkLabel id="twoWaySync">
                Two Way Sync
                </TkLabel>
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
