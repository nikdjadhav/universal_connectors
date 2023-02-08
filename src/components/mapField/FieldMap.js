import TkButton from "@/globalComponents/TkButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { destinationName, sourceName } from "@/utils/Constants";
import { useRouter } from "next/router";
import React from "react";

const FieldMap = ({route}) => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push(route);
  };

  return (
    <>
      <TkRow className="mt-5">
        <TkCol lg={4}>
          <TkSelect
            id="sourceName"
            name="sourceName"
            labelName="Source Integration Name"
            options={sourceName}
            maxMenuHeight="120px"
          />
        </TkCol>

        <TkCol lg={4}>
          {/* <TkCard> */}
          {/* <TkCardBody> */}
          <TkSelect
            labelName="Destination Integration Name"
            id="destinationName"
            name="destinationName"
            options={destinationName}
            maxMenuHeight="120px"
          />
          {/* </TkCardBody> */}
          {/* </TkCard> */}
        </TkCol>
      </TkRow>
      {/* <TkCol lg={4}> */}
      <TkButton
        className="btn btn-primary my-4"
        type="submit"
        onClick={handleSubmit}
      >
        Next
      </TkButton>
    </>
  );
};

export default FieldMap;
