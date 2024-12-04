import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import departmentListByCompId from "../List_Apis/DepartmentListByCmpId";

const LeaveRequestAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");
  const empName = sessionStorage.getItem("empName");
  const empId = sessionStorage.getItem("empId");
  const [departmentData, setDepartmentData] = useState(null);
  const validationSchema = Yup.object({});
  const role = sessionStorage.getItem("role");

  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      leaveDeptId: "",
      leaveReqEmpId: empName,
      leaveReqStartDate: "",
      leaveReqEndDate: "",
      leaveReqType: "",
      leaveReqRemarks: "",
      leaveReqStatus: "",
      totalLeaveReqDays: 0,
      leaveReqApproverId: "",
      leaveReqApproverName: "",
      leaveReqStatus: "",
      leaveReqApproverId: "",
      pendingLeaveReqDays: "",
      file: null || "",
      leaveStatus:"",

    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      setLoadIndicator(true);
      try {
        const formDatas = new FormData();
        formDatas.append("leaveCmpId", cmpId);
        formDatas.append("leaveReqEmpId", empId);
        formDatas.append("leaveDeptId", data.leaveDeptId);
        formDatas.append("leaveReqStartDate", data.leaveReqStartDate);
        formDatas.append("leaveReqEndDate", data.leaveReqEndDate);
        formDatas.append("totalLeaveReqDays", data.totalLeaveReqDays);
        formDatas.append("leaveReqType", data.leaveReqType);
        formDatas.append("leaveReqRemarks", data.leaveReqRemarks);
        formDatas.append("leaveStatus", "PENDING");
        formDatas.append("file", data.file);

        const response = await api.post("/create-leave-attach", formDatas, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 201 || response.status === 200) {
          toast.success(response.data.message);
          navigate("/leaveRequestEmp");
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

  const fetchDeptData = async () => {
    try {
      const departmentData = await departmentListByCompId(cmpId);
      setDepartmentData(departmentData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchDeptData();
  }, []);

  // Calculate number of days
  useEffect(() => {
    const { leaveReqStartDate, leaveReqEndDate } = formik.values;
    if (leaveReqStartDate && leaveReqEndDate) {
      const startDate = new Date(leaveReqStartDate);
      const endDate = new Date(leaveReqEndDate);

      // Calculate the difference in time and convert to days
      const differenceInTime = endDate - startDate;
      const days = differenceInTime / (1000 * 60 * 60 * 24) + 1; // Including the start date
      formik.setFieldValue("totalLeaveReqDays", days > 0 ? days : 0);
    }
  }, [formik.values.leaveReqStartDate, formik.values.leaveReqEndDate]);

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
                  <h1 className="h4 ls-tight headingColor">Add Leave</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  {role === "EMPLOYEE" ? (
                    <>
                      <Link to="/leaveRequestEmp">
                        <button type="button" className="btn btn-sm btn-light">
                          <span>Back</span>
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/leaverequest">
                        <button type="button" className="btn btn-sm btn-light">
                          <span>Back</span>
                        </button>
                      </Link>
                    </>
                  )}
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
                  Employee Name
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="leaveReqEmpId"
                  {...formik.getFieldProps("leaveReqEmpId")}
                  className={`form-control form-control-sm ${
                    formik.touched.leaveReqEmpId && formik.errors.leaveReqEmpId
                      ? "is-invalid"
                      : ""
                  }`}
                  readOnly
                />
                {formik.touched.leaveReqEmpId &&
                  formik.errors.leaveReqEmpId && (
                    <div className="invalid-feedback">
                      {formik.errors.leaveReqEmpId}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Department Name <span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <select
                    {...formik.getFieldProps("leaveDeptId")}
                    className={`form-select form-select-sm  ${
                      formik.touched.leaveDeptId && formik.errors.leaveDeptId
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected></option>
                    {departmentData &&
                      departmentData.map((dept) => (
                        <option key={dept.deptId} value={dept.deptId}>
                          {dept.deptName}
                        </option>
                      ))}
                  </select>
                  {formik.touched.leaveDeptId &&
                    formik.errors.leaveDeptId && (
                      <div className="invalid-feedback">
                        {formik.errors.leaveDeptId}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  From Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="leaveReqStartDate"
                  className={`form-control form-control-sm ${
                    formik.touched.leaveReqStartDate &&
                    formik.errors.leaveReqStartDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("leaveReqStartDate")}
                />
                {formik.touched.leaveReqStartDate &&
                  formik.errors.leaveReqStartDate && (
                    <div className="invalid-feedback">
                      {formik.errors.leaveReqStartDate}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  To Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="leaveReqEndDate"
                  className={`form-control form-control-sm ${
                    formik.touched.leaveReqEndDate &&
                    formik.errors.leaveReqEndDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("leaveReqEndDate")}
                />
                {formik.touched.leaveReqEndDate &&
                  formik.errors.leaveReqEndDate && (
                    <div className="invalid-feedback">
                      {formik.errors.leaveReqEndDate}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  No.Of.Days<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="totalLeaveReqDays"
                  className={`form-control form-control-sm ${
                    formik.touched.totalLeaveReqDays &&
                    formik.errors.totalLeaveReqDays
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.totalLeaveReqDays || 0}
                  readOnly
                />
                {formik.touched.totalLeaveReqDays &&
                  formik.errors.totalLeaveReqDays && (
                    <div className="invalid-feedback">
                      {formik.errors.totalLeaveReqDays}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Leave Type <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="leaveReqType"
                  className={`form-control form-control-sm ${
                    formik.touched.leaveReqType && formik.errors.leaveReqType
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("leaveReqType")}
                />
                {formik.touched.leaveReqType && formik.errors.leaveReqType && (
                  <div className="invalid-feedback">
                    {formik.errors.leaveReqType}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Attachment<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="file"
                  className={`form-control form-control-sm ${
                    formik.touched.file && formik.errors.file
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="invalid-feedback">
                    {formik.errors.file}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Leave Reason<span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  name="leaveReqRemarks"
                  className={`form-control form-control-sm ${
                    formik.touched.leaveReqRemarks &&
                    formik.errors.leaveReqRemarks
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("leaveReqRemarks")}
                />
                {formik.touched.leaveReqRemarks &&
                  formik.errors.leaveReqRemarks && (
                    <div className="invalid-feedback">
                      {formik.errors.leaveReqRemarks}
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

export default LeaveRequestAdd;
