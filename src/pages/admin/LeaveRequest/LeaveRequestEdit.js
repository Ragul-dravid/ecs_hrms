import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import LeaveRequest from "./LeaveRequest";

const LeaveRequestEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");
  const [companyData, setCompanyData] = useState(null);

  const validationSchema = Yup.object({
    pubHolidayName: Yup.string().required("*Holiday Name is required"),
    pubHolidayType: Yup.string().required("*Holiday Type is required"),
    pubHolidayCountryCode: Yup.string().required("*Country is required"),
    endDate: Yup.string().required("*End Date is required"),
  });

  // useFormik hook for form handling
  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      leaveReqId: "",
      leaveReqEmpId: "",
      leaveReqStartDate: "",
      //   pubHolidayDate: "",
      leaveReqEndDate: "",
      leaveReqType: "",
      leaveReqRemarks: "",
      leaveReqStatus: "",
      totalLeaveReqDays: "",
      pendingLeaveReqDays: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      //   const formDatas = new FormData();
      //   formDatas.append("userId", userId);
      //   formDatas.append("centerName", selectedCenterName);
      //   formDatas.append("employeeName", datas && datas.employeeName);
      //   formDatas.append("leaveTypeId", data.leaveTypeId);
      //   formDatas.append("noOfDays", data.noOfDays);
      //   formDatas.append("fromDate", data.fromDate);
      //   formDatas.append("toDate", data.toDate);
      //   formDatas.append("dayType", data.dayType);
      //   formDatas.append("leaveReason", data.leaveReason);
      //   formDatas.append("leaveStatus", "PENDING");
      //   formDatas.append("file", data.file);
      //   formDatas.append("createdBy", userName);
      try {
        const payload = {
          pubHolidayName: values.pubHolidayName,
          startDate: values.startDate,
          endDate: values.endDate,
        };
        const response = await api.put(`/leave-request/${id}`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/leaverequest");
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
        const response = await api.get(`/leave-request/${id}`);
        formik.setValues(response.data); // Load the data into the form
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
                  <h1 className="h4 ls-tight headingColor">Edit Leave</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/leaverequest">
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
                  Employee Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="leaveReqEmpId"
                  className={`form-control form-control-sm ${
                    formik.touched.leaveReqEmpId && formik.errors.leaveReqEmpId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("leaveReqEmpId")}
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
                  Attachment<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="endDate"
                  className={`form-control form-control-sm ${
                    formik.touched.endDate && formik.errors.endDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("endDate")}
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <div className="invalid-feedback">
                    {formik.errors.endDate}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Leave Reason<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
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

export default LeaveRequestEdit;
