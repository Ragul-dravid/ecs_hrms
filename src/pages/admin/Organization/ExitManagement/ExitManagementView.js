import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import { PropagateLoader } from 'react-spinners';
import ExitManagementAdd from "./ExitManagementAdd";

const ExitManagementView = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Change this to true to show loader while fetching data
      try {
        const response = await api.get(`/exit-management/${id}`);
        setData(response.data);
        setData({
          ...response.data,
          exitMgmtDateOfApply: response.data.exitMgmtDateOfApply?.substring(0, 10),
          dateOfRelieving: response.data.dateOfRelieving?.substring(0, 10)
        });
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
          <PropagateLoader
            visible={true}
            color="#a070ff"
            height="50"
            width="50"
            size={10}
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
                      View Exit Management
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-start">
                    <Link to="/exitmangement">
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
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Employee Name</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.exitMgmtEmpName || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Reason For Relieving</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.reasonForRelieving || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Date Of Relieving</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.dateOfRelieving || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Date Of Apply</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.exitMgmtDateOfApply || ""}
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
                        : {data.exitMgmtNoticePeriod || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Relieving Approval Name</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.relievingApproverName || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Assets Returned</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.assetsReturned || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Approval Status</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.relievingApproverStatus || ""}
                      </p>
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

export default ExitManagementView;
