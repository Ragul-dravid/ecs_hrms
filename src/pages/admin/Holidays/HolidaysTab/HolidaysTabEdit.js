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

function HolidaysTabEdit({ id, onSuccess, handleMenuClose }) {
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
      const response = await api.get(`/getEcsHolidayById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    holidayDate: yup.string().required("*Holiday Date is required"),
    holidayName: yup.string().required("*Holiday Name is required"),
    reasonName: yup.string().required("*Reason Name is required"),
    holidayGroupName: yup.string().required("*Holiday Group Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      holidayDate: "",
      holidayName: "",
      reasonName: "",
      holidayGroupName: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form", values);

      values.updatedBy = userName;
      try {
        const response = await api.put(`/updateEcsHoliday/${id}`, values, {
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
              Edit Holiday &nbsp;&nbsp; <i className="bx bx-plus"></i>
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
                    Holiday Date<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.holidayDate && formik.errors.holidayDate
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="holidayDate"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("holidayDate")}
                    />
                    {formik.touched.holidayDate &&
                      formik.errors.holidayDate && (
                        <div className="invalid-feedback">
                          {formik.errors.holidayDate}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Holiday Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.holidayName && formik.errors.holidayName
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="holidayName"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("holidayName")}
                    />
                    {formik.touched.holidayName &&
                      formik.errors.holidayName && (
                        <div className="invalid-feedback">
                          {formik.errors.holidayName}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Reason Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.reasonName && formik.errors.reasonName
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="reasonName"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("reasonName")}
                    />
                    {formik.touched.reasonName && formik.errors.reasonName && (
                      <div className="invalid-feedback">
                        {formik.errors.reasonName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Holiday Group Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.holidayGroupName &&
                        formik.errors.holidayGroupName
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="holidayGroupName"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("holidayGroupName")}
                    />
                    {formik.touched.holidayGroupName &&
                      formik.errors.holidayGroupName && (
                        <div className="invalid-feedback">
                          {formik.errors.holidayGroupName}
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

export default HolidaysTabEdit;
