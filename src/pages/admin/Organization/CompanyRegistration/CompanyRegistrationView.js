import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import Modal from "react-bootstrap/Modal";

const CompanyRegistrationView = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const getData = async () => {
    try {
      const response = await api.get(`/company-reg/${id}`);
      setData(response.data);
      setSelectedStatus(response.data.cmpStatus);
    } catch (error) {
      toast.error("Error Fetching Data ", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleStatusChange = async (status) => {
    setLoadIndicator(true);
    try {
      const response = await api.put(
        `status/${id}?cmpId=${id}&newStatus=${status}`
      );
      if (response.status === 200) {
        getData();
        handleClose();
        toast.success(`Company Register Approve`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // toast.error(error);
      console.error("Status Change Error:", error);
    } finally {
      setLoadIndicator(false);
    }
  };
  const handleStatusChange2 = async (status) => {
    setLoading(true);
    try {
      const response = await api.put(
        `status/${id}?cmpId=${id}&newStatus=${status}`
      );
      if (response.status === 200) {
        getData();
        toast.success(`Company Register Rejected`);
        handleClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // toast.error(error);
      console.error("Status Change Error:", error);
    } finally {
      setLoading(false);
    }
  };

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
                      Company Registration Details
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-start">
                    <Link to="/companyRegistration">
                      <button type="submit" className="btn btn-sm btn-light">
                        <span>Back</span>
                      </button>
                    </Link>
                    {selectedStatus === "Approve" ? (
                      <button
                        type="button"
                        // onClick={() => handleStatusChange("Rejected")}
                        onClick={handleOpenModal}
                        className="btn btn-danger btn-sm me-2"
                        disabled={loadIndicator}
                      >
                        {loadIndicator && (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            aria-hidden="true"
                          ></span>
                        )}
                        Rejected
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleStatusChange("Approve")}
                        className="btn btn-success btn-sm me-2"
                        disabled={loadIndicator}
                      >
                        {loadIndicator && (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            aria-hidden="true"
                          ></span>
                        )}
                        Approve
                      </button>
                    )}
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
              <div className="d-flex justify-content-center">
                <p className="my-2 d-flex">
                  {data?.profileImg ? (
                    <img
                      src={data.profileImg}
                      style={{
                        borderRadius: 70,
                        width: "100px",
                        height: "100px",
                        maxWidth: "800px",
                        maxHeight: "800px",
                        objectFit: "cover",
                      }}
                      alt="profile"
                    />
                  ) : (
                    <></>
                  )}
                </p>
              </div>
              <div className="row mt-2 p-3">
                {/* Company Name */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Name</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data?.name || ""}</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Company Name</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.cmpName || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Company Email */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Company Email</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.cmpEmail || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Phone Number</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.cmpPhNumber || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tax Code */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Tax Code</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.cmpTaxCode || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Company Address */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Company Address</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.cmpAddr || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* City */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>City</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.cmpCity || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pincode */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Pincode</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.cmpPincode || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Tax Code</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.cmpTaxCode || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Company Type</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.companyType || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>HeadQuater Address</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.headQuaterAddress || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Representative</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.representative || ""}
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
                        : {data?.startDate?.slice(0, 10) || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Branch Location</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.branchLocation || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Logo</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        <img
                          src={`${data?.logo}`}
                          alt="icon"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>File</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        <img
                          src={`${data?.fileAttachment}`}
                          alt="icon"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Rjected Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>Rejected this Company?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-sm btn-light" onClick={handleClose}>
            Close
          </button>
          <button
            className="btn-sm btn-danger"
            type="submit"
            onClick={() => handleStatusChange2("Rejected")}
            disabled={loading}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Rejected
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompanyRegistrationView;
