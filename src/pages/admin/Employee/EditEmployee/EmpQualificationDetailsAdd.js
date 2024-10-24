import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../../../config/URL";

const EmpQualificationDetailsAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [rows, setRows] = useState([{}]);
    const [rows1, setRows1] = useState([{}]);

    const validationSchema = Yup.object().shape({
      empQualificationEntities: Yup.array().of(
        Yup.object().shape({
          qualName: Yup.string().required(
            "*Qualification name is required"
          ),
          qualType: Yup.string().required(
            "*Qualification type is required"
          ),
          qualFldOfStudy: Yup.string().required("*Field of study is required"),
          qualModeOfStudy: Yup.string().required("*Mode of study is required"),
          qualStartDate: Yup.string().required("*Start date is required"),
          qualEndDate: Yup.string().required("*End date is required"),
          qualInstitution: Yup.string().required("*Institution is required"),
          employeeSkill: Yup.string().required("*Employee skill is required"),
          skillDescription: Yup.string().required("*Skill description is required"),
        })
      ),
    });

    const formik = useFormik({
      initialValues: {
        empQualificationEntities: [
          {
            qualName: formData.qualName || "",
            qualType: formData.qualType || "",
            qualFldOfStudy: formData.qualFldOfStudy || "",
            qualModeOfStudy: formData.qualModeOfStudy || "",
            qualStartDate: formData.qualStartDate || "",
            qualEndDate: formData.qualEndDate || "",
            qualInstitution: formData.qualInstitution || "",
            employeeSkill: formData.employeeSkill || "",
            skillDescription: formData.skillDescription || "",
          },
        ],
      },
      // validationSchema: validationSchema,
      onSubmit: async (values) => {
        // console.log("Body Values is ", values)
        setLoadIndicators(true);
        values.qualEmpId = formData.empId;
        // try {
        //   const response = await api.post(
        //     `/addEmpQualification`, values
        //   );
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
      qualificationDetailsAdd: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        {/* {/ Qualification Details /} */}
        <form onSubmit={formik.handleSubmit}>
          {rows.map((row, index) => (
            <div className="border-0 mb-5" key={index}>
              <div>
                <div className="border-0 my-2">
                  <p className="headColor">Qualification Details</p>
                  <div className="container pt-3">
                    <div className="row mt-3">
                      <div className="col-md-6 col-12 mb-3">
                        <lable className="form-label">
                          Qualification Name
                          <span className="text-danger">*</span>
                        </lable>
                        <input
                          className="form-control "
                          type="text"
                          name={`empQualificationEntities[${index}].qualName`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empQualificationEntities[index]
                              ?.qualName || ""
                          }
                        />
                        {formik.touched.empQualificationEntities?.[index]
                          ?.qualName &&
                          formik.errors.empQualificationEntities?.[index]
                            ?.qualName && (
                            <div className="text-danger">
                              <small>
                                {
                                  formik.errors.empQualificationEntities[index]
                                    .qualName
                                }
                              </small>
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-3">
                        <lable className="form-label">
                          Qualification Type
                          <span className="text-danger">*</span>
                        </lable>
                        <select
                          className="form-select"
                          name={`empQualificationEntities[${index}].qualType`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empQualificationEntities[index]
                              ?.qualType || ""
                          }
                        >
                          <option selected></option>
                          <option value="Masters">Masters</option>
                          <option value="Bachelor">Bachelor</option>
                          <option value="Diploma">Diploma</option>
                          <option value="PG Diploma">PG Diploma</option>
                        </select>
                        {formik.touched.empQualificationEntities?.[index]
                          ?.qualType &&
                          formik.errors.empQualificationEntities?.[index]
                            ?.qualType && (
                            <div className="text-danger">
                              <small>
                                {
                                  formik.errors.empQualificationEntities[index]
                                    .qualType
                                }
                              </small>
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-3">
                        <lable className="form-label">
                          Field of Study
                          <span className="text-danger">*</span>
                        </lable>
                        <select
                          className="form-select"
                          name={`empQualificationEntities[${index}].qualFldOfStudy`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empQualificationEntities[index]
                              ?.qualFldOfStudy || ""
                          }
                        >
                          <option selected></option>
                          <option value="Information Technology">
                            Information Technology
                          </option>
                          <option value="Business">Business</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Accounting">Accounting</option>
                          <option value="Banking">Banking</option>
                          <option value="Finance">Finance</option>
                        </select>
                        {formik.touched.empQualificationEntities?.[index]
                          ?.qualFldOfStudy &&
                          formik.errors.empQualificationEntities?.[index]
                            ?.qualFldOfStudy && (
                            <div className="text-danger">
                              <small>
                                {
                                  formik.errors.empQualificationEntities[index]
                                    .qualFldOfStudy
                                }
                              </small>
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-3">
                        <lable className="form-label">
                          Mode of Study
                          <span className="text-danger">*</span>
                        </lable>
                        <select
                          className="form-select"
                          name={`empQualificationEntities[${index}].qualModeOfStudy`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empQualificationEntities[index]
                              ?.qualModeOfStudy || ""
                          }
                        >
                          <option selected></option>
                          <option value="Full time">Full time</option>
                          <option value="Part time">Part time</option>
                          <option value="Distance Education">
                            Distance Education
                          </option>
                        </select>
                        {formik.touched.empQualificationEntities?.[index]
                          ?.qualModeOfStudy &&
                          formik.errors.empQualificationEntities?.[index]
                            ?.qualModeOfStudy && (
                            <div className="text-danger">
                              <small>
                                {
                                  formik.errors.empQualificationEntities[index]
                                    .qualModeOfStudy
                                }
                              </small>
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-3">
                        <lable className="form-label">
                          Start Date
                          <span className="text-danger">*</span>
                        </lable>
                        <input
                          className="form-control  form-contorl-sm"
                          type="date"
                          name={`empQualificationEntities[${index}].qualStartDate`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empQualificationEntities[index]?.qualStartDate ||
                            ""
                          }
                        />

                        {formik.touched.empQualificationEntities?.[index]?.qualStartDate &&
                          formik.errors.empQualificationEntities?.[index]
                            ?.qualStartDate && (
                            <div className="text-danger">
                              <small>
                                {
                                  formik.errors.empQualificationEntities[index]
                                    .qualStartDate
                                }
                              </small>
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-3">
                        <lable className="form-label">
                          End Date
                          <span className="text-danger">*</span>
                        </lable>
                        <input
                          className="form-control  form-contorl-sm"
                          type="date"
                          name={`empQualificationEntities[${index}].qualEndDate`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empQualificationEntities[index]?.qualEndDate || ""
                          }
                        />

                        {formik.touched.empQualificationEntities?.[index]?.qualEndDate &&
                          formik.errors.empQualificationEntities?.[index]?.qualEndDate && (
                            <div className="text-danger">
                              <small>
                                {formik.errors.empQualificationEntities[index].qualEndDate}
                              </small>
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12">
                        <lable className="form-label">
                          Institution
                          <span className="text-danger">*</span>
                        </lable>
                        <input
                          className="form-control  form-contorl-sm"
                          type="text"
                          name={`empQualificationEntities[${index}].qualInstitution`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empQualificationEntities[index]
                              ?.qualInstitution || ""
                          }
                        />

                        {formik.touched.empQualificationEntities?.[index]
                          ?.qualInstitution &&
                          formik.errors.empQualificationEntities?.[index]
                            ?.qualInstitution && (
                            <div className="text-danger">
                              <small>
                                {
                                  formik.errors.empQualificationEntities[index]
                                    .qualInstitution
                                }
                              </small>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col-12 mb-4">
              <button
                type="button"
                onClick={() => {
                  setRows((prev) => [...prev, {}]); // Add a new row for each parent
                }}
                className="btn btn-button btn-sm"
              >
                Add More
              </button>{" "}
              &nbsp;&nbsp;
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => setRows((prev) => prev.slice(0, -1))}
                  className="btn btn-outline-danger"
                >
                  <FaRegTrashAlt />
                </button>
              )}
            </div>
          </div>

          {/* {/ Skils /} */}
          {rows1.map((row, index) => (
            <div className="border-0 mb-5" key={index}>
              <div>
                <div className=" border-0 my-2">
                  <p className="headColor">Skills</p>
                  <div className="container pt-3">
                    <div className="row mt-2">
                      <div className="col-md-6 col-12">
                        <lable className="form-label">
                          Employee Skill
                          <span className="text-danger">*</span>
                        </lable>
                        <input
                          className="form-control"
                          type="text"
                          name={`empQualificationEntities[${index}].employeeSkill`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empQualificationEntities[index]
                              ?.employeeSkill || ""
                          }
                        />
                        {formik.touched.empQualificationEntities?.[index]
                          ?.employeeSkill &&
                          formik.errors.empQualificationEntities?.[index]
                            ?.employeeSkill && (
                            <div className="text-danger">
                              <small>
                                {
                                  formik.errors.empQualificationEntities[index]
                                    .employeeSkill
                                }
                              </small>
                            </div>
                          )}
                      </div>
                      <div className="col-md-6 col-12 mb-3">
                        <lable className="form-label">
                          Skill Description
                          <span className="text-danger">*</span>
                        </lable>
                        <textarea
                          className="form-control  form-contorl-sm"
                          type="text"
                          rows={5}
                          name={`empQualificationEntities[${index}].skillDescription`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            formik.values.empQualificationEntities[index]
                              ?.skillDescription || ""
                          }
                        />

                        {formik.touched.empQualificationEntities?.[index]
                          ?.skillDescription &&
                          formik.errors.empQualificationEntities?.[index]
                            ?.skillDescription && (
                            <div className="text-danger">
                              <small>
                                {
                                  formik.errors.empQualificationEntities[index]
                                    .skillDescription
                                }
                              </small>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="row">
            <div className="col-12 mb-4">
              <button
                type="button"
                onClick={() => {
                  setRows1((prev) => [...prev, {}]); // Add a new row for each parent
                }}
                className="btn btn-button btn-sm"
              >
                Add More
              </button>{" "}
              &nbsp;&nbsp;
              {rows1.length > 1 && (
                <button
                  type="button"
                  onClick={() => setRows1((prev) => prev.slice(0, -1))}
                  className="btn btn-outline-danger"
                >
                  <FaRegTrashAlt />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default EmpQualificationDetailsAdd;
