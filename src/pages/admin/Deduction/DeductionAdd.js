import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const DeductionAdd = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");
  const [empData, setEmpData] = useState([]);

  const validationSchema = Yup.object({
    deductionName: Yup.string().required("*Deduction Name is required"),
    deductionAmt: Yup.string().required("*Deduction Amount is required"),
    deductionEmpId: Yup.string().required("*Employee Name is required"),
    deductionMonth: Yup.string().required("*Deduction Month is required"),
  });

  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      deductionName: "",
      deductionEmpId: "",
      deductionAmt: "",
      deductionMonth: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await api.post(`/deduction`, values);
        if (response.status === 201) {
          toast.success(response.data.message);
          onSuccess();
          setShowModal(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Error updating data: ", e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const fetchEmployeeList = async () => {
    try {
      const employee = await api.get(`getEmpolyeeWithRole/${cmpId}`);
      setEmpData(employee.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    formik.resetForm();
  };
  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <div className="container mt-3">
      <button
        type="submit"
        className="btn btn-sm btn-button btn-primary"
        onClick={handleShow}
      >
        <span>
          Add <FaPlus className="pb-1" />
        </span>
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Deduction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Deduction Name <span className="text-danger">*</span>
              </label>
              <select
                name="deductionName"
                className={`form-select ${
                  formik.touched.deductionName && formik.errors.deductionName
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("deductionName")}
              >
                <option value=""></option>
                <option value="CPF">CPF</option>
                <option value="LOP">LOP</option>
                <option value="LOAN INTEREST">LOAN INTEREST</option>
              </select>
              {formik.touched.deductionName && formik.errors.deductionName && (
                <div className="invalid-feedback">
                  {formik.errors.deductionName}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                Employee <span className="text-danger">*</span>
              </label>
              <select
                name="deductionEmpId"
                className={`form-select ${
                  formik.touched.deductionEmpId && formik.errors.deductionEmpId
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("deductionEmpId")}
              >
                <option value=""></option>
                {empData.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.empName}
                  </option>
                ))}
              </select>
              {formik.touched.deductionEmpId &&
                formik.errors.deductionEmpId && (
                  <div className="invalid-feedback">
                    {formik.errors.deductionEmpId}
                  </div>
                )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                Deduction Amount <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="deductionAmt"
                className={`form-control ${
                  formik.touched.deductionAmt && formik.errors.deductionAmt
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("deductionAmt")}
              />
              {formik.touched.deductionAmt && formik.errors.deductionAmt && (
                <div className="invalid-feedback">
                  {formik.errors.deductionAmt}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                Deduction Month <span className="text-danger">*</span>
              </label>
              <input
                type="month"
                name="deductionMonth"
                className={`form-control ${
                  formik.touched.deductionMonth && formik.errors.deductionMonth
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("deductionMonth")}
              />
              {formik.touched.deductionMonth &&
                formik.errors.deductionMonth && (
                  <div className="invalid-feedback">
                    {formik.errors.deductionMonth}
                  </div>
                )}
            </div>

            <div className="d-flex justify-content-end gap-3">
              <Button
                onClick={handleClose}
                  variant="secondary"
                className="btn btn-sm"
              >
                Cancel
              </Button>
              <Button
                className="btn btn-sm btn-buttonm btn-primary m-0"
                type="submit"
                disabled={loading}
              >
                Save
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeductionAdd;
