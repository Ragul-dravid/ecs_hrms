import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../../../config/URL";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
// import DepartmentAdd from "../Settings/Department/DepartmentAdd";
import departmentListByCompId from "../List_Apis/DepartmentListByCmpId";
import { FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";

function EmployeeBasicAdd() {
  const cmpId = sessionStorage.getItem("cmpId");
  const [departmentData, setDepartmentData] = useState(null);
  // console.log("departmentData:", departmentData);
  const [selectedIdType, setSelectedIdType] = useState("");
  const [designationData, setDesignationData] = useState([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loadIndicator, setLoadIndicators] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("*First name is required"),
    lastName: Yup.string().required("*Last name is required"),
    email: Yup.string()
      .email("*Enter a valid email")
      .required("*Primary email is required"),
    password: Yup.string().required("*Password is required"),
    empPriPhNumber: Yup.number()
      .required("*Primary phone number is required")
      .typeError("*Must be a number"),
    empRegDeptId: Yup.string().required("*Department is required"),
    empDesignation: Yup.string().nullable(),
    empDateOfJoin: Yup.date()
      .required("*Date of joining is required")
      .typeError("*Enter a valid date"),
    nationality: Yup.string().nullable(),
    NRICFin: Yup.string().nullable(),
    NRICType: Yup.string().nullable(),
    aadharNumber: Yup.string()
      .matches(/^\d{12}$/, "*Aadhar number must be a 12-digit number")
      .nullable(),
    pan: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "*Enter a valid PAN number")
      .nullable(),
    empType: Yup.string().nullable(),
    noticePeriod: Yup.string().nullable(),
    citizenship: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      empRegCmpId: cmpId,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      empPriPhNumber: "",
      empRegDeptId: "",
      empDesignation: "",
      empDateOfJoin: "",
      nationality: "",
      NRICFin: "",
      NRICType: "",
      aadharNumber: "",
      pan: "",
      basicSalary: "",
      empType: "",
      workingType: "",
      noticePeriod: "",
      citizenship: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Emaployee Add", values)
      setLoadIndicators(true);
      try {
        const formData = new FormData();
        formData.append("empRegCmpId", cmpId);
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("empPriPhNumber", values.empPriPhNumber);
        formData.append("NRICFin", values.NRICFin);
        formData.append("basicSalary", values.basicSalary);
        formData.append("workingType", values.workingType);
        formData.append("NRICType", values.NRICType);
        formData.append("aadharNumber", values.aadharNumber);
        formData.append("pan", values.pan);
        formData.append("empRegDeptId", values.empRegDeptId);
        formData.append("empDesignation", values.empDesignation);
        formData.append("empDateOfJoin", values.empDateOfJoin);
        formData.append("empType", values.empType);
        formData.append("noticePeriod", values.noticePeriod);
        formData.append("citizenship", values.citizenship);
        formData.append("nationality", values.nationality);

        const response = await api.post("/emp-reg-details", formData);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/employee");
        } else {
          toast.error(response?.data?.message);
        }
      } catch (e) {
        if (e.response.status === 409) {
          toast(e.response.data.message, {
            icon: <FiAlertTriangle className="text-warning" />,
          });
        } else {
          toast.error(e?.response?.data?.message);
        }
        console.log("object12", e.response.data.message);
      } finally {
        setLoadIndicators(false);
      }
    },
  });

  const fetchData = async () => {
    // try {
    //   const departmentData = await departmentListByCompId(cmpId);
    //   setDepartmentData(departmentData);
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  // Callback to add a new department
  const addDepartment = (newDepartment) => {
    setDepartmentData((prevData) => [...prevData, newDepartment]);
  };

  const fetchDesignationData = async (desigCmpId, deptId) => {
    try {
      const response = await api.get(
        `getAllDesignationIdsWithNames?desigCmpId=${desigCmpId}&deptId=${deptId}`
      );
      setDesignationData(response.data);
    } catch (error) {
      console.error("Error fetching designation data:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDepartmentChange = (event) => {
    const selectedDeptId = event.target.value;
    formik.setFieldValue("empRegDeptId", selectedDeptId);

    if (selectedDeptId) {
      fetchDesignationData(cmpId, selectedDeptId);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid px-2  minHeight m-0">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          &nbsp;Master
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/employeeBasicDetails" className="custom-breadcrumb">
            &nbsp;Employee Basic Details
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Employee Basic Details Add
        </li>
      </ol>
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
                    Add Employee Basic Details
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/employeeBasicDetails">
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
          style={{ borderRadius: "0" }}
        >
          <div className="row mt-3 me-2">
            <div className="col-12 text-end"></div>
          </div>
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-4 col-12 mb-3">
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
              <div className="col-md-4 col-12 mb-3 ">
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
              <div className="col-md-4 col-12 mb-3 ">
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
              <div className="col-md-4 col-12 mb-3">
                <div className="mb-2">
                  <label className="form-label">
                    Primary Email Password{" "}
                    <span className="text-danger">*</span>
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
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-12 mb-3 ">
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
              <div className="col-md-4 col-12 mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label">
                    Department Name <span className="text-danger">*</span>
                  </label>
                  {/* <DepartmentAdd addDepartment={addDepartment} /> */}
                </div>
                <div className="input-group mb-3">
                  <select
                    {...formik.getFieldProps("empRegDeptId")}
                    className={`form-select form-select-sm  ${formik.touched.empRegDeptId && formik.errors.empRegDeptId
                      ? "is-invalid"
                      : ""
                      }`}
                    onChange={handleDepartmentChange}
                  >
                    <option selected></option>
                    {departmentData &&
                      departmentData.map((deptId) => (
                        <option key={deptId.deptId} value={deptId.deptId}>
                          {deptId.deptName}
                        </option>
                      ))}
                  </select>
                  {formik.touched.empRegDeptId &&
                    formik.errors.empRegDeptId && (
                      <div className="invalid-feedback">
                        {formik.errors.empRegDeptId}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-4 col-12 mb-3 ">
                <div className="mb-2">
                  <label className="form-label">
                    Employee Designation <span className="text-danger">*</span>
                  </label>
                  <select
                    type="text"
                    name="empDesignation"
                    className={`form-select form-select-sm  ${formik.touched.empDesignation &&
                      formik.errors.empDesignation
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("empDesignation")}
                  >
                    <option selected></option>
                    {designationData.map((designation) => (
                      <option key={designation.id} value={designation.desigId}>
                        {designation.desigName}
                      </option>
                    ))}
                  </select>

                  {formik.touched.empDesignation &&
                    formik.errors.empDesignation && (
                      <div className="invalid-feedback">
                        {formik.errors.empDesignation}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-4 col-12 mb-3 ">
                <div className="mb-2">
                  <label for="exampleFormControlInput1" className="form-label">
                    Employee Date of Joining
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="empDateOfJoin"
                    className={`form-control form-control-sm ${formik.touched.empDateOfJoin &&
                      formik.errors.empDateOfJoin
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
              <div className="col-md-4 col-12 mb-3">
                <label className="form-label">
                  Nationality <span className="text-danger">*</span>
                </label>
                <select
                  type="text"
                  name="nationality"
                  className={`form-select form-select-sm  ${formik.touched.nationality && formik.errors.nationality
                    ? "is-invalid"
                    : ""
                    }`}
                  value={formik.values.nationality}
                  onChange={(e) => {
                    formik.handleChange(e);
                    if (e.target.value === "INDIAN") {
                      setSelectedIdType("AADHAR");
                    } else if (e.target.value === "SINGAPOREAN" || "CHINESE") {
                      setSelectedIdType("NRIC");
                    }
                  }}
                >
                  <option selected />
                  <option value="SINGAPOREAN">Singaporean</option>
                  <option value="INDIAN">Indian</option>
                  {/* <option value="muslim">Muslim</option> */}
                  {/* <option value="eurasian">Eurasian</option> */}
                  <option value="CHINESE">Chinese</option>
                </select>
                {formik.touched.nationality && formik.errors.nationality && (
                  <div className="invalid-feedback">
                    {formik.errors.nationality}
                  </div>
                )}
              </div>

              <div>
                {selectedIdType === "NRIC" && (
                  <div className="row">
                    <div className="col-md-4 col-12 mb-3 ">
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
                    <div className="col-md-4 col-12 mb-3 ">
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
                          <option value="Employment Pass">
                            Employment Pass
                          </option>
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
                  <div className="row">
                    <div className="col-md-4 col-12 mb-3 ">
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
                    <div className="col-md-4 col-12 mb-3 ">
                      <div className="mb-2">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          PAN<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="pan"
                          className={`form-control form-control-sm ${formik.touched.pan && formik.errors.pan
                            ? "is-invalid"
                            : ""
                            }`}
                          {...formik.getFieldProps("pan")}
                        />
                        {formik.touched.pan && formik.errors.pan && (
                          <div className="invalid-feedback">
                            {formik.errors.pan}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-3 ">
                <div className="mb-2">
                  <label for="exampleFormControlInput1" className="form-label">
                    Basic Salary
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="basicSalary"
                    className={`form-control form-control-sm ${formik.touched.basicSalary && formik.errors.basicSalary
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("basicSalary")}
                  />
                  {formik.touched.basicSalary && formik.errors.basicSalary && (
                    <div className="invalid-feedback">
                      {formik.errors.basicSalary}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-12 mb-2">
                <label className="form-label">
                  Employee Type <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <select
                    {...formik.getFieldProps("empType")}
                    className={`form-select form-select-sm  ${formik.touched.empType && formik.errors.empType
                      ? "is-invalid"
                      : ""
                      }`}
                  >
                    <option selected></option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="freelancer">Freelancer</option>
                  </select>
                  {formik.touched.empType && formik.errors.empType && (
                    <div className="invalid-feedback">
                      {formik.errors.empType}
                    </div>
                  )}
                </div>
              </div>
              {formik.values.empType === "freelancer" && (
                <div className="col-md-4 col-12 mb-2">
                  <label className="form-label">
                    Working Type <span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <select
                      {...formik.getFieldProps("workingType")}
                      className={`form-select form-select-sm  ${formik.touched.workingType && formik.errors.workingType
                        ? "is-invalid"
                        : ""
                        }`}
                    >
                      <option selected></option>
                      <option value="Hour">Hour</option>
                      <option value="Week">Week</option>
                      <option value="Day">Days</option>
                    </select>
                    {formik.touched.workingType &&
                      formik.errors.workingType && (
                        <div className="invalid-feedback">
                          {formik.errors.workingType}
                        </div>
                      )}
                  </div>
                </div>
              )}
              <div className="col-md-4 col-12 mb-3 ">
                <div className="mb-2">
                  <label for="exampleFormControlInput1" className="form-label">
                    Notice Period<span className="text-danger">*</span>
                  </label>
                  <select
                    type="text"
                    className={`form-select form-select-sm ${formik.touched.noticePeriod && formik.errors.noticePeriod
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("noticePeriod")}
                  >
                    <option selected></option>
                    <option value="NILL">NILL</option>
                    <option value="15 days">15 days</option>
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                    <option value="90 days">90 days</option>
                  </select>
                  {formik.touched.noticePeriod &&
                    formik.errors.noticePeriod && (
                      <div className="invalid-feedback">
                        {formik.errors.noticePeriod}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-4 col-12 mb-3">
                <label className="form-label">
                  Citizenship <span className="text-danger">*</span>
                </label>
                <select
                  name="citizenship"
                  className={`form-select form-select-sm ${formik.touched.citizenship && formik.errors.citizenship
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("citizenship")}
                >
                  <option selected></option>
                  <option value="1st Year PR">1st Year PR</option>
                  <option value="2nd Year PR">2nd Year PR</option>
                  <option value="3rd Year PR">3rd Year PR</option>
                </select>
                {formik.touched.citizenship && formik.errors.citizenship && (
                  <div className="invalid-feedback">
                    {formik.errors.citizenship}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EmployeeBasicAdd;
