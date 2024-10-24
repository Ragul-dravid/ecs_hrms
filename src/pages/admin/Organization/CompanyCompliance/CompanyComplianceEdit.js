import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";

const CompanyComplianceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");
  const [companyData, setCompanyData] = useState(null);

  const validationSchema = Yup.object({
    compComplianceDesignationName: Yup.string().required(
      "*Designation Name is required"
    ),
    compComplianceDesignationCategory: Yup.string().required(
      "*Designation Category is required"
    ),
    compComplianceLeaveLimit: Yup.string().required("*Leave Limit is required"),
    // compComplianceHRPolicyId: Yup.string().required("*Tax Code is required"),
    // compComplianceRemarks: Yup.string().required(
    //   "*Company Address is required"
    // ),
    compComplianceSalaryCalculationDay: Yup.string().required(
      "*Salary Calculation Date is required"
    ),
    compComplianceSalaryDay: Yup.string().required("*Salary Day is required"),
    // cmpRoleId: Yup.string().required("*Role is required"),
  });

  // useFormik hook for form handling
  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      compComplianceId: "",
      compComplianceCmpId: "",
      compComplianceDesignationName: "",
      compComplianceDesignationCategory: "",
      compComplianceLeaveLimit: "",
      compComplianceHRPolicyId: "",
      compComplianceRemarks: "",
      compComplianceSalaryDay: "",
      compComplianceSalaryCalculationDay: "",
      companyCompOwner: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/company-compliance/${id}`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/companyCompliance");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Error updating data: ", e?.response?.data?.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/company-compliance/${id}`);
        formik.setValues(response.data); // Load the data into the form
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container-fluid px-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div
          className="card shadow border-0 mb-2 top-header"
          style={{ borderRadius: "0" }}
        >
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">
                    Edit Company Compliance
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/companyCompliance">
                    <button type="button" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card shadow border-0 my-2"
          style={{ borderRadius: "0" }}
        >
          <div className="container mb-5">
            <div className="row py-4">
              {/* Company Name */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Company Owner Name <span className="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("cmpId")}
                  className={`form-select form-select-sm  ${
                    formik.touched.cmpId && formik.errors.cmpId
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  {companyData &&
                    companyData.map((cmpId) => (
                      <option key={cmpId.id} value={cmpId.cmpId}>
                        {cmpId.cmpName}
                      </option>
                    ))}
                </select>
                {formik.touched.companyCompOwner &&
                  formik.errors.companyCompOwner && (
                    <div className="invalid-feedback">
                      {formik.errors.companyCompOwner}
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Designation Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="compComplianceDesignationName"
                  className={`form-control form-control-sm ${
                    formik.touched.compComplianceDesignationName &&
                    formik.errors.compComplianceDesignationName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("compComplianceDesignationName")}
                />
                {formik.touched.compComplianceDesignationName &&
                  formik.errors.compComplianceDesignationName && (
                    <div className="invalid-feedback">
                      {formik.errors.compComplianceDesignationName}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Designation Category <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="compComplianceDesignationCategory"
                  className={`form-control form-control-sm ${
                    formik.touched.compComplianceDesignationCategory &&
                    formik.errors.compComplianceDesignationCategory
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("compComplianceDesignationCategory")}
                />
                {formik.touched.compComplianceDesignationCategory &&
                  formik.errors.compComplianceDesignationCategory && (
                    <div className="invalid-feedback">
                      {formik.errors.compComplianceDesignationCategory}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Leave Limit <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="compComplianceLeaveLimit"
                  className={`form-control form-control-sm ${
                    formik.touched.compComplianceLeaveLimit &&
                    formik.errors.compComplianceLeaveLimit
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("compComplianceLeaveLimit")}
                />
                {formik.touched.compComplianceLeaveLimit &&
                  formik.errors.compComplianceLeaveLimit && (
                    <div className="invalid-feedback">
                      {formik.errors.compComplianceLeaveLimit}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Salary Calculation Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="compComplianceSalaryCalculationDay"
                  className={`form-control form-control-sm ${
                    formik.touched.compComplianceSalaryCalculationDay &&
                    formik.errors.compComplianceSalaryCalculationDay
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps(
                    "compComplianceSalaryCalculationDay"
                  )}
                />
                {formik.touched.compComplianceSalaryCalculationDay &&
                  formik.errors.compComplianceSalaryCalculationDay && (
                    <div className="invalid-feedback">
                      {formik.errors.compComplianceSalaryCalculationDay}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Salary Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="compComplianceSalaryDay"
                  className={`form-control form-control-sm ${
                    formik.touched.compComplianceSalaryDay &&
                    formik.errors.compComplianceSalaryDay
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("compComplianceSalaryDay")}
                />
                {formik.touched.compComplianceSalaryDay &&
                  formik.errors.compComplianceSalaryDay && (
                    <div className="invalid-feedback">
                      {formik.errors.compComplianceSalaryDay}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Remark <span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  name="compComplianceRemarks"
                  className={`form-control form-control-sm ${
                    formik.touched.compComplianceRemarks &&
                    formik.errors.compComplianceRemarks
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("compComplianceRemarks")}
                />
                {formik.touched.compComplianceRemarks &&
                  formik.errors.compComplianceRemarks && (
                    <div className="invalid-feedback">
                      {formik.errors.compComplianceRemarks}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyComplianceEdit;
