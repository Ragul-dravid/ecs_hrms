import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import toast from "react-hot-toast";

const RegistrationCompany = () => {
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");
  const [logoPreview, setLogoPreview] = useState(null);
  const [data, setData] = useState([]);
  console.log("Cmp Data:", data);

  const [profileImgPreview, setProfileImgPreview] = useState(null);

  // Validation schema for form fields
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    cmpName: Yup.string().required("Company Name is required"),
    cmpEmail: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    cmpPhNumber: Yup.string().required("Phone number is required"),
    cmpAddr: Yup.string().required("Address is required"),
    cmpCity: Yup.string().required("City is required"),
    cmpPincode: Yup.string().required("Pin Code is required"),
    cmpTaxCode: Yup.string().required("Tax Code is required"),
    headQuaterAddress: Yup.string().required("HeadQuater Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      cmpName: "",
      cmpEmail: "",
      cmpPhNumber: "",
      cmpAddr: "",
      cmpCity: "",
      cmpPincode: "",
      cmpTaxCode: "",
      startDate: "",
      salaryCalculationDate: "",
      salaryStartDate: "",
      companyType: "",
      headQuaterAddress: "",
      branchLocation: [],
      logoFile: null,
      fileAttachment: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("value", values);
      const formDatas = new FormData();
      formDatas.append("name", values.name);
      formDatas.append("cmpName", values.cmpName);
      formDatas.append("cmpEmail", values.cmpEmail);
      formDatas.append("cmpPhNumber", values.cmpPhNumber);
      formDatas.append("cmpAddr", values.cmpAddr);
      formDatas.append("cmpCity", values.cmpCity);
      formDatas.append("cmpPincode", values.cmpPincode);
      formDatas.append("cmpTaxCode", values.cmpTaxCode);
      formDatas.append("startDate", values.startDate);
      formDatas.append("companyType", values.companyType);
      formDatas.append("headQuaterAddress", values.headQuaterAddress);
      formDatas.append("branchLocation", values.branchLocation);
      formDatas.append("logoFile", values.logoFile);
      formDatas.append("fileAttachment", values.fileAttachment);
      try {
        const response = await api.put(`/company-reg/${cmpId}`, formDatas);
        if (response.status === 200) {
          toast.success(response.data.message);
          //   navigate("/companyRegistration");
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
        const response = await api.get(`/company-reg/${cmpId}`);
        formik.setValues(response.data); // Load the data into the form
        setData(response.data);
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cmpId]);

  // Handle file change and preview generation
  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      formik.setFieldValue(event.target.name, file); // Update Formik field value
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
                  <h1 className="h4 ls-tight headingColor">
                    Update Company Details
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
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
              {/* Name Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control form-control-sm ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </div>

              {/* Company Name Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Company Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpName"
                  className={`form-control form-control-sm ${
                    formik.touched.cmpName && formik.errors.cmpName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpName")}
                />
                {formik.touched.cmpName && formik.errors.cmpName && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpName}
                  </div>
                )}
              </div>

              {/* cmpEmail Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpEmail"
                  className={`form-control form-control-sm ${
                    formik.touched.cmpEmail && formik.errors.cmpEmail
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpEmail")}
                />
                {formik.touched.cmpEmail && formik.errors.cmpEmail && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpEmail}
                  </div>
                )}
              </div>

              {/* cmpPhNumber Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpPhNumber"
                  className={`form-control form-control-sm ${
                    formik.touched.cmpPhNumber && formik.errors.cmpPhNumber
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpPhNumber")}
                />
                {formik.touched.cmpPhNumber && formik.errors.cmpPhNumber && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpPhNumber}
                  </div>
                )}
              </div>

              {/* cmpAddr Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpAddr"
                  className={`form-control form-control-sm ${
                    formik.touched.cmpAddr && formik.errors.cmpAddr
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpAddr")}
                />
                {formik.touched.cmpAddr && formik.errors.cmpAddr && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpAddr}
                  </div>
                )}
              </div>

              {/* cmpCity Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpCity"
                  className={`form-control form-control-sm ${
                    formik.touched.cmpCity && formik.errors.cmpCity
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpCity")}
                />
                {formik.touched.cmpCity && formik.errors.cmpCity && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpCity}
                  </div>
                )}
              </div>

              {/* Zip Code Field */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Zip Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpPincode"
                  className={`form-control form-control-sm ${
                    formik.touched.cmpPincode && formik.errors.cmpPincode
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpPincode")}
                />
                {formik.touched.cmpPincode && formik.errors.cmpPincode && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpPincode}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Tax Code<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="cmpTaxCode"
                  className={`form-control form-control-sm ${
                    formik.touched.cmpTaxCode && formik.errors.cmpTaxCode
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("cmpTaxCode")}
                />
                {formik.touched.cmpTaxCode && formik.errors.cmpTaxCode && (
                  <div className="invalid-feedback">
                    {formik.errors.cmpTaxCode}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Company Start Date<span className="text-danger">*</span>
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
                  Salary Calculation Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="salaryCalculationDate"
                  className={`form-control form-control-sm ${
                    formik.touched.salaryCalculationDate &&
                    formik.errors.salaryCalculationDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("salaryCalculationDate")}
                />
                {formik.touched.salaryCalculationDate &&
                  formik.errors.salaryCalculationDate && (
                    <div className="invalid-feedback">
                      {formik.errors.salaryCalculationDate}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Salary Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="salaryStartDate"
                  className={`form-control form-control-sm ${
                    formik.touched.salaryStartDate &&
                    formik.errors.salaryStartDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("salaryStartDate")}
                />
                {formik.touched.salaryStartDate &&
                  formik.errors.salaryStartDate && (
                    <div className="invalid-feedback">
                      {formik.errors.salaryStartDate}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Company Type<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="companyType"
                  className={`form-control form-control-sm ${
                    formik.touched.companyType && formik.errors.companyType
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("companyType")}
                />
                {formik.touched.companyType && formik.errors.companyType && (
                  <div className="invalid-feedback">
                    {formik.errors.companyType}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  HeadQuater Address<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="headQuaterAddress"
                  className={`form-control form-control-sm ${
                    formik.touched.headQuaterAddress &&
                    formik.errors.headQuaterAddress
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("headQuaterAddress")}
                />
                {formik.touched.headQuaterAddress &&
                  formik.errors.headQuaterAddress && (
                    <div className="invalid-feedback">
                      {formik.errors.headQuaterAddress}
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Branch Location<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="branchLocation"
                  className={`form-control form-control-sm ${
                    formik.touched.branchLocation &&
                    formik.errors.branchLocation
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("branchLocation")}
                />
                {formik.touched.branchLocation &&
                  formik.errors.branchLocation && (
                    <div className="invalid-feedback">
                      {formik.errors.branchLocation}
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Company Logo</label>
                <input
                  type="file"
                  name="logoFile"
                  accept="image/*"
                  className={`form-control form-control-sm ${
                    formik.touched.logoFile && formik.errors.logoFile
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) => handleFileChange(e, setLogoPreview)}
                />
                {formik.touched.logoFile && formik.errors.logoFile && (
                  <div className="invalid-feedback">
                    {formik.errors.logoFile}
                  </div>
                )}
                {logoPreview ? (
                  <div className="mt-2">
                    <img
                      src={data.logo || logoPreview}
                      alt="Logo Preview"
                      style={{ maxWidth: "20%", height: "auto" }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="mt-2">
                      <img
                        src={data.logo || logoPreview}
                        alt="Logo Preview"
                        style={{ maxWidth: "20%", height: "auto" }}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  name="fileAttachment"
                  accept="image/*"
                  className={`form-control form-control-sm ${
                    formik.touched.fileAttachment &&
                    formik.errors.fileAttachment
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) => handleFileChange(e, setProfileImgPreview)}
                />
                {formik.touched.fileAttachment &&
                  formik.errors.fileAttachment && (
                    <div className="invalid-feedback">
                      {formik.errors.fileAttachment}
                    </div>
                  )}

                {profileImgPreview ? (
                  <div className="mt-2">
                    <img
                      src={profileImgPreview}
                      alt="Profile Image Preview"
                      style={{ maxWidth: "20%", height: "auto" }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="mt-2">
                      <img
                        src={data.fileAttachment}
                        alt="Profile Image Preview"
                        style={{ maxWidth: "20%", height: "auto" }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationCompany;
