import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import ReactTagInput from "@pathofdev/react-tag-input";
import { FiAlertTriangle } from "react-icons/fi";

const CompanyRegistrationAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    cmpName: Yup.string().required("Company Name is required"),
    cmpEmail: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    countryCode: Yup.string().required("!Contact number is required"),
    cmpPhNumber: Yup.string()
      .required("!Mobile number is required")
      .matches(/^\d+$/, "!Mobile number must contain only digits")
      .test("phone-length", function (value) {
        const { countryCode } = this.parent;
        if (countryCode === "65") {
          return value && value.length === 8
            ? true
            : this.createError({
                message: "!Phone number must be 8 digits only",
              });
        }
        if (countryCode === "91") {
          return value && value.length === 10
            ? true
            : this.createError({
                message: "!Phone number must be 10 digits only",
              });
        }
        return true;
      }),
    cmpAddr: Yup.string().required("Address is required"),
    cmpCity: Yup.string().required("City is required"),
    cmpPincode: Yup.string().required("Pin Code is required"),
    // cmpTaxCode: Yup.string().required("Tax Code is required"),
    // headQuaterAddress: Yup.string().required("HeadQuater Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      cmpName: "",
      cmpEmail: "",
      countryCode: "",
      cmpPhNumber: "",
      cmpAddr: "",
      cmpCity: "",
      cmpPincode: "",
      // startDate: "",
      // companyType: "",
      // representative: "",
      // headQuaterAddress: "",
      // branchLocation: [],
      // cmpTaxCode: "",
      // logoFile: null,
      // profileImgFile: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("value", values);
      const formDatas = new FormData();
      formDatas.append("name", values.name);
      formDatas.append("cmpName", values.cmpName);
      formDatas.append("cmpEmail", values.cmpEmail);
      formDatas.append("cmpPhNumber", values.cmpPhNumber);
      formDatas.append("cmpAddr", values.cmpAddr);
      formDatas.append("cmpCity", values.cmpCity);
      // formDatas.append("representative", values.representative);
      // formDatas.append("startDate", values.startDate);
      // formDatas.append("companyType", values.companyType);
      // formDatas.append("headQuaterAddress", values.headQuaterAddress);
      // formDatas.append("branchLocation", values.branchLocation);
      formDatas.append("cmpPincode", values.cmpPincode);
      // formDatas.append("cmpTaxCode", values.cmpTaxCode);
      // formDatas.append("logoFile", values.logoFile);
      // formDatas.append("profileImgFile", values.profileImgFile);

      try {
        const response = await api.post("company-reg", formDatas);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/companyRegistration");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        if (e.response.status === 409) {
          toast(e.response.data.message, {
            icon: <FiAlertTriangle className="text-warning" />,
          });
        } else {
          toast.error(e?.response?.data?.message);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const { files } = event.target;
    if (files.length) {
      formik.setFieldValue("attachments", [...files]);
    }
  };
  // useEffect(() => {
  //   formik.setFieldValue("countryCode", "65");
  // }, []);
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
                    Add Company Registration
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/companyRegistration">
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
              {/* Name Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control form-control-sm ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
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
                  className={`form-control form-control-sm ${
                    formik.touched.cmpName && formik.errors.cmpName
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
                  className={`form-control form-control-sm ${
                    formik.touched.cmpEmail && formik.errors.cmpEmail
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpEmail")}
                />
                {formik.touched.cmpEmail && formik.errors.cmpEmail && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpEmail}
                  </div>
                )}
              </div>
              {/* cmpPhNumber Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Number <span className="text-danger">*</span>
                </label>
                <div
                  className="input-group  input-group-sm"
                  style={{
                    // borderRadius: "10px",
                    overflow: "hidden",
                    // height: "10px",
                  }}
                >
                  <span
                    className="input-group-text"
                    style={{
                      borderRight: "none",
                      backgroundColor: "#fff",
                      // borderRadius: "10px 0 0 10px",
                    }}
                  >
                    <select
                      // name="countryCode"
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                      {...formik.getFieldProps("countryCode")}
                      className=""
                    >
                      <option value="65">+65</option>
                      <option value="91">+91</option>
                    </select>
                  </span>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${
                      formik.touched.cmpPhNumber && formik.errors.cmpPhNumber
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter a contact number"
                    {...formik.getFieldProps("cmpPhNumber")}
                  />
                </div>
                {formik.touched.cmpPhNumber && formik.errors.cmpPhNumber && (
                  <div className="">
                    <small className="text-danger">
                      {formik.errors.cmpPhNumber}
                    </small>
                  </div>
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
                  className={`form-control form-control-sm ${
                    formik.touched.cmpAddr && formik.errors.cmpAddr
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpAddr")}
                />
                {formik.touched.cmpAddr && formik.errors.cmpAddr && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpAddr}
                  </div>
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
                  className={`form-control form-control-sm ${
                    formik.touched.cmpCity && formik.errors.cmpCity
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpCity")}
                />
                {formik.touched.cmpCity && formik.errors.cmpCity && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpCity}
                  </div>
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
                  className={`form-control form-control-sm ${
                    formik.touched.cmpPincode && formik.errors.cmpPincode
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpPincode")}
                />
                {formik.touched.cmpPincode && formik.errors.cmpPincode && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpPincode}
                  </div>
                )}
              </div>
              {/* <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Tax Code<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpTaxCode"
                  className={`form-control form-control-sm ${
                    formik.touched.cmpTaxCode && formik.errors.cmpTaxCode
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpTaxCode")}
                />
                {formik.touched.cmpTaxCode && formik.errors.cmpTaxCode && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpTaxCode}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Start Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  className={`form-control form-control-sm ${
                    formik.touched.startDate && formik.errors.startDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("startDate")}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <div className="invalid-feedback">
                    {formik.errors.startDate}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Representative<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="representative"
                  className={`form-control form-control-sm ${
                    formik.touched.representative &&
                    formik.errors.representative
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("representative")}
                />
                {formik.touched.representative &&
                  formik.errors.representative && (
                    <div className="invalid-feedback">
                      {formik.errors.representative}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Company Type<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="companyType"
                  className={`form-control form-control-sm ${
                    formik.touched.companyType && formik.errors.companyType
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("companyType")}
                />
                {formik.touched.companyType && formik.errors.companyType && (
                  <div className="invalid-feedback">
                    {formik.errors.companyType}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  HeadQuater Address<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="headQuaterAddress"
                  className={`form-control form-control-sm ${
                    formik.touched.headQuaterAddress &&
                    formik.errors.headQuaterAddress
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("headQuaterAddress")}
                />
                {formik.touched.headQuaterAddress &&
                  formik.errors.headQuaterAddress && (
                    <div className="invalid-feedback">
                      {formik.errors.headQuaterAddress}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Branch Location<span className="text-danger">*</span>
                </label>
                <div
                  className={`form-control form-control-sm ${
                    formik.touched.branchLocation &&
                    formik.errors.branchLocation
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    alignItems: "center",
                    minHeight: "38px",
                  }}
                >
                  {formik.values.branchLocation.map((tag, index) => (
                    <span
                      key={index}
                      className="badge bg-primary text-white d-flex align-items-center"
                      style={{ padding: "5px 10px", borderRadius: "10px" }}
                    >
                      {tag}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        style={{ fontSize: "10px", lineHeight: 1 }}
                        onClick={() => {
                          const updatedTags = [...formik.values.branchLocation];
                          updatedTags.splice(index, 1);
                          formik.setFieldValue("branchLocation", updatedTags);
                        }}
                      />
                    </span>
                  ))}
                  <input
                    type="text"
                    className="border-0"
                    style={{ flex: 1, outline: "none", minWidth: "150px" }}
                    value={formik.values.newTag || ""}
                    onChange={(e) =>
                      formik.setFieldValue("newTag", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        if (formik.values.newTag) {
                          formik.setFieldValue("branchLocation", [
                            ...formik.values.branchLocation,
                            formik.values.newTag.trim(),
                          ]);
                          formik.setFieldValue("newTag", "");
                        }
                      }
                    }}
                  />
                </div>
                {formik.touched.branchLocation &&
                  formik.errors.branchLocation && (
                    <div className="invalid-feedback">
                      {formik.errors.branchLocation}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Logo</label>
                <input
                  type="file"
                  name="logoFile"
                  className={`form-control form-control-sm ${
                    formik.touched.logoFile && formik.errors.logoFile
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={handleFileChange}
                />
                {formik.touched.logoFile && formik.errors.logoFile && (
                  <div className="invalid-feedback">
                    {formik.errors.logoFile}
                  </div>
                )}
              </div>
             
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  name="profileImgFile"
                  className={`form-control form-control-sm ${
                    formik.touched.profileImgFile &&
                    formik.errors.profileImgFile
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={handleFileChange}
                />
                {formik.touched.profileImgFile &&
                  formik.errors.profileImgFile && (
                    <div className="invalid-feedback">
                      {formik.errors.profileImgFile}
                    </div>
                  )}
              </div> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegistrationAdd;
