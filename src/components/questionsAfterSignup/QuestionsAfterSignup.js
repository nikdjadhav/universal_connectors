import React, { useState } from "react";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkButton from "@/globalComponents/TkButton";

import CompanyInfo from "./CompanyInfo";
import FeedBack from "./FeedBack";
import Invite from "./Invite";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

// import { API_BASE_URL } from "../../../src/utils/Constants";
import { useMutation } from "@tanstack/react-query";
// import tkFetch from "../../../src/utils/fetch";
// import { TkToastError, TkToastSuccess } from "../TkToastContainer";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@/utils/Constants";


const steps = ["COMPANY INFO", "FEEDBACK", "INVITE"];

function QuestionsAfterSignup() {
  // const router = useRouter();
  const [goSteps, setGoSteps] = useState(0);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    companySize: "",
  });
  const [errorsFields, setErrors] = useState({
    companyName: false,
    companySize: false,
  });
  const updateCompanyInfo = (data) => {
    setCompanyInfo({ ...companyInfo, ...data });
    if (data.companyName) {
      setErrors((prevValues) => ({ ...prevValues, companyName: false }));
    }
    if (data.companySize) {
      setErrors((prevValues) => ({ ...prevValues, companySize: false }));
    }
  };

  const createWs = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/workspace`),
  });

  const createWorkspace = () => {
    if (companyInfo.companyName && companyInfo.companySize) {
      createWs.mutate(
        { workspaceName: companyInfo.companyName, companySize: companyInfo.companySize },
        {
          onSuccess: (data) => {
            // navigating with window.location.href to make a full page refres, as we need workspaceId in the user token
            // so when we create a workspace here then we need to inset workspaceId in the user token, but by using next router
            // when doing full refresh nextauth session function is not called, and wwe insert workspaceId in the user token,
            // there may be other solutiopns but currently this works
            //TODO: dont navigate to dashboarrd, but acccept more details
            window.location.href = "/dashboard";
          },
          onError: (error) => {
            console.log(error);
            TkToastError(error.message);
          },
        }
      );
    } else {
      // console.log(companyInfo, errorsFields);
      if (!companyInfo.companyName) {
        setErrors((prevValues) => ({ ...prevValues, companyName: true }));
      }
      if (!companyInfo.companySize) {
        setErrors((prevValues) => ({ ...prevValues, companySize: true }));
      }
    }
  };

  const handleStep = (step) => () => {
    setGoSteps(step);
  };

  return (
    <TkRow>
      <TkCol lg={6}>
        <div className="mb-3">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={goSteps} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  {/* <StepLabel> */}
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                  {/* </StepLabel> */}
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
        {goSteps === 0 && (
          <>
            <CompanyInfo errorsFields={errorsFields} onUpdate={updateCompanyInfo} />
            <TkRow>
              <TkCol xl={3}>
                <div className="mt-3 mb-3 ms-4">
                  <TkButton
                    className="btn btn-primary w-100"
                    loading={createWs.isLoading}
                    onClick={() => {
                      createWorkspace();
                      // setGoSteps(1);
                    }}
                  >
                    Next <i className="ri-arrow-right-line align-bottom me-1"></i>
                  </TkButton>
                </div>
              </TkCol>
            </TkRow>
          </>
        )}
        {goSteps === 1 && (
          <>
            <FeedBack />
            <TkRow>
              <TkCol xl={3}>
                <div className="mt-3 mb-3 ms-4">
                  <TkButton className="btn btn-primary w-100" type="submit" onClick={() => setGoSteps(2)}>
                    Next <i className="ri-arrow-right-line align-bottom me-1"></i>
                  </TkButton>
                </div>
              </TkCol>
            </TkRow>
          </>
        )}
        {goSteps === 2 && (
          <>
            <Invite />
            <TkRow>
              <TkCol xl={3}>
                <div className="mt-3 mb-3 ms-4">
                  <TkButton className="btn btn-primary w-100" onClick={() => setGoSteps(2)}>
                    Finish <i className="ri-arrow-right-line align-bottom me-1"></i>
                  </TkButton>
                </div>
              </TkCol>
            </TkRow>
          </>
        )}
      </TkCol>
      <TkCol lg={6}>
        <div className="right-design d-none d-sm-block d-md-none d-lg-block"></div>
      </TkCol>
    </TkRow>
  );
}

export default QuestionsAfterSignup;
