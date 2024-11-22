import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import api from "../../../../config/URL";

const EmpPersonalInfoEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [employeProfile, setEmployeeProfile] = useState("");
    const cmpId = localStorage.getItem("cmpId");
    const [companyData, setCompanyData] = useState(null);
    const [departmentData, setDepartmentData] = useState(null);
    const [selectedIdType, setSelectedIdType] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const roleName = localStorage.getItem("role");
  
    const validationSchema = Yup.object({
      firstName: Yup.string().required("*First name is required"),
      lastName: Yup.string().required("*Last name is required"),
      empPriPhNumber: Yup.number()
        .required("*Primary phone number is required")
        .typeError("*Must be a number"),
      email: Yup.string()
        .email("*Enter valid email")
        .required("*Primary email id is required"),
      password: Yup.string().required("*Primary email password is required"),
    });
  
    const formik = useFormik({
      initialValues: {
        empRegCmpId: cmpId,
        firstName: "",
        lastName: "",
        empPriPhNumber: "",
        email: "",
        password: "",
        NRICFin: "",
        NRICType: "",
        aadharNumber: "",
        empRegDeptId: "",
        empDesignation: "",
        proof: "",
        empDateOfJoin: "",
        empType: "",
        noticePeriod: "",
        repManagerName: "",
        file: "",
        roleName: "",
        citizenship: "",
        nationality: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("object",values)
        setLoadIndicators(true);
        handleNext()
        setLoadIndicators(false);
        // try {
        //   const formData = new FormData();
        //   formData.append("empRegCmpId", cmpId);
        //   formData.append("firstName", values.firstName);
        //   formData.append("lastName", values.lastName);
        //   formData.append("empPriPhNumber", values.empPriPhNumber);
        //   formData.append("email", values.email);
        //   formData.append("password", values.password);
        //   formData.append("NRICFin", values.NRICFin);
        //   formData.append("NRICType", values.NRICType);
        //   formData.append("aadharNumber", values.aadharNumber);
        //   formData.append("empRegDeptId", values.empRegDeptId);
        //   formData.append("file", values.file);
        //   formData.append("proof", selectedIdType);
        //   formData.append("empDesignation", values.empDesignation);
        //   formData.append("empDateOfJoin", values.empDateOfJoin);
        //   formData.append("empType", values.empType);
        //   formData.append("noticePeriod", values.noticePeriod);
        //   formData.append("repManagerName", "Ragul");
        //   formData.append("roleName", values.roleName);
  
        //   const response = await api.put("", formData);
        //   if (response.status === 201) {
        //     toast.success(response.data.message);
        //     navigate("/employee");
        //   } else {
        //     toast.error(response.data.message);
        //   }
        // } catch (error) {
        //   toast.error(error);
        // } finally {
        //   setLoadIndicators(false);
        // }
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

    // useEffect(() => {
    //   const getData = async () => {
    //     try {
    //       const response = await api.get(`emp-reg-details-by-companyId/${formData.empId}`);
    //       formik.setValues(response.data);
    //       console.log("Employee response", response.data)
    //       setEmployeeProfile(response.data.files);
    //     } catch (error) {
    //       // console.log(error.message);
    //       toast.error("Error Fetching Data ", error.message);
    //     }
    //   };
    //   getData();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useImperativeHandle(ref, () => ({
      personalInfo: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid px-2  minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
          <div className="row mt-3 me-2">
          <p className="headColor">Personal Information</p>
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
                    className={`form-control form-control-sm  ${
                      formik.touched.firstName && formik.errors.firstName
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
                    className={`form-control form-control-sm  ${
                      formik.touched.lastName && formik.errors.lastName
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
                    className={`form-control form-control-sm ${
                      formik.touched.email && formik.errors.email
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
                    Primary Email Password{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div className={`input-group mb-3`}>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`form-control form-control-sm ${
                        formik.touched.password && formik.errors.password
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

              <div className="col-md-6 col-12 mb-3 ">
                <div className="mb-2">
                  <label className="form-label">
                    Primary Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="empPriPhNumber"
                    className={`form-control form-control-sm  ${
                      formik.touched.empPriPhNumber &&
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
                    className={`form-select form-select-sm  ${
                      formik.touched.empRegDeptId && formik.errors.empRegDeptId
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
                  {formik.touched.empRegDeptId &&
                    formik.errors.empRegDeptId && (
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
                    className={`form-control form-control-sm  ${
                      formik.touched.empDesignation &&
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
                  className={`form-control form-control-sm ${
                    formik.touched.file && formik.errors.file
                      ? "is-invalid"
                      : ""
                  }`}
                  accept=".jpg, .jpeg, .png" // Restrict file types
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      formik.setFieldValue("file", file);
                    }
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="invalid-feedback">{formik.errors.file}</div>
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
                          className={`form-control form-control-sm  ${
                            formik.touched.NRICFin && formik.errors.NRICFin
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
                          className={`form-select form-select-sm ${
                            formik.touched.NRICType && formik.errors.NRICType
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
                        className={`form-control form-control-sm ${
                          formik.touched.aadharNumber &&
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
                    className={`form-control form-control-sm ${
                      formik.touched.empDateOfJoin &&
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
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Employee Type <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <select
                    {...formik.getFieldProps("empType")}
                    className={`form-select form-select-sm  ${
                      formik.touched.empType && formik.errors.empType
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
                    <div className="invalid-feedback">
                      {formik.errors.empType}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <div className="mb-2">
                  <label for="exampleFormControlInput1" className="form-label">
                    Notice Period<span className="text-danger">*</span>
                  </label>
                  <select
                    type="text"
                    className={`form-select form-select-sm ${
                      formik.touched.noticePeriod && formik.errors.noticePeriod
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
                  {formik.touched.noticePeriod &&
                    formik.errors.noticePeriod && (
                      <div className="invalid-feedback">
                        {formik.errors.noticePeriod}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Role <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <select
                    {...formik.getFieldProps("roleName")}
                    className={`form-select form-select-sm  ${
                      formik.touched.roleName && formik.errors.roleName
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected></option>
                    <option value="Employee">Employee</option>
                    {departmentData &&
                      departmentData.map((deptId) => (
                        <option key={deptId.deptId} value={deptId.deptId}>
                          {deptId.deptName}
                        </option>
                      ))}
                  </select>
                  {formik.touched.roleName &&
                    formik.errors.roleName && (
                      <div className="invalid-feedback">
                        {formik.errors.roleName}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Citizenship <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <input
                    {...formik.getFieldProps("citizenship")}
                    className={`form-select form-select-sm  ${
                      formik.touched.citizenship && formik.errors.citizenship
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.citizenship &&
                    formik.errors.citizenship && (
                      <div className="invalid-feedback">
                        {formik.errors.citizenship}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                Nationality <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <input
                    {...formik.getFieldProps("nationality")}
                    className={`form-select form-select-sm  ${
                      formik.touched.nationality && formik.errors.nationality
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.nationality &&
                    formik.errors.nationality && (
                      <div className="invalid-feedback">
                        {formik.errors.nationality}
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
);

export default EmpPersonalInfoEdit;
