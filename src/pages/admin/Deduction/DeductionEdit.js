import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const DeductionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = localStorage.getItem("cmpId");
  const [companyData, setCompanyData] = useState(null);

  const validationSchema = Yup.object({
    deductionName: Yup.string().required("*Deduction Name is required"),
    deductionAmt: Yup.string().required("*Deduction Amount is required"),
    totalDeductionAmt: Yup.string().required(
      "*Total Deduction Amount is required"
    ),
    deductionMonth: Yup.string().required("*Deduction Month is required"),
  });

  // useFormik hook for form handling
  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      deductionId: "",
      deductionName: "",
      deductionAmt: "",
      totalDeductionAmt: "",
      deductionMonth: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/deduction/${id}`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/deduction");
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
        const response = await api.get(`/deduction/${id}`);
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
                  <h1 className="h4 ls-tight headingColor">Edit Deduction</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/deduction">
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
                  Deduction Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="deductionName"
                  className={`form-control form-control-sm ${
                    formik.touched.deductionName && formik.errors.deductionName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("deductionName")}
                />
                {formik.touched.deductionName &&
                  formik.errors.deductionName && (
                    <div className="invalid-feedback">
                      {formik.errors.deductionName}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Deduction Amount <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="deductionAmt"
                  className={`form-control form-control-sm ${
                    formik.touched.deductionAmt && formik.errors.deductionAmt
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("deductionAmt")}
                />
                {formik.touched.deductionAmt && formik.errors.deductionAmt && (
                  <div className="invalid-feedback">
                    {formik.errors.deductionAmt}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Total Deduction Amount<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="totalDeductionAmt"
                  className={`form-control form-control-sm ${
                    formik.touched.totalDeductionAmt &&
                    formik.errors.totalDeductionAmt
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("totalDeductionAmt")}
                />
                {formik.touched.totalDeductionAmt &&
                  formik.errors.totalDeductionAmt && (
                    <div className="invalid-feedback">
                      {formik.errors.totalDeductionAmt}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Deduction Month<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="deductionMonth"
                  className={`form-control form-control-sm ${
                    formik.touched.deductionMonth &&
                    formik.errors.deductionMonth
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("deductionMonth")}
                />
                {formik.touched.deductionMonth &&
                  formik.errors.deductionMonth && (
                    <div className="invalid-feedback">
                      {formik.errors.deductionMonth}
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

export default DeductionEdit;
