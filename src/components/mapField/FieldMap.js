import TkButton from "@/globalComponents/TkButton";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { destinationName, integrations, sourceName } from "@/utils/Constants";
import { useRouter } from "next/router";
import React from "react";

const FieldMap = ({ route }) => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push(route);
  };

  return (
    <>
      <TkRow className="mt-5 justify-content-center">
        {/* <TkCol lg={4}>
          <TkSelect
            id="sourceName"
            name="sourceName"
            labelName="Source Integration Name"
            options={sourceName}
            maxMenuHeight="120px"
          />
        </TkCol> */}

        <TkCol lg={4}>
          <TkSelect
            labelName="Integration Name"
            id="integrationName"
            name="integrationName"
            options={integrations}
            maxMenuHeight="120px"
          />
        </TkCol>
      </TkRow>

      <TkRow className="mt-3 justify-content-center">
        <TkCol lg={1}>
          <TkButton
            className="btn btn-primary my-4"
            type="submit"
            onClick={handleSubmit}
          >
            Next
          </TkButton>
        </TkCol>
      </TkRow>
    </>
  );
};

export default FieldMap;
