import * as React from "react";
import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import EmpPersonalInfoEdit from "./EditEmployee/EmpPersonalInfoEdit";
import EmpContactDetailsEdit from "./EditEmployee/EmpContactDetailsEdit";
import EmpQualificationDetailsEdit from "./EditEmployee/EmpQualificationDetailsEdit";
import EmpExperienceEdit from "./EditEmployee/EmpExperienceEdit";
import EmpPreviousCompanyEdit from "./EditEmployee/EmpPreviousCompanyEdit";
import EmpEmergencyContactEdit from "./EditEmployee/EmpEmergencyContactEdit";
import EmpBankAccountEdit from "./EditEmployee/EmpBankAccountEdit";
import { useParams } from "react-router-dom";

const steps = [
  { tooltip: "Personal Information" },
  { tooltip: "Contact Details" },
  { tooltip: "Qualification Details" },
  { tooltip: "Experience" },
  // { tooltip: "Previous Company" },
  // { tooltip: "Emergency Contact" },
  { tooltip: "Bank Account" },
];

function EmployeeEdit() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  // const id = localStorage.getItem('employeeId')
  // const id = useParams()
  const [formData, setFormData] = useState({ empId: 66 });
  const childRef = React.useRef();
  const [loadIndicator, setLoadIndicator] = useState(false);

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
    // console.log("1",childRef);
    // Call the child function using the ref
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
      // case "4":
      //   if (childRef.current) {
      //     childRef.current.previousCompany();
      //   }
      //   break;
      // case "5":
      //   if (childRef.current) {
      //     childRef.current.emergencyContact();
      //   }
      //   break;
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
    <div class="container-fluid minHeight my-5">
   <Stepper className="m-5 p-5" activeStep={activeStep}>
  {steps.map((step, i) => (
    <Step key={i} onClick={() => setActiveStep(i)} className="step-container">
      <div className="custom-tooltip-container">
        <StepLabel>{step.label}</StepLabel>
        <span className="custom-tooltip">{step.tooltip}</span>
      </div>
    </Step>
  ))}
</Stepper>

      <div class="container-fluid py-3 card shadow border-0 mb-7 mt-5">
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
          {/* {activeStep === 4 && (
            <EmpPreviousCompanyEdit
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 5 && (
            <EmpEmergencyContactEdit
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )} */}
          {activeStep === 4 && (
            <EmpBankAccountEdit
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
            <button
              className="btn btn-border btn-sm"
              style={{ padding: "7px" }}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </button>

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
