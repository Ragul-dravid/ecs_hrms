import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../../../config/URL";

const EmpExperienceAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [rows, setRows] = useState([{}]);

    const validationSchema = Yup.object().shape({
      empExperience: Yup.array().of(
        Yup.object().shape({
          prevCmpName: Yup.string().required(
            "*Previous company name is required"
          ),
          prevCmpAddr: Yup.string().required(
            "*Previous company address is required"
          ),
          designation: Yup.string().required("*Designation is required"),
          experienceDesc: Yup.string().required(
            "*Experience description is required"
          ),
          experienceStartDate: Yup.string().required("*Start date is required"),
          experienceEndDate: Yup.string().required("*End date is required"),
        })
      ),
    });

    const formik = useFormik({
      initialValues: {
        empExperience: [
          {
            prevCmpName: formData.prevCmpName || "",
            prevCmpAddr: formData.prevCmpAddr || "",
            designation: formData.designation || "",
            experienceDesc: formData.experienceDesc || "",
            experienceStartDate: formData.experienceStartDate || "",
            experienceEndDate: formData.experienceEndDate || "",
          },
        ],
      },
      // validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        values.experienceEmpId = formData.empId;

        const payload = values.empExperience.map((experience) => ({
          prevCmpName: experience.prevCmpName,
          prevCmpAddr: experience.prevCmpAddr,
          designation: experience.designation,
          experienceDesc: experience.experienceDesc,
          experienceStartDate: experience.experienceStartDate,
          experienceEndDate: experience.experienceEndDate,
          experienceEmpId: formData.empId,
        }));

        // try {
        //   const response = await api.post(`/createEmpExperiences`, payload);
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
      experienceAdd: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          {rows.map((row, index) => (
            <div key={index}>
              <p class="headColor mt-3">Experience</p>
              <div className="container">
                <div className="row mt-3">
                  <div className=" col-md-6 col-12 text-start my-3">
                    <lable className="form-label">
                      Previous Company Name
                      <span className="text-danger">*</span>
                    </lable>
                    <br />
                    <input
                      className="form-control"
                      type="text"
                      name={`empExperience[${index}].prevCmpName`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.empExperience[index]?.prevCmpName || ""
                      }
                    />
                    {formik.touched.empExperience?.[index]?.prevCmpName &&
                      formik.errors.empExperience?.[index]?.prevCmpName && (
                        <div className="text-danger">
                          <small>
                            {formik.errors.empExperience[index].prevCmpName}
                          </small>
                        </div>
                      )}
                  </div>
                  <div className=" col-md-6 col-12 text-start my-3">
                    <lable className="form-label">
                      Previous Company Address
                      <span className="text-danger">*</span>
                    </lable>
                    <textarea
                      rows="5"
                      className="form-control "
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name={`empExperience[${index}].prevCmpAddr`}
                      value={
                        formik.values.empExperience[index]?.prevCmpAddr || ""
                      }
                    ></textarea>
                    {formik.touched.empExperience?.[index]?.prevCmpAddr &&
                      formik.errors.empExperience?.[index]?.prevCmpAddr && (
                        <div className="text-danger">
                          <small>
                            {formik.errors.empExperience[index].prevCmpAddr}
                          </small>
                        </div>
                      )}
                  </div>
                  <div className=" col-md-6 col-12 text-start my-3">
                    <lable className="form-label">
                      Designation
                      <span className="text-danger">*</span>
                    </lable>
                    <br />
                    <input
                      className="form-control "
                      type="text"
                      name={`empExperience[${index}].designation`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.empExperience[index]?.designation || ""
                      }
                    />
                    {formik.touched.empExperience?.[index]?.designation &&
                      formik.errors.empExperience?.[index]?.designation && (
                        <div className="text-danger">
                          <small>
                            {formik.errors.empExperience[index].designation}
                          </small>
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 text-start my-3">
                    <lable className="form-label">
                      Experience Description
                      <span className="text-danger">*</span>
                    </lable>
                    <br />
                    <input
                      className="form-control "
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name={`empExperience[${index}].experienceDesc`}
                      value={
                        formik.values.empExperience[index]?.experienceDesc || ""
                      }
                    />
                    {formik.touched.empExperience?.[index]?.experienceDesc &&
                      formik.errors.empExperience?.[index]?.experienceDesc && (
                        <div className="text-danger">
                          <small>
                            {formik.errors.empExperience[index].experienceDesc}
                          </small>
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 text-start my-3">
                    <lable className="form-label">
                      Start Date
                      <span className="text-danger">*</span>
                    </lable>
                    <br />
                    <input
                      className="form-control "
                      type="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name={`empExperience[${index}].experienceStartDate`}
                      value={
                        formik.values.empExperience[index]
                          ?.experienceStartDate || ""
                      }
                    />
                    {formik.touched.empExperience?.[index]
                      ?.experienceStartDate &&
                      formik.errors.empExperience?.[index]
                        ?.experienceStartDate && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empExperience[index]
                                .experienceStartDate
                            }
                          </small>
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 text-start my-3">
                    <lable className="form-label">
                      End Date
                      <span className="text-danger">*</span>
                    </lable>
                    <br />
                    <input
                      className="form-control "
                      type="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name={`empExperience[${index}].experienceEndDate`}
                      value={
                        formik.values.empExperience[index]?.experienceEndDate ||
                        ""
                      }
                    />
                    {formik.touched.empExperience?.[index]?.experienceEndDate &&
                      formik.errors.empExperience?.[index]
                        ?.experienceEndDate && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empExperience[index]
                                .experienceEndDate
                            }
                          </small>
                        </div>
                      )}
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
        </form>
      </div>
    );
  }
);

export default EmpExperienceAdd;
