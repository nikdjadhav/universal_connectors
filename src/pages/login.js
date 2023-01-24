import React, { useEffect } from "react";
import Link from "next/link";
import { getSession, signIn, useSession } from "next-auth/react";
// import ParticlesAuth from "../src/utils/ParticlesAuth";

// import TkInput from "../src/components/forms/TkInput";
// import TkLabel from "../src/components/forms/TkLabel";
// import TkForm, { TkFormFeedback } from "../src/components/forms/TkForm";
// import TkRow, { TkCol } from "../src/components/TkRow";
// import TkCard, { TkCardBody } from "../src/components/TkCard";
// import TkContainer from "../src/components/TkContainer";
// import TkButton from "../src/components/TkButton";
// import TkIcon from "../src/components/TkIcon";
// import TkAlert from "../src/components/TkAlert";
// import TkPageHead from "../src/components/TkPageHead";
// import TkCheckBox from "../src/components/forms/TkCheckBox";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import FormErrorText from "../src/components/forms/ErrorText";
// import { MinPasswordLength, MaxPasswordLength, MinEmailLength, MaxEmailLength } from "../src/utils/Constants";
import { useRouter } from "next/router";
// import { TkToastError, TkToastSuccess } from "../src/components/TkToastContainer";
// import GoogleLoginBtn from "../src/components/googleLoginBtn";
import ParticlesAuth from "@/globalComponents/ParticlesAuth";
import TkInput from "@/globalComponents/TkInput";
import TkLabel from "@/globalComponents/TkInput";
// import TkForm, { TkFormFeedback } from "../src/components/forms/TkForm";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkContainer from "@/globalComponents/TkContainer";
import TkButton from "@/globalComponents/TkContainer";
import TkPageHead from "@/globalComponents/TkPageHead";
import FormErrorText from "@/globalComponents/ErrorText";
import { MaxEmailLength, MaxPasswordLength, MinEmailLength, MinPasswordLength } from "@/globalComponents/Constants";
import { TkToastError } from "@/globalComponents/TkToastContainer";
import GoogleLoginBtn from "@/globalComponents/googleLoginBtn";
import TkForm from "@/globalComponents/TkForm";

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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    //implement auth logic here
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        if (res.error) {
          TkToastError(res.error, { autoClose: 5000 });
        } else {
          // console.log("res", res.status);
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        TkToastError("Some Error occured, Please try again later", { autoClose: 5000 });
        console.log("err", err);
      });
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
                      {/* <a className="d-inline-block auth-logo"> */}
                        <h2 className="logo-text text-light">{process.env.NEXT_PUBLIC_APP_NAME}</h2>
                      {/* </a> */}
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
                            required={true}
                            placeholder="Enter Email"
                            invalid={errors.email?.message ? true : false}
                          />
                          {errors.email?.message ? <FormErrorText>{errors.email?.message}</FormErrorText> : null}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link href="/forgot-password" className="text-muted">
                              {/* <a className="text-muted"> */}
                                Forgot password? 
                                {/* </a> */}
                            </Link>
                          </div>
                          <TkInput
                            {...register("password")}
                            labelName="Password"
                            id="password"
                            name="password"
                            type="password"
                            requiredStarOnLabel={true}
                            required={true}
                            placeholder="Enter Password"
                            invalid={errors.password?.message ? true : false}
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
                      {/* <a className="fw-semibold text-primary text-decoration-underline"> */}
                         Signup
                         {/* </a> */}
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
