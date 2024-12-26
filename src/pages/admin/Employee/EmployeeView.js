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
                  <h2 className="ms-2">
                    {employee?.firstName + " " + employee?.lastName || "--"}
                  </h2>
                  <p className="ms-2">{employee?.roleName || "--"}</p>
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
              <h3 className="text-primary">Primary Information</h3>
              <div className="row mt-2 p-3">
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>First Name</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {employee?.firstName || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {employee?.lastName || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {employee?.email || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {employee?.empPriPhNumber || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {employee?.empRegDeptId || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {employee?.empDesignation || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {employee?.nationality || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {employee?.citizenship || ""}
                      </p>
                    </div>
                  </div>
                </div>
                {employee?.nationality === "INDIAN" ? (
                  <>
                    <div className="col-md-6 col-12">
                      <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                          <p className="text-sm">
                            <b>Aadhar Number</b>
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            : {employee?.aadharNumber || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                          <p className="text-sm">
                            <b>PAN</b>
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            : {employee?.pan || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {employee?.nationality === "CHinese" ? (
                  <>
                    <div className="col-md-6 col-12">
                      <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                          <p className="text-sm">
                            <b>NRIC Type</b>
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            : {employee?.nrictype || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                          <p className="text-sm">
                            <b>NRIC Fin</b>
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            : {employee?.nricfin || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Basic Salary</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {employee?.basicSalary || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {employee?.empDateOfJoin || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {employee?.empType || ""}
                      </p>
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
                      <p className="text-muted text-sm">
                        : {employee?.noticePeriod || ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {employee?.empPersonalDetailsEntities?.length > 0 ? (
                employee.empPersonalDetailsEntities.map((personal, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="text-primary">Personal Information</h3>
                    <div className="row my-3">
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Date of Birth</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.dob.slice(0, 10) || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Age</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.age || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Secondary Email</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.empSecEmail || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Secondary Phone Number</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.empSecPhNumber || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Religion</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.religion || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Gender</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.gender || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Marital Status</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.maritalStatus || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>City</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.city || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Photo</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <img
                              src={personal.Photo}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Pincode</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.pincode || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Address</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.empAddr || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <h4>empEmergencyContactEntities</h4>
                      {personal.empEmergencyContactEntities.map((emer) => (
                        <>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Contact Name</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {emer?.contactName || ""}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Contact Number</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {emer?.contactNumber || ""}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Contact Address</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {emer?.contactAddress || ""}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}

              {employee?.empQualificationEntities?.length > 0 ? (
                employee.empQualificationEntities.map((personal, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="text-primary">Qualification Details</h3>
                    <div className="row my-3">
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Qualification Name</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.qualName || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Institution</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.qualInstitution || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Field of Study</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.fieldOfStudy || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Mode of Study</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.modeOfStudy || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Currently Pursuing</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.studying || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Certificate</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.certificates || ""}
                            </p>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Course complition Year</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.courseCompletionYear || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Percentage(%)</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.percentage || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <h4>Skill</h4>
                      {personal?.Skill?.map((emer) => (
                        <>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Employee Skill</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {emer?.empSkill || ""}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row mb-3">
                              <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                  <b>Skill Description</b>
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  : {emer?.skillDesc || ""}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}

              {employee?.empExperienceEntities?.length > 0 ? (
                employee.empExperienceEntities.map((personal, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="text-primary">Experence</h3>
                    <div className="row my-3">
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Previous Company Name</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.prevCmpName || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Designation</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.designation || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Start Date</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {personal?.experienceStartDate.slice(0, 10) || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>End Date</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.experienceEndDate.slice(0, 10) || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Referral Name</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.prevCompReferralName || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Referral Contact No</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.prevCompReferralContactNum || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Previous Company Address</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.prevCmpAddr || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Experience Description</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.experienceDesc || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}

              {employee?.empBankAccDetailsEntities?.length > 0 ? (
                employee.empBankAccDetailsEntities.map((personal, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="text-primary">Bank Account</h3>
                    <div className="row my-3">
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Bank Name</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.bankName || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Branch Name</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.brName || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>IFSC Code</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.ifsccode || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Account Number</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.accNumber || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Account Holder Name</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.accHoldName || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                              <b>Account Type</b>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {personal?.accType || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
