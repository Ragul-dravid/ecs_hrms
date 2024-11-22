import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import api from "../../../config/URL";
import { PropagateLoader } from 'react-spinners';
import DeleteModel from "../../../components/admin/DeleteModel";
import { HiOutlineEye } from "react-icons/hi";
import { BiEditAlt } from "react-icons/bi";

const Employee = () => {
  const tableRef = useRef(null);
  // const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  console.log("Emp Data:",datas);
  
  const [loading, setLoading] = useState(true);
  const cmpId = localStorage.getItem("cmpId");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`emp-reg-details-by-companyId/${cmpId}`);
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
      const response = await api.get(`emp-reg-details-by-companyId/${cmpId}`);
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
                      Employee Info
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-end">
                    {/* {/* {/ {storedScreens?.levelCreate && ( /} */}
                    <Link to="/employee/add">
                      <button
                        type="submit"
                        className="btn btn-sm btn-button btn-primary"
                      >
                        <span cla>
                          Add <FaPlus className="pb-1" />
                        </span>
                      </button>
                    </Link>
                    {/* {/ )} /} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <hr className="removeHrMargin"></hr> */}
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
                      EMPLOYEE ID
                    </th>
                    <th scope="col" className="text-center">
                      EMPLOYEE Name
                    </th>
                    <th scope="col" className="text-center">
                      EMPLOYEE Email
                    </th>
                    <th scope="col" className="text-center">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(datas) && datas.map((data, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{data.employeeId}</td>
                      <td className="text-center">{data.firstName + " " + data.lastName}</td>
                      <td className="text-center">{data.email}</td>
                      <td className="text-center">
                        <div className="gap-2">
                          <Link to={`/employee/view/${data.id}`}>
                            <button className="btn p-1  shadow-none border-none">
                            <HiOutlineEye />
                            </button>
                          </Link>
                          <Link
                            to={`/employee/edit/${data.id}`}
                            className="px-2"
                          >
                            <button className="btn p-1 shadow-none border-none">
                            <BiEditAlt />
                            </button>
                          </Link>
                          <DeleteModel
                            onSuccess={refreshData}
                            path={`/employee/${data.id}`}
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

export default Employee;
