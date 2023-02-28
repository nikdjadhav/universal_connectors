import ProfileSetting from "@/components/profile/ProfileSetting";
import TkContainer from "@/components/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import BreadCrumb from "@/utils/BreadCrumb";
import React from "react";

const ProfileList = () => {
  return (
    <>
      <TkPageHead>
        <title>{`Profile`}</title>
      </TkPageHead>
      <div className="page-content">
        <BreadCrumb pageTitle={"Profile"} />

        <TkContainer>
          <ProfileSetting />
        </TkContainer>
      </div>
    </>
  );
};

export default ProfileList;

ProfileList.options = {
  layout: true,
  auth: true,
};