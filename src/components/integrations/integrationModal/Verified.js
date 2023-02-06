import TkButton from "@/globalComponents/TkButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";

const Verified = ({ onClickHandeler }) => {
  return (
    <>
      <h4 className="text-center">Verified Component</h4>
      <TkRow>
        <TkCol lg={12}>
          <TkButton
            type="button"
            className="btn btn-primary float-end"
            onClick={onClickHandeler}
          >
            Finish
          </TkButton>
        </TkCol>
      </TkRow>
    </>
  );
};

export default Verified;
