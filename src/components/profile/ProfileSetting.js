import React, { useEffect, useState } from "react";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import Image from "next/image";
import Link from "next/link";
import TkInput from "@/globalComponents/TkInput";
import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";

import { useForm } from "react-hook-form";
import avatar1 from "/public/images/users/avatar-1.jpg";
import { TkToastError, TkToastInfo } from "@/globalComponents/TkToastContainer";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_BASE_URL } from "@/utils/Constants";
import { Spinner } from "reactstrap";

const schema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  country: Yup.string().matches(/^[a-zA-Z]+$/, "Country must be only letters"),
  city: Yup.string().matches(/^[a-zA-Z]+$/, "City must be only letters"),
}).required();

const ProfileSetting = () => {
  const queryClient = useQueryClient();

  const [userToken, setUserToken] = useState();

 

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    data: logedinUser,
    isLoading: userLoading,
    error: userError,
    isError: userErrorDetails,
  } = useQuery({
    queryKey: ["user", userToken],
    queryFn: tkFetch.get(`${API_BASE_URL}/getUser/${userToken}`),
    enabled: !!userToken,
  });

  const updateUser = useMutation({
    mutationFn: tkFetch.putWithIdInUrl(`${API_BASE_URL}/updateUser`),
  });

  useEffect(() => {
    const accessToken = sessionStorage.getItem("loginCredentials");
    setUserToken(accessToken);
  }, []);

  useEffect(() => {
    if (logedinUser) {
      setValue("firstName", logedinUser[0].firstName);
      setValue("lastName", logedinUser[0].lastName);
      setValue("email", logedinUser[0].email);
      setValue("country", logedinUser[0].country);
      setValue("city", logedinUser[0].city);
    }
  }, [logedinUser, setValue]);

  const onSubmit = (data) => {
    const apiData = {
      id: logedinUser[0].userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      country: data.country,
      city: data.city,
    };
    updateUser.mutate(apiData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });

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
      },
      onError: (error) => {
        console.log("error", error);
        TkToastError("Error Occured while updating");
      },
    });

  };

  const onClickCancel = () => {
    history.back();
  };

  return (
    <>
      <TkCard>
        {userLoading ? (
          <div
            className="d-flex justify-content-center "
            style={{ height: "100vh" }}
          >
            <Spinner />
          </div>
        ) : (
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
                                    <h5 className="fs-16 mb-1">
                                      {logedinUser[0]?.firstName}{" "}
                                      {logedinUser[0]?.lastName}
                                    </h5>
                                  </Link>
                                  <p className="text-muted mb-0">
                                  </p>
                                </div>
                              </div>
                            </TkCol>
                            <TkCol lg={4}>
                              <div className="text-end">
                                <Link
                                  href="#"
                                  className="btn btn-light view-btn"
                                >
                                  Update Photo
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
                      <TkButton
                        type="button"
                        color="secondary"
                        onClick={onClickCancel}
                      >
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
        )}
      </TkCard>
    </>
  );
};

export default ProfileSetting;
