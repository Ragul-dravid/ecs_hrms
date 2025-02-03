import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import * as Yup from "yup";
import api from "../../../../config/URL";
import { BiEditAlt } from "react-icons/bi";
import toast from "react-hot-toast";

function ActiveAndInActiveEdit({ id, onSuccess, handleMenuClose }) {
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const userName = localStorage.getItem("userName");

  const getData = async () => {
    try {
      const response = await api.get(`/getEcsInActiveAllowanceById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("*Code is required"),
    allowanceName: Yup.string().required("*Allowance Name is required"),
    activestatus: Yup.string().required("*Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      allowanceName: "",
      activestatus: "",
      createdBy: userName,
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.updatedBy = userName;
      try {
        const response = await api.put(`/updateEcsInActiveAllowance/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          console.log("Response Data:", response.data);
          toast.success(response.data?.message);
          onSuccess();
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
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

  const handleClose = () => {
    handleMenuClose();
    formik.resetForm();
    setOpen(false);
  };

  const handleOpen = () => {
    getData();
    setOpen(true);
    setIsModified(false);
  };

  return (
    <>
      <p
        className="text-start mb-0 menuitem-style"
        onClick={handleOpen}
        style={{ whiteSpace: "nowrap", width: "100%" }}
      >
        <BiEditAlt style={{ marginRight: "8px" }} />
        Edit
      </p>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        disableBackdropClick={isModified}
        disableEscapeKeyDown={isModified}
      >
        <DialogTitle className="headColor">Edit Active/Inactive Allowance</DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <DialogContent>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Code<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${formik.touched.code && formik.errors.code ? "is-invalid" : ""}`}
                    {...formik.getFieldProps("code")}
                  />
                  {formik.touched.code && formik.errors.code && (
                    <div className="invalid-feedback">{formik.errors.code}</div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Allowance Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${formik.touched.allowanceName && formik.errors.allowanceName ? "is-invalid" : ""}`}
                    {...formik.getFieldProps("allowanceName")}
                  />
                  {formik.touched.allowanceName && formik.errors.allowanceName && (
                    <div className="invalid-feedback">{formik.errors.allowanceName}</div>
                  )}
                </div>
                <div className="col-md-6 col-12">
                  <label className="form-label mb-1">
                    Status<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${formik.touched.activestatus && formik.errors.activestatus ? "is-invalid" : ""}`}
                    {...formik.getFieldProps("activestatus")}
                  >
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {formik.touched.activestatus && formik.errors.activestatus && (
                    <div className="invalid-feedback">{formik.errors.activestatus}</div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </button>
            <Button
              type="submit"
              className="btn btn-button btn-sm"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default ActiveAndInActiveEdit;
