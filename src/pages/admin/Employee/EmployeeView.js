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
              <h3></h3>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
