import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $, { data } from "jquery";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import api from "../../../config/URL";
import { PropagateLoader } from "react-spinners";
import DeleteModel from "../../../components/admin/DeleteModel";
import { BiEditAlt } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi2";

const LeaveRequestEmp = () => {
  const tableRef = useRef(null);
  // const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  console.log("Emp Leave Data:", datas);

  const [loading, setLoading] = useState(true);
  const cmpId = sessionStorage.getItem("cmpId");
  // const roles = sessionStorage.getItem("role");
  const empId = sessionStorage.getItem("empId");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/leave-request-empId/${empId}`);
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
      columnDefs: [{ orderable: false, targets: -1 }],
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get(`/leave-request-empId/${empId}`);
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const table = $(tableRef.current).DataTable();

    return () => {
      table.destroy();
    };
  }, []);
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
        <div className="container-fluid px-2 minHeight">
          <div
            className="card shadow border-0 mb-2 top-header"
            style={{ borderRadius: "0" }}
          >
            <div className="container-fluid py-4">
              <div className="row align-items-center justify-content-between ">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor ">
                      Employee Leave Request
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-end">
                    <Link to="/leaverequest/add">
                      <button
                        type="submit"
                        className="btn btn-sm btn-button btn-primary"
                      >
                        <span>
                          Add <FaPlus className="pb-1" />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card shadow border-0 my-2"
            style={{ borderRadius: "0" }}
          >
            
            <div className="table-responsive p-2 minHeight">
            <div className="row py-4 px-4 my-2">
              <div className="col-md-6 col-12 p-0">
                <span>Employee Name : {datas.employeeName}</span>
              </div>
              <div className="col-md-6 col-12 p-0">
                <span>Leave Limit : {datas.leaveLimit}</span>
              </div>
            </div>
              <table ref={tableRef} className="display table ">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>
                      S.NO
                    </th>
                    <th scope="col" className="text-center">
                      From Date
                    </th>
                    <th scope="col" className="text-center">
                      To Date
                    </th>
                    <th scope="col" className="text-center">
                      Leave Type
                    </th>
                    <th scope="col" className="text-center">
                      NO.Of.Days
                    </th>
                    <th scope="col" className="text-center">
                      Leave Status
                    </th>

                    <th scope="col" className="text-center">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas?.employeeData?.map((data, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {" "}
                        {new Date(data.leaveReqStartDate).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        {" "}
                        {new Date(data.leaveReqEndDate).toLocaleDateString()}
                      </td>
                      <td className="text-center">{data.leaveReqType}</td>
                      <td className="text-center">{data.totalLeaveReqDays}</td>
                      <td className="text-center">
                        {data.leaveStatus === "APPROVED" ? (
                          <span className="badge-approved">Approved</span>
                        ) : data.leaveStatus === "REJECTED" ? (
                          <span className="badge-rejected">Rejected</span>
                        ) : (
                          <span className="badge-pending">Pending</span>
                        )}
                      </td>

                      <td className="text-center">
                        <div className="gap-2">
                          <Link to={`/leaverequest/view/${data.leaveReqId}`}>
                            <button className="btn p-1  shadow-none border-none">
                              <HiOutlineEye />
                            </button>
                          </Link>
                          <Link
                            to={`/leaverequest/edit/${data.leaveReqId}`}
                            className="px-2"
                          >
                            <button className="btn p-1 shadow-none border-none">
                              <BiEditAlt />
                            </button>
                          </Link>
                          <DeleteModel
                            onSuccess={refreshData}
                            path={`/leave-request/${data.leaveReqId}`}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer border-0 py-5"></div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestEmp;
