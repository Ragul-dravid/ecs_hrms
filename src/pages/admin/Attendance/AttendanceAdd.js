import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const AttendanceAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");
  const [empData, setEmpData] = useState(null);

  const validationSchema = Yup.object({
    attendanceStatus: Yup.string().required("*Attendance Status is required"),
    attendanceRemarks: Yup.string().required("*Attendance Remarks is required"),
    attendanceModeOfWorking: Yup.string().test(
      "check-mode-of-working",
      "*Mode of working is required",
      function (value) {
        const { attendanceStatus } = this.parent;
        return attendanceStatus === "PRESENT" ? !!value : true;
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      cmpId: 1,
      attendanceCheckOutMode:"",
      attendanceCheckInMode:"",
      dailyAttendanceEmpId: "",
      attendanceDate: "",
      attendanceCheckInTime: "",
      attendanceCheckOutTime: "",
      attendanceStatus: "",
      attendanceRemarks: "",
      attendanceModeOfWorking: "",
      checkInMode: "TAP_IN",
      checkOutMode: null,
      attendanceOtStarttime: "",
      attendanceOtEndtime: "",
      attendanceShiftMode: "",
      attendanceHoursWorked: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("object", values);

      setLoadIndicator(true);
      try {
        const response = await api.post(`/daily-attendance`, values);
        if (response.status === 201 || response.status === 200) {
          toast.success(response.data.message);
          navigate("/attendance");
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
      console.log("Employee:", employee.data);
      return employee.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const handleStatuschange = (event) => {
    const status = event.target.value;
    formik.setFieldValue("attendanceStatus", status);
    if (status === "ABSENT") {
      formik.setFieldValue("attendanceModeOfWorking", "");
      formik.setFieldValue("attendanceCheckInTime", "");
      formik.setFieldValue("attendanceCheckOutTime", "");
      formik.setFieldValue("attendanceOtStarttime", "");
      formik.setFieldValue("attendanceOtEndtime", "");
    }
  };

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
                  <h1 className="h4 ls-tight headingColor">Add Attendance</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/attendance">
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
              {/* Company Name */}

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Employee Name
                  <span className="text-danger">*</span>
                </label>
                <select
                  name="dailyAttendanceEmpId"
                  className={`form-select form-select-sm ${
                    formik.touched.dailyAttendanceEmpId &&
                    formik.errors.dailyAttendanceEmpId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("dailyAttendanceEmpId")}
                >
                  <option selected></option>
                  {Array.isArray(empData) &&
                    empData.map((exitMgmtEmpId) => (
                      <option key={exitMgmtEmpId.id} value={exitMgmtEmpId.id}>
                        {exitMgmtEmpId.empName}
                      </option>
                    ))}
                </select>
                {formik.touched.dailyAttendanceEmpId &&
                  formik.errors.dailyAttendanceEmpId && (
                    <div className="invalid-feedback">
                      {formik.errors.dailyAttendanceEmpId}
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Attendance Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="attendanceDate"
                  className={`form-control form-control-sm ${
                    formik.touched.attendanceDate &&
                    formik.errors.attendanceDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("attendanceDate")}
                />
                {formik.touched.attendanceDate &&
                  formik.errors.attendanceDate && (
                    <div className="invalid-feedback">
                      {formik.errors.attendanceDate}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Attendance status <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select form-select-sm ${
                    formik.touched.attendanceStatus &&
                    formik.errors.attendanceStatus
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("attendanceStatus")}
                  onChange={handleStatuschange}
                >
                  <option value="" />
                  <option value="PRESENT" label="Present" />
                  <option value="ABSENT" label="Absent" />
                </select>
                {formik.touched.attendanceStatus &&
                  formik.errors.attendanceStatus && (
                    <div className="invalid-feedback">
                      {formik.errors.attendanceStatus}
                    </div>
                  )}
              </div>

              {formik.values.attendanceStatus === "PRESENT" && (
                <>
                  <div className="col-md-6 col-12 mb-3">
                    <label>Mode Of Working</label>
                    <span className="text-danger">*</span>
                    <select
                      className={`form-select form-select-sm ${
                        formik.touched.attendanceModeOfWorking &&
                        formik.errors.attendanceModeOfWorking
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("attendanceModeOfWorking")}
                    >
                      <option value="" label="Select Mode" />
                      <option value="WORK_FROM_HOME" label="Work From Home" />
                      <option
                        value="WORK_FROM_OFFICE"
                        label="Work From Office"
                      />
                    </select>
                    {formik.touched.attendanceModeOfWorking &&
                      formik.errors.attendanceModeOfWorking && (
                        <div className="invalid-feedback">
                          {formik.errors.attendanceModeOfWorking}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label>Check In</label>
                    {/* <span className="text-danger">*</span> */}
                    <input
                      type="time"
                      // onFocus={(e) => e.target.showPicker()}
                      className={`form-control form-control-sm ${
                        formik.touched.attendanceCheckInTime &&
                        formik.errors.attendanceCheckInTime
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("attendanceCheckInTime")}
                    />
                    {formik.touched.attendanceCheckInTime &&
                      formik.errors.attendanceCheckInTime && (
                        <div className="invalid-feedback">
                          {formik.errors.attendanceCheckInTime}
                        </div>
                      )}
                  </div>

                  <div className="col-md-6 col-12 mb-3 ">
                    <label className="">Check Out</label>
                    {/* <span className="text-danger">*</span> */}
                    <input
                      type="time"
                      // onFocus={(e) => e.target.showPicker()}
                      className={`form-control form-control-sm${
                        formik.touched.attendanceCheckOutTime &&
                        formik.errors.attendanceCheckOutTime
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("attendanceCheckOutTime")}
                    />
                    {formik.touched.attendanceCheckOutTime &&
                      formik.errors.attendanceCheckOutTime && (
                        <div className="invalid-feedback">
                          {formik.errors.attendanceCheckOutTime}
                        </div>
                      )}
                  </div>

                  <div className="col-md-6 col-12 mb-3 ">
                    <label className="">OT Start Time</label>
                    {/* <span className="text-danger">*</span> */}
                    <input
                      type="time"
                      // onFocus={(e) => e.target.showPicker()}
                      className={`form-control form-control-sm${
                        formik.touched.attendanceOtStarttime &&
                        formik.errors.attendanceOtStarttime
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("attendanceOtStarttime")}
                    />
                    {formik.touched.attendanceOtStarttime &&
                      formik.errors.attendanceOtStarttime && (
                        <div className="invalid-feedback">
                          {formik.errors.attendanceOtStarttime}
                        </div>
                      )}
                  </div>

                  <div className="col-md-6 col-12 mb-3 ">
                    <label className="">OT End Time</label>
                    {/* <span className="text-danger">*</span> */}
                    <input
                      type="time"
                      // onFocus={(e) => e.target.showPicker()}
                      className={`form-control form-control-sm ${
                        formik.touched.attendanceOtEndtime &&
                        formik.errors.attendanceOtEndtime
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("attendanceOtEndtime")}
                    />
                    {formik.touched.attendanceOtEndtime &&
                      formik.errors.attendanceOtEndtime && (
                        <div className="invalid-feedback">
                          {formik.errors.attendanceOtEndtime}
                        </div>
                      )}
                  </div>
                </>
              )}

              <div className="col-md-6 col-12">
                <div className="text-start mt-2">
                  <lable className="form-lable">Attendance Remark</lable>
                  <span className="text-danger">*</span>
                  <br />
                  <textarea
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    className={`form-control form-control-sm  ${
                      formik.touched.attendanceRemarks &&
                      formik.errors.attendanceRemarks
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("attendanceRemarks")}
                    maxLength={200}
                  />
                  {formik.touched.attendanceRemarks &&
                    formik.errors.attendanceRemarks && (
                      <div className="invalid-feedback">
                        {formik.errors.attendanceRemarks}
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
};

export default AttendanceAdd;
