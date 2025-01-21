import React, { useState } from "react";
import { Link } from "react-router-dom";
import GeneralDetailsEdit from "./EditEmployeeTab/GeneralDetailsEdit";
import EtmsEdit from "./EditEmployeeTab/EtmsEdit";
import EleaveEdit from "./EditEmployeeTab/EleaveEdit";
import EclaimEdit from "./EditEmployeeTab/EclaimEdit";
import Basic from "./EditEmployeeTab/Epayroll/Basic";
import Additional from "./EditEmployeeTab/Epayroll/Additional";
import Personal from "./EditEmployeeTab/Epayroll/Personal";
import EmploymentHistory from "./EditEmployeeTab/Epayroll/EmploymentHistory";
import EmployementEducation from "./EditEmployeeTab/Epayroll/EmployementEducation";
import CustomFields from "./EditEmployeeTab/Epayroll/CustomFields";

function EmployeeEdit() {
    const [activeTab, setActiveTab] = useState("tab1");
    const [activeSubTab, setActiveSubTab] = useState("subTab1");
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
                {activeTab === "tab4" && (
                    <div>
                        <ul className="nav">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeSubTab === "subTab1" ? "active" : ""
                                        }`}
                                    onClick={() => setActiveSubTab("subTab1")}
                                    style={{
                                        borderBottom:
                                            activeSubTab === "subTab1"
                                                ? "3px solid #a070ff"
                                                : "none",
                                        borderRadius: "0px",
                                    }}
                                >
                                    BASIC
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeSubTab === "subTab2" ? "active" : ""
                                        }`}
                                    onClick={() => setActiveSubTab("subTab2")}
                                    style={{
                                        borderBottom:
                                            activeSubTab === "subTab2"
                                                ? "3px solid #a070ff"
                                                : "none",
                                        borderRadius: "0px",
                                    }}
                                >
                                    ADDITIONAL
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeSubTab === "subTab3" ? "active" : ""
                                        }`}
                                    onClick={() => setActiveSubTab("subTab3")}
                                    style={{
                                        borderBottom:
                                            activeSubTab === "subTab3"
                                                ? "3px solid #a070ff"
                                                : "none",
                                        borderRadius: "0px",
                                    }}
                                >
                                    PERSONAL
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeSubTab === "subTab4" ? "active" : ""
                                        }`}
                                    onClick={() => setActiveSubTab("subTab4")}
                                    style={{
                                        borderBottom:
                                            activeSubTab === "subTab4"
                                                ? "3px solid #a070ff"
                                                : "none",
                                        borderRadius: "0px",
                                    }}
                                >
                                    EMPLOYEMENT HISTORY
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeSubTab === "subTab5" ? "active" : ""
                                        }`}
                                    onClick={() => setActiveSubTab("subTab5")}
                                    style={{
                                        borderBottom:
                                            activeSubTab === "subTab5"
                                                ? "3px solid #a070ff"
                                                : "none",
                                        borderRadius: "0px",
                                    }}
                                >
                                    EMPLOYEMENT EDUCATION
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeSubTab === "subTab6" ? "active" : ""
                                        }`}
                                    onClick={() => setActiveSubTab("subTab6")}
                                    style={{
                                        borderBottom:
                                            activeSubTab === "subTab6"
                                                ? "3px solid #a070ff"
                                                : "none",
                                        borderRadius: "0px",
                                    }}
                                >
                                    CUSTOM FIELDS
                                </button>
                            </li>
                        </ul>

                        <div className="tab-content">
                            {activeSubTab === "subTab1" && (
                                <div>
                                    <Basic />
                                </div>
                            )}
                            {activeSubTab === "subTab2" && (
                                <div>
                                    <Additional />
                                </div>
                            )}
                            {activeSubTab === "subTab3" && (
                                <div>
                                    <Personal />
                                </div>
                            )}
                            {activeSubTab === "subTab4" && (
                                <div>
                                    <EmploymentHistory />
                                </div>
                            )}
                            {activeSubTab === "subTab5" && (
                                <div>
                                    <EmployementEducation />
                                </div>
                            )}
                            {activeSubTab === "subTab6" && (
                                <div>
                                    <CustomFields />
                                </div>
                            )}
                        </div>
                    </div>
                )}
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
                        <EleaveEdit
                            setLoadIndicators={setLoadIndicator}
                        />
                    )}
                    {activeTab === "tab5" && (
                        <EclaimEdit
                            setLoadIndicators={setLoadIndicator}
                        />
                    )}
                </div>

            </div>
        </div>
    );
}

export default EmployeeEdit;
