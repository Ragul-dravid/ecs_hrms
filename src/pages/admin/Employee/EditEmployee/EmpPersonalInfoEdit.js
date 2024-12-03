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
import DepartmentAdd from "../../Settings/Department/DepartmentAdd";
import { Link } from "react-router-dom";
import departmentListByCompId from "../../List_Apis/DepartmentListByCmpId";

const EmpPersonalInfoEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const cmpId = sessionStorage.getItem("cmpId");
    const [designationData, setDesignationData] = useState([]);
    const [departmentData, setDepartmentData] = useState(null);
    console.log("FormData:", formData);
    const [selectedIdType, setSelectedIdType] = useState("");
    // const [showPassword, setShowPassword] = React.useState(false);
    const roleName = sessionStorage.getItem("role");
    console.log("object", formData.empId);

    const validationSchema = Yup.object({
      firstName: Yup.string().required("*First name is required"),
      lastName: Yup.string().required("*Last name is required"),
      empPriPhNumber: Yup.number()
        .required("*Primary phone number is required")
        .typeError("*Must be a number"),
      email: Yup.string()
        .email("*Enter a valid email")
        .required("*Primary email is required"),
      // password: Yup.string().required("*Password is required"),
      NRICFin: Yup.string().nullable(), // Optional field
      nationality: Yup.string().nullable(), // Optional field
      citizenship: Yup.string().nullable(), // Optional field
      NRICType: Yup.string().nullable(), // Optional field
      aadharNumber: Yup.string()
        .matches(/^\d{12}$/, "*Aadhar number must be a 12-digit number")
        .nullable(), // Aadhar-specific validation
      empRegDeptId: Yup.string().required("*Department is required"),
      empDesignation: Yup.string().nullable(), // Optional field
      proof: Yup.string().nullable(), // Optional field
      empDateOfJoin: Yup.date()
        .required("*Date of joining is required")
        .typeError("*Enter a valid date"),
      empType: Yup.string().nullable(), // Optional field
      noticePeriod: Yup.string().nullable(), // Optional field
      repManagerName: Yup.string().nullable(), // Optional field
      // file: Yup.mixed().required("*Photo is required"),
      // roleName: Yup.string().nullable(), // Optional field
      pan: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "*Enter a valid PAN number")
        .nullable(), // PAN-specific validation
    });

    const formik = useFormik({
      initialValues: {
        empRegCmpId: cmpId,
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        empPriPhNumber: formData.empPriPhNumber || "",
        email: formData.email || "",
        basicSalary: formData.basicSalary || "",
        workingType: formData.workingType || "",
        // password: formData.password || "",
        NRICFin: formData.NRICFin || "",
        nationality: formData.nationality || "",
        citizenship: formData.citizenship || "",
        NRICType: formData.NRICType || "",
        aadharNumber: formData.aadharNumber || "",
        empRegDeptId: formData.empRegDeptId || "",
        empDesignation: formData.empDesignation || "",
        proof: formData.proof || "",
        empDateOfJoin: formData.empDateOfJoin || "",
        empType: formData.empType || "",
        noticePeriod: formData.noticePeriod || "",
        repManagerName: formData.repManagerName || "",
        roleName: formData.roleName || "",
        pan: formData.pan || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        setFormData((prev) => ({ ...prev, ...values }));
        try {
          const formDatas = new FormData();
          formDatas.append("empRegCmpId", cmpId);
          formDatas.append("firstName", values.firstName);
          formDatas.append("lastName", values.lastName);
          formDatas.append("empPriPhNumber", values.empPriPhNumber);
          formDatas.append("email", values.email);
          formDatas.append("basicSalary", values.basicSalary);
          formDatas.append("workingType", values.workingType);
          // formDatas.append("password", values.password);
          formDatas.append("NRICFin", values.NRICFin || "");
          formDatas.append("NRICType", values.NRICType || "");
          formDatas.append("aadharNumber", values.aadharNumber);
          formDatas.append("empRegDeptId", values.empRegDeptId);
          // formDatas.append("file", values.file || "");
          formDatas.append("proof", selectedIdType);
          formDatas.append("empDesignation", values.empDesignation);
          formDatas.append("empDateOfJoin", values.empDateOfJoin);
          formDatas.append("empType", values.empType);
          formDatas.append("noticePeriod", values.noticePeriod);
          formDatas.append("citizenship", values.citizenship);
          formDatas.append("nationality", values.nationality);
          formDatas.append("roleName", "EMPLOYEE");
          formDatas.append("pan", values.pan);

          const response = await api.put(
            `/emp-reg-details/${formData.empId}`,
            formDatas
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prev) => ({ ...prev, ...values }));
            handleNext();
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

    const fetchData = async () => {
      try {
        const departmentData = await departmentListByCompId();
        setDepartmentData(departmentData);
      } catch (error) {
        toast.error(error);
      }
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

    const handleDepartmentChange = (event) => {
      const selectedDeptId = event.target.value;
      formik.setFieldValue("empRegDeptId", selectedDeptId);

      if (selectedDeptId) {
        fetchDesignationData(cmpId, selectedDeptId);
      }
    };

    // Callback to add a new department
    const addDepartment = (newDepartment) => {
      setDepartmentData((prevData) => [...prevData, newDepartment]);
    };

    // const togglePasswordVisibility = () => {
    //   setShowPassword(!showPassword);
    // };

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(`emp-reg-details/${formData.empId}`);
          // formik.setValues(response.data);
          setSelectedIdType(response.data.nationality);
          formik.setValues({
            ...response.data,
            proof: response.data.proof === "AADHAR" || "NRIC",
          });
          console.log("123", response.data.empPersonalDetailsEntities);
          console.log("Employee response", response.data);
        } catch (error) {
          // console.log(error.message);
          toast.error("Error Fetching Data ", error.message);
        }
      };
      getData();
      fetchData();
    }, []);

    useImperativeHandle(ref, () => ({
      personalInfo: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid px-2  minHeight m-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="row my-2">
            <p className="headColor">Primary Information</p>
          </div>
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
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>
            </div>
            {/* <div className="col-md-6 col-12 mb-3">
              <div className="mb-2">
                <label className="form-label">
                  Primary Email Password <span className="text-danger">*</span>
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
            </div> */}
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
              <div className="d-flex justify-content-between align-items-center">
                <label className="form-label">
                  Department Name <span className="text-danger">*</span>
                </label>
                {/* <DepartmentAdd addDepartment={addDepartment} /> */}
              </div>
              <div className="input-group mb-3">
                <select
                  {...formik.getFieldProps("empRegDeptId")}
                  className={`form-select form-select-sm  ${
                    formik.touched.empRegDeptId && formik.errors.empRegDeptId
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
                <select
                  type="text"
                  name="empDesignation"
                  className={`form-select form-select-sm  ${
                    formik.touched.empDesignation &&
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
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Nationality <span className="text-danger">*</span>
              </label>
              <select
                name="nationality"
                className={`form-select form-select-sm ${
                  formik.touched.nationality && formik.errors.nationality
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.nationality}
                onChange={(e) => {
                  formik.handleChange(e);
                  if (e.target.value === "indian") {
                    setSelectedIdType("AADHAR");
                  } else if (e.target.value === "singaporean") {
                    setSelectedIdType("NRIC");
                  }
                }}
              >
                <option value="singaporean">Singaporean</option>
                <option value="indian">Indian</option>
                <option value="muslim">Muslim</option>
                <option value="eurasian">Eurasian</option>
                <option value="chinese">Chinese</option>
              </select>
              {formik.touched.nationality && formik.errors.nationality && (
                <div className="invalid-feedback">
                  {formik.errors.nationality}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Citizenship <span className="text-danger">*</span>
              </label>
              <select
                name="citizenship"
                className={`form-select form-select-sm ${
                  formik.touched.citizenship && formik.errors.citizenship
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
            <div>
              {(selectedIdType === "singaporean" ||
                selectedIdType === "NRIC") && (
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
              {(selectedIdType === "indian" || selectedIdType === "AADHAR") && (
                <div className="row">
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
                  <div className="col-md-6 col-12 mb-3 ">
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
                        className={`form-control form-control-sm ${
                          formik.touched.pan && formik.errors.pan
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
            <div className="col-md-6 col-12 mb-3 ">
              <div className="mb-2">
                <label for="exampleFormControlInput1" className="form-label">
                  Basic Salary
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="basicSalary"
                  className={`form-control form-control-sm ${
                    formik.touched.basicSalary && formik.errors.basicSalary
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
                    formik.touched.empDateOfJoin && formik.errors.empDateOfJoin
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
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Working Type <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <select
                    {...formik.getFieldProps("workingType")}
                    className={`form-select form-select-sm  ${
                      formik.touched.workingType && formik.errors.workingType
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected></option>
                    <option value="Hour">Hour</option>
                    <option value="Week">Week</option>
                    <option value="Day">Days</option>
                  </select>
                  {formik.touched.workingType && formik.errors.workingType && (
                    <div className="invalid-feedback">
                      {formik.errors.workingType}
                    </div>
                  )}
                </div>
              </div>
            )}
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
                  <option value="NILL">NILL</option>
                  <option value="15 days">15 days</option>
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
            {/* <div className="col-md-6 col-12 mb-2">
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
                {formik.touched.roleName && formik.errors.roleName && (
                  <div className="invalid-feedback">
                    {formik.errors.roleName}
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </form>
      </div>
    );
  }
);

export default EmpPersonalInfoEdit;
