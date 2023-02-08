import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { netsuiteRecordTypes } from "@/utils/Constants";
import React from "react";

const GoogleSheetComponent = ({ onClickHandeler }) => {
  return (
    <>
      <h5 className="text-center">Google Sheet Configuration</h5>
      <TkCard>
        <TkCardBody>
          <TkForm>
            <TkRow className="g-3">
              <TkCol lg={12}>
                <TkInput
                  id="integrationName"
                  type="text"
                  labelName="Integration Name"
                  placeholder="Enter integration name"
                />
              </TkCol>

              <TkCol lg={12}>
                <TkSelect
                  id="netsuiteRecordType"
                  name="netsuiteRecordType"
                  labelName="NetSuite Record Type"
                  options={netsuiteRecordTypes}
                  defaultValue={netsuiteRecordTypes[0]}
                  maxMenuHeight="130px"
                />
              </TkCol>

              <TkCol lg={12}>
                <TkInput
                  id="googleSheetUrl"
                  type="text"
                  labelName="Google Sheet Url"
                  placeholder="Enter google sheet url"
                />
              </TkCol>

              {/* <TkCol lg={12}>
                <TkButton type="submit" className="btn btn-success">
                  Authorize
                </TkButton>
              </TkCol> */}

              <TkCol lg={12}>
                <TkButton
                  type="button"
                  className="btn btn-primary float-end"
                  onClick={onClickHandeler}
                >
                  {/* Next Step */}
                  Authorize
                </TkButton>
              </TkCol>
            </TkRow>
          </TkForm>
        </TkCardBody>
      </TkCard>
    </>
  );
};

export default GoogleSheetComponent;

// import TkButton from "@/globalComponents/TkButton";
// import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
// import TkForm from "@/globalComponents/TkForm";
// import TkInput from "@/globalComponents/TkInput";
// import TkRow, { TkCol } from "@/globalComponents/TkRow";
// import React from "react";

// const GoogleSheetComponent = ({ onClickHandeler }) => {
//   return (
//     <>
//       <h5 className="text-center">Google Sheet Configuration</h5>

//       <TkRow className="justify-content-center">
//         <TkCol>
//           <TkCard>
//             <TkCardBody>
//               <TkForm>
//                 <TkRow className="g-3">
//                   <TkCol lg={12}>
//                     <TkInput
//                       // {...register("clientName")}
//                       id="integrationName"
//                       type="text"
//                       labelName="Integration Name"
//                       placeholder="Enter integration name"
//                       // requiredStarOnLabel={true}
//                       // disabled={viewMode}
//                     />
//                   </TkCol>

//                   <TkCol lg={12}>
//                     <TkInput
//                       // {...register("clientName")}
//                       id="netsuiteRecordType"
//                       type="text"
//                       labelName="Netsuite record type"
//                       placeholder="Enter netsuite record type"
//                       // requiredStarOnLabel={true}
//                       // disabled={viewMode}
//                     />
//                   </TkCol>

//                   <TkCol lg={12}>
//                     <TkInput
//                       // {...register("clientName")}
//                       id="googleSheetUrl"
//                       type="text"
//                       labelName="Google sheet URL"
//                       placeholder="Enter google sheet URL"
//                       // requiredStarOnLabel={true}
//                       // disabled={viewMode}
//                     />
//                   </TkCol>

//                   <TkCol lg={2}>
//                     <TkButton
//                       color="success"
//                       className="btn btn-success"
//                       type="submit"
//                     >
//                       Authorize
//                     </TkButton>
//                   </TkCol>

//                   <TkCol lg={2}>
//                     <TkButton
//                       color="success"
//                       className="btn btn-success"
//                       // type="submit"
//                       // onClick={onClickHandeler}
//                     >
//                       Next Step
//                     </TkButton>
//                   </TkCol>

//                 </TkRow>
//               </TkForm>
//             </TkCardBody>
//           </TkCard>
//         </TkCol>
//       </TkRow>
//     </>
//   );
// };

// export default GoogleSheetComponent;
