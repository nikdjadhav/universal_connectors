import TkButton from "@/globalComponents/TkButton";
import TkLabel from "@/globalComponents/TkLabel";
import TkModal, {
  TkModalBody,
  TkModalHeader,
} from "@/globalComponents/TkModal";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { destinationName, sourceName } from "@/utils/Constants";
import React, { useCallback, useEffect, useState } from "react";
import ModalButton from "./integrationModal";

const DropdownModal = ({ children, dModal, dropdownToggleModal, syncWay }) => {
  console.log('syncWay in next',syncWay);
  const [firstLabel, setFirstTitle] = useState();
  const [secondLabel, setSecondTitle] = useState();

  useEffect(() => {
    if(syncWay === "oneWaySync"){
      setFirstTitle("Source");
      setSecondTitle("Destination");
    }else{
      setFirstTitle("System One");
      setSecondTitle("System Two");
    }
  })
  // ***to open form modal
  const [integrationModal, settntegrationModal] = useState(false);
  const integrationToggle = useCallback(() => {
    if (integrationModal) {
      settntegrationModal(false);

      // *** close last modal(dropdown modal)
      dropdownToggleModal();
    } else {
      settntegrationModal(true);
    }
  }, [integrationModal]);

  return (
    <>
      <TkButton type="submit" className={"btn-success"} onClick={dropdownToggleModal}>
        {children}
      </TkButton>

      {/* *** dropdown modal *** */}
      <TkModal
        isOpen={dModal}
        centered
        size="lg"
        className="border-0"
        modalClassName="modal fade zoomIn"
      >
        <TkModalHeader
          className="p-3 bg-soft-info"
          toggle={dropdownToggleModal}
        >
          {"Select"}
        </TkModalHeader>

        <TkModalBody className="modal-body">
          <TkRow>
            <TkCol lg={6} className="my-3">
            <TkLabel id="source">{firstLabel}</TkLabel>
              <TkSelect
                id="source"
                name="source"
                // labelName="Source"
                options={sourceName}
                maxMenuHeight="130px"
              />
            </TkCol>

            <TkCol lg={6} className="my-3">
            <TkLabel id="destination">{secondLabel}</TkLabel>
              <TkSelect
                id="destination"
                name="destination"
                // labelName="Destination"
                options={destinationName}
                maxMenuHeight="130px"
              />
            </TkCol>

            <TkCol lg={12} className="my-4 d-flex justify-content-center">
              <ModalButton
                modal={integrationModal}
                setModal={settntegrationModal}
                toggle={integrationToggle}
                syncWay={syncWay}
              >
                Submit
              </ModalButton>
            </TkCol>
          </TkRow>
        </TkModalBody>
      </TkModal>
    </>
  );
};

export default DropdownModal;
