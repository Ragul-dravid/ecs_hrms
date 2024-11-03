import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";

const CompanyRegistrationAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    cmpName: Yup.string().required("Company Name is required"),
    cmpEmail: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    cmpPhNumber: Yup.string().required("Phone number is required"),
    cmpAddr: Yup.string().required("Address is required"),
    cmpCity: Yup.string().required("City is required"),
    cmpPincode: Yup.string().required("Pin Code is required"),
    cmpTaxCode: Yup.string().required("Tax Code is required"),
    logoFile: Yup.mixed().required("Logo is required"),
    profileImgFile: Yup.mixed().required("Profile Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      cmpName: "",
      cmpEmail: "",
      cmpPhNumber: "",
      cmpAddr: "",
      cmpCity: "",
      cmpPincode: "",
      cmpTaxCode: "",
      logoFile: null,
      profileImgFile: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("value", values)
      const formDatas = new FormData();
      formDatas.append("name", values.name);
      formDatas.append("cmpName", values.cmpName);
      formDatas.append("cmpEmail", values.cmpEmail);
      formDatas.append("cmpPhNumber", values.cmpPhNumber);
      formDatas.append("cmpAddr", values.cmpAddr);
      formDatas.append("cmpCity", values.cmpCity);
      formDatas.append("cmpPincode", values.cmpPincode);
      formDatas.append("cmpTaxCode", values.cmpTaxCode);
      formDatas.append("logoFile", values.logoFile);
      formDatas.append("profileImgFile", values.profileImgFile);

      try {
        const response = await api.post("company-attach", formDatas);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/companyRegistration");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Error fetching data: " + e?.response?.data?.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length) {
      formik.setFieldValue(name, files[0]);
    }
  };

  return (
    <div className="container-fluid px-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header" style={{ borderRadius: "0" }}>
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Add Company Registration</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/companyRegistration">
                    <button type="button" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-sm btn-primary" disabled={loading}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 my-2" style={{ borderRadius: "0" }}>
          <div className="container mb-5">
            <div className="row py-4">
              {/* Name Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control form-control-sm ${formik.touched.name && formik.errors.name ? "is-invalid" : ""
                    }`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </div>

              {/* Company Name Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Company Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpName"
                  className={`form-control form-control-sm ${formik.touched.cmpName && formik.errors.cmpName
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("cmpName")}
                />
                {formik.touched.cmpName && formik.errors.cmpName && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpName}
                  </div>
                )}
              </div>

              {/* cmpEmail Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpEmail"
                  className={`form-control form-control-sm ${formik.touched.cmpEmail && formik.errors.cmpEmail ? "is-invalid" : ""
                    }`}
                  {...formik.getFieldProps("cmpEmail")}
                />
                {formik.touched.cmpEmail && formik.errors.cmpEmail && (
                  <div className="invalid-feedback">{formik.errors.cmpEmail}</div>
                )}
              </div>

              {/* cmpPhNumber Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpPhNumber"
                  className={`form-control form-control-sm ${formik.touched.cmpPhNumber && formik.errors.cmpPhNumber ? "is-invalid" : ""
                    }`}
                  {...formik.getFieldProps("cmpPhNumber")}
                />
                {formik.touched.cmpPhNumber && formik.errors.cmpPhNumber && (
                  <div className="invalid-feedback">{formik.errors.cmpPhNumber}</div>
                )}
              </div>

              {/* cmpAddr Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpAddr"
                  className={`form-control form-control-sm ${formik.touched.cmpAddr && formik.errors.cmpAddr ? "is-invalid" : ""
                    }`}
                  {...formik.getFieldProps("cmpAddr")}
                />
                {formik.touched.cmpAddr && formik.errors.cmpAddr && (
                  <div className="invalid-feedback">{formik.errors.cmpAddr}</div>
                )}
              </div>

              {/* cmpCity Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpCity"
                  className={`form-control form-control-sm ${formik.touched.cmpCity && formik.errors.cmpCity ? "is-invalid" : ""
                    }`}
                  {...formik.getFieldProps("cmpCity")}
                />
                {formik.touched.cmpCity && formik.errors.cmpCity && (
                  <div className="invalid-feedback">{formik.errors.cmpCity}</div>
                )}
              </div>

              {/* Zip Code Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Zip Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpPincode"
                  className={`form-control form-control-sm ${formik.touched.cmpPincode && formik.errors.cmpPincode ? "is-invalid" : ""
                    }`}
                  {...formik.getFieldProps("cmpPincode")}
                />
                {formik.touched.cmpPincode && formik.errors.cmpPincode && (
                  <div className="invalid-feedback">{formik.errors.cmpPincode}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Tax Code<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpTaxCode"
                  className={`form-control form-control-sm ${formik.touched.cmpTaxCode && formik.errors.cmpTaxCode ? "is-invalid" : ""
                    }`}
                  {...formik.getFieldProps("cmpTaxCode")}
                />
                {formik.touched.cmpTaxCode && formik.errors.cmpTaxCode && (
                  <div className="invalid-feedback">{formik.errors.cmpTaxCode}</div>
                )}
              </div>

              {/* logoFile Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Logo<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="logoFile"
                  className={`form-control form-control-sm ${formik.touched.logoFile && formik.errors.logoFile ? "is-invalid" : ""
                    }`}
                  onChange={handleFileChange}
                />
                {formik.touched.logoFile && formik.errors.logoFile && (
                  <div className="invalid-feedback">{formik.errors.logoFile}</div>
                )}
              </div>

              {/* Profile Image Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Profile Image <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="profileImgFile"
                  className={`form-control form-control-sm ${formik.touched.profileImgFile && formik.errors.profileImgFile
                    ? "is-invalid"
                    : ""
                    }`}
                  onChange={handleFileChange}
                />
                {formik.touched.profileImgFile && formik.errors.profileImgFile && (
                  <div className="invalid-feedback">{formik.errors.profileImgFile}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegistrationAdd;
