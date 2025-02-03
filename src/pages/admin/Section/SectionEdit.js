import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { BiEditAlt } from "react-icons/bi";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

function SectionEdit({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");

  const handleClose = () => {
    setShow(false);
    handleMenuClose();
    formik.resetForm();
  };

  const handleShow = async () => {
    try {
      const response = await api.get(`/getEcsSectionById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
    setShow(true);
  };

  const validationSchema = yup.object().shape({
    sectionCode: yup.string().required("*Section Name is required"),
    sectionName: yup.string().required("*Section Name is required"),
    departmentCode: yup.string().required("*Department Code is required"),
    departmentName: yup.string().required("*Department Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      departmentCode: "",
      departmentName: "",
      sectionName: "",
      sectionCode: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form", values);

      values.updatedBy = userName;
      try {
        const response = await api.put(`/updateEcsSection/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          onSuccess();
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message || "Error occurred");
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <>
      <p
        className="text-start mb-0 menuitem-style"
        onClick={handleShow}
        style={{
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        <BiEditAlt style={{ marginRight: "8px" }} />
        Edit
      </p>

      <Dialog open={show} onClose={handleClose} fullWidth maxWidth="md">
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <DialogTitle
            className="headColor"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              Edit Section &nbsp;&nbsp; <i className="bx bx-plus"></i>
            </span>
            <IconButton onClick={handleClose} size="small">
              <Close />
            </IconButton>
          </DialogTitle>{" "}
          <DialogContent>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Section Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      onKeyDown={(e) => e.stopPropagation()}
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.sectionCode && formik.errors.sectionCode
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="sectionCode"
                      {...formik.getFieldProps("sectionCode")}
                    />
                    {formik.touched.sectionCode &&
                      formik.errors.sectionCode && (
                        <div className="invalid-feedback">
                          {formik.errors.sectionCode}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Section Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      onKeyDown={(e) => e.stopPropagation()}
                      type="text"
                      className={`form-control form-control-sm   ${
                        formik.touched.sectionName && formik.errors.sectionName
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="sectionName"
                      {...formik.getFieldProps("sectionName")}
                    />
                    {formik.touched.sectionName &&
                      formik.errors.sectionName && (
                        <div className="invalid-feedback">
                          {formik.errors.sectionName}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Department Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      onKeyDown={(e) => e.stopPropagation()}
                      type="text"
                      className={`form-control form-control-sm   ${
                        formik.touched.departmentCode &&
                        formik.errors.departmentCode
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="departmentCode"
                      {...formik.getFieldProps("departmentCode")}
                    />
                    {formik.touched.departmentCode &&
                      formik.errors.departmentCode && (
                        <div className="invalid-feedback">
                          {formik.errors.departmentCode}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Department Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      onKeyDown={(e) => e.stopPropagation()}
                      className={`form-control form-control-sm   ${
                        formik.touched.departmentName &&
                        formik.errors.departmentName
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="departmentName"
                      {...formik.getFieldProps("departmentName")}
                    />
                    {formik.touched.departmentName &&
                      formik.errors.departmentName && (
                        <div className="invalid-feedback">
                          {formik.errors.departmentName}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-button btn-primary"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2 "
                  aria-hidden="true"
                ></span>
              )}
              Update
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default SectionEdit;
