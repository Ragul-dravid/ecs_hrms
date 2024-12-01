import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({});

function RolesEdit() {
  const {id} = useParams();
  const [loading, setLoadIndicator] = useState(false);
  const cmpId = sessionStorage.getItem("cmpId");

  const formik = useFormik({
    initialValues: {
      name:"",
      cmpId:cmpId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Api Data:", values);
      const payload = {
        name : values.name,
        cmpId : values.cmpId
      };
      try {
        const response = await api.put(`/roleUpdateRestriction/${id}`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred";
        toast.error(errorMessage);
      }
    },
  });

  useEffect(() => {
    getRoleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCheckboxChange = (fieldName) => {
    return (event) => {
      formik.setFieldValue(fieldName, event.target.checked);
    };
  };

  const getRoleData = async () => {
    try {
      const response = await api.get(`/getAllRoleInfoById/${id}`);
      formik.setValues(response.data);
      // console.log(response.data, "getroleData");
    } catch (error) {
      console.error("Error fetching role data:", error);
    }
  };
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/emp-desig-details/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred";
        toast.error(errorMessage);
      }
    };
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
                        aria-hidden="true"
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
                name="roleStatus"
                className={`form-control form-control-sm ${
                  formik.touched.roleStatus && formik.errors.roleStatus
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("roleStatus")}
              />
              {formik.touched.roleStatus && formik.errors.roleStatus && (
                <div className="invalid-feedback">
                  {formik.errors.roleStatus}
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
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
              )}
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
                          name="courseIndex"
                          checked={formik.values.courseIndex}
                          onChange={handleCheckboxChange(`courseIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseRead"
                          checked={formik.values.courseRead}
                          onChange={handleCheckboxChange(`courseRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseCreate"
                          checked={formik.values.courseCreate}
                          onChange={handleCheckboxChange(`courseCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseUpdate"
                          checked={formik.values.courseUpdate}
                          onChange={handleCheckboxChange(`courseUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseDelete"
                          checked={formik.values.courseDelete}
                          onChange={handleCheckboxChange(`courseDelete`)}
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
                          name="classIndex"
                          checked={formik.values.classIndex}
                          onChange={handleCheckboxChange(`classIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classRead"
                          checked={formik.values.classRead}
                          onChange={handleCheckboxChange(`classRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classCreate"
                          checked={formik.values.classCreate}
                          onChange={handleCheckboxChange(`classCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classUpdate"
                          checked={formik.values.classUpdate}
                          onChange={handleCheckboxChange(`classUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classDelete"
                          checked={formik.values.classDelete}
                          onChange={handleCheckboxChange(`classDelete`)}
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
                          name="levelIndex"
                          checked={formik.values.levelIndex}
                          onChange={handleCheckboxChange(`levelIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelRead"
                          checked={formik.values.levelRead}
                          onChange={handleCheckboxChange(`levelRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelCreate"
                          checked={formik.values.levelCreate}
                          onChange={handleCheckboxChange(`levelCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelUpdate"
                          checked={formik.values.levelUpdate}
                          onChange={handleCheckboxChange(`levelUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelDelete"
                          checked={formik.values.levelDelete}
                          onChange={handleCheckboxChange(`levelDelete`)}
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
                          name="curriculumIndex"
                          checked={formik.values.curriculumIndex}
                          onChange={handleCheckboxChange(`curriculumIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumRead"
                          checked={formik.values.curriculumRead}
                          onChange={handleCheckboxChange(`curriculumRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumCreate"
                          checked={formik.values.curriculumCreate}
                          onChange={handleCheckboxChange(`curriculumCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumUpdate"
                          checked={formik.values.curriculumUpdate}
                          onChange={handleCheckboxChange(`curriculumUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumDelete"
                          checked={formik.values.curriculumDelete}
                          onChange={handleCheckboxChange(`curriculumDelete`)}
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
                          name="subjectIndex"
                          checked={formik.values.subjectIndex}
                          onChange={handleCheckboxChange(`subjectIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectRead"
                          checked={formik.values.subjectRead}
                          onChange={handleCheckboxChange(`subjectRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectCreate"
                          checked={formik.values.subjectCreate}
                          onChange={handleCheckboxChange(`subjectCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectUpdate"
                          checked={formik.values.subjectUpdate}
                          onChange={handleCheckboxChange(`subjectUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectDelete"
                          checked={formik.values.subjectDelete}
                          onChange={handleCheckboxChange(`subjectDelete`)}
                        />
                      </td>
                    </tr>
                    <tr  className="bg-fc">
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Employee Info
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectIndex"
                          checked={formik.values.subjectIndex}
                          onChange={handleCheckboxChange(`subjectIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectRead"
                          checked={formik.values.subjectRead}
                          onChange={handleCheckboxChange(`subjectRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectCreate"
                          checked={formik.values.subjectCreate}
                          onChange={handleCheckboxChange(`subjectCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectUpdate"
                          checked={formik.values.subjectUpdate}
                          onChange={handleCheckboxChange(`subjectUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectDelete"
                          checked={formik.values.subjectDelete}
                          onChange={handleCheckboxChange(`subjectDelete`)}
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
                          name="subjectIndex"
                          checked={formik.values.subjectIndex}
                          onChange={handleCheckboxChange(`subjectIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectRead"
                          checked={formik.values.subjectRead}
                          onChange={handleCheckboxChange(`subjectRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectCreate"
                          checked={formik.values.subjectCreate}
                          onChange={handleCheckboxChange(`subjectCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectUpdate"
                          checked={formik.values.subjectUpdate}
                          onChange={handleCheckboxChange(`subjectUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectDelete"
                          checked={formik.values.subjectDelete}
                          onChange={handleCheckboxChange(`subjectDelete`)}
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
                          name="subjectIndex"
                          checked={formik.values.subjectIndex}
                          onChange={handleCheckboxChange(`subjectIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectRead"
                          checked={formik.values.subjectRead}
                          onChange={handleCheckboxChange(`subjectRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectCreate"
                          checked={formik.values.subjectCreate}
                          onChange={handleCheckboxChange(`subjectCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectUpdate"
                          checked={formik.values.subjectUpdate}
                          onChange={handleCheckboxChange(`subjectUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectDelete"
                          checked={formik.values.subjectDelete}
                          onChange={handleCheckboxChange(`subjectDelete`)}
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
                          name="subjectIndex"
                          checked={formik.values.subjectIndex}
                          onChange={handleCheckboxChange(`subjectIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectRead"
                          checked={formik.values.subjectRead}
                          onChange={handleCheckboxChange(`subjectRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectCreate"
                          checked={formik.values.subjectCreate}
                          onChange={handleCheckboxChange(`subjectCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectUpdate"
                          checked={formik.values.subjectUpdate}
                          onChange={handleCheckboxChange(`subjectUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectDelete"
                          checked={formik.values.subjectDelete}
                          onChange={handleCheckboxChange(`subjectDelete`)}
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
                          name="subjectIndex"
                          checked={formik.values.subjectIndex}
                          onChange={handleCheckboxChange(`subjectIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectRead"
                          checked={formik.values.subjectRead}
                          onChange={handleCheckboxChange(`subjectRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectCreate"
                          checked={formik.values.subjectCreate}
                          onChange={handleCheckboxChange(`subjectCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectUpdate"
                          checked={formik.values.subjectUpdate}
                          onChange={handleCheckboxChange(`subjectUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectDelete"
                          checked={formik.values.subjectDelete}
                          onChange={handleCheckboxChange(`subjectDelete`)}
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
                          name="subjectIndex"
                          checked={formik.values.subjectIndex}
                          onChange={handleCheckboxChange(`subjectIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectRead"
                          checked={formik.values.subjectRead}
                          onChange={handleCheckboxChange(`subjectRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectCreate"
                          checked={formik.values.subjectCreate}
                          onChange={handleCheckboxChange(`subjectCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectUpdate"
                          checked={formik.values.subjectUpdate}
                          onChange={handleCheckboxChange(`subjectUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectDelete"
                          checked={formik.values.subjectDelete}
                          onChange={handleCheckboxChange(`subjectDelete`)}
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
                          name="subjectIndex"
                          checked={formik.values.subjectIndex}
                          onChange={handleCheckboxChange(`subjectIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectRead"
                          checked={formik.values.subjectRead}
                          onChange={handleCheckboxChange(`subjectRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectCreate"
                          checked={formik.values.subjectCreate}
                          onChange={handleCheckboxChange(`subjectCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectUpdate"
                          checked={formik.values.subjectUpdate}
                          onChange={handleCheckboxChange(`subjectUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectDelete"
                          checked={formik.values.subjectDelete}
                          onChange={handleCheckboxChange(`subjectDelete`)}
                        />
                      </td>
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
