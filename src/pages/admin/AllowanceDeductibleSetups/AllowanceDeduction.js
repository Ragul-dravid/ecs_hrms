import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import PayableDeductible from "./PayableDeductible/PayableDeductible";
import NonPayableAllowance from "./NonPayableAllowance/NonPayableAllowance";
import ActiveAndInActive from "./ActiveAndInActiveAllowance/ActiveAndInActive";

const AllowanceDeduction = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="container-fluid px-1 my-4 center">
      <ol
        className="breadcrumb my-3"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          &nbsp;Master
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Allowances Deduction Setup
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}>
          <span className="text-muted">
            <strong className="table-headings">
              Allowances Deduction Setup
            </strong>
          </span>
        </div>
        {loading ? (
          <div className="loader-container">
            <div className="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <>
            <div className="container-fluid p-0">
              <div
                className="card shadow border-0 mb-2 top-header"
                style={{ borderRadius: "0" }}
              >
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button
                      className={`mx-3 nav-link ${
                        activeTab === "tab1" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("tab1")}
                      style={{
                        borderBottom:
                          activeTab === "tab1" ? "3px solid #a070ff" : "none",
                        borderRadius: "0px",
                      }}
                    >
                      PAYABLE/DEDUCTIBLE ALLOWANCE
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "tab2" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("tab2")}
                      style={{
                        borderBottom:
                          activeTab === "tab2" ? "3px solid #a070ff" : "none",
                        borderRadius: "0px",
                      }}
                    >
                      NON PAYABLE ALLOWANCE
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "tab3" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("tab3")}
                      style={{
                        borderBottom:
                          activeTab === "tab3" ? "3px solid #a070ff" : "none",
                        borderRadius: "0px",
                      }}
                    >
                      ACTIVE/INACTIVE ALLOWANCE
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content container-fluid my-3">
                {activeTab === "tab1" && <PayableDeductible />}
                {activeTab === "tab2" && <NonPayableAllowance />}
                {activeTab === "tab3" && <ActiveAndInActive />}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllowanceDeduction;
