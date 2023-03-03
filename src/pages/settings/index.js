import NotificationSetting from "@/components/settings/NotificationSetting";
import TkContainer from "@/components/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import React from "react";

const Settings = () => {
  return (
    <>
      <TkPageHead>
        <title>{"Settings"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb pageTitle="Settings" />

        <TkContainer>
          <NotificationSetting />
        </TkContainer>
      </div>
    </>
  );
};

export default Settings;
Settings.options = {
  layout: true,
  auth: true,
};
