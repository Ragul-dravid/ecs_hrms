import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import api from "../../config/URL";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showactualPassword, setShowactualPassword] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    companyName: Yup.string().required("Company Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    logo: Yup.mixed().required("Logo is required"),
    profileImg: Yup.mixed().required("Profile Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      companyName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      logo: null,
      profileImg: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const formDatas = new FormData();
      formDatas.append("name", values.name);
      formDatas.append("companyName", values.companyName);
      formDatas.append("email", values.email);
      formDatas.append("phone", values.phone);
      formDatas.append("address", values.address);
      formDatas.append("state", values.state);
      formDatas.append("city", values.city);
      formDatas.append("zipCode", values.zipCode);
      formDatas.append("country", values.country);
      formDatas.append("logo", values.logo);
      formDatas.append("profileImg", values.profileImg);

      try {
        const response = await api.post("user-register", formDatas);
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

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length) {
      formik.setFieldValue(name, files[0]);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowactualPassword(!showactualPassword);
  };

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
                    formik.touched.name && formik.errors.name ? "is-invalid" : ""
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
                  name="companyName"
                  className={`form-control form-control-sm ${
                    formik.touched.companyName && formik.errors.companyName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("companyName")}
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <div className="invalid-feedback">
                    {formik.errors.companyName}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  className={`form-control form-control-sm ${
                    formik.touched.email && formik.errors.email ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>

              {/* Phone Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className={`form-control form-control-sm ${
                    formik.touched.phone && formik.errors.phone ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                )}
              </div>

              {/* Address Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  className={`form-control form-control-sm ${
                    formik.touched.address && formik.errors.address ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="invalid-feedback">{formik.errors.address}</div>
                )}
              </div>

              {/* City Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  className={`form-control form-control-sm ${
                    formik.touched.city && formik.errors.city ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("city")}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="invalid-feedback">{formik.errors.city}</div>
                )}
              </div>

              {/* State Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  State <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  className={`form-control form-control-sm ${
                    formik.touched.state && formik.errors.state ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("state")}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="invalid-feedback">{formik.errors.state}</div>
                )}
              </div>

              {/* Country Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Country <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  className={`form-control form-control-sm ${
                    formik.touched.country && formik.errors.country ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("country")}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="invalid-feedback">{formik.errors.country}</div>
                )}
              </div>

              {/* Zip Code Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Zip Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  className={`form-control form-control-sm ${
                    formik.touched.zipCode && formik.errors.zipCode ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("zipCode")}
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <div className="invalid-feedback">{formik.errors.zipCode}</div>
                )}
              </div>

              {/* Logo Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Logo <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="logo"
                  className={`form-control form-control-sm ${
                    formik.touched.logo && formik.errors.logo ? "is-invalid" : ""
                  }`}
                  onChange={handleFileChange}
                />
                {formik.touched.logo && formik.errors.logo && (
                  <div className="invalid-feedback">{formik.errors.logo}</div>
                )}
              </div>

              {/* Profile Image Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Profile Image <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="profileImg"
                  className={`form-control form-control-sm ${
                    formik.touched.profileImg && formik.errors.profileImg
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={handleFileChange}
                />
                {formik.touched.profileImg && formik.errors.profileImg && (
                  <div className="invalid-feedback">{formik.errors.profileImg}</div>
                )}
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-100 my-3" disabled={loadIndicator}>
              {loadIndicator ? "Loading..." : "Register"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
