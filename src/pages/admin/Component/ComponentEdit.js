import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MdOutlineModeEdit } from "react-icons/md";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { BiEditAlt } from "react-icons/bi";
import Component from "./Component";

function ComponentEdit({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleMenuClose();
    formik.resetForm();
  };

  const handleShow = () => {
    getData();
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    departmentCode: yup.string().required("*Subject is required"),
    departmentName: yup.string().required("*Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      departmentCode: "",
      departmentName: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.updatedBy = userName;
      try {
        const response = await api.put(`/updateCourseSubject/${id}`, values, {
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
    validate: (values) => {
      if (
        Object.values(values).some(
          (value) => typeof value === "string" && value.trim() !== ""
        )
      ) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
  });

  const getData = async () => {
    try {
      const response = await api.get(`/getAllCourseSubjectsById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

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
          <DialogTitle>Edit Component</DialogTitle>
          <DialogContent>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Component Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      onKeyDown={(e) => e.stopPropagation()}
                      type="text"
                      className={`form-control   ${
                        formik.touched.subject && formik.errors.subject
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Subject"
                      {...formik.getFieldProps("subject")}
                    />
                    {formik.touched.subject && formik.errors.subject && (
                      <div className="invalid-feedback">
                        {formik.errors.subject}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Component Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      onKeyDown={(e) => e.stopPropagation()}
                      className={`form-control   ${
                        formik.touched.code && formik.errors.code
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Code"
                      {...formik.getFieldProps("code")}
                    />
                    {formik.touched.code && formik.errors.code && (
                      <div className="invalid-feedback">
                        {formik.errors.code}
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

export default ComponentEdit;
