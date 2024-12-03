import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import api from "../../../config/URL";
import { PropagateLoader } from "react-spinners";
import DeleteModel from "../../../components/admin/DeleteModel";
import { BiEditAlt } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";

const Attendance = () => {
  const tableRef = useRef(null);
  // const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const cmpId = sessionStorage.getItem("cmpId");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`attendance-EmpName/${cmpId}`);
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
      const response = await api.get(`attendance-EmpName/${cmpId}`);
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
                    <h1 className="h4 ls-tight headingColor ">Attendance</h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-end">
                    <Link to="/attendance/add">
                      <button
                        type="submit"
                        className="btn btn-sm btn-button btn-primary"
                      >
                        <span cla>
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
              <table ref={tableRef} className="display table ">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>
                      S.NO
                    </th>
                    <th scope="col" className="text-center">
                      Employee Id
                    </th>
                    <th scope="col" className="text-center">
                      Employee Name
                    </th>
                    {/* <th scope="col" className="text-center">
                      Mode Of Working
                    </th> */}
                    <th scope="col" className="text-center">
                      Date
                    </th>
                    <th scope="col" className="text-center">
                      Attendance Status
                    </th>
                    <th scope="col" className="text-center">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{data.employeeId}</td>
                      <td className="text-center">{data.empName}</td>
                      <td className="text-center">
                        {" "}
                        {new Date(data.attendanceDate).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge ${
                            data.attendanceStatus === "PRESENT"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {data.attendanceStatus}
                        </span>
                      </td>

                      <td className="text-center">
                        <div className="gap-2">
                          <Link to={`/attendance/view/${data.attendanceId}`}>
                            <button className="btn btn-sm p-1 shadow-none border-none">
                              <HiOutlineEye />
                            </button>
                          </Link>
                          <Link
                            to={`/attendance/edit/${data.attendanceId}`}
                            className="px-2"
                          >
                            <button className="btn btn-sm p-1 shadow-none border-none">
                              <BiEditAlt />
                            </button>
                          </Link>
                          <DeleteModel
                            onSuccess={refreshData}
                            path={`/daily-attendance/${data.attendanceId}`}
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

export default Attendance;
