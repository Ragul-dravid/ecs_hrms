import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/URL";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login({ handleLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // companyId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Values is ", values);
      try {
        const response = await api.post(`app-login`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          // console.log("Login Triger" ,response);         
          sessionStorage.setItem("roleId", response.data.roleId);
          sessionStorage.setItem("role", response.data.role);
          sessionStorage.setItem("token", response.data.accessToken);
          sessionStorage.setItem("userName", response.data.role);
          sessionStorage.setItem("loginUserId", response.data.userId);
          sessionStorage.setItem("cmpId", response.data.companyId);
          handleLogin();
          navigate("/dashboard");

        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        console.log("Error Login ", e?.response?.data?.message);
        // toast.error(e?.response?.data?.message);
      }
      // onLogin(values.email, values.password, values.companyId);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <div
        className="card shadow-lg p-3 mb-5 rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="d-flex justify-content-around ">
          <h3
            className={`cursor-pointer py-2`}
            style={{
              borderBottom: "2px solid #181c2e",
              paddingBottom: "5px",
              width: "100%",
              textAlign: "center",
              color: "#181c2e",
            }}
          >
            Login
          </h3>
        </div>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3 pt-4">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center py-2">
            <Form.Label>Password</Form.Label>
            <Link
              to="/forgot"
              className="ml-auto"
              style={{
                fontSize: "0.9em",
                textDecoration: "none",
                color: "#181c2e",
              }}
            >
              Forgot Password?
            </Link>
          </div>
          <Form.Group controlId="formPassword" className="mb-3">
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              {formik.values.password && (
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              )}
              {formik.touched.password && formik.errors.password ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              ) : null}
            </div>
          </Form.Group>

          <Button type="submit" className="w-100 mt-4" disabled={loadIndicator}>
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Login
          </Button>

          <div className="text-center mt-4">
            <p className="mb-3">or</p>
            <Link to="/register">
              <Button
                variant="light"
                className="w-100 border shadow-none"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Register
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
