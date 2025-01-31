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

function BankEdit({ id, onSuccess, handleMenuClose }) {
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
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    bankCode: yup.string().required("*Bank Code is required"),
    bankName: yup.string().required("*Bank Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      bankCode: "",
      bankName: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form", values);

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
              Edit Bank &nbsp;&nbsp; <i className="bx bx-plus"></i>
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
                    Bank Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      onKeyDown={(e) => e.stopPropagation()}
                      type="text"
                      className={`form-control form-control-sm   ${
                        formik.touched.bankCode && formik.errors.bankCode
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="bankCode"
                      {...formik.getFieldProps("bankCode")}
                    />
                    {formik.touched.bankCode && formik.errors.bankCode && (
                      <div className="invalid-feedback">
                        {formik.errors.bankCode}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Bank Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      onKeyDown={(e) => e.stopPropagation()}
                      className={`form-control form-control-sm   ${
                        formik.touched.bankName && formik.errors.bankName
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="bankName"
                      {...formik.getFieldProps("bankName")}
                    />
                    {formik.touched.bankName && formik.errors.bankName && (
                      <div className="invalid-feedback">
                        {formik.errors.bankName}
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

export default BankEdit;
