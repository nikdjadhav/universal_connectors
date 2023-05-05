import React, { useCallback, useState } from "react";
import TkPageHead from "@/globalComponents/TkPageHead";
import IntegrationCard from "@/components/integrations/IntegrationCard";
import BreadCrumb from "@/utils/BreadCrumb";

const Integrations = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  const addIntegration = () => {};

  return (
    <>
      <TkPageHead>
        <title>{"Integrations"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          pageTitle="Integrations"
          buttonText={"Add Integration"}
          onButtonClick={toggleModal}
        />

        <IntegrationCard modal={modal} toggleModal={toggleModal} />
      </div>
    </>
  );
};

export default Integrations;

Integrations.options = {
  layout: true,
  auth: true,
};
