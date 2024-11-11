import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/URL";
import toast from "react-hot-toast";
import CRMLogo from "../../assets/CRMLogo.png";

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
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await api.post(`app-login`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          sessionStorage.setItem("roleId", response.data.roleId);
          sessionStorage.setItem("role", response.data.role);
          sessionStorage.setItem("token", response.data.accessToken);
          sessionStorage.setItem("userName", response.data.role);
          sessionStorage.setItem("loginUserId", response.data.loginUserId);
          sessionStorage.setItem("empId", response.data.employeeInfo[0].id);
          sessionStorage.setItem(
            "empName",
            response.data.employeeInfo[0].empName
          );
          sessionStorage.setItem("cmpId", response.data.employeeInfo[0].cmpId);
          sessionStorage.setItem(
            "deptId",
            response.data.employeeInfo[0].deptId
          );
          handleLogin();
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        console.log("Error Login ", e?.response?.data?.message);
        toast.error(e?.response?.data?.message);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="container-fluid h-100"
      style={{ backgroundColor: "#f2f2f2" }} // Background color for the entire page
    >
      <Row className="h-100">
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center p-4"
          style={{ backgroundColor: "#fff" }} // Left column background color
        >
          <div className="d-flex align-items-center text-white text-center">
            <img
              src={CRMLogo}
              alt="Description"
              className="img-fluid mb-4"
              style={{ maxHeight: "300px", backgroundColor: "transparent" }}
            />
            <div className="ms-4 text-start">
              <h2>HRMS</h2>
              <p>Empower Your Workforce with Seamless HR Management</p>
            </div>
          </div>
        </Col>

        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center p-4 btn-primary"
        >
          {/* Logo and HRMS Text */}
          <div className="text-center mt-4 mb-4">
            <img
              src={CRMLogo}
              alt="Description"
              className="img-fluid mb-2"
              style={{ maxHeight: "60px", backgroundColor: "transparent" }}
            />
            <h2 className="ms-3">HRMS</h2>
          </div>

          {/* Card with login form */}
          <div
            className="card shadow-lg p-4 mb-5 rounded"
            style={{
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "#ffffff", // Card background color (white)
              border: "none", // Remove default card border
            }}
          >
            {/* Login Form */}
            <h3
              className="text-center mb-3"
              style={{ fontSize: "1.5rem", color: "#181c2e" }}
            >
              Login
            </h3>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
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

              <div className="d-flex justify-content-between align-items-center py-1">
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
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
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
                        color: "#181c2e",
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

              <Button
                type="submit"
                className="w-100 mt-3"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Login
              </Button>

              <div className="text-center mt-3">
                <p className="mb-2">or</p>
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
        </Col>
      </Row>
    </div>
  );
}

export default Login;
