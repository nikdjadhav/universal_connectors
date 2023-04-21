import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";

const Topbar = () => {

  return (
    <>
      <div className="page-title-box d-sm-flex align-items-center ">
        <TkRow>
          <TkCol lg={12}>
            <TkInput type="search" placeholder="Search " label="Search" />
          </TkCol>
        </TkRow>
      </div>
    </>
  );
};

export default Topbar;
