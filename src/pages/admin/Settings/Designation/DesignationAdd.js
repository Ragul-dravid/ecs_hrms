import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import { toast } from "react-toastify";
import departmentListByCompId from "../../List_Apis/DepartmentListByCmpId";

const DesignationAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = localStorage.getItem("cmpId");
  const [departmentData, setDepartmentData] = useState(null);

  const validationSchema = Yup.object({
    empDesignation: Yup.string()
      .required("*Designation is required.")
      .max(100, "*Designation must not exceed 100 characters."),
    desigDeptId: Yup.string()
      .required("*Department is required."),
    annualLeave: Yup.number()
      .required("*Annual Leave is required.")
      .min(0, "*Annual Leave cannot be negative.")
      .integer("*Annual Leave must be an integer."),
    medicalLeave: Yup.number()
      .required("*Medical Leave is required.")
      .min(0, "*Medical Leave cannot be negative.")
      .integer("*Medical Leave must be an integer."),
    otherLeave: Yup.number()
      .required("*Other Leave is required.")
      .min(0, "*Other Leave cannot be negative.")
      .integer("*Other Leave must be an integer."),
  });
  

  const formik = useFormik({
    initialValues: {
      desigCmpId: cmpId,
      empDesignation: "",
      desigDeptId: "",
      desingDescription: "",
      otherLeave: "",
      medicalLeave: "",
      annualLeave: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.post(`/emp-desig-details`, values);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/designation");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Error updating data: ", e?.response?.data?.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const fetchData = async () => {
    try {
      const departmentData = await departmentListByCompId(cmpId);
      setDepartmentData(departmentData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container-fluid px-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div
          className="card shadow border-0 mb-2 top-header"
          style={{ borderRadius: "0" }}
        >
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Add Designation</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/designation">
                    <button type="button" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card shadow border-0 my-2"
          style={{ borderRadius: "0" }}
        >
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Department Name <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <select
                    {...formik.getFieldProps("desigDeptId")}
                    className={`form-select form-select-sm  ${
                      formik.touched.desigDeptId && formik.errors.desigDeptId
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
                  {formik.touched.desigDeptId &&
                    formik.errors.desigDeptId && (
                      <div className="invalid-feedback">
                        {formik.errors.desigDeptId}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Designation <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="empDesignation"
                  className={`form-control form-control-sm ${
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
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Annual Leave<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="annualLeave"
                  className={`form-control form-control-sm ${
                    formik.touched.annualLeave && formik.errors.annualLeave
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("annualLeave")}
                />
                {formik.touched.annualLeave && formik.errors.annualLeave && (
                  <div className="invalid-feedback">
                    {formik.errors.annualLeave}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Medical Leave<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="medicalLeave"
                  className={`form-control form-control-sm ${
                    formik.touched.medicalLeave && formik.errors.medicalLeave
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("medicalLeave")}
                />
                {formik.touched.medicalLeave && formik.errors.medicalLeave && (
                  <div className="invalid-feedback">
                    {formik.errors.medicalLeave}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Other Leave<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="otherLeave"
                  className={`form-control form-control-sm ${
                    formik.touched.otherLeave && formik.errors.otherLeave
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("otherLeave")}
                />
                {formik.touched.otherLeave && formik.errors.otherLeave && (
                  <div className="invalid-feedback">
                    {formik.errors.otherLeave}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Designation Description
                </label>
                <textarea
                  type="text"
                  name="desingDescription"
                  className={`form-control form-control-sm ${
                    formik.touched.desingDescription && formik.errors.desingDescription
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("desingDescription")}
                />
                {formik.touched.desingDescription && formik.errors.desingDescription && (
                  <div className="invalid-feedback">
                    {formik.errors.desingDescription}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DesignationAdd;