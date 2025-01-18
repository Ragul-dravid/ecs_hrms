import React, { useState } from "react";
import EmpQualificationDetailsEdit from "./EditEmployee/EmpQualificationDetailsEdit";
import EmpExperienceEdit from "./EditEmployee/EmpExperienceEdit";
import EmpBankAccountEdit from "./EditEmployee/EmpBankAccountEdit";
import { useParams, Link } from "react-router-dom";
import GeneralDetailsEdit from "./EditEmployeeTab/GeneralDetailsEdit";
import EtmsEdit from "./EditEmployeeTab/EtmsEdit";

function EmployeeEdit() {
    const [activeTab, setActiveTab] = useState("tab1");
    const [loadIndicator, setLoadIndicator] = useState(false);

    return (
        <div className="container-fluid px-2  minHeight m-0">
            <ol
                className="breadcrumb my-3 px-2"
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
                <li>
                    <Link to="/employeeBasicDetails" className="custom-breadcrumb">
                        &nbsp;Employee Basic Details
                    </Link>
                    <span className="breadcrumb-separator"> &gt; </span>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    &nbsp;Employee Basic Details Edit
                </li>
            </ol>

            <div className="card shadow border-0 mb-2 top-header"
                style={{ borderRadius: "0" }}>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`mx-3 nav-link ${activeTab === "tab1" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab1")}
                            style={{
                                borderBottom: activeTab === "tab1" ? "3px solid #a070ff" : "none",
                                borderRadius: "0px",
                            }}
                        >
                            GENERAL
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab2")}
                            style={{
                                borderBottom: activeTab === "tab2" ? "3px solid #a070ff" : "none",
                                borderRadius: "0px",
                            }}
                        >
                            E-TMS
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab3")}
                            style={{
                                borderBottom: activeTab === "tab3" ? "3px solid #a070ff" : "none",
                                borderRadius: "0px",
                            }}
                        >
                            E-LEAVE
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "tab4" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab4")}
                            style={{
                                borderBottom: activeTab === "tab4" ? "3px solid #a070ff" : "none",
                                borderRadius: "0px",
                            }}
                        >
                            E-PAYROLL
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "tab5" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab5")}
                            style={{
                                borderBottom: activeTab === "tab5" ? "3px solid #a070ff" : "none",
                                borderRadius: "0px",
                            }}
                        >
                            E-CLAIM
                        </button>
                    </li>
                </ul>
                <div className="tab-content container-fluid my-3">
                    {activeTab === "tab1" && (
                        <GeneralDetailsEdit
                            setLoadIndicators={setLoadIndicator}
                        />
                    )}
                    {activeTab === "tab2" && (
                        <EtmsEdit
                            setLoadIndicators={setLoadIndicator}
                        />
                    )}
                    {activeTab === "tab3" && (
                        <EmpQualificationDetailsEdit
                            setLoadIndicators={setLoadIndicator}
                        />
                    )}
                    {activeTab === "tab4" && (
                        <EmpExperienceEdit
                            setLoadIndicators={setLoadIndicator}
                        />
                    )}
                    {activeTab === "tab5" && (
                        <EmpBankAccountEdit
                            setLoadIndicators={setLoadIndicator}
                        />
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default EmployeeEdit;
