import React, { useEffect, useState } from "react";
import api from "../../../config/URL";
// import { format } from "date-fns";
import noPayslip from "../../../assets/NoPayslip.png";

function Payslip() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [data, setData] = useState({});
  console.log("Payslip:", data);
  const empId = sessionStorage.getItem("empId");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const currentMonth = format(new Date(), "yyyy-MM");
  //   setSelectedMonth(currentMonth);
  // }, []);

  const getData = async () => {
    try {
      const response = await api.get(
        `getPaySlipByEmpId/${empId}?payrollMonth=${selectedMonth}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("payslip error:", error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMonth !== "") {
      getData();
    }
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // console.log("Selected month:", event.target.value);
  };

  return (
    <div className="p-2">
      <div className="offset-md-1 col-md-5 col-12">
            <lable className="form-lable fw-medium">PAYSLIP MONTH</lable>
            <input
              type="month"
              className="form-control form-control-sm w-50"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </div>
      {data && Object.keys(data).length > 0 ? (
        <>
          {/* <div className="offset-md-1 col-md-5 col-12">
            <lable className="form-lable fw-medium">PAYSLIP MONTH</lable>
            <input
              type="month"
              className="form-control form-control-sm w-50"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </div> */}
          <div
            className="container border p-4 mt-3 mb-5"
            style={{ maxWidth: "900px", backgroundColor: "#fff" }}
          >
            <div className="text-center mb-3">
              <h2 style={{ color: "#a070ff" }} className="my-2">
                Company Name
              </h2>
            </div>

            <div className="d-flex justify-content-between mb-4">
              <div>
                <p>
                  <strong>Employee Name:</strong> XXXXXXXXXXXXXX
                </p>
                <p>
                  <strong>Designation:</strong> PHP Developer
                </p>
                <p>
                  <strong>Month:</strong> July &nbsp; <strong>Year:</strong>{" "}
                  2019
                </p>
              </div>
              <div className="text-right">
                <p>
                  <strong>Date:</strong>{" "}
                  <span
                    className="text-white p-1 rounded-1"
                    style={{
                      background: "linear-gradient(135deg, #a070ff, #b987ff)",
                    }}
                  >
                    03/07/2019
                  </span>
                </p>
              </div>
            </div>

            <table className="table table-bordered mb-4">
              <thead>
                <tr>
                  <th colSpan="2" className="text-center">
                    Earnings
                  </th>
                  <th colSpan="2" className="text-center">
                    Deductions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic Salary</td>
                  <td>25000.00</td>
                  <td>Deduction</td>
                  <td>200.00</td>
                </tr>
                <tr>
                  <td>Bonus</td>
                  <td>
                    <strong>1500.00</strong>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <strong>Total Addition</strong>
                  </td>
                  <td>
                    <strong>27000.00</strong>
                  </td>
                  <td>
                    <strong>Total Deduction</strong>
                  </td>
                  <td>
                    <strong>200.00</strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-end">
                    <strong>NET Salary</strong>
                  </td>
                  <td>
                    <strong>26800.00</strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <p>
              <strong>In words:</strong> Twenty Six Thousand Eight Hundred
            </p>

            <div className="d-flex justify-content-between mt-4">
              <div>
                <p>
                  <strong>Ref No:</strong> BANK NEFT
                </p>
                <p>
                  <strong>Payment Transfer Date:</strong> 07/10/19
                </p>
              </div>
              <div className="text-right">
                <p>
                  <strong>Name of Bank:</strong> XXXXXXXXXXXXXXeeeeeeeee
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card m-auto p-3">
            <img
              className="img-fluid mb-3"
              src={noPayslip}
              alt="user"
              style={{
                borderRadius: "100%", // Makes the image circular
                objectFit: "cover", // Ensures the image fills the container without distortion
                // width: "100px", // Equal width and height for a perfect circle
                // height: "100px",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Payslip;
