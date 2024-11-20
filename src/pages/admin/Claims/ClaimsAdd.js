import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const ClaimsAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = localStorage.getItem("cmpId");
  const [companyData, setCompanyData] = useState(null);

  const validationSchema = Yup.object({
    expenseDate: Yup.string().required("*Expense Date is required"),
    expenseType: Yup.string().required("*Expense Type is required"),
    expenseAmt: Yup.string().required("*Amount is required"),
    expensesEmpId: Yup.string().required("*Employee Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      expenseDate: "",
      expenseType: "",
      expenseAmt: "",
      files: "",
      expensesEmpId: "",
      cmpId: "",
      expenseDetails: "",
      deptId: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const formData = new FormData();
        formData.append("files", values.files);
        formData.append("expenseType", values.expenseType);
        formData.append("expenseAmt", values.expenseAmt);
        formData.append("expenseDetails", values.expenseDetails);
        formData.append("expenseDate", values.expenseDate);
        formData.append("expensesEmpId", values.employeeId);
        formData.append("cmpId", values.cmpId);
        formData.append("deptId", " ");

        const response = await api.post("/expenses", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/expense");
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
                  <h1 className="h4 ls-tight headingColor">Add Expense</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/expense">
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
                  Employee Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="leaveReqEmpId"
                  className={`form-control form-control-sm ${
                    formik.touched.leaveReqEmpId && formik.errors.leaveReqEmpId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("leaveReqEmpId")}
                />
                {formik.touched.leaveReqEmpId &&
                  formik.errors.leaveReqEmpId && (
                    <div className="invalid-feedback">
                      {formik.errors.leaveReqEmpId}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Expense Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="expenseDate"
                  className={`form-control form-control-sm ${
                    formik.touched.expenseDate && formik.errors.expenseDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("expenseDate")}
                />
                {formik.touched.expenseDate && formik.errors.expenseDate && (
                  <div className="invalid-feedback">
                    {formik.errors.expenseDate}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Expense Type<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="expenseType"
                  className={`form-control form-control-sm ${
                    formik.touched.expenseType && formik.errors.expenseType
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("expenseType")}
                />
                {formik.touched.expenseType && formik.errors.expenseType && (
                  <div className="invalid-feedback">
                    {formik.errors.expenseType}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Expense Amount<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="expenseAmt"
                  className={`form-control form-control-sm ${
                    formik.touched.expenseAmt && formik.errors.expenseAmt
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("expenseAmt")}
                />
                {formik.touched.expenseAmt && formik.errors.expenseAmt && (
                  <div className="invalid-feedback">
                    {formik.errors.expenseAmt}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Attachment<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="files"
                  className={`form-control form-control-sm ${
                    formik.touched.files && formik.errors.files
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("files")}
                />
                {formik.touched.files && formik.errors.files && (
                  <div className="invalid-feedback">{formik.errors.files}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClaimsAdd;
