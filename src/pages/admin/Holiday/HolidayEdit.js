import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";

const HolidayEdit = ({ onSuccess, id }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");
  const [companyData, setCompanyData] = useState(null);

  const handleShow = async () => {
    setModalVisible(true);
    try {
      const response = await api.get(`/public-holidays/${id}`);
      formik.setValues(response.data);
      formik.setValues({
        ...response.data,
        startDate: response.data.startDate?.substring(0, 10),
        endDate: response.data.endDate?.substring(0, 10),
      });
    } catch (e) {
      toast.error("Error fetching data: ", e?.response?.data?.message);
    }
  };
  const validationSchema = Yup.object({
    pubHolidayName: Yup.string().required("*Holiday Name is required"),
    pubHolidayType: Yup.string().required("*Holiday Type is required"),
    endDate: Yup.string().required("*End Date is required"),
  });

  // useFormik hook for form handling
  const formik = useFormik({
    initialValues: {
      pubHolidayCmpId: cmpId,
      publicHolidayOwner: "",
      pubHolidayId: "",
      pubHolidayName: "",
      pubHolidayType: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/public-holidays/${id}`, values);
        if (response.status === 200) {
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
          className="btn btn-sm p-1 shadow-none border-none pt-4"
          onClick={handleShow}
        >
          <BiEditAlt />
        </button>
      </div>
      <Modal
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Holiday</Modal.Title>
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
                className="btn btn-sm"
                variant="secondary"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </Button>

              <Button type="submit" variant="primary" className="btn btn-sm">
                Update
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HolidayEdit;
