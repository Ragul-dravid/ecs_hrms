import React from "react";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";

import Tick from "../../../assets/Logo.png";
// import EmployeeInfoEdit from "./EditEmployee/EmployeeInfoEdit";
import EmpPersonalInfoEdit from "./EditEmployee/EmpPersonalInfoEdit";
import EmpQualificationDetailsEdit from "./EditEmployee/EmpQualificationDetailsEdit";
import EmpExperienceEdit from "./EditEmployee/EmpExperienceEdit";
import EmpPreviousCompanyEdit from "./EditEmployee/EmpPreviousCompanyEdit";
import EmpEmergencyContactEdit from "./EditEmployee/EmpEmergencyContactEdit";
import EmpBankAccountEdit from "./EditEmployee/EmpBankAccountEdit";
// import EmpDesignationDetailsEdit from "./EditEmployee/EmpDesignationDetailsEdit";

const steps = ["", "", "", "", "", ""];

function EmployeeEdit() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div class="container-fluid minHeight my-5">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div class="container-fluid py-3 card shadow border-0 mb-7 mt-5">
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: "60vh" }}
              >
                <img
                  src={Tick}
                  width={100}
                  alt="success"
                  className="img-fluid"
                />
                <h3 className="text-muted">
                  All steps completed - you&apos;re finished
                </h3>
              </div>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <button
                className="btn bg-primary bg-gradient text-white px-2 py-1 my-1 border-primary rounded"
                onClick={handleReset}
              >
                Reset
              </button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* {activeStep === 0 && <EmployeeInfoEdit />}  */}
            {activeStep === 0 && <EmpPersonalInfoEdit />}
            {activeStep === 1 && <EmpQualificationDetailsEdit />}
            {activeStep === 2 && <EmpExperienceEdit />}
            {activeStep === 3 && <EmpPreviousCompanyEdit />}
            {activeStep === 4 && <EmpEmergencyContactEdit />}
            {activeStep === 5 && <EmpBankAccountEdit />}
            <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
              <div style={{ flex: "1 1 auto" }}></div>
              <button
                className="btn btn-border btn-sm mx-4 px-4"
                style={{ padding: "7px" }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </button>

              <button
                className="btn btn-button btn-sm"
                onClick={handleNext}
                style={{ padding: "7px" }}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Save and Next"}
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default EmployeeEdit;
