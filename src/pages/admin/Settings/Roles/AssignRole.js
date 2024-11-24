import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import { PiPlusLight } from "react-icons/pi";
import employeeListByCompId from "../../List_Apis/EmployeeListByCmpId";

const AssignRole = () => {
  const [loading, setLoadIndicator] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //   const [selectedEmp, setSelectedEmp] = useState([]);
  const [empData, setEmpData] = useState([]);
  const cmpId = localStorage.getItem("cmpId");
  //   const empOptions = empData?.map((emp) => ({
  //     label: emp.empName,
  //     value: emp.id,
  //   }));

  const validationSchema = Yup.object({
    // roleName: Yup.string().required("Role Name is required"),
    // roleDesc: Yup.string().required("Description is required"),
    // roleStatus: Yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      empId: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("object", values);
      setLoadIndicator(true);
      //   try {
      //     const response = await api.post(`/company-reg`, values);
      //     if (response.status === 201) {
      //       toast.success(response.data.message);
      //       setShowModal(false); // Close the modal on success
      //     } else {
      //       toast.error(response.data.message);
      //     }
      //   } catch (e) {
      //     toast.error("Error updating data: " + e?.response?.data?.message);
      //   } finally {
      //     setLoadIndicator(false);
      //   }
      setLoadIndicator(false);
    },
  });

  const fetchData = async () => {
    try {
      const empData = await employeeListByCompId();
      setEmpData(empData);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button className="btn btn-sm p-0" onClick={() => setShowModal(true)}>
        <PiPlusLight />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Roles</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label">
                        Role Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="roleName"
                        className={`form-control form-control-sm ${
                          formik.touched.roleName && formik.errors.roleName
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("roleName")}
                      />
                      {formik.touched.roleName && formik.errors.roleName && (
                        <div className="invalid-feedback">
                          {formik.errors.roleName}
                        </div>
                      )}
                    </div>
                    <div className=" col-12 mb-3">
                      <label className="form-label">
                        Employee Name
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        name="empId"
                        className={`form-select form-select-sm ${
                          formik.touched.empId && formik.errors.empId
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("empId")}
                      >
                        {/* Add a default option */}
                        <option value="" selected></option>
                        {empData &&
                          empData.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                             {emp.empName}
                            </option>
                          ))}
                      </select>
                      {formik.touched.empId && formik.errors.empId && (
                        <div className="invalid-feedback">
                          {formik.errors.empId}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2 btn-sm"
                      onClick={() => setShowModal(false)}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <span>Save</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </div>
  );
};

export default AssignRole;
