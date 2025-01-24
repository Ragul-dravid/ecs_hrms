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
import api from "../../../../config/URL";
import { BiEditAlt } from "react-icons/bi";

const PayableDeductibleEdit = ({ id, onSuccess, handleMenuClose }) => {
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
    code: yup.string().required("*Code is required"),
    allowanceName: yup.string().required("*Allowance Name is required"),
    amount: yup.number().required("*Amount is required"),
    cpf: yup.string().required("*CPF selection is required"),
    ir8a: yup.string().required("*IR8A selection is required"),
    ir21: yup.string().required("*IR21 selection is required"),
    appendix8a: yup.string().required("*Appendix 8A selection is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      allowanceName: "",
      amount: "",
      cpf: "",
      ir8a: "",
      ir21: "",
      appendix8a: "",
      includeForGrossRatePay: false,
      monthlyProratePaidLeave: false,
      monthlyProrateUnpaidLeave: false,
      includeInCCMLClaimReport: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.updatedBy = userName;
      try {
        const response = await api.post("/createAllowance", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          setShow(false);
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
        Object.values(values).some((value) => value !== "" && value !== false)
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
          <DialogTitle>Edit Race</DialogTitle>
          <DialogContent className="pb-0">
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label mb-1">
                    Code<span className="text-danger">*</span>
                  </label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control ${
                      formik.touched.code && formik.errors.code
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("code")}
                  />
                  {formik.touched.code && formik.errors.code && (
                    <div className="invalid-feedback">{formik.errors.code}</div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label mb-1">
                    Allowance Name<span className="text-danger">*</span>
                  </label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control ${
                      formik.touched.allowanceName &&
                      formik.errors.allowanceName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("allowanceName")}
                  />
                  {formik.touched.allowanceName &&
                    formik.errors.allowanceName && (
                      <div className="invalid-feedback">
                        {formik.errors.allowanceName}
                      </div>
                    )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label mb-1">
                    Amount<span className="text-danger">*</span>
                  </label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="number"
                    className={`form-control ${
                      formik.touched.amount && formik.errors.amount
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("amount")}
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <div className="invalid-feedback">
                      {formik.errors.amount}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label mb-1">
                    CPF<span className="text-danger">*</span>
                  </label>
                  <select
                    onKeyDown={(e) => e.stopPropagation()}
                    className={`form-select ${
                      formik.touched.cpf && formik.errors.cpf
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("cpf")}
                  >
                    <option value="">Select CPF</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {formik.touched.cpf && formik.errors.cpf && (
                    <div className="invalid-feedback">{formik.errors.cpf}</div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label mb-1">
                    IR8A<span className="text-danger">*</span>
                  </label>
                  <select
                    onKeyDown={(e) => e.stopPropagation()}
                    className={`form-select ${
                      formik.touched.ir8a && formik.errors.ir8a
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("ir8a")}
                  >
                    <option value="">Select IR8A</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {formik.touched.ir8a && formik.errors.ir8a && (
                    <div className="invalid-feedback">{formik.errors.ir8a}</div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label mb-1">
                    IR21<span className="text-danger">*</span>
                  </label>
                  <select
                    onKeyDown={(e) => e.stopPropagation()}
                    className={`form-select ${
                      formik.touched.ir21 && formik.errors.ir21
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("ir21")}
                  >
                    <option value="">Select IR21</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {formik.touched.ir21 && formik.errors.ir21 && (
                    <div className="invalid-feedback">{formik.errors.ir21}</div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label mb-1">
                    Appendix 8A<span className="text-danger">*</span>
                  </label>
                  <select
                    onKeyDown={(e) => e.stopPropagation()}
                    className={`form-select ${
                      formik.touched.appendix8a && formik.errors.appendix8a
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("appendix8a")}
                  >
                    <option value="">Select Appendix 8A</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {formik.touched.appendix8a && formik.errors.appendix8a && (
                    <div className="invalid-feedback">
                      {formik.errors.appendix8a}
                    </div>
                  )}
                </div>

                <div className="col-6 mb-2"></div>
                <div className="col-6 my-3">
                  <p>Include for Gross Rate Pay</p>
                  <div className="form-check">
                    <input
                      onKeyDown={(e) => e.stopPropagation()}
                      type="checkbox"
                      className="form-check-input"
                      id="includeForGrossRatePay"
                      {...formik.getFieldProps("includeForGrossRatePay")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="includeForGrossRatePay"
                    >
                      Calculate No Pay Day as Per MOM Rule.
                    </label>
                  </div>
                </div>

                <div className="col-6 my-3">
                  <p>Monthly prorate</p>
                  <div className="form-check">
                    <input
                      onKeyDown={(e) => e.stopPropagation()}
                      type="checkbox"
                      className="form-check-input"
                      id="monthlyProratePaidLeave"
                      {...formik.getFieldProps("monthlyProratePaidLeave")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="monthlyProratePaidLeave"
                    >
                      Paid Leave
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      onKeyDown={(e) => e.stopPropagation()}
                      type="checkbox"
                      className="form-check-input"
                      id="monthlyProrateUnpaidLeave"
                      {...formik.getFieldProps("monthlyProrateUnpaidLeave")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="monthlyProrateUnpaidLeave"
                    >
                      Unpaid Leave
                    </label>
                  </div>
                </div>

                <div className="col-12 my-3">
                  <p>Include in CC/ML Claim Report</p>
                  <div className="form-check">
                    <input
                      onKeyDown={(e) => e.stopPropagation()}
                      type="checkbox"
                      className="form-check-input"
                      id="includeInCCMLClaimReport"
                      {...formik.getFieldProps("includeInCCMLClaimReport")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="includeInCCMLClaimReport"
                    >
                      Include a Allowance with calculating monthly recurring
                      allowances of child care/maternity leave claim report
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="me-3 mb-3">
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
};

export default PayableDeductibleEdit;
