import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "../../../../config/URL";
import toast from "react-hot-toast";

const ActiveAndInActiveAdd = ({ onSuccess }) => {
  const [show, setShow] = useState(false);
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
    code: yup.string().required("*Code is required"),
    allowanceName: yup.string().required("*Allowance Name is required"),
    activestatus: yup.string().required("*Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      allowanceName: "",
      activestatus: "",
      createdBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.createdBy = userName;
      try {
        const response = await api.post("/createEcsInActiveAllowance", values, {
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
      if (Object.values(values).some((value) => (value && typeof value === 'string' ? value.trim() !== "" : value))) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
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
            <Modal.Title className="headColor">Add Active/Inactive Allowance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control   ${formik.touched.code &&
                        formik.errors.code
                        ? "is-invalid"
                        : ""
                        }`}
                      aria-label="code"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("code")}
                    />
                    {formik.touched.code &&
                      formik.errors.code && (
                        <div className="invalid-feedback">
                          {formik.errors.code}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Allowance Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control   ${formik.touched.allowanceName &&
                        formik.errors.allowanceName
                        ? "is-invalid"
                        : ""
                        }`}
                      aria-label="allowanceName"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("allowanceName")}
                    />
                    {formik.touched.allowanceName &&
                      formik.errors.allowanceName && (
                        <div className="invalid-feedback">
                          {formik.errors.allowanceName}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <label className="form-label mb-1">
                    Status<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${formik.touched.activestatus && formik.errors.activestatus
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("activestatus")}
                  >
                    <option >Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {formik.touched.activestatus && formik.errors.activestatus && (
                    <div className="invalid-feedback">{formik.errors.activestatus}</div>
                  )}
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
};

export default ActiveAndInActiveAdd;
