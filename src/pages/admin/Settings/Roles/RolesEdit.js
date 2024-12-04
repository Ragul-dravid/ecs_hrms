import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

const validationSchema = Yup.object().shape({});

function RolesEdit() {
  const {id} = useParams();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      companyId: cmpId,

      companyIndex: false,
      companyRead: false,
      companyCreate: false,
      companyUpdate: false,
      companyDelete: false,

      departmentIndex: false,
      departmentRead: false,
      departmentCreate: false,
      departmentUpdate: false,
      departmentDelete: false,

      designationIndex: false,
      designationRead: false,
      designationCreate: false,
      designationUpdate: false,
      designationDelete: false,

      hrPolicyIndex: false,
      hrPolicyRead: false,
      hrPolicyCreate: false,
      hrPolicyUpdate: false,
      hrPolicyDelete: false,

      exitManagementIndex: false,
      exitManagementRead: false,
      exitManagementCreate: false,
      exitManagementUpdate: false,
      exitManagementDelete: false,

      employeeIndex: false,
      employeeRead: false,
      employeeCreate: false,
      employeeUpdate: false,
      employeeDelete: false,

      holidayIndex: false,
      holidayRead: false,
      holidayCreate: false,
      holidayUpdate: false,
      holidayDelete: false,

      attendanceIndex: false,
      attendanceRead: false,
      attendanceCreate: false,
      attendanceUpdate: false,
      attendanceDelete: false,

      deductionIndex: false,
      deductionRead: false,
      deductionCreate: false,
      deductionUpdate: false,
      deductionDelete: false,

      leaveRequestIndex: false,
      leaveRequestRead: false,
      leaveRequestCreate: false,
      leaveRequestUpdate: false,
      leaveRequestDelete: false,

      payrollIndex: false,
      payrollRead: false,
      payrollCreate: false,
      payrollUpdate: false,
      payrollDelete: false,

      payslipIndex: false,
      payslipRead: false,

      rolesMatrixIndex: false,
      rolesMatrixRead: false,
      rolesMatrixCreate: false,
      rolesMatrixUpdate: false,
      rolesMatrixDelete: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Api Data:", values);
      try {
        const response = await api.put(`/roleUpdateRestriction/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201 || response.status === 200) {
          toast.success(response.data);
          navigate("/roles");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        if (e.response.status === 409) {      
          toast("Role already exists for this company", {
            icon: <FiAlertTriangle className="text-warning" />,
          });
        } else {
          toast.error(e?.response?.data?.message);
        }
      }
    },
  });

  const handleCheckboxChange = (fieldName) => {
    return (event) => {
      formik.setFieldValue(fieldName, event.target.checked);
    };
  };

  const getData = async () => {
    try {
      const response = await api.get(`/getUserRoleById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {  
    getData();
  }, [id]);

  return (
    <div className="container-fluid">
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div
          className="card shadow border-0 mb-2 top-header"
          style={{ borderRadius: "0" }}
        >
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Edit Roles</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/roles">
                    <button type="button" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="false"
                      ></span>
                    ) : (
                      <span>Update</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow border-0 my-2 p-3">
          <div className="row">
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Role Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                className={`form-control form-control-sm ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              {/* <label className="form-label">
                Status <span className="text-danger">*</span>
              </label>
              <select
                name="roleStatus"
                className={`form-select form-select-sm ${
                  formik.touched.roleStatus && formik.errors.roleStatus
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("roleStatus")}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {formik.touched.roleStatus && formik.errors.roleStatus && (
                <div className="invalid-feedback">
                  {formik.errors.roleStatus}
                </div>
              )} */}
            </div>
          </div>
          <div className="row">
            <div className="clo-12">
              <div className="table-responsive">
                <table class="table table-permission table-striped table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Module Permission</th>
                      <th scope="col">Index</th>
                      <th scope="col">Read</th>
                      <th scope="col">Create</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Company Registration
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="companyIndex"
                          checked={formik.values.companyIndex}
                          onChange={handleCheckboxChange(`companyIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="companyRead"
                          checked={formik.values.companyRead}
                          onChange={handleCheckboxChange(`companyRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="companyCreate"
                          checked={formik.values.companyCreate}
                          onChange={handleCheckboxChange(`companyCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="companyUpdate"
                          checked={formik.values.companyUpdate}
                          onChange={handleCheckboxChange(`companyUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="companyDelete"
                          checked={formik.values.companyDelete}
                          onChange={handleCheckboxChange(`companyDelete`)}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Department
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="departmentIndex"
                          checked={formik.values.departmentIndex}
                          onChange={handleCheckboxChange(`departmentIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="departmentRead"
                          checked={formik.values.departmentRead}
                          onChange={handleCheckboxChange(`departmentRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="departmentCreate"
                          checked={formik.values.departmentCreate}
                          onChange={handleCheckboxChange(`departmentCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="departmentUpdate"
                          checked={formik.values.departmentUpdate}
                          onChange={handleCheckboxChange(`departmentUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="departmentDelete"
                          checked={formik.values.departmentDelete}
                          onChange={handleCheckboxChange(`departmentDelete`)}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Designation
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="designationIndex"
                          checked={formik.values.designationIndex}
                          onChange={handleCheckboxChange(`designationIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="designationRead"
                          checked={formik.values.designationRead}
                          onChange={handleCheckboxChange(`designationRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="designationCreate"
                          checked={formik.values.designationCreate}
                          onChange={handleCheckboxChange(`designationCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="designationUpdate"
                          checked={formik.values.designationUpdate}
                          onChange={handleCheckboxChange(`designationUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="designationDelete"
                          checked={formik.values.designationDelete}
                          onChange={handleCheckboxChange(`designationDelete`)}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          HR Policy
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="hrPolicyIndex"
                          checked={formik.values.hrPolicyIndex}
                          onChange={handleCheckboxChange(`hrPolicyIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="hrPolicyRead"
                          checked={formik.values.hrPolicyRead}
                          onChange={handleCheckboxChange(`hrPolicyRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="hrPolicyCreate"
                          checked={formik.values.hrPolicyCreate}
                          onChange={handleCheckboxChange(`hrPolicyCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="hrPolicyUpdate"
                          checked={formik.values.hrPolicyUpdate}
                          onChange={handleCheckboxChange(`hrPolicyUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="hrPolicyDelete"
                          checked={formik.values.hrPolicyDelete}
                          onChange={handleCheckboxChange(`hrPolicyDelete`)}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Exit Management
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="exitManagementIndex"
                          checked={formik.values.exitManagementIndex}
                          onChange={handleCheckboxChange(`exitManagementIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="exitManagementRead"
                          checked={formik.values.exitManagementRead}
                          onChange={handleCheckboxChange(`exitManagementRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="exitManagementCreate"
                          checked={formik.values.exitManagementCreate}
                          onChange={handleCheckboxChange(
                            `exitManagementCreate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="exitManagementUpdate"
                          checked={formik.values.exitManagementUpdate}
                          onChange={handleCheckboxChange(
                            `exitManagementUpdate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="exitManagementDelete"
                          checked={formik.values.exitManagementDelete}
                          onChange={handleCheckboxChange(
                            `exitManagementDelete`
                          )}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Employee Info
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="employeeIndex"
                          checked={formik.values.employeeIndex}
                          onChange={handleCheckboxChange(`employeeIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="employeeRead"
                          checked={formik.values.employeeRead}
                          onChange={handleCheckboxChange(`employeeRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="employeeCreate"
                          checked={formik.values.employeeCreate}
                          onChange={handleCheckboxChange(`employeeCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="employeeUpdate"
                          checked={formik.values.employeeUpdate}
                          onChange={handleCheckboxChange(`employeeUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="employeeDelete"
                          checked={formik.values.employeeDelete}
                          onChange={handleCheckboxChange(`employeeDelete`)}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Holiday
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="holidayIndex"
                          checked={formik.values.holidayIndex}
                          onChange={handleCheckboxChange(`holidayIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="holidayRead"
                          checked={formik.values.holidayRead}
                          onChange={handleCheckboxChange(`holidayRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="holidayCreate"
                          checked={formik.values.holidayCreate}
                          onChange={handleCheckboxChange(`holidayCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="holidayUpdate"
                          checked={formik.values.holidayUpdate}
                          onChange={handleCheckboxChange(`holidayUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="holidayDelete"
                          checked={formik.values.holidayDelete}
                          onChange={handleCheckboxChange(`holidayDelete`)}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Leave
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestIndex"
                          checked={formik.values.leaveRequestIndex}
                          onChange={handleCheckboxChange(`leaveRequestIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestRead"
                          checked={formik.values.leaveRequestRead}
                          onChange={handleCheckboxChange(`leaveRequestRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestCreate"
                          checked={formik.values.leaveRequestCreate}
                          onChange={handleCheckboxChange(`leaveRequestCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestUpdate"
                          checked={formik.values.leaveRequestUpdate}
                          onChange={handleCheckboxChange(`leaveRequestUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestDelete"
                          checked={formik.values.leaveRequestDelete}
                          onChange={handleCheckboxChange(`leaveRequestDelete`)}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Attendance
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceIndex"
                          checked={formik.values.attendanceIndex}
                          onChange={handleCheckboxChange(`attendanceIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceRead"
                          checked={formik.values.attendanceRead}
                          onChange={handleCheckboxChange(`attendanceRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceCreate"
                          checked={formik.values.attendanceCreate}
                          onChange={handleCheckboxChange(`attendanceCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceUpdate"
                          checked={formik.values.attendanceUpdate}
                          onChange={handleCheckboxChange(`attendanceUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceDelete"
                          checked={formik.values.attendanceDelete}
                          onChange={handleCheckboxChange(`attendanceDelete`)}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Deduction
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductionIndex"
                          checked={formik.values.deductionIndex}
                          onChange={handleCheckboxChange(`deductionIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductionRead"
                          checked={formik.values.deductionRead}
                          onChange={handleCheckboxChange(`deductionRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductionCreate"
                          checked={formik.values.deductionCreate}
                          onChange={handleCheckboxChange(`deductionCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductionUpdate"
                          checked={formik.values.deductionUpdate}
                          onChange={handleCheckboxChange(`deductionUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductionDelete"
                          checked={formik.values.deductionDelete}
                          onChange={handleCheckboxChange(`deductionDelete`)}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Payroll
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollIndex"
                          checked={formik.values.payrollIndex}
                          onChange={handleCheckboxChange(`payrollIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollRead"
                          checked={formik.values.payrollRead}
                          onChange={handleCheckboxChange(`payrollRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollCreate"
                          checked={formik.values.payrollCreate}
                          onChange={handleCheckboxChange(`payrollCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollUpdate"
                          checked={formik.values.payrollUpdate}
                          onChange={handleCheckboxChange(`payrollUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollDelete"
                          checked={formik.values.payrollDelete}
                          onChange={handleCheckboxChange(`payrollDelete`)}
                        />
                      </td>
                    </tr>
                    <tr className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Payslip
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payslipIndex"
                          checked={formik.values.payslipIndex}
                          onChange={handleCheckboxChange(`payslipIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payslipRead"
                          checked={formik.values.payslipRead}
                          onChange={handleCheckboxChange(`payslipRead`)}
                        />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RolesEdit;
