import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
// import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import api from "../../config/URL";

function Register() {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showactualPassword, setShowactualPassword] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    cmpName: Yup.string().required("Company Name is required"),
    cmpEmail: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // cmpPhNumber: Yup.string().required("Phone number is required"),
    cmpAddr: Yup.string().required("Address is required"),
    // cmpCity: Yup.string().required("City is required"),
    // cmpPincode: Yup.string().required("Pin Code is required"),
    // cmpTaxCode: Yup.string().required("Tax Code is required"),
    // logoFile: Yup.mixed().required("Logo is required"),
    // profileImgFile: Yup.mixed().required("Profile Image is required"),
    // headQuaterAddress: Yup.string().required("HeadQuater Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      cmpName: "",
      cmpEmail: "",
      cmpPhNumber: "",
      cmpAddr: "",
      // cmpCity: "",
      // cmpPincode: "",
      // cmpTaxCode: "",
      // startDate: "",
      // companyType: "",
      // representative: "",
      // headQuaterAddress: "",
      // branchLocation: [],
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
      // formDatas.append("cmpCity", values.cmpCity);
      // formDatas.append("cmpPincode", values.cmpPincode);
      // formDatas.append("cmpTaxCode", values.cmpTaxCode);
      // formDatas.append("representative", values.representative);
      // formDatas.append("startDate", values.startDate);
      // formDatas.append("companyType", values.companyType);
      // formDatas.append("headQuaterAddress", values.headQuaterAddress);
      // formDatas.append("branchLocation", values.branchLocation);
      // formDatas.append("logoFile", values.logoFile);
      // formDatas.append("profileImgFile", values.profileImgFile);

      try {
        const response = await api.post("company-attach", formDatas);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/");
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

  // const handleFileChange = (event) => {
  //   const { name, files } = event.target;
  //   if (files.length) {
  //     formik.setFieldValue(name, files[0]);
  //   }
  // };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };
  // const toggleConfirmPasswordVisibility = () => {
  //   setShowactualPassword(!showactualPassword);
  // };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg p-3 my-5 rounded"
        style={{ width: "100%", maxWidth: "80%" }}
      >
        <Link to="/">
          <button className="btn btn-link text-start shadow-none h-0">
            <IoMdArrowBack style={{ color: "#181c2e" }} />
          </button>
        </Link>
        <div className="d-flex justify-content-around ">
          <h3
            className="py-2"
            style={{
              borderBottom: "2px solid #181c2e",
              paddingBottom: "5px",
              width: "100%",
              textAlign: "center",
              color: "#181c2e",
            }}
          >
            Register
          </h3>
        </div>
        <div className="container mb-5">
          <Form onSubmit={formik.handleSubmit}>
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
                <input
                  type="text"
                  name="cmpPhNumber"
                  className={`form-control form-control-sm ${
                    formik.touched.cmpPhNumber && formik.errors.cmpPhNumber
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpPhNumber")}
                />
                {formik.touched.cmpPhNumber && formik.errors.cmpPhNumber && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpPhNumber}
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
              {/* <div className="col-md-6 col-12 mb-3">
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
              <div className="col-md-6 col-12 mb-3">
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
                <input
                  type="text"
                  name="branchLocation"
                  className={`form-control form-control-sm ${
                    formik.touched.branchLocation &&
                    formik.errors.branchLocation
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("branchLocation")}
                />
                {formik.touched.branchLocation &&
                  formik.errors.branchLocation && (
                    <div className="invalid-feedback">
                      {formik.errors.branchLocation}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Logo<span className="text-danger">*</span>
                </label>
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
                <label className="form-label">
                  Profile Image <span className="text-danger">*</span>
                </label>
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

            <Button
              type="submit"
              variant="primary"
              className="w-100 my-3"
              disabled={loadIndicator}
            >
              {loadIndicator ? "Loading..." : "Register"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
