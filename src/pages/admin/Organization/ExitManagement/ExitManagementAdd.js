import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import ExitManagement from "./ExitManagement";
import employeeListByCompId from "../../List_Apis/EmployeeListByCmpId";
import departmentListByCompId from "../../List_Apis/DepartmentListByCmpId";

const ExitManagementAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = localStorage.getItem("cmpId");
  const [empData, setEmpData] = useState(null);
  const [dptData, setDptData] = useState(null);

  const validationSchema = Yup.object({
    // exitMgmtEmpName: Yup.string().required("*Employee Name is required"),
    exitMgmtDateOfApply: Yup.string().required("*Date of Apply is required"),
    reasonForRelieving: Yup.string().required("*Reason is required"),
    dateOfRelieving: Yup.string().required("*Date is required"),
    exitMgmtNoticePeriod: Yup.string().required("*Notice Period is required"),
  });

  const formik = useFormik({
    initialValues: {
      exitMgmtCmpId: cmpId,
      exitMgmtEmpId: "",
      exitMgmtEmpName: "",
      exitMgmtDateOfApply: "",
      reasonForRelieving: "",
      exitMgmtNoticePeriod: "",
      dateOfRelieving: "",
      relievingApproverName: "",
      relievingApproverStatus: "pending",
      assetsReturned: true,
      exitManagementOwner: "",
      deptId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      let exitMgmtEmpName;
      empData.forEach((emp) => {
        if (parseInt(values.centerId) === emp.id) {
          exitMgmtEmpName = emp.firstName || "--";
        }
      });
      values.exitMgmtEmpName = exitMgmtEmpName;
      try {
        const response = await api.post(`/exit-management`, values);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/exitmangement");
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

  const fetchEmployeeList = async () => {
    try {
      const employee = await api.get(`getEmpolyeeWithRole/${cmpId}`);
      setEmpData(employee.data);
      console.log("Employee:",employee.data);
      return employee.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDept = async () => {
    try {
      const department = await api.get(`department-by-companyId/${cmpId}`);
      setDptData(department.data);
      return department.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
    fetchDept();
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
                  <h1 className="h4 ls-tight headingColor">
                    Add Exit Management
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/exitmangement">
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
          style={{ borderRadius: "0", minHeight: "75vh" }}
        >
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Employee Name <span className="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("exitMgmtEmpId")}
                  className={`form-select form-select-sm${
                    formik.touched.exitMgmtEmpId && formik.errors.exitMgmtEmpId
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  {Array.isArray(empData) &&
                    empData.map((exitMgmtEmpId) => (
                      <option key={exitMgmtEmpId.id} value={exitMgmtEmpId.id}>
                        {exitMgmtEmpId.empName}
                      </option>
                    ))}
                </select>
                {formik.touched.exitMgmtEmpName &&
                  formik.errors.exitMgmtEmpName && (
                    <div className="invalid-feedback">
                      {formik.errors.exitMgmtEmpName}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Department Name <span className="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("deptId")}
                  className={`form-select form-select-sm${
                    formik.touched.deptId && formik.errors.deptId
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  {Array.isArray(dptData) &&
                    dptData.map((exitMgmtEmpId) => (
                      <option
                        key={exitMgmtEmpId.id}
                        value={exitMgmtEmpId.deptId}
                      >
                        {exitMgmtEmpId.deptName}
                      </option>
                    ))}
                </select>
                {formik.touched.deptId && formik.errors.deptId && (
                  <div className="invalid-feedback">{formik.errors.deptId}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Date Of Apply<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="exitMgmtDateOfApply"
                  className={`form-control form-control-sm ${
                    formik.touched.exitMgmtDateOfApply &&
                    formik.errors.exitMgmtDateOfApply
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("exitMgmtDateOfApply")}
                />
                {formik.touched.exitMgmtDateOfApply &&
                  formik.errors.exitMgmtDateOfApply && (
                    <div className="invalid-feedback">
                      {formik.errors.exitMgmtDateOfApply}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Date Of Reliving<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfRelieving"
                  className={`form-control form-control-sm ${
                    formik.touched.dateOfRelieving &&
                    formik.errors.dateOfRelieving
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("dateOfRelieving")}
                />
                {formik.touched.dateOfRelieving &&
                  formik.errors.dateOfRelieving && (
                    <div className="invalid-feedback">
                      {formik.errors.dateOfRelieving}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Notice Period <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="exitMgmtNoticePeriod"
                  className={`form-control form-control-sm ${
                    formik.touched.exitMgmtNoticePeriod &&
                    formik.errors.exitMgmtNoticePeriod
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("exitMgmtNoticePeriod")}
                />
                {formik.touched.exitMgmtNoticePeriod &&
                  formik.errors.exitMgmtNoticePeriod && (
                    <div className="invalid-feedback">
                      {formik.errors.exitMgmtNoticePeriod}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Reason For Reliving<span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  name="reasonForRelieving"
                  className={`form-control form-control-sm ${
                    formik.touched.reasonForRelieving &&
                    formik.errors.reasonForRelieving
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("reasonForRelieving")}
                />
                {formik.touched.reasonForRelieving &&
                  formik.errors.reasonForRelieving && (
                    <div className="invalid-feedback">
                      {formik.errors.reasonForRelieving}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Approver Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="relievingApproverName"
                  className={`form-control form-control-sm ${
                    formik.touched.relievingApproverName &&
                    formik.errors.relievingApproverName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("relievingApproverName")}
                />
                {formik.touched.relievingApproverName &&
                  formik.errors.relievingApproverName && (
                    <div className="invalid-feedback">
                      {formik.errors.relievingApproverName}
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

export default ExitManagementAdd;
