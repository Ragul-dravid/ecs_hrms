import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select"; // Import react-select
import toast from "react-hot-toast";
import { PiPlusLight } from "react-icons/pi";
import employeeListByCompId from "../../List_Apis/EmployeeListByCmpId";

const AssignRole = () => {
  const [loading, setLoadIndicator] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [empData, setEmpData] = useState([]);
  const cmpId = localStorage.getItem("cmpId");

  const handleopen = async () => {
    setShowModal(true);
    try {
      const empData = await employeeListByCompId();
      setEmpData(empData);
    } catch (error) {
      toast.error("Error fetching employees.");
    }
  };

  const validationSchema = Yup.object({
    roleName: Yup.string().required("Role Name is required"),
    empId: Yup.array()
      .of(Yup.string())
      .min(1, "At least one employee must be selected"),
  });

  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      empId: [],
      roleName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Submitted values:", values);
      setLoadIndicator(true);
      try {
        // Simulate API call
        toast.success("Role assigned successfully!");
        setShowModal(false);
      } catch (error) {
        toast.error("Failed to assign role.");
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const empOptions = empData.map((emp) => ({
    label: emp.empName,
    value: emp.id,
  }));

  // Custom option component with a checkbox
  const CustomOption = (props) => {
    const { data, isSelected, innerRef, innerProps } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="d-flex align-items-center p-2"
        style={{
          backgroundColor: isSelected ? "#e0f7fa" : "white",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => null}
          className="me-2"
        />
        {data.label}
      </div>
    );
  };

  return (
    <div>
      <button className="btn btn-sm p-0" onClick={handleopen}>
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
                    <div className="col-12 mb-3">
                      <label className="form-label">
                        Employee Name <span className="text-danger">*</span>
                      </label>
                      <Select
                        isMulti
                        name="empId"
                        options={empOptions}
                        className={`react-select-container ${
                          formik.touched.empId && formik.errors.empId
                            ? "is-invalid"
                            : ""
                        }`}
                        classNamePrefix="react-select"
                        value={empOptions.filter((option) =>
                          formik.values.empId.includes(option.value)
                        )}
                        onChange={(selectedOptions) =>
                          formik.setFieldValue(
                            "empId",
                            selectedOptions.map((option) => option.value)
                          )
                        }
                        onBlur={() => formik.setFieldTouched("empId", true)}
                        components={{
                          Option: CustomOption,
                        }}
                      />
                      {formik.touched.empId && formik.errors.empId && (
                        <div className="invalid-feedback d-block">
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
