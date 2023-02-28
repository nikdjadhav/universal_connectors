import React, { useState } from "react";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import Image from "next/image";
import Link from "next/link";
import TkInput from "@/globalComponents/TkInput";
import FormErrorText from "@/globalComponents/ErrorText";
import TkSelect from "@/globalComponents/TkSelect";
import TkLabel from "@/globalComponents/TkLabel";
import TkCheckBox from "@/globalComponents/TkCheckBox";
import TkButton from "@/globalComponents/TkButton";
import TkModal, {
  TkModalBody,
  TkModalHeader,
} from "@/globalComponents/TkModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import avatar1 from "/public/images/users/avatar-1.jpg";
import { TkToastInfo } from "@/globalComponents/TkToastContainer";

const ProfileSetting = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

  const [fistName, setFirstName] = useState("Anna");
  const [lastName, setLastName] = useState("Adame");

//   const toggle = React.useCallback(() => {
//     if (isModalOpen) {
//       setIsModalOpen(false);
//       // setTask(null);
//     } else {
//       setIsModalOpen(true);
//       // setDate(defaultdate());
//     }
//   }, [isModalOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });

  const Msg = () => (
    <div>
      <h5>Profile Updated</h5>
    </div>
  );

  const onSubmit = (data) => {
    TkToastInfo(<Msg />, { hideProgressBar: true });
    // TODO: submit form and do validations
    // toggle();
  };

  return (
    <>
      <TkCard>
        <TkCardBody className="p-4">
          <TkForm onSubmit={handleSubmit(onSubmit)}>
            <TkRow>
              <div id="teamlist">
                <TkRow className="team-list list-view-filter">
                  <TkCol lg={6} className="list-view-filter">
                    <TkCard className="team-box">
                      <TkCardBody className="p-4">
                        <TkRow className="align-items-center team-row">
                          <TkCol lg={8}>
                            <div className="team-profile-img">
                              <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                                <Image
                                  src={avatar1}
                                  alt="user-image"
                                  className="img-fluid d-block rounded-circle"
                                />
                              </div>
                              <div className="team-content">
                                <Link href="/users/view/test-user">
                                  {/* <a> */}
                                  <h5 className="fs-16 mb-1">
                                    {fistName} {lastName}
                                  </h5>
                                  {/* </a> */}
                                </Link>
                                <p className="text-muted mb-0">
                                  Lead Designer / Developer
                                </p>
                              </div>
                            </div>
                          </TkCol>
                          <TkCol lg={4}>
                            <div className="text-end">
                              {/* {TODO: Add a button to upload profile image (input type="file")} */}
                              <Link href="#" className="btn btn-light view-btn">
                                {/* <a> */}
                                Update Photo
                                {/* </a> */}
                              </Link>
                            </div>
                          </TkCol>
                        </TkRow>
                      </TkCardBody>
                    </TkCard>
                  </TkCol>
                </TkRow>
              </div>
              <TkCol lg={4}>
                <div className="mb-3">
                  <TkInput
                    {...register("firstName")}
                    id="firstName"
                    type="text"
                    labelName="First Name"
                    placeholder="Enter your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={fistName}
                    defaultValue={fistName}
                  />
                </div>
                {errors.firstName?.message ? (
                  <FormErrorText>{errors.firstName?.message}</FormErrorText>
                ) : null}
              </TkCol>
              <TkCol lg={4}>
                <div className="mb-3">
                  <TkInput
                    {...register("lastName")}
                    id="lastName"
                    type="text"
                    labelName="Last Name"
                    placeholder="Enter your last name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    defaultValue={lastName}
                  />
                </div>
                {errors.lastName?.message ? (
                  <FormErrorText>{errors.lastName?.message}</FormErrorText>
                ) : null}
              </TkCol>
              {/* <TkCol lg={4}>
                <div className="mb-3">
                  <TkInput
                    {...register("phoneNumber")}
                    id="phoneNumber"
                    type="text"
                    labelName="Phone Number"
                    placeholder="Enter your phone number"
                    className="form-control"
                    defaultValue="+(1) 987 6543"
                  />
                  {errors.phoneNumber?.message ? (
                    <FormErrorText>{errors.phoneNumber?.message}</FormErrorText>
                  ) : null}
                </div>
              </TkCol> */}

              {/* <TkCol lg={4}>
                <div className="mb-3">
                  <TkSelect
                    id="gender"
                    name="gender"
                    labelName="Gender"
                    placeholder="Select your Gender"
                    // options={genderOptions}
                    // defaultValue={genderOptions[1]}
                  />
                </div>
              </TkCol> */}

              <TkCol lg={4}>
                <div className="mb-3">
                  <TkInput
                    id="email"
                    name="email"
                    type="text"
                    labelName="Email Address"
                    placeholder="Enter your email"
                    className="form-control"
                    disabled={true}
                    defaultValue="daveadame@velzon.com"
                  />
                </div>
              </TkCol>

              {/* <TkCol lg={4}>
                <div className="mb-3">
                  <TkInput
                    {...register("country")}
                    id="country"
                    name="country"
                    type="text"
                    labelName="Country"
                    placeholder="Country"
                    className="form-control"
                    defaultValue="United States"
                  />
                  {errors.country?.message ? (
                    <FormErrorText>{errors.country?.message}</FormErrorText>
                  ) : null}
                </div>
              </TkCol> */}
              {/* <TkCol lg={4}>
                <div className="mb-3">
                  <TkInput
                    {...register("zipCode")}
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    labelName="Zip Code"
                    placeholder="Enter zipcode"
                    className="form-control"
                    defaultValue="90011"
                  />
                  {errors.zipCode?.message ? (
                    <FormErrorText>{errors.zipCode?.message}</FormErrorText>
                  ) : null}
                </div>
              </TkCol> */}

              {/* <TkCol lg={4}>
                <div className="mb-3">
                  <TkInput
                    {...register("designation")}
                    id="designation"
                    name="designation"
                    type="text"
                    labelName="Designation"
                    placeholder="Designation"
                    className="form-control"
                    defaultValue="Lead Designer / Developer"
                  />
                  {errors.designation?.message ? (
                    <FormErrorText>{errors.designation?.message}</FormErrorText>
                  ) : null}
                </div>
              </TkCol> */}

              {/* <TkCol lg={4}>
                <div className="mb-3">
                  <TkSelect
                    id="department"
                    name="department"
                    labelName="Department"
                    placeholder="Select Department"
                    // options={departmentOptions}
                    // defaultValue={departmentOptions[0]}
                    disabled={true}
                  />
                </div>
              </TkCol> */}

              {/* <TkCol lg={4}>
                <div className="mb-3">
                  <TkSelect
                    id="supervisor"
                    name="supervisor"
                    labelName="Supervisor"
                    placeholder="Select Supervisor"
                    // options={supervisorOptions}
                    // defaultValue={supervisorOptions[0]}
                    disabled={true}
                  />
                </div>
              </TkCol> */}

              {/* <TkCol lg={4}>
                <div className="mb-3">
                  <TkSelect
                    id="role"
                    name="role"
                    labelName="Role"
                    placeholder="Select Role"
                    // options={roleOptions}
                    // defaultValue={roleOptions[2]}
                    disabled={true}
                  />
                </div>
              </TkCol> */}

              {/* <TkCol lg={4}>
                <div className="mb-3">
                  <TkSelect
                    id="workCalender"
                    name="workCalender"
                    labelName="Work Calender"
                    placeholder="Select Work Calender"
                    // options={workCalenderOptions}
                    // defaultValue={workCalenderOptions[0]}s
                    disabled={true}
                  />
                </div>
              </TkCol> */}

              {/* <TkCol lg={4}>
                <div className="mb-3">
                  <TkSelect
                    id="typeOfUser"
                    name="typeOfUser"
                    labelName="Type of User"
                    placeholder="Select Type of User"
                    // options={typeOfUserOptions}
                    // defaultValue={typeOfUserOptions[0]}
                    disabled={true}
                  />
                </div>
              </TkCol> */}

              {/* <TkCol lg={8}>
                <TkRow className="justify-content-start">
                  <TkLabel tag="h5" className="mt-2"></TkLabel>
                  <TkCol className="mt-3 text-nowrap">
                    <TkLabel className="me-3" id="monday">
                      Project Manager
                    </TkLabel>
                    <TkCheckBox
                      id="monday"
                      name="monday"
                      type="checkbox"
                      defaultChecked={true}
                      disabled={true}
                    />
                  </TkCol>
                  <TkCol className="mt-3 text-nowrap">
                    <TkLabel className="me-3" id="tuesday">
                      Suipervisor
                    </TkLabel>
                    <TkCheckBox
                      id="tuesday"
                      name="tuesday"
                      type="checkbox"
                      disabled={true}
                    />
                  </TkCol>
                </TkRow>
              </TkCol> */}

              {/* <TkCol lg={12}>
                <div className="mb-3">
                  <TkInput
                    id="notes"
                    name="notes"
                    type="textarea"
                    labelName="Notes"
                    placeholder="Enter your notes"
                  />
                </div>
              </TkCol> */}

              <TkCol lg={12}>
                <div>
                  {/* <div className="col-3">
                    <a
                      className="fw-semibold text-primary text-decoration-underline"
                      onClick={toggle}
                    >
                      <p>Change Password</p>
                    </a>
                  </div> */}
                  <div className="hstack gap-2 justify-content-end">
                    <TkButton type="button" color="secondary">
                      Cancel
                    </TkButton>
                    <TkButton type="submit" color="success">
                      Update
                    </TkButton>
                  </div>
                </div>
              </TkCol>
            </TkRow>
          </TkForm>
        </TkCardBody>
      </TkCard>

      {/* <TkModal
        isOpen={isModalOpen}
        toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="modal fade zoomIn"
      >
        <TkModalHeader className="p-3 bg-soft-info" toggle={toggle}>
          {"Change Password"}
        </TkModalHeader> */}
        {/* TODO: there is huge rerenders while filling new task form , rectify it */}
        {/* <TkModalBody className="modal-body">
          <TkForm onSubmit={handleSubmit(onSubmit)}>
            <TkRow>
              <TkCol lg={4}>
                <TkInput
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  labelName="Old Password"
                  placeholder="Enter Old Password"
                  required={true}
                />
              </TkCol>

              <TkCol lg={4}>
                <TkInput
                  {...register("password")}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  labelName="New Password"
                  placeholder="Enter New Password"
                  required={true}
                  invalid={errors.password?.message ? true : false}
                />
                {errors.password?.message ? (
                  <FormErrorText>{errors.password?.message}</FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={4}>
                <TkInput
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  labelName="Confirm Password"
                  placeholder="Enter Confirm Password"
                  required={true}
                  invalid={errors.confirmPassword?.message ? true : false}
                />
                {errors.confirmPassword?.message ? (
                  <FormErrorText>
                    {errors.confirmPassword?.message}
                  </FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={12} className="mt-3">
                <div className="hstack gap-2 justify-content-end">
                  <TkButton type="submit" color="secondary">
                    Cancel
                  </TkButton>
                  <TkButton type="submit" color="primary">
                    Update
                  </TkButton>
                </div>
              </TkCol>
            </TkRow>
          </TkForm>
        </TkModalBody>
      </TkModal> */}
    </>
  );
};

export default ProfileSetting;
