import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles for ReactQuill

// Define custom toolbar modules
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'size': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'color': [] }, { 'background': [] }],   // Text color and background color
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],                // Link, image, and video options
    ['clean'],                                 // Remove formatting button
  ],
  clipboard: {
    matchVisual: false,
  }
};

// Define formats to enable the editor to accept these types
const formats = [
  'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'color', 'background', 'list', 'bullet', 'align', 'link', 'image', 'video'
];
const HrPolicyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");

  const validationSchema = Yup.object({
    hrPolicyList: Yup.string().required("*Policy Name is required"),
    hrPolicyDescr: Yup.string().required("*Policy Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      hrPolicyId :id,
      hrPolicyList: "",
      hrPolicyDescr: "",
      hrPolicyCmpId: cmpId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        // Update API payload to include HTML from ReactQuill
        const payload = {
          ...values,
          hrPolicyDescr: values.hrPolicyDescr, // Contains HTML from ReactQuill
        };

        const response = await api.put(`/hR-policy/${id}`, payload);
        if (response.status === 200) {
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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/hR-policy/${id}`);
        formik.setValues(response.data); // Load the data into the form
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
                  <h1 className="h4 ls-tight headingColor">Edit HR Policy</h1>
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
                      <span>Update</span>
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
                  Policy Name <span className="text-danger">*</span>
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
              <div className="col-md-12 col-12 mb-3">
                <label className="form-label">
                  Policy Description <span className="text-danger">*</span>
                </label>
                <ReactQuill
                  value={formik.values.hrPolicyDescr}
                  onChange={handleDescriptionChange}
                  modules={modules}      // Add custom toolbar modules
                  formats={formats}      // Define formats allowed
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

export default HrPolicyEdit;
