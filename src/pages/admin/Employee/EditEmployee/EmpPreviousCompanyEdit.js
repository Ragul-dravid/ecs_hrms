import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../../../config/URL";

const validationSchema = Yup.object().shape({
  empPrevious: Yup.array().of(
    Yup.object().shape({
      prevCompRefcmpName: Yup.string().required("*Company name is required"),
      prevCompReferralJobTitle: Yup.string().required("*Referral job title is required"),
      prevCompReferralContactNum: Yup.number().required(
        "*Referral contact number is required"
      ).typeError("*Must be a number"),
      prevCompReferralName: Yup.string().required("*Referral name is required"),
      prevCompRefCmpAddr: Yup.string().required("*Company address is required"),
    })
  )
});

const EmpPreviousCompanyEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [rows, setRows] = useState([{}]);

    const formik = useFormik({
      initialValues: {
        empPrevious: [
          {
            prevCompRefcmpName: formData.prevCompRefcmpName || "",
            prevCompReferralJobTitle: formData.prevCompReferralJobTitle || "",
            prevCompRefCmpAddr: formData.prevCompRefCmpAddr || "",
            prevCompReferralName: formData.prevCompReferralName || "",
            prevCompReferralContactNum: formData.prevCompReferralContactNum || "",
          }
        ]
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        values.prevCompRefEmpId = formData.empId;

        const payload = values.empPrevious.map((preCompany)=>({
          prevCompRefcmpName: preCompany.prevCompRefcmpName,
          prevCompReferralJobTitle: preCompany.prevCompReferralJobTitle,
          prevCompRefCmpAddr: preCompany.prevCompRefCmpAddr,
          prevCompReferralName: preCompany.prevCompReferralName,
          prevCompReferralContactNum: preCompany.prevCompReferralContactNum,
          prevCompRefEmpId : formData.empId
        }))
        // console.log("Body Values is ", values);
        try {
          const response = await api.post(`/createEmpPrevCompanyRefs`, payload);
          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values }));
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

    useImperativeHandle(ref, () => ({
      previousCompany: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          {rows.map((row, index) => (
            <div key={index}>
              <p class="headColor mt-3">Previous Company Reference</p>
              <div className="container">
                <div className="row mt-3">
                    <div className="col-md-6 col-12 mb-3">
                      <lable htmlFor="" className="form-label">
                        Company Name
                        <span className="text-danger">*</span>
                      </lable>
                      <input
                        className="form-control "
                        type="text"
                        name={`empPrevious[${index}].prevCompRefcmpName`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values.empPrevious[index]
                            ?.prevCompRefcmpName || ""
                        }
                      />
                      {formik.touched.empPrevious?.[index]
                      ?.prevCompRefcmpName &&
                      formik.errors.empPrevious?.[index]
                        ?.prevCompRefcmpName && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empPrevious[index]
                                .prevCompRefcmpName
                            }
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 col-12 mb-3">
                      <lable className="form-label">
                        Company Address
                        <span className="text-danger">*</span>
                        &nbsp;
                      </lable>
                      <textarea rows="5"
                        className="form-control "
                        name={`empPrevious[${index}].prevCompRefCmpAddr`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values.empPrevious[index]
                            ?.prevCompRefCmpAddr || ""
                        }
                      />
                      {formik.touched.empPrevious?.[index]
                      ?.prevCompRefCmpAddr &&
                      formik.errors.empPrevious?.[index]
                        ?.prevCompRefCmpAddr && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empPrevious[index]
                                .prevCompRefCmpAddr
                            }
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 col-12 mb-3">
                      <lable htmlFor="" className="form-label">
                        Referral Contact No
                        <span className="text-danger">*</span>
                      </lable>

                      <input
                        className="form-control  form-contorl-sm"
                        name={`empPrevious[${index}].prevCompReferralContactNum`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values.empPrevious[index]
                            ?.prevCompReferralContactNum || ""
                        }
                      />
                      {formik.touched.empPrevious?.[index]
                      ?.prevCompReferralContactNum &&
                      formik.errors.empPrevious?.[index]
                        ?.prevCompReferralContactNum && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empPrevious[index]
                                .prevCompReferralContactNum
                            }
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 col-12 mb-3">
                      <lable htmlFor="" className="form-label">
                        Referral Job Title
                        <span className="text-danger">*</span>
                      </lable>

                      <input
                      type="text"
                      className="form-control"
                        name={`empPrevious[${index}].prevCompReferralJobTitle`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values.empPrevious[index]
                            ?.prevCompReferralJobTitle || ""
                        }
                      />
                      {formik.touched.empPrevious?.[index]
                      ?.prevCompReferralJobTitle &&
                      formik.errors.empPrevious?.[index]
                        ?.prevCompReferralJobTitle && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empPrevious[index]
                                .prevCompReferralJobTitle
                            }
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 col-12 mb-3">
                      <lable htmlFor="" className="form-label">
                        Referral Name
                        <span className="text-danger">*</span>
                      </lable>

                      <input
                        type="text"
                        className="form-control"
                        name={`empPrevious[${index}].prevCompReferralName`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values.empPrevious[index]
                            ?.prevCompReferralName || ""
                        }
                      />
                      {formik.touched.empPrevious?.[index]
                      ?.prevCompReferralName &&
                      formik.errors.empPrevious?.[index]
                        ?.prevCompReferralName && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empPrevious[index]
                                .prevCompReferralName
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

export default EmpPreviousCompanyEdit;