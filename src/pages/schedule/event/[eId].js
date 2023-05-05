import TkContainer from "@/components/TkContainer";
import UpdateEvent from "@/components/schedule/UpdateEvent";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import { useRouter } from "next/router";
import React from "react";

const UpdateEvents = () => {
  const router = useRouter();
  const { eId } = router.query;
  return (
    <>
      <TkPageHead>
        <title>{`Event`}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb
          parentTitle="Schedule"
          parentLink="/schedule"
          pageTitle="Event"
        />

        <TkContainer>
          <UpdateEvent eventId={eId} />
        </TkContainer>
      </div>
    </>
  );
};

export default UpdateEvents;

UpdateEvents.options = {
  layout: true,
  auth: true,
};
