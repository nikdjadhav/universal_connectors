import React, { useEffect } from "react";
import Link from "next/link";
import { getSession, signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import ParticlesAuth from "@/utils/ParticlesAuth";
import TkInput from "@/globalComponents/TkInput";
import TkLabel from "@/globalComponents/TkInput";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkContainer from "@/globalComponents/TkContainer";
import TkButton from "@/globalComponents/TkButton";
import TkPageHead from "@/globalComponents/TkPageHead";
import FormErrorText from "@/globalComponents/ErrorText";
import { MaxEmailLength, MaxPasswordLength, MinEmailLength, MinPasswordLength } from "@/utils/Constants";
import { TkToastError, TkToastSuccess } from "@/globalComponents/TkToastContainer";
import GoogleLoginBtn from "@/globalComponents/googleLoginBtn";
import TkForm from "@/globalComponents/TkForm";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";
// "use client";

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

  // rememberMe: Yup.boolean(),
}).required();

const Login = () => {
  // *** get data from backend ***
  const queryClient = useQueryClient();
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["u"],
  //   queryFn: tkFetch.get("http://localhost:4000/v1/users"), 
  //   // fetch("http://localhost:4000/v1/users")
  // });
  // console.log("Registered users", data);



  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const notify = () => toast("Wow so easy!");

  const user = useMutation({
    mutationFn: tkFetch.post("http://localhost:4000/v1/login"),
  });

  const onSubmit = async (userData) => {
    const apiData = {
      email: userData.email,
      password: userData.password,
    };
    // console.log("apiData", apiData);
    user.mutate(apiData, {
      onSuccess: (data) => {
        // TkToastSuccess("User Updated Successfully");
        console.log("success", data);
        const user = {
          firstName: data[0].firstName,
          lastName: data[0].lastName,
          email: data[0].email,
          password: data[0].password,
          token: data[0].token,
        }
        console.log("user", user);
        // localStorage.setItem("loginCredentials", JSON.stringify(user.token));
        sessionStorage.setItem("loginCredentials", JSON.stringify(user.token));
        router.push("/dashboard");
      },
      onError: (error) => {
        console.log("error==>", error);
        TkToastError("Invalid Credentials");
        //TODO: report error to error reporting service
      },
    });


    // console.log("Registered users", data);
    // if (data.success) {
    //   const user = {
    //     email: userData.data.email,
    //     password: userData.data.password,
    //   }
    //   console.log("user", user);
    //   localStorage.setItem("loginCredentials", JSON.stringify(user));
    //   // localStorage.setItem("email", userData.data.email);
    //   // localStorage.setItem("password", userData.data.password);
    //   router.push("/dashboard");
    // }else{
    //   TkToastError("Invalid Credentials");
    // }


    // const loggedInUser = await fetch("http://localhost:4000/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // }).then(async (res) => {
    //   // const data = await res.json();
    //   if (res.error) {
    //     // TkToastError(data.message, { autoClose: 5000 });
    //     console.log("error", res.error);
    //   }
    //   else {
    //     const userData = await res.json();
    //     if (userData.success) {
    //       console.log('user login success', userData.data);
    //       const user = {
    //         email: userData.data.email,
    //         password: userData.data.password,
    //       }
    //       console.log("user", user);
    //       // localStorage.setItem("loginCredentials", JSON.stringify(user));
    //       localStorage.setItem("email", userData.data.email);
    //       localStorage.setItem("password", userData.data.password);
    //       router.push("/dashboard");
    //     } else {
    //       console.log("api response test", userData);
    //       // alert("Invalid Credentials");
    //       TkToastError("Invalid Credentials");
    //     }
    //   }
    // }).catch((err) => {
    //   TkToastError("Some Error occured, Please try again later");
    //   console.log("err", err);
    // });

    // //implement auth logic here
    // signIn("credentials", {
    //   email: data.email,
    //   password: data.password,
    //   redirect: false,
    // })
    //   .then((res) => {
    //     if (res.error) {
    //       TkToastError(res.error, { autoClose: 5000 });
    //     } else {
    //       // console.log("res", res.status);
    //       router.push("/dashboard");
    //     }
    //   })
    //   .catch((err) => {
    //     TkToastError("Some Error occured, Please try again later", { autoClose: 5000 });
    //     console.log("err", err);
    //   });
  };

  const googleLoginHabdler = async () => {
    await signIn("google", { callbackUrl: "/dashboard" }); // it redirects use to dashboard after signIn
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
        <title>{`Login - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
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
                      <h5 className="text-primary">Welcome!</h5>
                      <p className="text-muted">Login to continue</p>
                    </div>
                    <div className="p-2 mt-4">
                      <TkForm onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                          {/* TODO: add validation taht it is required */}
                          <TkInput
                            {...register("email")}
                            labelName="Email"
                            type="email"
                            name="email"
                            id="email"
                            requiredStarOnLabel={true}
                            placeholder="Enter Email"
                          />
                          {errors.email?.message ? <FormErrorText>{errors.email?.message}</FormErrorText> : null}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link href="/forgot-password" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <TkInput
                            {...register("password")}
                            labelName="Password"
                            id="password"
                            name="password"
                            type="password"
                            requiredStarOnLabel={true}
                            placeholder="Enter Password"
                          />
                          {errors.password?.message ? <FormErrorText>{errors.password?.message}</FormErrorText> : null}
                        </div>

                        {/* <div className="form-check">
                          <TkCheckBox
                            {...register("rememberMe")}
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <TkLabel className="form-check-label" id="auth-remember-check">
                            Remember me
                          </TkLabel>
                        </div> */}

                        <div className="mt-4">
                          <TkButton color="success" className="btn btn-success w-100" type="submit">
                            Login
                          </TkButton>
                        </div>
                      </TkForm>

                      <div className="mt-4 text-center">
                        <div className="signin-other-title">
                          <h5 className="fs-13 mb-4 title">OR</h5>
                        </div>
                        <div>
                          <GoogleLoginBtn onClick={googleLoginHabdler} btnText={"Login with Google"} />
                        </div>
                      </div>
                    </div>
                  </TkCardBody>
                </TkCard>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Don&apos;t have an account ?
                    <Link href="/signup" className="fw-semibold text-primary text-decoration-underline">
                      Signup
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

export default Login;

// Login.noLayout = true;
