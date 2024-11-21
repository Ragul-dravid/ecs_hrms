import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

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
      empSecPhNumber: Yup.number()
        .required("*Secondary phone number is required ")
        .typeError("*Must be a number"),
      empEmergencyContact: Yup.array().of(
        Yup.object().shape({
          emergencyContactName: Yup.string().required(
            "*contact name is required"
          ),
          emergencyContactNo: Yup.number()
            .required("*contact number is required")
            .typeError("*Must be a number"),
          emergencyContactAddress: Yup.string().required(
            "*contact address is required"
          ),
        })
      ),
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
        emergencyContactName: formData.emergencyContactName || "",
        emergencyContactNo: formData.emergencyContactNo || "",
        emergencyContactAddress: formData.emergencyContactAddress || "",
        relationshipOfEmployee: formData.relationshipOfEmployee || "",
        // empSecEmail: formData.empSecEmail,
        // empSecEmailPassword: formData.empSecEmailPassword,
        empSecPhNumber: formData.empSecPhNumber,
        empEmergencyContact: [
          {
            emergencyContactName: formData.emergencyContactName || "",
            emergencyContactNo: formData.emergencyContactNo || "",
            emergencyContactAddress: formData.emergencyContactAddress || "",
          },
        ],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("object",values)
        setLoadIndicators(true);
        // values.perDetailsEmpId = formData.empId;
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
    const addRow = () => {
      const newContact = {
        emergencyContactName: "",
        emergencyContactNo: "",
        emergencyContactAddress: "",
        relationshipOfEmployee: "",
      };
      const updatedContacts = [
        ...formik.values.empEmergencyContact,
        newContact,
      ];
      formik.setFieldValue("empEmergencyContact", updatedContacts);
    };
    const removeRow = (index) => {
      const updatedEntities = [...formik.values.empEmergencyContact];
      updatedEntities.splice(index, 1);
      formik.setFieldValue("empEmergencyContact", updatedEntities);
    };

    useImperativeHandle(ref, () => ({
      contactDetails: formik.handleSubmit,
    }));

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
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="headColor mt-3">Emergency Contact</p>
            <button
              type="button"
              onClick={addRow}
              className="btn btn-sm text-primary shadow-none pt-3 border-none"
            >
              <CiCirclePlus size={30} />
            </button>
          </div>
          {formik.values.empEmergencyContact.map((row, index) => (
            <div key={index}>
                <div className="row mt-5 align-items-center">
                  <div className="col-md-11 col-12">
                    <div className="row">
                      <div className="col-md-4 col-12 mb-3">
                        <input
                          className="form-control custom-input"
                          type="text"
                          placeholder="Contact Name"
                          name={`empEmergencyContact[${index}].emergencyContactName`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empEmergencyContact[index]
                              ?.emergencyContactName || ""
                          }
                        />
                        {formik.touched.empEmergencyContact?.[index]
                          ?.emergencyContactName &&
                          formik.errors.empEmergencyContact?.[index]
                            ?.emergencyContactName && (
                            <div className="text-danger mt-1">
                              <small>
                                {
                                  formik.errors.empEmergencyContact[index]
                                    .emergencyContactName
                                }
                              </small>
                            </div>
                          )}
                      </div>
                      <div className="col-md-4 col-12 mb-3">
                        <input
                          className="form-control custom-input"
                          type="text"
                          placeholder="Contact Number"
                          name={`empEmergencyContact[${index}].emergencyContactNo`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empEmergencyContact[index]
                              ?.emergencyContactNo || ""
                          }
                        />
                        {formik.touched.empEmergencyContact?.[index]
                          ?.emergencyContactNo &&
                          formik.errors.empEmergencyContact?.[index]
                            ?.emergencyContactNo && (
                            <div className="text-danger mt-1">
                              <small>
                                {
                                  formik.errors.empEmergencyContact[index]
                                    .emergencyContactNo
                                }
                              </small>
                            </div>
                          )}
                      </div>
                      <div className="col-md-4 col-12 mb-3">
                        <input
                          className="form-control custom-input"
                          type="text"
                          placeholder="Contact Address"
                          name={`empEmergencyContact[${index}].emergencyContactAddress`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empEmergencyContact[index]
                              ?.emergencyContactAddress || ""
                          }
                        />
                        {formik.touched.empEmergencyContact?.[index]
                          ?.emergencyContactAddress &&
                          formik.errors.empEmergencyContact?.[index]
                            ?.emergencyContactAddress && (
                            <div className="text-danger mt-1">
                              <small>
                                {
                                  formik.errors.empEmergencyContact[index]
                                    .emergencyContactAddress
                                }
                              </small>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1 col-12 text-start">
                    {formik.values.empEmergencyContact.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm text-danger border-none shadow-none"
                        onClick={() => removeRow(index)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    )}
                  </div>
                </div>

            </div>
          ))}
        </form>
      </div>
    );
  }
);

export default EmpContactDetailsEdit;
