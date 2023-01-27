import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ParticlesAuth from "@/utils/ParticlesAuth";
import TkInput from "@/globalComponents/TkInput";
import TkPageHead from "@/globalComponents/TkPageHead";
import TkContainer from "@/components/TkContainer";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkForm from "@/globalComponents/TkForm";
import FormErrorText from "@/globalComponents/ErrorText";
import TkButton from "@/globalComponents/TkButton";
import TkIcon from "@/globalComponents/TkIcon";
import { MaxEmailLength, MinEmailLength } from "@/utils/Constants";
import { TkToastError, TkToastSuccess } from "@/globalComponents/TkToastContainer";


const schema = Yup.object({
  email: Yup.string()
    .email("Email must be valid.")
    .min(MinEmailLength, `Email must be at least ${MinEmailLength} characters.`)
    .max(MaxEmailLength, `Email must be at most ${MaxEmailLength} characters.`)
    .required("Email is required"),
}).required();

const ForgetPasswordPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    const sendLink = fetch("/api/v1/users/password/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          TkToastSuccess("Password reset link sent to your email.");
          router.push("/login");
        } else {
          // console.log(data);
          TkToastError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ParticlesAuth>
      <TkPageHead>
        <title>{`Forgot Password`}</title>
      </TkPageHead>

      <div className="auth-page-content">
        <TkContainer>
          <TkRow>
            <TkCol lg={12}>
              <div className="text-center mt-sm-5 mb-4">
                <div>
                  <Link href="/">
                    <h1 className="text-light">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
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
                    <h5 className="text-primary">Forgot Password?</h5>
                    <h1 className="ri-mail-send-line"></h1>
                  </div>
                  {/* <TkAlert className="alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                    Enter your email and instructions will be sent to you!
                  </TkAlert> */}
                  <div className="p-2">
                    <TkForm onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4">
                        <TkInput
                          {...register("email")}
                          type="email"
                          id="email"
                          labelName="Email"
                          placeholder="Enter your email"
                          invalid={errors.email?.message ? true : false}
                        />
                        {errors.email?.message ? <FormErrorText>{errors.email?.message}</FormErrorText> : null}
                      </div>

                      <div className="text-center mt-4">
                        <TkButton className="btn btn-success w-100" type="submit">
                          Send Reset Link
                        </TkButton>
                      </div>
                    </TkForm>
                  </div>
                </TkCardBody>
              </TkCard>
            </TkCol>
          </TkRow>
          <Link href="/login" className="font-weight-bold">
            {" "}
            <b className="d-flex align-items-center justify-content-center">
              <TkIcon className={"ri-arrow-left-s-line me-1"} />
              Back to Login
            </b>
          </Link>
        </TkContainer>
      </div>
    </ParticlesAuth>
  );
};

export default ForgetPasswordPage;
