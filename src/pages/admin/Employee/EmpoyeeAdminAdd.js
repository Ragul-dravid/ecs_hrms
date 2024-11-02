import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
// import fetchAllDepartmentNamesWithId from "../List/DepartmentNameList";

function EmployeeAdminAdd() {
  const cmpId = sessionStorage.getItem("cmpId");
  const [companyData, setCompanyData] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);
  const [selectedIdType, setSelectedIdType] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loadIndicator, setLoadIndicators] = useState(false);
  const navigate = useNavigate();
  const roleName = sessionStorage.getItem("role")

  const validationSchema = Yup.object({
    firstName: Yup.string().required("*First name is required"),
    lastName: Yup.string().required("*Last name is required"),
    empPriPhNumber: Yup.number()
      .required("*Primary phone number is required")
      .typeError("*Must be a number"),
    email: Yup.string()
      .email("*Enter valid email")
      .required("*Primary email id is required"),
    password: Yup.string().required(
      "*Primary email password is required"
    ),
  });

  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      firstName: "",
      lastName: "",
      empPriPhNumber: "",
      email: "",
      password: "",
      NRICFin: "",
      NRICType: "",
      aadharNumber: "",
      empRegCmpId: "",
      empRegDeptId: "",
      empDesignation: "",
      proof: "",
      empDateOfJoin: "",
      empType: "",
      noticePeriod: "",
      repManagerName: "",
      reportingManagerID: "",
      file: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.file) {
        // Check if the file is one of the allowed types
        const file = values.file;
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          errors.file = 'Only JPG and PNG files are accepted';
        }
      }
      return errors;
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicators(true);
      try {
        const formData = new FormData();

        // Add each data field manually to the FormData object
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("empPriPhNumber", values.empPriPhNumber);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("NRICFin", values.NRICFin);
        formData.append("NRICType", values.NRICType);
        formData.append("aadharNumber", values.aadharNumber);
        formData.append("cmpId", cmpId);
        formData.append("empRegDeptId", values.empRegDeptId);
        formData.append("file", values.file);

        formData.append("proof", selectedIdType);
        formData.append("empDesignation", values.empDesignation);
        formData.append("empDateOfJoin", values.empDateOfJoin);
        formData.append("empType", values.empType);
        formData.append("noticePeriod", values.noticePeriod);
        formData.append("repManagerName", values.repManagerName);
        formData.append("roleName", roleName);
        // formData.append("reportingManagerID", values.reportingManagerID);

        const response = await api.post("/emp-reg-details", formData);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/employee");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicators(false);
      }
    },
  });

  // const fetchData = async () => {
  //   try {
  //     const departmentData = await fetchAllDepartmentNamesWithId()
  //     setDepartmentData(departmentData);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  const handleIdTypeChange = (event) => {
    setSelectedIdType(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid px-2  minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div
          className="card shadow border-0 mb-2 top-header"
          style={{ borderRadius: "0" }}>
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Add Register</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/employee">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-buttonm btn-primary"
                    disabled={loadIndicator}
                  >
                    {loadIndicator ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <span></span>
                    )}
                    &nbsp;<span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card shadow border-0 mb-2 top-header"
          style={{ borderRadius: "0" }}>
          <div className="row mt-3 me-2">
            <div className="col-12 text-end"></div>
          </div>
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <div className="mb-2">
                  <label className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className={`form-control form-control-sm  ${formik.touched.firstName && formik.errors.firstName
                      ? "is-invalid"
                      : ""
                      }`}

                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="invalid-feedback">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <div className="mb-2">
                  <label className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className={`form-control form-control-sm  ${formik.touched.lastName && formik.errors.lastName
                      ? "is-invalid"
                      : ""
                      }`}

                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="invalid-feedback">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <div className="mb-2">
                  <label className="form-label">
                    Primary Email ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control form-control-sm ${formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                      }`}

                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="mb-2">
                  <label className="form-label">
                    Primary Email Password <span className="text-danger">*</span>
                  </label>
                  <div className={`input-group mb-3`}>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`form-control form-control-sm ${formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("password")}
                      style={{
                        borderRight: "none",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                      }}
                    />
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon1"
                      onClick={togglePasswordVisibility}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                        borderLeft: "none",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                      }}
                    >
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3 ">
                <div className="mb-2">
                  <label className="form-label">
                    Primary Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="empPriPhNumber"
                    className={`form-control form-control-sm  ${formik.touched.empPriPhNumber &&
                      formik.errors.empPriPhNumber
                      ? "is-invalid"
                      : ""
                      }`}

                    {...formik.getFieldProps("empPriPhNumber")}
                  />
                  {formik.touched.empPriPhNumber &&
                    formik.errors.empPriPhNumber && (
                      <div className="invalid-feedback">
                        {formik.errors.empPriPhNumber}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Department Name <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <select
                    {...formik.getFieldProps("empRegDeptId")}
                    className={`form-select form-select-sm  ${formik.touched.empRegDeptId && formik.errors.empRegDeptId
                      ? "is-invalid"
                      : ""
                      }`}

                  >
                    <option selected></option>
                    {departmentData &&
                      departmentData.map((deptId) => (
                        <option key={deptId.deptId} value={deptId.deptId}>
                          {deptId.deptName}
                        </option>
                      ))}
                  </select>
                  {formik.touched.empRegDeptId && formik.errors.empRegDeptId && (
                    <div className="invalid-feedback">
                      {formik.errors.empRegDeptId}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <div className="mb-2">
                  <label className="form-label">
                    Employee Designation <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="empDesignation"
                    className={`form-control form-control-sm  ${formik.touched.empDesignation &&
                      formik.errors.empDesignation
                      ? "is-invalid"
                      : ""
                      }`}

                    {...formik.getFieldProps("empDesignation")}
                  />
                  {formik.touched.empDesignation &&
                    formik.errors.empDesignation && (
                      <div className="invalid-feedback">
                        {formik.errors.empDesignation}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Photo</label>
                <input
                  type="file"
                  name="file"
                  className={`form-control form-control-sm ${formik.touched.file && formik.errors.file ? 'is-invalid' : ''
                    }`}
                  accept=".jpg, .jpeg, .png" // Restrict file types
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      formik.setFieldValue('file', file);
                    }
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="invalid-feedback">
                    {formik.errors.file}
                  </div>
                )}
              </div>
              <div>
                <div className="mb-3">
                  <div className="form-check form-check-inline mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="idType"
                      id="nricRadio"
                      value="NRIC"
                      checked={selectedIdType === "NRIC"}
                      onChange={handleIdTypeChange}
                    />
                    <label className="form-check-label" htmlFor="nricRadio">
                      NRIC
                    </label>
                  </div>
                  <div className="form-check form-check-inline mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="idType"
                      id="aadharRadio"
                      value="AADHAR"
                      checked={selectedIdType === "AADHAR"}
                      onChange={handleIdTypeChange}
                    />
                    <label className="form-check-label" htmlFor="aadharRadio">
                      Aadhar
                    </label>
                  </div>
                </div>
                {selectedIdType === "NRIC" && (
                  <div className="row">
                    <div className="col-md-6 col-12 mb-3 ">
                      <div className="mb-2">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          NRIC Fin<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="NRICFin"
                          className={`form-control form-control-sm  ${formik.touched.NRICFin && formik.errors.NRICFin
                            ? "is-invalid"
                            : ""
                            }`}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          {...formik.getFieldProps("NRICFin")}
                        />
                        {formik.touched.NRICFin && formik.errors.NRICFin && (
                          <div className="invalid-feedback">
                            {formik.errors.NRICFin}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-12 mb-3 ">
                      <div className="mb-2">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          NRIC Type<span className="text-danger">*</span>
                        </label>
                        <select
                          name="NRICType"
                          className={`form-select form-select-sm ${formik.touched.NRICType && formik.errors.NRICType
                            ? "is-invalid"
                            : ""
                            }`}
                          {...formik.getFieldProps("NRICType")}
                        >
                          <option selected></option>
                          <option value="Singapore Citizen">
                            Singapore Citizen
                          </option>
                          <option value="Singapore PR">Singapore PR</option>
                          <option value="Employment Pass">Employment Pass</option>
                          <option value="Dependant Pass">Dependant Pass</option>
                          <option value="S-Pass">S-Pass</option>
                          <option value="Work Permit">Work Permit</option>
                        </select>
                        {formik.touched.NRICType && formik.errors.NRICType && (
                          <div className="invalid-feedback">
                            {formik.errors.NRICType}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {selectedIdType === "AADHAR" && (
                  <div className="col-md-6 col-12 mb-3 ">
                    <div className="mb-2">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Aadhar Number<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="aadharNumber"
                        className={`form-control form-control-sm ${formik.touched.aadharNumber &&
                          formik.errors.aadharNumber
                          ? "is-invalid"
                          : ""
                          }`}

                        {...formik.getFieldProps("aadharNumber")}
                      />
                      {formik.touched.aadharNumber &&
                        formik.errors.aadharNumber && (
                          <div className="invalid-feedback">
                            {formik.errors.aadharNumber}
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3 ">
                <div className="mb-2">
                  <label for="exampleFormControlInput1" className="form-label">
                    Employee Date of Joining
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="empDateOfJoin"
                    className={`form-control form-control-sm ${formik.touched.empDateOfJoin && formik.errors.empDateOfJoin
                      ? "is-invalid"
                      : ""
                      }`}

                    {...formik.getFieldProps("empDateOfJoin")}
                  />
                  {formik.touched.empDateOfJoin &&
                    formik.errors.empDateOfJoin && (
                      <div className="invalid-feedback">
                        {formik.errors.empDateOfJoin}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-4">
                <label className="">Employee Type</label>
                <span className="text-danger">*</span>
                <select
                  {...formik.getFieldProps("empType")}
                  name="empType"
                  className={`form-select form-select-sm ${formik.touched.empType && formik.errors.empType
                    ? "is-invalid"
                    : ""
                    }`}

                >
                  <option selected></option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Hourly Basis">Hourly Basis</option>
                </select>
                {formik.touched.empType && formik.errors.empType && (
                  <div className="invalid-feedback">{formik.errors.empType}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <div className="mb-2">
                  <label for="exampleFormControlInput1" className="form-label">
                    Notice Period<span className="text-danger">*</span>
                  </label>
                  <select
                    type="text"
                    className={`form-select form-select-sm ${formik.touched.noticePeriod &&
                      formik.errors.noticePeriod
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("noticePeriod")}
                  >
                    <option selected></option>
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                    <option value="90 days">90 days</option>
                  </select>
                  {formik.touched.noticePeriod && formik.errors.noticePeriod && (
                    <div className="invalid-feedback">
                      {formik.errors.noticePeriod}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <div className="mb-2">
                  <label for="exampleFormControlInput1" className="form-label">
                    Reporting Manager Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="repManagerName"
                    className={`form-control form-control-sm ${formik.touched.repManagerName &&
                      formik.errors.repManagerName
                      ? "is-invalid"
                      : ""
                      }`}

                    {...formik.getFieldProps("repManagerName")}
                  />
                  {formik.touched.repManagerName &&
                    formik.errors.repManagerName && (
                      <div className="invalid-feedback">
                        {formik.errors.repManagerName}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EmployeeAdminAdd;
