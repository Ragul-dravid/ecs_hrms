import React from "react";

function Payslip() {
  return (
    <div
      className="container border p-4 mt-3 mb-5"
      style={{ maxWidth: "900px", backgroundColor: "#fff" }}
    >
      <div className="text-center mb-3">
        <h2 style={{color:'#a070ff'}} className="my-2">Company Name</h2>
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
            <strong>Month:</strong> July &nbsp; <strong>Year:</strong> 2019
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

      {/* <div className="d-flex justify-content-between mt-5">
        <p>
          <strong>Signature of the Employee:</strong>
        </p>
        <p>
          <strong>Director:</strong>
        </p>
      </div> */}
    </div>
  );
}

export default Payslip;
