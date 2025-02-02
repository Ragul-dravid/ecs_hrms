import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../config/URL";

function NationalityAdd({ onSuccess }) {
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
    nationalityCode: yup.string().required("*Nationality Code is required"),
    nationalityName: yup.string().required("*Nationality Name is required"),
    irbanationalityCode: yup
      .string()
      .required("*IRBA Nationality Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      nationalityCode: "",
      nationalityName: "",
      irbanationalityCode: "",
      createdBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form", values);

      values.createdBy = userName;
      try {
        const response = await api.post("/createEcsNationality", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          setShow(false);
          // navigate("/subject");
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
            <Modal.Title className="headColor">Add Nationality</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Nationality Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm   ${
                        formik.touched.nationalityCode &&
                        formik.errors.nationalityCode
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="nationalityCode"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("nationalityCode")}
                    />
                    {formik.touched.nationalityCode &&
                      formik.errors.nationalityCode && (
                        <div className="invalid-feedback">
                          {formik.errors.nationalityCode}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Nationality Name<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control form-control-sm  ${
                        formik.touched.nationalityName &&
                        formik.errors.nationalityName
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="nationalityName"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("nationalityName")}
                    />
                    {formik.touched.nationalityName &&
                      formik.errors.nationalityName && (
                        <div className="invalid-feedback">
                          {formik.errors.nationalityName}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    IRBA Nationality Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <select
                      {...formik.getFieldProps("irbanationalityCode")}
                      className={`form-select form-select-sm  ${
                        formik.touched.irbanationalityCode &&
                        formik.errors.irbanationalityCode
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option selected></option>
                      <option value="None">None</option>
                      <option value="One">One</option>
                      <option value="Two">Two</option>
                    </select>
                    {formik.touched.irbanationalityCode &&
                      formik.errors.irbanationalityCode && (
                        <div className="invalid-feedback">
                          {formik.errors.irbanationalityCode}
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

export default NationalityAdd;
