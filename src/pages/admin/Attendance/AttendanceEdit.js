import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const AttendanceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");
  const [companyData, setCompanyData] = useState(null);

  const validationSchema = Yup.object({
    attendanceStatus: Yup.string().required("*Attendance Status is required"),
    attendanceRemarks: Yup.string().required("*Attendance Remark is required"),
  });

  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      dailyAttendanceEmpId: "",
      attendanceId: "",
      attendanceDate: "",
      attendanceCheckInTime: "",
      attendanceCheckOutTime: "",
      attendanceStatus: "",
      attendanceRemarks: "",
      attendanceModeOfWorking: "",
      attendanceOtStarttime: "",
      attendanceOtEndtime: "",
      attendanceShiftMode: "",
      attendanceHoursWorked: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/daily-attendance/${id}`, values);
        if (response.status === 200) {
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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/daily-attendance/${id}`);
        formik.setValues(response.data);
        formik.setFieldValue("attendanceDate",response.data?.attendanceDate?.slice(0,10)) // Load the data into the form
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
                  <h1 className="h4 ls-tight headingColor">Edit Attendance</h1>
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
                      <span>Update</span>
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
                <input
                  type="text"
                  name="dailyAttendanceEmpId"
                  className={`form-control form-control-sm ${
                    formik.touched.dailyAttendanceEmpId &&
                    formik.errors.dailyAttendanceEmpId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("dailyAttendanceEmpId")}
                />
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
                >
                  <option value="" />
                  <option value="Present" label="Present" />
                  <option value="Absent" label="Absent" />
                </select>
                {formik.touched.attendanceStatus &&
                  formik.errors.attendanceStatus && (
                    <div className="invalid-feedback">
                      {formik.errors.attendanceStatus}
                    </div>
                  )}
              </div>

              {formik.values.attendanceStatus === "Present" && (
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

export default AttendanceEdit;
