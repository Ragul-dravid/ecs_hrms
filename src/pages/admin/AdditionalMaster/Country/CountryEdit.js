import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../../config/URL";
import { BiEditAlt } from "react-icons/bi";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

function CountryEdit({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleMenuClose();
    formik.resetForm();
  };

  const handleShow = async () => {
    try {
      const response = await api.get(`/getCountryById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    countryCode: yup.string().required("*Country Code is required"),
    countryName: yup.string().required("*Country Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      countryCode: "",
      countryName: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form", values);

      values.updatedBy = userName;
      try {
        const response = await api.put(`/updateCountry/${id}`, values, {
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
              Edit Race &nbsp;&nbsp; <i className="bx bx-plus"></i>
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
                    Country Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.countryCode && formik.errors.countryCode
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="countryCode"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("countryCode")}
                    />
                    {formik.touched.countryCode &&
                      formik.errors.countryCode && (
                        <div className="invalid-feedback">
                          {formik.errors.countryCode}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Country Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.countryName && formik.errors.countryName
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="countryName"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("countryName")}
                    />
                    {formik.touched.countryName &&
                      formik.errors.countryName && (
                        <div className="invalid-feedback">
                          {formik.errors.countryName}
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

export default CountryEdit;
