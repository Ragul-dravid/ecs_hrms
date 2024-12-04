import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PropagateLoader } from "react-spinners";
import api from "../../../config/URL";
// import profileImg from "../../../assets/image.png";
import profileImg from "../../../assets/UnknownProfile.webp";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`emp-reg-details/${id}`);
        setEmployee(response.data);
      } catch (error) {
        toast.error("Error fetching employee details");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  return (
    <div className="container">
      {loading ? (
        <div className="loader-container">
          <PropagateLoader color="#a070ff" size={10} />
        </div>
      ) : (
        <div className="card p-4">
          <div className="row">
            <div className="col-12 col-md-6 profile-section">
              <div className="d-flex justify-content-start align-item-center">
                <img
                  src={profileImg || ""}
                  alt="Profile"
                  className="profile-picture"
                />
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h2 className="ms-2">{employee?.name || "Billie Sharp"}</h2>
                  <p className="ms-2">{employee?.role || "Branch Manager"}</p>
                  {/* <p className="ms-2">{employee?.email || "--"}</p> */}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 d-none d-md-block">
              <div className="d-flex justify-content-end align-items-start">
                <Link to="/employee">
                  <button type="button" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
              </div>
            </div>
            <hr />

            {/* Employee Details */}
            <div className="container-fluid">
              <h3>Primary Information</h3>
              <div className="row mt-2 p-3">
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>First Name</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.firstName || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Last Name</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.lastName || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Primary Email ID</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.email || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Primary Phone Number</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.empPriPhNumber || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Department Name</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.empRegDeptId || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Employee Designation</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.empDesignation || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Nationality</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.nationality || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Citizenship</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.citizenship || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Basic Salary</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.basicSalary || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Employee Date of Joining</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.empDateOfJoin || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Employee Type</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.empType || ""}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Notice Period</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {employee?.noticePeriod || ""}</p>
                    </div>
                  </div>
                </div>
                </div>
              <h3>Personal Information</h3>
              {employee?.empPersonalDetailsEntities?.length > 0 ? (
                employee.empPersonalDetailsEntities.map((personal, index) => (
                  <div key={index} className="mb-3">
                    <div className="row">
                    <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Date of Birth</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {personal?.dob || ""}</p>
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>DateofBirth</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {personal?.dob || ""}</p>
                    </div>
                  </div>
                </div>
                    </div>
                  </div>

                ))
              ) : (
                <p>No experience details available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
