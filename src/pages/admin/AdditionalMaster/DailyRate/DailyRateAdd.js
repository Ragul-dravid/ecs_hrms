import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../config/URL";

function DailyRateAdd({ onSuccess }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => {
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    dailyCode: yup.string().required("*Daily Rate Code is required"),
    dailyRateName: yup.string().required("*Daily Rate Name is required"),
    rate: yup.string().required("*Rate is required"),
  });

  const formik = useFormik({
    initialValues: {
      dailyCode: "",
      dailyRateName: "",
      rate: "",
      createdBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form", values);

      values.createdBy = userName;
      try {
        const response = await api.post("/createDailyRate", values, {
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
  });

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-sm btn-button btn-primary mx-2 my-2"
          onClick={handleShow}
        >
          &nbsp; Add &nbsp;&nbsp; <i className="bx bx-plus"></i>
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-model-title-vcenter"
        centered
        backdrop={isModified ? "static" : true}
        keyboard={isModified ? false : true}
      >
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="headColor">Add Daily Rate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Daily Rate Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.dailyCode && formik.errors.dailyCode
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="dailyCode"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("dailyCode")}
                    />
                    {formik.touched.dailyCode && formik.errors.dailyCode && (
                      <div className="invalid-feedback">
                        {formik.errors.dailyCode}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Daily Rate Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.dailyRateName &&
                        formik.errors.dailyRateName
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="dailyRateName"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("dailyRateName")}
                    />
                    {formik.touched.dailyRateName &&
                      formik.errors.dailyRateName && (
                        <div className="invalid-feedback">
                          {formik.errors.dailyRateName}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Rate<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.rate && formik.errors.rate
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="rate"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("rate")}
                    />
                    {formik.touched.rate && formik.errors.rate && (
                      <div className="invalid-feedback">
                        {formik.errors.rate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
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
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default DailyRateAdd;
