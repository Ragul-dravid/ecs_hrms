import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import api from "../../../../config/URL";
import { FaPlus } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";

function DepartmentCEdit({id, onSuccess}) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const cmpId = localStorage.getItem("cmpId");

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };
  const handleShow = () => {
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = Yup.object({
    deptName: Yup.string().required("*Department Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      deptName: "",
      deptDesc: "",
      deptCmpId: cmpId,
      departmentOwner: "",
      createdBy: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.post(`/department/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          onSuccess();
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "An unexpected error occurred.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred.";
        console.error("API Error:", error);
        toast.error(errorMessage);
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (Object.values(values).some((value) => value.trim() !== "")) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/department/${id}`);
        formik.setValues(response.data);
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <button
          className="btn btn-sm p-1 shadow-none border-none"
          onClick={handleShow}
        >
          <BiEditAlt />
        </button>
      <Modal
        show={show}
        size="md"
        onHide={handleClose}
        centered
        backdrop={isModified ? "static" : true}
        keyboard={isModified ? false : true}
      >
        <Modal.Header className="p-2 custom-close-btn" closeButton>
          <Modal.Title className="headColor fs-6">Edit Department</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <Modal.Body className="p-2">
            <div className="container">
              <div className="row py-4">
                <div className="col-md-12 col-12 mb-2">
                  <label className="form-label">
                    Department Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${
                      formik.touched.deptName && formik.errors.deptName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("deptName")}
                  />
                  {formik.touched.deptName && formik.errors.deptName && (
                    <div className="invalid-feedback">
                      {formik.errors.deptName}
                    </div>
                  )}
                </div>
                <div className="col-md-12 col-12 mb-2">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={3}
                    type="text"
                    className={`form-control form-control-sm  ${
                      formik.touched.deptDesc && formik.errors.deptDesc
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("deptDesc")}
                  />
                  {formik.touched.deptDesc && formik.errors.deptDesc && (
                    <div className="invalid-feedback">
                      {formik.errors.deptDesc}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer className="p-2">
              <button
                type="button"
                className="btn btn-sm btn-light m-0"
                onClick={handleClose}
              >
                Cancel
              </button>
              &nbsp; &nbsp;
              <button
                type="submit"
                className="btn btn-sm btn-buttonm btn-primary m-0"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Submit
              </button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default DepartmentCEdit;
