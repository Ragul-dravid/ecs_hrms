import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const PayrollEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = localStorage.getItem("cmpId");
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
      pubHolidayId: "",
      pubHolidayCountryCode: "",
      pubHolidayName: "",
      //   pubHolidayDate: "",
      pubHolidayType: "",
      startDate: "",
      endDate: "",
      //   publicHolidayOwner: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const payload = {
          pubHolidayName: values.pubHolidayName,
          startDate: values.startDate,
          endDate: values.endDate,
        };
        const response = await api.put(`/public-holidays/${id}`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/deduction");
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
        const response = await api.get(`/public-holidays/${id}`);
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
                  <h1 className="h4 ls-tight headingColor">Edit Holiday</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/holidays">
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
                  Holiday Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="pubHolidayName"
                  className={`form-control form-control-sm ${
                    formik.touched.pubHolidayName &&
                    formik.errors.pubHolidayName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("pubHolidayName")}
                />
                {formik.touched.pubHolidayName &&
                  formik.errors.pubHolidayName && (
                    <div className="invalid-feedback">
                      {formik.errors.pubHolidayName}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Holiday Type <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="pubHolidayType"
                  className={`form-control form-control-sm ${
                    formik.touched.pubHolidayType &&
                    formik.errors.pubHolidayType
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("pubHolidayType")}
                />
                {formik.touched.pubHolidayType &&
                  formik.errors.pubHolidayType && (
                    <div className="invalid-feedback">
                      {formik.errors.pubHolidayType}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Country<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="pubHolidayCountryCode"
                  className={`form-control form-control-sm ${
                    formik.touched.pubHolidayCountryCode &&
                    formik.errors.pubHolidayCountryCode
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("pubHolidayCountryCode")}
                />
                {formik.touched.pubHolidayCountryCode &&
                  formik.errors.pubHolidayCountryCode && (
                    <div className="invalid-feedback">
                      {formik.errors.pubHolidayCountryCode}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Start Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  className={`form-control form-control-sm ${
                    formik.touched.startDate && formik.errors.startDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("startDate")}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <div className="invalid-feedback">
                    {formik.errors.startDate}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  End Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PayrollEdit;
