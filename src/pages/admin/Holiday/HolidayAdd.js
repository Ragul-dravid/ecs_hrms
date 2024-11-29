import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const HolidayAdd = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");
  const userName = sessionStorage.getItem("userName");
  const [companyData, setCompanyData] = useState(null);

  const handleShow = () => {
    setModalVisible(true);
  };

  const validationSchema = Yup.object({
    pubHolidayName: Yup.string().required("*Holiday Name is required"),
    pubHolidayType: Yup.string().required("*Holiday Type is required"),
    endDate: Yup.string().required("*End Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      pubHolidayCmpId: cmpId,
      // publicHolidayOwner: userName,
      publicHolidayOwner: "",
      pubHolidayName: "",
      pubHolidayType: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const payload = {
          pubHolidayName: values.pubHolidayName,
          startDate: values.startDate,
          endDate: values.endDate,
        };
        const response = await api.post(`/public-holidays`, values);
        if (response.status === 201) {
          setModalVisible(false);
          onSuccess();
          toast.success(response.data.message);
          navigate("/holidays");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Error updating data: ", e?.response?.data?.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  return (
    <>
      <div className="mb-3 d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-sm btn-button btn-primary"
          onClick={handleShow}
        >
          <span cla>
            Add <FaPlus className="pb-1" />
          </span>
        </button>
      </div>
      <Modal
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              {/* Holiday Name */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Holiday Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="pubHolidayName"
                  className={`form-control form-control-sm ${
                    formik.touched.pubHolidayName &&
                    formik.errors.pubHolidayName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("pubHolidayName")}
                />
                {formik.touched.pubHolidayName &&
                  formik.errors.pubHolidayName && (
                    <div className="invalid-feedback">
                      {formik.errors.pubHolidayName}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Holiday Type <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="pubHolidayType"
                  className={`form-control form-control-sm ${
                    formik.touched.pubHolidayType &&
                    formik.errors.pubHolidayType
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("pubHolidayType")}
                />
                {formik.touched.pubHolidayType &&
                  formik.errors.pubHolidayType && (
                    <div className="invalid-feedback">
                      {formik.errors.pubHolidayType}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Start Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  className={`form-control form-control-sm ${
                    formik.touched.startDate && formik.errors.startDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("startDate")}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <div className="invalid-feedback">
                    {formik.errors.startDate}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  End Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  className={`form-control form-control-sm ${
                    formik.touched.endDate && formik.errors.endDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("endDate")}
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <div className="invalid-feedback">
                    {formik.errors.endDate}
                  </div>
                )}
              </div>
              <div className="col-md-12 col-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className={`form-control form-control-sm ${
                    formik.touched.description && formik.errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="invalid-feedback">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                className="btn btn-sm"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </Button>

              <Button type="submit" variant="primary" className="btn btn-sm">
                Save
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HolidayAdd;
