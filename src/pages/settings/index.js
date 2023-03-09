import NotificationSetting from "@/components/settings/NotificationSetting";
import TkContainer from "@/components/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import React from "react";

const Settings = () => {
  return (
    <>
      <TkPageHead>
        <title>{"Notification Settings"}</title>
      </TkPageHead>

      <div className="page-content">
        <BreadCrumb pageTitle="Notification Settings" />

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
