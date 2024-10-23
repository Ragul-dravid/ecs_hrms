import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Invoice from "../../../assets/Logo.png";
import api from "../../../config/URL";
import { toast } from "react-toastify";

export default function ExpensesView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cmpId = sessionStorage.getItem('cmpId');
  const empId = sessionStorage.getItem('empId');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`emp-reg-details-by-companyId/${empId}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        // console.log(error.message);
        toast.error("Error Fetching Data ", error.message);
      }
    };
    getData();
  }, [id]);

  return (
    <section>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {!loading && (
        <div className="container py-4">
          <div className="row">
            <div className="col-12 text-end">
              <Link to="/employee">
                <button className="btn btn-sm btn-border">Back</button>
              </Link>
              &nbsp;&nbsp;
              <Link to="/employee/add">
                <button className="btn btn-sm btn-button">Update</button>
              </Link>
            </div>
          </div>
          <div>
            <div className="container mt-5">
              <h4>Personal Information</h4>
              <div className="row mt-5 pb-3">
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">First Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.firstName}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Last Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.lastName}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row  mb-2  ">
                    <div className="col-6  ">
                      <p className="fw-medium">Primary Phone No</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.empPriPhNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Start Date</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.address}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Primary Email ID</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.empPriEmail}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Primary Email Password</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.empPriEmailPassword}
                      </p>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">NRIC Fin</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.nricfin}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">NRIC Type</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.nrictype}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Company Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.empRegCmpName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Employee ID</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.employeeId}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Employee Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.firstName}&nbsp;{data.lastName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Department Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.empRegDeptName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Employee Designation</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.employeeDesignation}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Employee Date Of Joining</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.employeeDateOfJoining}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Notice Period</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.noticePeriod}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Reporting Manager ID</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.reportingManagerId}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Reporting Manager Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.reportingManagerName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mt-3">
              <h4>Contact Details</h4>
              <div className="row mt-5 pb-3">
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Date of Birth</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].dob
                          ? data.empPersonalDetailsEntities[0].dob.substring(
                              0,
                              10
                            )
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Gender</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].gender
                          ? data.empPersonalDetailsEntities[0].gender
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row  mb-2  ">
                    <div className="col-6  ">
                      <p className="fw-medium">Marital Status</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].maritalStatus
                          ? data.empPersonalDetailsEntities[0].maritalStatus
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Religion</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].religion
                          ? data.empPersonalDetailsEntities[0].religion
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Address</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].empAddr
                          ? data.empPersonalDetailsEntities[0].empAddr
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Primary Email Password</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.empPriEmailPassword}
                      </p>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">City</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {" "}
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].city
                          ? data.empPersonalDetailsEntities[0].city
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Pincode</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {" "}
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].pincode
                          ? data.empPersonalDetailsEntities[0].pincode
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Secondary Email ID</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].empSecEmail
                          ? data.empPersonalDetailsEntities[0].empSecEmail
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Secondary Phone Number</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {" "}
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].empSecPhNumber
                          ? data.empPersonalDetailsEntities[0].empSecPhNumber
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="container mt-3">
              <h4>Qualification Details</h4>
              <div className="row mt-5 pb-3">
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Qualification Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].dob
                          ? data.empPersonalDetailsEntities[0].dob.substring(
                              0,
                              10
                            )
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Qualification Type</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].gender
                          ? data.empPersonalDetailsEntities[0].gender
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row  mb-2  ">
                    <div className="col-6  ">
                      <p className="fw-medium">Field of Study</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].maritalStatus
                          ? data.empPersonalDetailsEntities[0].maritalStatus
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">
                      Mode of Study</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].religion
                          ? data.empPersonalDetailsEntities[0].religion
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Start Date</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].empAddr
                          ? data.empPersonalDetailsEntities[0].empAddr
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">End Date</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {" "}
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].city
                          ? data.empPersonalDetailsEntities[0].city
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Institution</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {" "}
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].pincode
                          ? data.empPersonalDetailsEntities[0].pincode
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Secondary Email ID</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].empSecEmail
                          ? data.empPersonalDetailsEntities[0].empSecEmail
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row    mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Secondary Phone Number</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {" "}
                        :{" "}
                        {data.empPersonalDetailsEntities &&
                        data.empPersonalDetailsEntities.length > 0 &&
                        data.empPersonalDetailsEntities[0].empSecPhNumber
                          ? data.empPersonalDetailsEntities[0].empSecPhNumber
                          : "--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div class="container mt-3">
              <h4>Qualification Details</h4>
              {data.empQualificationEntities &&
                data.empQualificationEntities.length > 0 &&
                data.empQualificationEntities.map((parent, index) => (
                  <div key={index}>
                    <div>
                      <div className="row pb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <button
                            className="btn btn-sm border-none text-primary px-3 my-3 fw-bold fs-4"
                            style={{ backgroundColor: "#b2d3df" }}
                          >
                            {index + 1}
                          </button>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row  mb-2">
                            <div className="col-6  ">
                              <p className="fw-medium">Qualification Name</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                <b className="mx-2">:</b>
                                {data.empQualificationEntities &&
                                data.empQualificationEntities.length > 0 &&
                                data.empQualificationEntities[0].qualName
                                  ? data.empQualificationEntities[0].qualName
                                  : "--"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row  mb-2">
                            <div className="col-6  ">
                              <p className="fw-medium">Qualification Type</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                <b className="mx-2">:</b>
                                {data.empQualificationEntities &&
                                data.empQualificationEntities.length > 0 &&
                                data.empQualificationEntities[0].qualType
                                  ? data.empQualificationEntities[0].qualType
                                  : "--"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row  mb-2">
                            <div className="col-6  ">
                              <p className="fw-medium">Field of Study</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                <b className="mx-2">:</b>
                                {data.empQualificationEntities &&
                                data.empQualificationEntities.length > 0 &&
                                data.empQualificationEntities[0].qualFldOfStudy
                                  ? data.empQualificationEntities[0]
                                      .qualFldOfStudy
                                  : "--"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row  mb-2">
                            <div className="col-6  ">
                              <p className="fw-medium">Mode of Study</p>
                            </div>
                            <div className="col-6" style={{ overflow: "auto" }}>
                              <p className="text-muted text-sm">
                                <b className="mx-2">:</b>
                                {data.empQualificationEntities &&
                                data.empQualificationEntities.length > 0 &&
                                data.empQualificationEntities[0].qualModeOfStudy
                                  ? data.empQualificationEntities[0]
                                      .qualModeOfStudy
                                  : "--"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row  mb-2">
                            <div className="col-6  ">
                              <p className="fw-medium">Start Date</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                <b className="mx-2">:</b>
                                {data.empQualificationEntities &&
                                data.empQualificationEntities.length > 0 &&
                                data.empQualificationEntities[0].qualStartDate
                                  ? data.empQualificationEntities[0]
                                      .qualStartDate
                                  : "--"}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-md-6 col-12">
                        <div className="row  mb-2">
                          <div className="col-6  ">
                            <p className="fw-medium">Relation</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              <b className="mx-2">:</b>
                              {parent.relation || "--"}
                            </p>
                          </div>
                        </div>
                      </div> */}
                        <div className="col-md-6 col-12">
                          <div className="row  mb-2">
                            <div className="col-6  ">
                              <p className="fw-medium">End Date</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                <b className="mx-2">:</b>
                                {data.empQualificationEntities &&
                                data.empQualificationEntities.length > 0 &&
                                data.empQualificationEntities[0].qualEndDate
                                  ? data.empQualificationEntities[0].qualEndDate
                                  : "--"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row  mb-2">
                            <div className="col-6  ">
                              <p className="fw-medium">Institution</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                <b className="mx-2">:</b>
                                {data.empQualificationEntities &&
                                data.empQualificationEntities.length > 0 &&
                                data.empQualificationEntities[0].qualInstitution
                                  ? data.empQualificationEntities[0]
                                      .qualInstitution
                                  : "--"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row  mb-2">
                            <div className="col-6  ">
                              <p className="fw-medium">Employee Skill</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                <b className="mx-2">:</b>
                                {data.empQualificationEntities &&
                                data.empQualificationEntities.length > 0 &&
                                data.empQualificationEntities[0].employeeSkill
                                  ? data.empQualificationEntities[0]
                                      .employeeSkill
                                  : "--"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row  mb-2">
                            <div className="col-6  ">
                              <p className="fw-medium">Skill Description</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                <b className="mx-2">:</b>
                                {data.empQualificationEntities &&
                                data.empQualificationEntities.length > 0 &&
                                data.empQualificationEntities[0]
                                  .skillDescription
                                  ? data.empQualificationEntities[0]
                                      .skillDescription
                                  : "--"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <br />
                    </div>
                  </div>
                ))}
            </div>
            {/* <div class="container mt-3">
              <h4>Skills</h4>
              {data.empQualificationEntities &&
                data.empQualificationEntities.length > 0 &&
                data.empQualificationEntities.map((parent, index) => (
                  <div key={index}>
                    <div className="row">
          
                        </div>
                  </div>
                ))}
            </div> */}

            <div className="container mt-5">
              <h4>Experience</h4>
              {data.empExperienceEntities &&
                data.empExperienceEntities.length > 0 &&
                data.empExperienceEntities.map((parent, index) => (
                  <div key={index}>
                    <div className="row mt-5 pb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <button
                          className="btn btn-sm border-none text-primary px-3 my-3 fw-bold fs-4"
                          style={{ backgroundColor: "#b2d3df" }}
                        >
                          {index + 1}
                        </button>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">Previous Company</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empExperienceEntities &&
                              data.empExperienceEntities.length > 0 &&
                              data.empExperienceEntities[0].prevCmpName
                                ? data.empExperienceEntities[0].prevCmpName
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">
                              Previous Company Address
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empExperienceEntities &&
                              data.empExperienceEntities.length > 0 &&
                              data.empExperienceEntities[0].prevCmpAddr
                                ? data.empExperienceEntities[0].prevCmpAddr
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2  ">
                          <div className="col-6  ">
                            <p className="fw-medium">Designation</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empExperienceEntities &&
                              data.empExperienceEntities.length > 0 &&
                              data.empExperienceEntities[0].designation
                                ? data.empExperienceEntities[0].designation
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">ExperienceDesc</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empExperienceEntities &&
                              data.empExperienceEntities.length > 0 &&
                              data.empExperienceEntities[0].experienceDesc
                                ? data.empExperienceEntities[0].experienceDesc
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">Experience Start Date</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empExperienceEntities &&
                              data.empExperienceEntities.length > 0 &&
                              data.empExperienceEntities[0].experienceStartDate
                                ? data.empExperienceEntities[0]
                                    .experienceStartDate
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">Experience En dDate</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empExperienceEntities &&
                              data.empExperienceEntities.length > 0 &&
                              data.empExperienceEntities[0].experienceEndDate
                                ? data.empExperienceEntities[0]
                                    .experienceEndDate
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="container mt-5">
              <h4>Previous Company</h4>
              {data.empPrevCompanyRefEntities &&
                data.empPrevCompanyRefEntities.length > 0 &&
                data.empPrevCompanyRefEntities.map((parent, index) => (
                  <div key={index}>
                    <div className="row mt-5 pb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <button
                          className="btn btn-sm border-none text-primary px-3 my-3 fw-bold fs-4"
                          style={{ backgroundColor: "#b2d3df" }}
                        >
                          {index + 1}
                        </button>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">
                              Previous Company Ref Name
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empPrevCompanyRefEntities &&
                              data.empPrevCompanyRefEntities.length > 0 &&
                              data.empPrevCompanyRefEntities[0]
                                .prevCompReferralName
                                ? data.empPrevCompanyRefEntities[0]
                                    .prevCompReferralName
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">
                              Previous Company Referral JobTitle
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empPrevCompanyRefEntities &&
                              data.empPrevCompanyRefEntities.length > 0 &&
                              data.empPrevCompanyRefEntities[0]
                                .prevCompReferralJobTitle
                                ? data.empPrevCompanyRefEntities[0]
                                    .prevCompReferralJobTitle
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2  ">
                          <div className="col-6  ">
                            <p className="fw-medium">
                              Previous Company Address
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empPrevCompanyRefEntities &&
                              data.empPrevCompanyRefEntities.length > 0 &&
                              data.empPrevCompanyRefEntities[0]
                                .prevCompRefCmpAddr
                                ? data.empPrevCompanyRefEntities[0]
                                    .prevCompRefCmpAddr
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">
                              Previous Company Referral Name
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empPrevCompanyRefEntities &&
                              data.empPrevCompanyRefEntities.length > 0 &&
                              data.empPrevCompanyRefEntities[0]
                                .prevCompRefcmpName
                                ? data.empPrevCompanyRefEntities[0]
                                    .prevCompRefcmpName
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">
                              Previous Company Referral Contact
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empPrevCompanyRefEntities &&
                              data.empPrevCompanyRefEntities.length > 0 &&
                              data.empPrevCompanyRefEntities[0]
                                .prevCompReferralContactNum
                                ? data.empPrevCompanyRefEntities[0]
                                    .prevCompReferralContactNum
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="container mt-5">
              <h4>Emergency Contact</h4>
              {data.empEmergencyContactModels &&
                data.empEmergencyContactModels.length > 0 &&
                data.empEmergencyContactModels.map((parent, index) => (
                  <div key={index}>
                    <div className="row mt-5 pb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <button
                          className="btn btn-sm border-none text-primary px-3 my-3 fw-bold fs-4"
                          style={{ backgroundColor: "#b2d3df" }}
                        >
                          {index + 1}
                        </button>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">Emergency Contact Name</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empEmergencyContactModels &&
                              data.empEmergencyContactModels.length > 0 &&
                              data.empEmergencyContactModels[0]
                                .emergencyContactName
                                ? data.empEmergencyContactModels[0]
                                    .emergencyContactName
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">Emergency Contact No</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empEmergencyContactModels &&
                              data.empEmergencyContactModels.length > 0 &&
                              data.empEmergencyContactModels[0]
                                .emergencyContactNo
                                ? data.empEmergencyContactModels[0]
                                    .emergencyContactNo
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2  ">
                          <div className="col-6  ">
                            <p className="fw-medium">
                              Emergency Contact Addresss
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empEmergencyContactModels &&
                              data.empEmergencyContactModels.length > 0 &&
                              data.empEmergencyContactModels[0]
                                .emergencyContactAddress
                                ? data.empEmergencyContactModels[0]
                                    .emergencyContactAddress
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">
                              Relationship Of Employee
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empEmergencyContactModels &&
                              data.empEmergencyContactModels.length > 0 &&
                              data.empEmergencyContactModels[0]
                                .relationshipOfEmployee
                                ? data.empEmergencyContactModels[0]
                                    .relationshipOfEmployee
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="container mt-5">
              <h4>Bank Details</h4>
              {data.empEmergencyContactModels &&
                data.empEmergencyContactModels.length > 0 &&
                data.empEmergencyContactModels.map((parent, index) => (
                  <div key={index}>
                    <div className="row mt-5 pb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <button
                          className="btn btn-sm border-none text-primary px-3 my-3 fw-bold fs-4"
                          style={{ backgroundColor: "#b2d3df" }}
                        >
                          {index + 1}
                        </button>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">Bank Name</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empBankAccDetailsEntities &&
                              data.empBankAccDetailsEntities.length > 0 &&
                              data.empBankAccDetailsEntities[0].bankName
                                ? data.empBankAccDetailsEntities[0].bankName
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">Branch Name</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empBankAccDetailsEntities &&
                              data.empBankAccDetailsEntities.length > 0 &&
                              data.empBankAccDetailsEntities[0].brName
                                ? data.empBankAccDetailsEntities[0].brName
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2  ">
                          <div className="col-6  ">
                            <p className="fw-medium">IFSC Code</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empBankAccDetailsEntities &&
                              data.empBankAccDetailsEntities.length > 0 &&
                              data.empBankAccDetailsEntities[0].ifsccode
                                ? data.empBankAccDetailsEntities[0].ifsccode
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row    mb-2">
                          <div className="col-6 ">
                            <p className="fw-medium">Account Number</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              :{" "}
                              {data.empBankAccDetailsEntities &&
                              data.empBankAccDetailsEntities.length > 0 &&
                              data.empBankAccDetailsEntities[0].accNumber
                                ? data.empBankAccDetailsEntities[0].accNumber
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
