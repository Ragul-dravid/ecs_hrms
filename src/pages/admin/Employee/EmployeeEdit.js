import * as React from "react";
import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import EmpPersonalInfoEdit from "./EditEmployee/EmpPersonalInfoEdit";
import EmpContactDetailsEdit from "./EditEmployee/EmpContactDetailsEdit";
import EmpQualificationDetailsEdit from "./EditEmployee/EmpQualificationDetailsEdit";
import EmpExperienceEdit from "./EditEmployee/EmpExperienceEdit";
import EmpBankAccountEdit from "./EditEmployee/EmpBankAccountEdit";
import { useParams } from "react-router-dom";

const steps = [
  { tooltip: "Personal Information" },
  { tooltip: "Contact Details" },
  { tooltip: "Qualification Details" },
  { tooltip: "Experience" },
  { tooltip: "Bank Account" },
];

function EmployeeEdit() {
  const [activeStep, setActiveStep] = useState(0);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [skipped, setSkipped] = React.useState(new Set());
  const { empId } = useParams();
  const [formData, setFormData] = useState({ empId });
  console.log("Parent formData:", formData);

  const childRef = React.useRef();
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleButtonClick = () => {
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.personalInfo();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.contactDetails();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.qualificationDetails();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.experience();
        }
        break;
      case "4":
        if (childRef.current) {
          childRef.current.bankAccountAdd();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div class="container-fluid minHeight ">
      <Stepper className="card my-5 mx-4 p-5" activeStep={activeStep}>
        {steps.map((step, i) => (
          <Step
            key={i}
            onClick={() => setActiveStep(i)}
            className="step-container"
          >
            <div className="custom-tooltip-container">
              <StepLabel>{step.label}</StepLabel>
              <span className="custom-tooltip">{step.tooltip}</span>
            </div>
          </Step>
        ))}
      </Stepper>

      <div class="container-fluid card shadow border-0 my-3">
        <React.Fragment>
          {activeStep === 0 && (
            <EmpPersonalInfoEdit
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 1 && (
            <EmpContactDetailsEdit
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 2 && (
            <EmpQualificationDetailsEdit
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 3 && (
            <EmpExperienceEdit
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 4 && (
            <EmpBankAccountEdit
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          <div className="container-fluid p-3 d-flex align-items-center justify-content-center">
            {activeStep >= 1 && (
              <button
                className="btn btn-sm btn-light"
                style={{ padding: "7px" }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </button>
            )}
            <div style={{ flex: "1 1 auto" }}></div>

            <button
              type="submit"
              className="btn btn-sm btn-buttonm btn-primary"
              onClick={handleButtonClick}
              style={{ padding: "7px" }}
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              {activeStep === steps.length - 1 ? "Submit" : "Save and Next"}
            </button>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default EmployeeEdit;
