import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";

const Topbar = () => {
  const items = [
    { id: 0, value: "ruby" },
    { id: 1, value: "javascript" },
    { id: 2, value: "lua" },
    { id: 3, value: "go" },
    { id: 4, value: "julia" },
  ];

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
