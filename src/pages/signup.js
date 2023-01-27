import React, { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ParticlesAuth from "@/utils/ParticlesAuth";
import TkInput from "@/globalComponents/TkInput";
import TkForm from "@/globalComponents/TkForm";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkContainer from "@/globalComponents/TkContainer";
import TkButton from "@/globalComponents/TkButton";
import TkPageHead from "@/globalComponents/TkPageHead";
import FormErrorText from "@/globalComponents/ErrorText";
import { MaxEmailLength, MaxNameLength, MaxPasswordLength, MinEmailLength, MinNameLength, MinPasswordLength } from "@/utils/Constants";
import { TkToastError } from "@/globalComponents/TkToastContainer";
import GoogleLoginBtn from "@/globalComponents/googleLoginBtn";


const schema = Yup.object({
  email: Yup.string()
    .email("Email must be valid.")
    .min(MinEmailLength, `Email must be at least ${MinEmailLength} characters.`)
    .max(MaxEmailLength, `Email must be at most ${MaxEmailLength} characters.`)
    .required("Email is required"),

  password: Yup.string()
    .min(MinPasswordLength, `Password should contain at least ${MinPasswordLength} character`)
    .max(MaxPasswordLength, `Password cannot contain more than ${MaxPasswordLength} character`)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#^()+!%*?&])[A-Za-z\d@$#^()+!%*?&]{8,32}$/,
      "Password must have One Uppercase, One Lowercase, One Number and one Special Character. \n Special Characters can be on of @ $ # ^ ( ) + ! % * ? &"
    )
    .required("Password is required"),

  firstName: Yup.string()
    .min(MinNameLength, `First Name should contain at least ${MinNameLength} character`)
    .max(MaxNameLength, `First Name cannot contain more than ${MaxNameLength} character`)
    .required("Name is required"),

  lastName: Yup.string()
    .min(MinNameLength, `Last Name should contain at least ${MinNameLength} character`)
    .max(MaxNameLength, `Last Name cannot contain more than ${MaxNameLength} character`)
    .required("Name is required"),

  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password and Confirm Password must match"),
}).required();

const Register = () => {
  const router = useRouter();

  const googleSignupHandler = async () => {
    await signIn("google", { callbackUrl: "/start" }); // it redirects use to dashboard after signIn
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const OnSubmit = (formData) => {
    console.log('user data', formData);
    // const user = fetch("http://localhost:4000/createUser", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    // });

    // // TODO: upadte this fetch call with react query wrapper
    // const user = fetch("/api/v1/users/new-admin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then(async (res) => {
    //     if (res.error) {
    //       TkToastError(res.error, { autoClose: 5000 });
    //       console.log("error", res.error);
    //     } else {
    //       const data = await res.json();
    //       if (data.success) {
    //         try {
    //           await signIn("credentials", {
    //             email: formData.email,
    //             password: formData.password,
    //             redirect: false,
    //           });
    //           router.push("/start");
    //         } catch (err) {
    //           console.log(err, "error occured");
    //           TkToastError("Some Error occured while creating user. Please try again", { autoClose: 5000 });
    //         }
    //       } else {
    //         TkToastError(data.message, { autoClose: 5000 });
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     TkToastError("Some Error occured while creating user. Please try again Later.", { autoClose: 5000 });
    //     console.log("err", err);
    //   });
  };

  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     // dont remove this function though it has empty body, because else page will be refreshed with an error
  //     // console.log("unauthenticated");
  //   },
  // });
  // if (status === "authenticated") {
  //   router.push("/dashboard");
  // }

  return (
    <>
      <TkPageHead>
        <title>{`SignUp - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      </TkPageHead>

      <ParticlesAuth>
        <div className="auth-page-content">
          <TkContainer>
            <TkRow>
              <TkCol lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link href="/" className="d-inline-block auth-logo">
                        <h2 className="logo-text text-light">{process.env.NEXT_PUBLIC_APP_NAME}</h2>
                    </Link>
                  </div>
                </div>
              </TkCol>
            </TkRow>

            <TkRow className="justify-content-center">
              <TkCol md={8} lg={6} xl={5}>
                <TkCard className="mt-4">
                  <TkCardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create New Account</h5>
                      <p className="text-muted">Get your {process.env.NEXT_PUBLIC_APP_NAME} account now</p>
                    </div>
                    <div className="p-2 mt-4">
                      <TkForm onSubmit={handleSubmit(OnSubmit)} className="needs-validation">
                        <div className="mb-3">
                          <TkInput
                            {...register("email")}
                            labelName="Email"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email Address"
                            requiredStarOnLabel={true}
                            required={true}
                            invalid={errors.email?.message ? true : false}
                          />
                          {errors.email?.message ? <FormErrorText>{errors.email?.message}</FormErrorText> : null}
                        </div>

                        <TkRow>
                          <TkCol md={6}>
                            <div className="mb-3">
                              <TkInput
                                {...register("firstName")}
                                labelName="First Name"
                                type="text"
                                id="firstName"
                                placeholder="Enter First Name"
                                requiredStarOnLabel={true}
                                required={true}
                              />
                              {errors.firstName?.message ? (
                                <FormErrorText>{errors.firstName?.message}</FormErrorText>
                              ) : null}
                            </div>
                          </TkCol>

                          <TkCol md={6}>
                            <div className="mb-3">
                              <TkInput
                                {...register("lastName")}
                                labelName="Last Name"
                                type="text"
                                id="lastName"
                                placeholder="Enter Last Name"
                                requiredStarOnLabel={true}
                                required={true}
                              />
                              {errors.lastName?.message ? (
                                <FormErrorText>{errors.lastName?.message}</FormErrorText>
                              ) : null}
                            </div>
                          </TkCol>

                          <div className="mb-3">
                            <TkInput
                              {...register("password")}
                              labelName="Password"
                              type="password"
                              id="password"
                              name="password"
                              placeholder="Enter Password"
                              requiredStarOnLabel={true}
                              required={true}
                              invalid={errors.password?.message ? true : false}
                            />
                            {errors.password?.message ? (
                              <FormErrorText>{errors.password?.message}</FormErrorText>
                            ) : null}
                          </div>
                        </TkRow>

                        <div className="mb-2">
                          <TkInput
                            {...register("confirmPassword")}
                            labelName="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Enter Confirm Password"
                            requiredStarOnLabel={true}
                            required={true}
                            invalid={errors.confirmPassword?.message ? true : false}
                          />
                          {errors.confirmPassword?.message ? (
                            <FormErrorText>{errors.confirmPassword?.message}</FormErrorText>
                          ) : null}
                        </div>

                        <div className="mb-4">
                          <p className="mb-0 fs-12 text-muted fst-italic">
                            By registering you agree to the {process.env.NEXT_PUBLIC_APP_NAME}{" "}
                            <Link href="/terms-and-conditions" className="text-primary text-decoration-underline fst-normal fw-medium">
                                Terms of Use
                            </Link>
                          </p>
                        </div>

                        <div className="mt-4">
                          <TkButton className="btn btn-success w-100" type="submit">
                            Sign Up
                          </TkButton>
                        </div>
                      </TkForm>
                      <div className="mt-4 text-center">
                        <div className="signin-other-title">
                          <h5 className="fs-13 mb-4 title text-muted">OR</h5>
                        </div>
                        <div>
                          <GoogleLoginBtn onClick={googleSignupHandler} btnText={"SignUp with Google"} />
                        </div>
                      </div>
                    </div>
                  </TkCardBody>
                </TkCard>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account ?{" "}
                    <Link href="/login" className="fw-semibold text-primary text-decoration-underline">
                      Login
                    </Link>
                  </p>
                </div>
              </TkCol>
            </TkRow>
          </TkContainer>
        </div>
      </ParticlesAuth>
    </>
  );
};

export default Register;

// Register.noLayout = true;
