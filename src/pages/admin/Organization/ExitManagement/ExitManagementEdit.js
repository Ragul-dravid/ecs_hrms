import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import ExitManagementAdd from "./ExitManagementAdd";

const ExitManagementEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = localStorage.getItem("cmpId");
  const [companyData, setCompanyData] = useState(null);

  const validationSchema = Yup.object({
    // exitMgmtEmpName: Yup.string().required("*Employee Name is required"),
    exitMgmtDateOfApply: Yup.string().required("*Date of Apply is required"),
    reasonForRelieving: Yup.string().required("*Reason is required"),
    dateOfRelieving: Yup.string().required("*Date is required"),
    exitMgmtNoticePeriod: Yup.string().required("*Notice Period is required"),
  });

  // useFormik hook for form handling
  const formik = useFormik({
    initialValues: {
      exitMgmtCmpId: cmpId,
      exitMgmtCmpId: "",
      exitMgmtEmpId: "",
      exitMgmtEmpName: "",
      exitMgmtDateOfApply: "",
      exitMgmtNoticePeriod: "",
      reasonForRelieving: "",
      dateOfRelieving: "",
      relievingApproverName: "",
      relievingApproverStatus: "",
      assetsReturned: "",
      exitManagementOwner: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/exit-management/${id}`, values);
        if (response.status === 200) {
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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/exit-management/${id}`);
        formik.setValues(response.data);
        formik.setValues({
          ...response.data,
          exitMgmtDateOfApply: response.data.exitMgmtDateOfApply?.substring(0, 10),
          dateOfRelieving: response.data.dateOfRelieving?.substring(0, 10)
        });
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
                  <h1 className="h4 ls-tight headingColor">
                    Edit Exit Management
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
          style={{ borderRadius: "0", minHeight: "75vh" }}
        >
          <div className="container mb-5">
            <div className="row py-4">
              {/* Company Name */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Employee Name <span className="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("exitMgmtEmpId")}
                  className={`form-select form-select-sm${formik.touched.exitMgmtEmpId && formik.errors.exitMgmtEmpId
                    ? "is-invalid"
                    : ""
                    }`}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  {companyData &&
                    companyData.map((exitMgmtEmpId) => (
                      <option key={exitMgmtEmpId.id} value={exitMgmtEmpId.exitMgmtEmpId}>
                        {exitMgmtEmpId.exitMgmtEmpName}
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
                  Date Of Apply<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="exitMgmtDateOfApply"
                  className={`form-control form-control-sm ${formik.touched.exitMgmtDateOfApply &&
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
                  className={`form-control form-control-sm ${formik.touched.dateOfRelieving &&
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
                  className={`form-control form-control-sm ${formik.touched.exitMgmtNoticePeriod &&
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
                  className={`form-control form-control-sm ${formik.touched.reasonForRelieving &&
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
                  className={`form-control form-control-sm ${formik.touched.relievingApproverName &&
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

export default ExitManagementEdit;
