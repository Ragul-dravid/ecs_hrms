import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import HrPolicy from "./HrPolicy";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles for ReactQuill

// Additional imports for custom image handling if needed
import Quill from "quill";

// Define custom toolbar modules
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }], // Text color and background color
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image", "video"], // Link, image, and video options
    ["clean"], // Remove formatting button
  ],
  clipboard: {
    matchVisual: false,
  },
};

// Define formats to enable the editor to accept these types
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "video",
];
const HrPolicyAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");

  const validationSchema = Yup.object({
    hrPolicyList: Yup.string().required("*Policy Name is required"),
    hrPolicyDescr: Yup.string().required("*Policy Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      hrPolicyList: "",
      hrPolicyDescr: "",
      // hrPolicyOwner: "",
      effectiveDate: "",
      // hrPolicyCategory: "",
      attachments: [],
      hrPolicyCmpId: cmpId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        // const formattedEffectiveDate = new Date(
        //   values.effectiveDate
        // ).toISOString();
        const formData = new FormData();
        formData.append("hrPolicyList", values.hrPolicyList);
        formData.append("hrPolicyDescr", values.hrPolicyDescr);
        // formData.append("hrPolicyOwner", values.hrPolicyOwner);
        // formData.append("effectiveDate", values.effectiveDate);
        // formData.append("hrPolicyCategory", values.hrPolicyCategory);
        values.attachments.forEach((file) => {
          formData.append("attachments", file);
        });
        formData.append("hrPolicyCmpId", values.hrPolicyCmpId);
        const response = await api.post(`/hR-policy`, formData);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/hrpolicy");
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

  // Handle `ReactQuill` value change
  const handleDescriptionChange = (value) => {
    formik.setFieldValue("hrPolicyDescr", value);
  };

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
                  <h1 className="h4 ls-tight headingColor">Add HR Policy</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/hrpolicy">
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
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Policy Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="hrPolicyList"
                  className={`form-control form-control-sm ${
                    formik.touched.hrPolicyList && formik.errors.hrPolicyList
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("hrPolicyList")}
                />
                {formik.touched.hrPolicyList && formik.errors.hrPolicyList && (
                  <div className="invalid-feedback">
                    {formik.errors.hrPolicyList}
                  </div>
                )}
              </div>

              {/* <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  HrPolicy Owner <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="hrPolicyOwner"
                  className={`form-control form-control-sm ${
                    formik.touched.hrPolicyOwner && formik.errors.hrPolicyOwner
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("hrPolicyOwner")}
                />
                {formik.touched.hrPolicyOwner &&
                  formik.errors.hrPolicyOwner && (
                    <div className="invalid-feedback">
                      {formik.errors.hrPolicyOwner}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  HrPolicy Category <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="hrPolicyCategory"
                  className={`form-control form-control-sm ${
                    formik.touched.hrPolicyCategory &&
                    formik.errors.hrPolicyCategory
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("hrPolicyCategory")}
                />
                {formik.touched.hrPolicyCategory &&
                  formik.errors.hrPolicyCategory && (
                    <div className="invalid-feedback">
                      {formik.errors.hrPolicyCategory}
                    </div>
                  )}
              </div> */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Effective Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="effectiveDate"
                  className={`form-control form-control-sm ${
                    formik.touched.effectiveDate && formik.errors.effectiveDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("effectiveDate")}
                />
                {formik.touched.effectiveDate &&
                  formik.errors.effectiveDate && (
                    <div className="invalid-feedback">
                      {formik.errors.effectiveDate}
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Attachments</label>
                <input
                  type="file"
                  name="attachments"
                  className={`form-control form-control-sm ${
                    formik.touched.attachments && formik.errors.attachments
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(event) =>
                    formik.setFieldValue(
                      "attachments",
                      Array.from(event.target.files)
                    )
                  }
                  multiple
                />
                {formik.touched.attachments && formik.errors.attachments && (
                  <div className="invalid-feedback">
                    {formik.errors.attachments}
                  </div>
                )}
              </div>
              <div className="col-md-12 col-12 mb-3">
                <label className="form-label">
                  Policy Description <span className="text-danger">*</span>
                </label>
                <ReactQuill
                  value={formik.values.hrPolicyDescr}
                  onChange={handleDescriptionChange}
                  modules={modules} // Add custom toolbar modules
                  formats={formats} // Define formats allowed
                  className={`${
                    formik.touched.hrPolicyDescr && formik.errors.hrPolicyDescr
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.hrPolicyDescr &&
                  formik.errors.hrPolicyDescr && (
                    <div className="invalid-feedback">
                      {formik.errors.hrPolicyDescr}
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

export default HrPolicyAdd;
