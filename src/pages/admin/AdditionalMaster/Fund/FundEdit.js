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

function FundEdit({ id, onSuccess, handleMenuClose }) {
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
      const response = await api.get(`/getFundById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    fundCode: yup.string().required("*Fund Code is required"),
    fundName: yup.string().required("*Fund Name is required"),
    irpaFund: yup.string().required("*IRPA Fund is required"),
  });

  const formik = useFormik({
    initialValues: {
      fundCode: "",
      fundName: "",
      perc: "",
      maxPerMonth: "",
      minimum: "",
      irpaFund: "",
      ir21: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form", values);

      values.updatedBy = userName;
      try {
        const response = await api.put(`/updateFund/${id}`, values, {
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
              Edit Fund &nbsp;&nbsp; <i className="bx bx-plus"></i>
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
                    Fund Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.fundCode && formik.errors.fundCode
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="fundCode"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("fundCode")}
                    />
                    {formik.touched.fundCode && formik.errors.fundCode && (
                      <div className="invalid-feedback">
                        {formik.errors.fundCode}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Fund Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.fundName && formik.errors.fundName
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="fundName"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("fundName")}
                    />
                    {formik.touched.fundName && formik.errors.fundName && (
                      <div className="invalid-feedback">
                        {formik.errors.fundName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    perc<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className={`form-control form-control-sm  ${
                        formik.touched.perc && formik.errors.perc
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="perc"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("perc")}
                    />
                    {formik.touched.perc && formik.errors.perc && (
                      <div className="invalid-feedback">
                        {formik.errors.perc}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Max Per Month<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className={`form-control form-control-sm  ${
                        formik.touched.maxPerMonth && formik.errors.maxPerMonth
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="maxPerMonth"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("maxPerMonth")}
                    />
                    {formik.touched.maxPerMonth &&
                      formik.errors.maxPerMonth && (
                        <div className="invalid-feedback">
                          {formik.errors.maxPerMonth}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Minimum<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className={`form-control form-control-sm  ${
                        formik.touched.minimum && formik.errors.minimum
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="minimum"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("minimum")}
                    />
                    {formik.touched.minimum && formik.errors.minimum && (
                      <div className="invalid-feedback">
                        {formik.errors.minimum}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    IRPA Fund<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <select
                      className={`form-control form-control-sm ${
                        formik.touched.irpaFund && formik.errors.irpaFund
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="irpaFund"
                      {...formik.getFieldProps("irpaFund")}
                    >
                      <option value="">Select</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                    {formik.touched.irpaFund && formik.errors.irpaFund && (
                      <div className="invalid-feedback">
                        {formik.errors.irpaFund}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Ir21<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.ir21 && formik.errors.ir21
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="ir21"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("ir21")}
                    />
                    {formik.touched.ir21 && formik.errors.ir21 && (
                      <div className="invalid-feedback">
                        {formik.errors.ir21}
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

export default FundEdit;
