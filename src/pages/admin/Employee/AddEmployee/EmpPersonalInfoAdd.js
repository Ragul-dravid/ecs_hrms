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

const EmpPersonalInfoAdd = forwardRef(
  ({ values, setLoadIndicators, setData, handleNext }, ref) => {
    const [selectedIdType, setSelectedIdType] = useState("nric");
    const [employeProfile, setEmployeeProfile] = useState("");
    const validationSchema = Yup.object({
      firstName: Yup.string().required("*First name is required"),
      lastName: Yup.string().required("*Last name is required"),
      empPriPhNumber: Yup.number()
        .required("*Primary phone number is required")
        .typeError("*Must be a number"),
      empPriEmail: Yup.string()
        .email("*Enter valid email")
        .required("*Primary email id is required"),
      empPriEmailPassword: Yup.string().required(
        "*Primary email password is required"
      ),
      file: Yup.string().required("*File is required"),
      // employeedesignation: Yup.string().required(
      //   "*Employee designation is required"
      // ),
      // ...(selectedIdType === "nric" && {
      //   NRICFin: Yup.string().required("*NRIC fin is required"),
      //   NRICType: Yup.string().required("*Select a NRIC type"),
      // }),
      // ...(selectedIdType === "aadhar" && {
      //   aadharNumber: Yup.string().required("*Aadhar number is required"),
      // }),
    });

    const formik = useFormik({
      initialValues: {
        firstName: values?.firstName || "",
        lastName: values?.lastName || "",
        empPriPhNumber: values?.empPriPhNumber || "",
        empPriEmail: values?.empPriEmail || "",
        empPriEmailPassword: values?.empPriEmailPassword || "",
        nricfin: values?.nricfin || "",
        nrictype: values?.nrictype || "",
        empRegCmpId: values?.empRegCmpId || "1",
        empRegDeptId: values?.empRegDeptId || "2",
        file: values?.file || "",
        aadharNumber: values?.aadharNumber || "gytrhh56696",
        proof: values?.proof || "AADHAR",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        console.log("values:", values);
        try {
          const response = await api.put(
            `/updateEmployeeRegDetailsById/${values.empId}`,
            values
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            setData((prv) => ({ ...prv, ...values }));
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

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(`emp-reg-details-by-companyId/${values.empId}`);
          formik.setValues(response.data);
          console.log("Employee response", response.data)
          setEmployeeProfile(response.data.files);
        } catch (error) {
          // console.log(error.message);
          toast.error("Error Fetching Data ", error.message);
        }
      };
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      personalInfoAdd: formik.handleSubmit,
    }));

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          <div className=" border-0 mb-5">
            <div className="mb-3">
              <p class="headColor">Personal Information</p>
              <div className="container">
                <div className="row mt-3">
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      First Name<span className="text-danger">*</span>
                    </lable>
                    <input
                      className="form-control "
                      type="text"
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-danger">
                        <small>{formik.errors.firstName}</small>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Last Name<span className="text-danger">*</span>
                    </lable>
                    <input
                      name="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      className="form-control "
                      type="text"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-danger">
                        <small>{formik.errors.lastName}</small>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Primary Email ID<span className="text-danger">*</span>
                    </lable>
                    <input
                      className="form-control  form-contorl-sm"
                      name="empPriEmail"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.empPriEmail}
                    />
                    {formik.touched.empPriEmail &&
                      formik.errors.empPriEmail && (
                        <div className="error text-danger ">
                          <small>{formik.errors.empPriEmail}</small>
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Primary Email Password
                      <span className="text-danger">*</span>
                    </lable>
                    <div className={`input-group mb-3`}>
                      <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-control  ${formik.touched.empPriEmailPassword &&
                          formik.errors.empPriEmailPassword
                          ? "is-invalid"
                          : ""
                          }`}
                        {...formik.getFieldProps("empPriEmailPassword")}
                        style={{
                          borderRight: "none",
                          borderTopRightRadius: "0px",
                          borderBottomRightRadius: "0px",
                        }}
                        name="empPriEmailPassword"
                      />
                      <span
                        className={`input-group-text bg-white`}
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
                      {formik.touched.empPriEmailPassword &&
                        formik.errors.empPriEmailPassword && (
                          <div className="invalid-feedback">
                            {formik.errors.empPriEmailPassword}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Primary Phone Number
                      <span className="text-danger">*</span>
                    </lable>
                    <input
                      className="form-control "
                      type="text"
                      name="empPriPhNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.empPriPhNumber}
                    />
                    {formik.touched.empPriPhNumber &&
                      formik.errors.empPriPhNumber && (
                        <div className="text-danger">
                          <small>{formik.errors.empPriPhNumber}</small>
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3"></div>
                  <div className="mb-3">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="proof"
                        id="nricRadio"
                        value="nric"
                        checked={selectedIdType === "nric"}
                        onChange={() => setSelectedIdType("nric")}
                      />
                      <lable className="form-check-lable" htmlFor="nricRadio">
                        NRIC
                      </lable>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="proof"
                        id="aadharRadio"
                        value="aadhar"
                        checked={selectedIdType === "aadhar"}
                        onChange={() => setSelectedIdType("aadhar")}
                      />
                      <lable className="form-check-lable" htmlFor="aadharRadio">
                        Aadhar
                      </lable>
                    </div>
                  </div>
                  {selectedIdType === "nric" && (
                    <>
                      <div className="col-md-6 col-12 mb-3">
                        <lable className="form-lable">
                          NRIC Fin<span className="text-danger">*</span>
                        </lable>
                        <input
                          className="form-control"
                          name="nricfin"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.nricfin}
                        />
                        {formik.touched.nricfin && formik.errors.nricfin && (
                          <div className="error text-danger">
                            <small>{formik.errors.nricfin}</small>
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 col-12 mb-3">
                        <lable className="form-lable">
                          NRIC Type<span className="text-danger">*</span>
                        </lable>
                        <select
                          className="form-select"
                          name="nrictype"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.nrictype}
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
                        {formik.touched.nrictype && formik.errors.nrictype && (
                          <div className="error text-danger">
                            <small>{formik.errors.nrictype}</small>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {selectedIdType === "aadhar" && (
                    <div className="col-md-6 col-12 mb-3">
                      <lable className="form-lable">
                        Aadhar Number<span className="text-danger">*</span>
                      </lable>
                      <input
                        className="form-control"
                        name="aadharNumber"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.aadharNumber}
                      />
                      {formik.touched.aadharNumber &&
                        formik.errors.aadharNumber && (
                          <div className="error text-danger">
                            <small>{formik.errors.aadharNumber}</small>
                          </div>
                        )}
                    </div>
                  )}
                  <div className="col-md-6 col-12 mb-3">
                    <lable>Photo<span className="text-danger">*</span></lable>
                    <input
                      type="file"
                      name="file"
                      className="form-control"
                      onChange={(event) => {
                        formik.setFieldValue("file", event.target.files[0]);
                      }}
                      onBlur={formik.handleBlur}
                    />
                    {/* <img src={employeProfile} alt="emp_photo" className="img-fluid mt-3" style={{ width: "200px", height: "150px" }}></img> */}
                    {formik.touched.file && formik.errors.file && (
                      <div className="error text-danger ">
                        <small>{formik.errors.file}</small>
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
);

export default EmpPersonalInfoAdd;
