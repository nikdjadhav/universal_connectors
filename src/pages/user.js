import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkContainer from "@/globalComponents/TkContainer";
import TkDate from "@/globalComponents/TkDate";
import TkEditCardHeader from "@/globalComponents/TkEditCardHeader";
import TkForm from "@/globalComponents/TkForm";
import TkInput from "@/globalComponents/TkInput";
import TkPageHead from "@/globalComponents/TkPageHead";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import React from "react";

const User = () => {
  return (
    <>
      <TkPageHead>
        <title>{"User"}</title>
      </TkPageHead>
      <div className="page-content">
        <h4>User Form</h4>

        <TkContainer>
          <TkRow className="justify-content-center">
            <TkCol>
              <TkCard>
                <TkEditCardHeader
                  title="Client Details"
                  // active={isClientActive}
                  // onActiveClick={activeClientChange}
                  // disableActive={activeClient.isLoading || viewMode}
                  // disableDelete={viewMode}
                />
                {/* {activeClient.isError ? (
                <FormErrorBox errMessage={activeClient.error?.message} />
              ) : null} */}
                <TkCardBody>
                  <TkForm>
                    {/* onSubmit={handleSubmit(onSubmit)} */}
                    <TkRow className="g-3">
                      <TkCol lg={4}>
                        <TkInput
                          // {...register("clientName")}
                          id="clientName"
                          type="text"
                          labelName="Client Name"
                          placeholder="Enter Client Name"
                          requiredStarOnLabel={true}
                          // disabled={viewMode}
                        />
                        {/* {errors.clientName?.message ? (
                        <FormErrorText>
                          {errors.clientName?.message}
                        </FormErrorText>
                      ) : null} */}
                      </TkCol>

                      <TkCol lg={4}>
                        <TkInput
                          // {...register("clientEmail")}
                          id="email"
                          type="text"
                          labelName="Email"
                          placeholder="Enter Email"
                          // disabled={viewMode}
                        />
                        {/* {errors.clientEmail?.message ? (
                        <FormErrorText>
                          {errors.clientEmail?.message}
                        </FormErrorText>
                      ) : null} */}
                      </TkCol>

                      <TkCol lg={4}>
                        <TkInput
                          // {...register("phoneNumber")}
                          id="clientPhoneNumber"
                          type="text"
                          labelName="Phone"
                          placeholder="Enter Phone"
                          // disabled={viewMode}
                        />
                        {/* {errors.phoneNumber?.message ? (
                        <FormErrorText>
                          {errors.phoneNumber?.message}
                        </FormErrorText>
                      ) : null} */}
                      </TkCol>

                      <TkCol lg={4}>
                        <TkDate
                          labelName="Created Date"
                          id="createDate"
                          name="createDate"
                          placeholder="Select a date"
                          // value={
                          //   createDate ? new Date(createDate).toISOString() : null
                          // }
                          // disabled={true || viewMode}
                          options={{
                            altInput: true,
                            altFormat: "d M, Y",
                            dateFormat: "d M, Y",
                          }}
                        />
                      </TkCol>

                      <TkCol lg={4}>
                        <TkInput
                          // {...register("createdBy")}
                          id="createdBy"
                          type="text"
                          labelName="Created By"
                          // disabled={true || viewMode}
                        />
                      </TkCol>

                      <TkCol lg={4}>
                        <TkInput
                          // {...register("totalWork")}
                          id="totalWork"
                          type="text"
                          labelName="Total Work (HH:MM)"
                          // disabled={true || viewMode}
                        />
                      </TkCol>

                      <TkCol lg={12}>
                        <TkInput
                          // {...register("notes")}
                          id="notes"
                          type="textarea"
                          labelName="Notes"
                          placeholder="Enter Notes"
                          // disabled={viewMode}
                        />
                        {/* {errors.notes?.message ? (
                        <FormErrorText>{errors.notes?.message}</FormErrorText>
                      ) : null} */}
                      </TkCol>
                    </TkRow>
                    {/* {updateClient.isError ? (
                    <FormErrorBox errMessage={updateClient.error?.message} />
                  ) : null} */}
                    <div className="d-flex mt-4 space-childern">
                      {/* {editMode ? (
                      <div className="ms-auto">
                        <TkButton
                          color="secondary"
                          disabled={updateClient.isLoading}
                          onClick={() => router.push("/clients")}
                          type="button"
                        >
                          Cancel
                        </TkButton>{" "}
                        <TkButton
                          loading={updateClient.isLoading}
                          type="submit"
                          color="primary"
                        >
                          Update
                        </TkButton>
                      </div>
                    ) : null} */}
                      {/* {viewMode && accessLevel >= perAccessIds.edit ? (
                      <div className="ms-auto">
                        <TkButton
                          onClick={() => router.push(`/clients/edit/${cid}`)}
                          type="button"
                          color="primary"
                        >
                          Edit
                        </TkButton>
                      </div>
                    ) : null} */}
                    </div>
                  </TkForm>
                </TkCardBody>
              </TkCard>
            </TkCol>
          </TkRow>
        </TkContainer>
      </div>
    </>
  );
};

export default User;

User.options = {
  layout: true,
};
