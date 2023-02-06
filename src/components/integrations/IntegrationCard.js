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

const IntegrationCard = ({ modal, toggleModal }) => {
  const router = useRouter();
  const [integrationModal, settntegrationModal] = useState(false);
  const integrationToggle = useCallback(() => {
    if (integrationModal) {
      settntegrationModal(false);
    } else {
      settntegrationModal(true);
    }
  }, [integrationModal]);

  const onClickCard = () => {
    console.log("Clicked");
    router.push("/integrations/details");
  };

  return (
    <>
      <TkCard className="mt-4" style={{ width: "300px" }}>
        <TkCardBody className="p-4" onClick={onClickCard}>
          <div className="text-center">
            {/* <img
              src="/images/logo-sm.png"
              alt="Netsuite"
              style={{ width: "50px" }}
            /> */}
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

      {/* *** addIntegration button model *** */}
      <TkModal
        isOpen={modal}
        // toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="modal fade zoomIn"
      >
        <TkModalHeader className="p-3 bg-soft-info" toggle={toggleModal}>
          {"Add Integrations"}
        </TkModalHeader>

        <TkModalBody className="modal-body">
          <TkRow>
            <TkCol lg={6} className="my-3">
              <TkSelect
                id=""
                name=""
                labelName=""
                maxMenuHeight="130px"
              />
            </TkCol>

            <TkCol lg={6} className="my-3">
              <TkSelect
                id=""
                name=""
                labelName=""
                maxMenuHeight="130px"
              />
            </TkCol>

            <TkCol lg={6} className="my-3">
              <TkCheckBox
                className="form-check-input"
                type="checkbox"
                id="oneWayIntegration"
              />
              <TkLabel className="form-check-label mx-2" id="oneWayIntegration">
                One Way Integration
              </TkLabel>
            </TkCol>

            <TkCol lg={6} className="my-3">
              <TkCheckBox
                className="form-check-input"
                type="checkbox"
                id="twoWayIntegration"
              />
              <TkLabel className="form-check-label mx-2" id="twoWayIntegration">
                Two Way Integration
              </TkLabel>
            </TkCol>

            <tkCol lg={12} className="my-4 d-flex justify-content-center">
              {/* <TkButton className="btn-success" onClick={onClickModal}>Submit</TkButton> */}
              <ModalButton
                modal={integrationModal}
                setModal={settntegrationModal}
                toggle={integrationToggle}
                
              >
                Submit
              </ModalButton>
            </tkCol>
          </TkRow>
        </TkModalBody>
      </TkModal>
    </>
  );
};

export default IntegrationCard;
