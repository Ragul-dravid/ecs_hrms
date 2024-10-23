import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";

const CompanyRegistrationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");

  // Validation schema for form fields
  const validationSchema = Yup.object({
    cmpName: Yup.string().required("*Company Name is required"),
    cmpEmail: Yup.string().email("Invalid email format").required("*Email is required"),
    cmpPhNumber: Yup.string().matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("*Phone number is required"),
    cmpRegNumber: Yup.string().required("*Registration Number is required"),
    cmpTaxCode: Yup.string().required("*Tax Code is required"),
    cmpAddr: Yup.string().required("*Company Address is required"),
    cmpCity: Yup.string().required("*City is required"),
    cmpPincode: Yup.string().matches(/^[0-9]{6}$/, "Invalid Pin Code").required("*Pincode is required"),
    cmpRoleId: Yup.string().required("*Role is required")
  });

  // useFormik hook for form handling
  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      cmpName: "",
      cmpEmail: "",
      cmpPhNumber: "",
      cmpRegNumber: "",
      cmpTaxCode: "",
      cmpAddr: "",
      cmpCity: "",
      cmpPincode: "",
      cmpRoleId: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/company-reg/${id}`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/companyRegistration");
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
        const response = await api.get(`/company-reg/${id}`);
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
        <div className="card shadow border-0 mb-2 top-header" style={{ borderRadius: "0" }}>
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Edit Company Registration</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/companyRegistration">
                    <button type="button" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-sm btn-primary" disabled={loading}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 my-2" style={{ borderRadius: "0" }}>
          <div className="container mb-5">
            <div className="row py-4">
              {/* Company Name */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Company Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpName"
                  className={`form-control form-control-sm ${formik.touched.cmpName && formik.errors.cmpName ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("cmpName")}
                />
                {formik.touched.cmpName && formik.errors.cmpName && (
                  <div className="invalid-feedback">{formik.errors.cmpName}</div>
                )}
              </div>

              {/* Company Email */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Company Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="cmpEmail"
                  className={`form-control form-control-sm ${formik.touched.cmpEmail && formik.errors.cmpEmail ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("cmpEmail")}
                />
                {formik.touched.cmpEmail && formik.errors.cmpEmail && (
                  <div className="invalid-feedback">{formik.errors.cmpEmail}</div>
                )}
              </div>

              {/* Phone Number */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpPhNumber"
                  className={`form-control form-control-sm ${formik.touched.cmpPhNumber && formik.errors.cmpPhNumber ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("cmpPhNumber")}
                />
                {formik.touched.cmpPhNumber && formik.errors.cmpPhNumber && (
                  <div className="invalid-feedback">{formik.errors.cmpPhNumber}</div>
                )}
              </div>

              {/* Registration Number */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Registration Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpRegNumber"
                  className={`form-control form-control-sm ${formik.touched.cmpRegNumber && formik.errors.cmpRegNumber ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("cmpRegNumber")}
                />
                {formik.touched.cmpRegNumber && formik.errors.cmpRegNumber && (
                  <div className="invalid-feedback">{formik.errors.cmpRegNumber}</div>
                )}
              </div>

              {/* Tax Code */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Tax Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpTaxCode"
                  className={`form-control form-control-sm ${formik.touched.cmpTaxCode && formik.errors.cmpTaxCode ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("cmpTaxCode")}
                />
                {formik.touched.cmpTaxCode && formik.errors.cmpTaxCode && (
                  <div className="invalid-feedback">{formik.errors.cmpTaxCode}</div>
                )}
              </div>

              {/* Address */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Company Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpAddr"
                  className={`form-control form-control-sm ${formik.touched.cmpAddr && formik.errors.cmpAddr ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("cmpAddr")}
                />
                {formik.touched.cmpAddr && formik.errors.cmpAddr && (
                  <div className="invalid-feedback">{formik.errors.cmpAddr}</div>
                )}
              </div>

              {/* City */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpCity"
                  className={`form-control form-control-sm ${formik.touched.cmpCity && formik.errors.cmpCity ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("cmpCity")}
                />
                {formik.touched.cmpCity && formik.errors.cmpCity && (
                  <div className="invalid-feedback">{formik.errors.cmpCity}</div>
                )}
              </div>

              {/* Pincode */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Pincode <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpPincode"
                  className={`form-control form-control-sm ${formik.touched.cmpPincode && formik.errors.cmpPincode ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("cmpPincode")}
                />
                {formik.touched.cmpPincode && formik.errors.cmpPincode && (
                  <div className="invalid-feedback">{formik.errors.cmpPincode}</div>
                )}
              </div>

              {/* Role */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Role <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpRoleId"
                  className={`form-control form-control-sm ${formik.touched.cmpRoleId && formik.errors.cmpRoleId ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("cmpRoleId")}
                />
                {formik.touched.cmpRoleId && formik.errors.cmpRoleId && (
                  <div className="invalid-feedback">{formik.errors.cmpRoleId}</div>
                )}
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegistrationEdit;
