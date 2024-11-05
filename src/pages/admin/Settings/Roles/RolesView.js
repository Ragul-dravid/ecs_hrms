import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import { Hourglass } from "react-loader-spinner";

const CompanyComplianceView = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Change this to true to show loader while fetching data
      try {
        const response = await api.get(`/company-reg/${id}`);
        setData(response.data);
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      } finally {
        setLoading(false); // Stop loader after data is fetched
      }
    };
    getData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <Hourglass
            visible={true}
            height="50"
            width="50"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#4066D5", "#151c4d"]}
          />
        </div>
      ) : (
        <div
          className="container-fluid px-2 minHeight"
          style={{ borderRadius: "0" }}
        >
          <div
            className="card shadow border-0 mb-2 top-header"
            style={{ borderRadius: "0" }}
          >
            <div className="container-fluid py-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor">
                      View Roles
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-start">
                    <Link to="/roles">
                      <button type="submit" className="btn btn-sm btn-light">
                        <span>Back</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card for displaying company details */}
          <div
            className="card shadow border-0 mb-2 minHeight"
            style={{ borderRadius: "0" }}
          >
            <div className="container">
              <div className="row mt-2 p-3">

                {/* Company Name */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm"><b>Company Name</b></p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.cmpName || ""}</p>
                    </div>
                  </div>
                </div>

                {/* Company Email */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm"><b>Company Email</b></p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.cmpEmail || ""}</p>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm"><b>Phone Number</b></p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.cmpPhNumber || ""}</p>
                    </div>
                  </div>
                </div>

                {/* Registration Number */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm"><b>Registration Number</b></p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.cmpRegNumber || ""}</p>
                    </div>
                  </div>
                </div>

                {/* Tax Code */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm"><b>Tax Code</b></p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.cmpTaxCode || ""}</p>
                    </div>
                  </div>
                </div>

                {/* Company Address */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm"><b>Company Address</b></p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.cmpAddr || ""}</p>
                    </div>
                  </div>
                </div>

                {/* City */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm"><b>City</b></p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.cmpCity || ""}</p>
                    </div>
                  </div>
                </div>

                {/* Pincode */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm"><b>Pincode</b></p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.cmpPincode || ""}</p>
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm"><b>Role</b></p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.cmpRoleId || ""}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyComplianceView;
