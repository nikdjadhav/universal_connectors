import React, { useCallback, useState } from "react";
import TkPageHead from "@/globalComponents/TkPageHead";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import ModalButton from "@/components/integrations/integrationModal";
import TkContainer from "@/globalComponents/TkContainer";
import BreadCrumb from "@/utils/BreadCrumb";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import Image from "next/image";
// import TkButton from "@/globalComponents/TkButton";
// import { useRouter } from "next/router";

const Details = () => {
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);

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
          <TkCard className={"p-3"}>
            <TkCardBody>
              <TkRow>
                <TkCol lg={6} sm={6}>
                  <Image
                    src={"/images/nsgs.png"}
                    alt="Netsuite-img"
                    width={200}
                    height={150}
                    className="w-auto"
                  />
                </TkCol>
                <TkCol lg={6} sm={6}>
                  <h5>
                    NetSuite™ to Google Sheets™ Two Way Integration for Smooth,
                    Effortless & Swift Data Sync.
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
                  <ModalButton
                    modal={modal}
                    setModal={setModal}
                    toggle={toggle}
                  >
                    Procced
                  </ModalButton>
                </TkCol>
              </TkRow>
            </TkCardBody>
          </TkCard>
        </TkContainer>

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
};
