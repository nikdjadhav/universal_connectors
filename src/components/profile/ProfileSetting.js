import React, { useEffect, useState } from "react";
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
import avatar1 from "/public/images/users/avatar-1.jpg";
import { TkToastError, TkToastInfo } from "@/globalComponents/TkToastContainer";
import { useMutation } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_BASE_URL } from "@/utils/Constants";

const schema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  country: Yup.string().matches(/^[a-zA-Z]+$/, "Country must be only letters"),
  city: Yup.string().matches(/^[a-zA-Z]+$/, "City must be only letters")
}).required();

const ProfileSetting = () => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  const [logedinUser, setLogedinUser] = useState();

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
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const Msg = () => (
    <div>
      <h5>Updated Successfully</h5>
    </div>
  );

  const user = useMutation({
    // mutationFn: tkFetch.post("http://localhost:4000/v1/getUser"),
    mutationFn: tkFetch.post(`${API_BASE_URL}/getUser`),
  });

  const updateUser = useMutation({
    // mutationFn: tkFetch.post("http://localhost:4000/v1/updateUser"),
    mutationFn: tkFetch.post(`${API_BASE_URL}/updateUser`),
  });

  useEffect(() => {
    const accessToken = sessionStorage.getItem("loginCredentials");
    const userAccessToken = {
      token: accessToken,
    };
    user.mutate(userAccessToken, {
      onSuccess: (data) => {
        const user = {
          firstName: data[0].firstName,
          lastName: data[0].lastName,
          email: data[0].email,
          country: data[0].country,
          city: data[0].city,
        };
        // console.log("user", user);
        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("email", user.email);
        setValue("country", user.country);
        setValue("city", user.city);
        setLogedinUser(user);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  }, []);

  const onSubmit = (data) => {
    const apiData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      country: data.country,
      city: data.city,
    };

    updateUser.mutate(apiData, {
      onSuccess: (data) => {
        // console.log("updated user", data);
        const updatedUser = {
          firstName: data[0].firstName,
          lastName: data[0].lastName,
          email: data[0].email,
          country: data[0].country,
          city: data[0].city,
        };
        setValue("firstName", updatedUser.firstName);
        setValue("lastName", updatedUser.lastName);
        setValue("email", updatedUser.email);
        setValue("country", updatedUser.country);
        setValue("city", updatedUser.city);
        TkToastInfo("Updated Successfully", { hideProgressBar: true });
        setLogedinUser(updatedUser);
      },
      onError: (error) => {
        console.log("error", error);
        TkToastError("Error Occured while updating");
      },
    });

    // console.log("data", data);
    // TODO: submit form and do validations
    // toggle();
  };

  const onClickCancel = () => {
    history.back();
  }
  // console.log("logedinUser", logedinUser);

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
                                    {logedinUser?.firstName}{" "}
                                    {logedinUser?.lastName}
                                  </h5>
                                  {/* </a> */}
                                </Link>
                                <p className="text-muted mb-0">
                                  {/* Lead Designer / Developer */}
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
                    requiredStarOnLabel={true}
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
                    requiredStarOnLabel={true}
                  />
                </div>
                {errors.lastName?.message ? (
                  <FormErrorText>{errors.lastName?.message}</FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={4}>
                <div className="mb-3">
                  <TkInput
                    {...register("email")}
                    id="email"
                    name="email"
                    type="text"
                    labelName="Email Address"
                    placeholder="Enter your email"
                    className="form-control"
                    disabled={true}
                    requiredStarOnLabel={true}
                  />
                </div>
              </TkCol>

              <TkCol lg={4}>
                <div className="mb-3">
                  <TkInput
                    {...register("country")}
                    id="country"
                    name="country"
                    type="text"
                    labelName="Country"
                    placeholder="Country"
                    className="form-control"
                  />
                  {errors.country?.message ? (
                    <FormErrorText>{errors.country?.message}</FormErrorText>
                  ) : null}
                </div>
              </TkCol>

              <TkCol lg={4}>
                <div className="mb-3">
                  <TkInput
                    {...register("city")}
                    id="city"
                    name="city"
                    type="text"
                    labelName="City"
                    placeholder="City"
                    className="form-control"
                  />
                  {errors.city?.message ? (
                    <FormErrorText>{errors.city?.message}</FormErrorText>
                  ) : null}
                </div>
              </TkCol>

              <TkCol lg={12}>
                <div>
                  <div className="hstack gap-2 justify-content-end">
                    <TkButton type="button" color="secondary" onClick={onClickCancel}>
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
    </>
  );
};

export default ProfileSetting;
