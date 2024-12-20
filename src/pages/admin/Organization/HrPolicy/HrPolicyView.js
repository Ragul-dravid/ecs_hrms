import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../../config/URL";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { VscCloudDownload } from "react-icons/vsc";

const HrPolicyView = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/hR-policy/${id}`);
        setData(response.data);
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      } finally {
        setLoading(false);
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
                      HR Policy Details
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-start">
                    <Link to="/hrpolicy">
                      <button type="button" className="btn btn-sm btn-light">
                        <span>Back</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card for displaying policy details */}
          <div
            className="card shadow border-0 mb-2 minHeight"
            style={{ borderRadius: "0" }}
          >
            <div className="container ">
              <div className="row mt-2 p-3 border-1 my-2">
                <p className="text-lg text-center my-5">
                  <b>{data.hrPolicyList || ""}</b>
                </p>
                {/* <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>HR Policy Category</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.hrPolicyCategory || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Effective Date</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.effectiveDate || ""}
                      </p>
                    </div>
                  </div>
                </div> */}

                <div className="col-md-12 col-12 ">
                  <div className="row mb-3">
                    <div className="col-12">
                      <p
                        className="text-muted text-sm"
                        dangerouslySetInnerHTML={{
                          __html: data?.hrPolicyDescr || "",
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-12">
                <div className="row mb-3">
                  <div className="col-12 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Attachments</b>
                    </p>
                  </div>
                  <div className="col-12">
                    {data?.attachments && data.attachments.length > 0 ? (
                      <>
                      <ul className="">
                        {data.attachments.map((file, index) => {
                          const fileName = file.split("/").pop();
                          return (
                            <li
                              key={index}
                              className="d-flex align-items-center mb-2"
                            >
                              <a
                                href={file}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="file-link"
                              >
                                {fileName}
                              </a>
                              <a
                                href={file}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ms-2 file-icon"
                              >
                                <VscCloudDownload />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                      </>
                    ) : (
                      <p className="text-muted text-sm">: No Attachments</p>
                    )}
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

export default HrPolicyView;
