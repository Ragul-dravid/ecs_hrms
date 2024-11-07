import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import api from "../../../../config/URL";

const EmpContactDetailsEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const validationSchema = Yup.object().shape({
      dob: Yup.string().required("*Date of birth is required"),
      gender: Yup.string().required("*Select a gender"),
      // maritalStatus: Yup.string().required("*Select a marital status"),
      religion: Yup.string().required("*Religion is required "),
      // empAddr: Yup.string().required("*Address is required "),
      city: Yup.string().required("*City is required "),
      pincode: Yup.number()
        .required("*Pincode is required")
        .typeError("*Must be a number"),
      empSecEmail: Yup.string().required("*Secondary email id is required "),
      empSecEmailPassword: Yup.string().required(
        "*Secondary email password is required "
      ),
      empSecPhNumber: Yup.number()
        .required("*Secondary phone number is required ")
        .typeError("*Must be a number"),
    });

    const formik = useFormik({
      initialValues: {
        dob: formData.dob,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        religion: formData.religion,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        empSecEmail: formData.empSecEmail,
        empSecEmailPassword: formData.empSecEmailPassword,
        empSecPhNumber: formData.empSecPhNumber,
      },
      // validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        values.perDetailsEmpId = formData.empId;
        // console.log("Body Values is ", values);
        // try {
        //   const response = await api.post(`/addEmpPersonalDetails`, values);
        //   if (response.status === 201) {
        //     toast.success(response.data.message);
        //     setFormData((prv) => ({ ...prv, ...values }));
            handleNext();
        //   } else {
        //     toast.error(response.data.message);
        //   }
        // } catch (error) {
        //   toast.error(error);
        // } finally {
        setLoadIndicators(false);
        // }
      },
    });

    useImperativeHandle(ref, () => ({
      contactDetails: formik.handleSubmit,
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
              <p className="headColor">Contact Details</p>
              <div className="container">
                <div className="row mt-3">
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Date of Birth<span className="text-danger">*</span>
                    </lable>
                    <input
                      className="form-control form-control-sm "
                      type="date"
                      name="dob"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dob}
                    />
                    {formik.touched.dob && formik.errors.dob && (
                      <div className="text-danger">
                        <small>{formik.errors.dob}</small>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mb-3">
                      <div className="mb-2">
                        <lable
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Gender<span className="text-danger">*</span>
                        </lable>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="inlineRadio1"
                          value="Male"
                          onChange={formik.handleChange}
                          checked={formik.values.gender === "Male"}
                        />
                        <lable className="form-check-label" for="inlineRadio1">
                          Male
                        </lable>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="inlineRadio2"
                          value="Female"
                          onChange={formik.handleChange}
                          checked={formik.values.gender === "Female"}
                        />
                        <lable className="form-check-label" for="inlineRadio2">
                          Female
                        </lable>
                      </div>
                      {formik.errors.gender && formik.touched.gender && (
                        <div
                          className="text-danger  "
                          style={{ fontSize: ".875em" }}
                        >
                          {formik.errors.gender}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="mb-3">
                      <div className="mb-2">
                        <lable
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Marital Status<span className="text-danger">*</span>
                        </lable>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="maritalStatus"
                          id="inlineRadio3"
                          value="No"
                          onChange={formik.handleChange}
                          checked={formik.values.maritalStatus === "No"}
                        />
                        <lable className="form-check-label" for="inlineRadio3">
                          Single
                        </lable>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="maritalStatus"
                          id="inlineRadio4"
                          value="Yes"
                          onChange={formik.handleChange}
                          checked={formik.values.maritalStatus === "Yes"}
                        />
                        <lable className="form-check-label" for="inlineRadio4">
                          Married
                        </lable>
                      </div>
                      {formik.errors.maritalStatus &&
                        formik.touched.maritalStatus && (
                          <div
                            className="text-danger  "
                            style={{ fontSize: ".875em" }}
                          >
                            {formik.errors.maritalStatus}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Religion
                      <span className="text-danger">*</span>
                    </lable>
                    <input
                      className="form-control form-control-sm "
                      type="text"
                      name="religion"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.religion}
                    />
                    {formik.touched.religion && formik.errors.religion && (
                      <div className="text-danger">
                        <small>{formik.errors.religion}</small>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Address
                      <span className="text-danger">*</span>
                    </lable>
                    <textarea
                      rows="5"
                      className="form-control form-control-sm "
                      name="address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                    ></textarea>
                    {formik.touched.address && formik.errors.address && (
                      <div className="text-danger">
                        <small>{formik.errors.address}</small>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      City
                      <span className="text-danger">*</span>
                    </lable>
                    <input
                      className="form-control form-control-sm "
                      type="text"
                      name="city"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="text-danger">
                        <small>{formik.errors.city}</small>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Pincode
                      <span className="text-danger">*</span>
                    </lable>
                    <input
                      className="form-control form-control-sm "
                      type="text"
                      name="pincode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pincode}
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                      <div className="text-danger">
                        <small>{formik.errors.pincode}</small>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Secondary Email ID
                      <span className="text-danger">*</span>
                    </lable>
                    <input
                      className="form-control form-control-sm "
                      type="email"
                      name="empSecEmail"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.empSecEmail}
                    />
                    {formik.touched.empSecEmail &&
                      formik.errors.empSecEmail && (
                        <div className="text-danger">
                          <small>{formik.errors.empSecEmail}</small>
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Secondary Email Password
                      <span className="text-danger">*</span>
                    </lable>
                    <div className={`input-group mb-3`}>
                      <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-control form-control-sm  ${formik.touched.empSecEmailPassword &&
                            formik.errors.empSecEmailPassword
                            ? "is-invalid"
                            : ""
                          }`}
                        {...formik.getFieldProps("empSecEmailPassword")}
                        style={{
                          borderRight: "none",
                          borderTopRightRadius: "0px",
                          borderBottomRightRadius: "0px",
                        }}
                        name="empSecEmailPassword"
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
                      {formik.touched.empSecEmailPassword &&
                        formik.errors.empSecEmailPassword && (
                          <div className="invalid-feedback">
                            {formik.errors.empSecEmailPassword}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-lable">
                      Secondary Phone Number
                      <span className="text-danger">*</span>
                    </lable>
                    <input
                      className="form-control form-control-sm "
                      type="text"
                      name="empSecPhNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.empSecPhNumber}
                    />
                    {formik.touched.empSecPhNumber &&
                      formik.errors.empSecPhNumber && (
                        <div className="text-danger">
                          <small>{formik.errors.empSecPhNumber}</small>
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

export default EmpContactDetailsEdit;
