import React, { useCallback, useState } from "react";
import TkPageHead from "@/globalComponents/TkPageHead";
import IntegrationCard from "@/components/integrations/IntegrationCard";
import BreadCrumb from "@/utils/BreadCrumb";
import Topbar from "@/components/integrations/Topbar";

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

          // onButtonClick={toggle}
        />

        {/* <Topbar /> */}

        <h4>Integrations</h4>

        <IntegrationCard modal={modal} toggleModal={toggleModal} />

        {/* <TkContainer></TkContainer> */}
      </div>
    </>
  );
};

export default Integrations;

Integrations.options = {
  layout: true,
};
