import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";

const DepartmentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");

  const validationSchema = Yup.object({
    deptName: Yup.string().required("*Department Name is required"),
    deptDesc: Yup.string().required("*Department Description is required"),
  });

  // useFormik hook for form handling
  const formik = useFormik({
    initialValues: {
      deptCmpId: cmpId,
      deptName: "",
      deptDesc: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/department/${id}`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/departments");
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
        const response = await api.get(`/department/${id}`);
        formik.setValues(response.data); // Load the data into the form
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      }
    };
    getData();
  }, [id]);

  return (
    <div className="container-fluid px-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header" style={{ borderRadius: "0" }}>
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Edit Department</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/departments">
                    <button type="button" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-sm btn-primary" disabled={loading}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    ) : (
                      <span>Update</span>
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
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Department Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="deptName"
                  className={`form-control form-control-sm ${formik.touched.deptName && formik.errors.deptName ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("deptName")}
                />
                {formik.touched.deptName && formik.errors.deptName && (
                  <div className="invalid-feedback">{formik.errors.deptName}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3"></div>
              <div className="col-md-12 col-12 mb-3">
                <label className="form-label">
                  Department Description <span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  rows={30}
                  name="deptDesc"
                  className={`form-control form-control-sm ${formik.touched.deptDesc && formik.errors.deptDesc ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("deptDesc")}
                />
                {formik.touched.deptDesc && formik.errors.deptDesc && (
                  <div className="invalid-feedback">{formik.errors.deptDesc}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DepartmentEdit;
