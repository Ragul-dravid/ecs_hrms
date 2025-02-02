import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CPMLOG from "../../assets/CRMLogo.png";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { BsBullseye } from "react-icons/bs";
import { RiOrganizationChart } from "react-icons/ri";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { BiRightIndent } from "react-icons/bi";
import { LuFileEdit } from "react-icons/lu";
import { MdOutlineHolidayVillage } from "react-icons/md";
import api from "../../config/URL";
import toast from "react-hot-toast";
import { TbDoorExit } from "react-icons/tb";

function AdminSidebar({ handleLogout }) {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const cmpName = sessionStorage.getItem("cmpName");
  const cpmId = sessionStorage.getItem("cmpId");
  const [data, setData] = useState([]);

  const handleLogOutClick = () => {
    handleLogout();
    navigate("/");
  };

  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (menuName) => {
    setActiveSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const getData = async () => {
    try {
      const response = await api.get(`/company-reg/${cpmId}`);
      setData(response.data);
    } catch (error) {
      toast.error("Error Fetching Data ", error);
    }
  };

  useEffect(() => {
    getData();
  }, [cpmId]);

  return (
    <>
      <nav
        className="navbar show navbar-vertical max-h-screen overflow-y-auto navbar-expand-lg p-0 navbar-light border-bottom border-bottom-lg-0 border-end-lg"
        id="navbarVertical"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler mx-2 p-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapse"
            aria-controls="sidebarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink
            className="nav-logo py-2 py-lg-2 px-lg-6 m-0 d-flex align-items-center justify-content-start gap-3"
            to="/"
          >
            <img
              src={data.logo || CPMLOG}
              alt="logo"
              className="img-fluid sidebar-logo rounded-circle"
              style={{
                background: "#fff",
                borderRadius: "5px",
                width: "50px",
                height: "50px",
              }}
            />
            <div className="d-flex flex-column">
              <p
                className="text-dark mb-0"
                style={{ fontSize: "13px", fontWeight: "bolder" }}
              >
                {cmpName}
              </p>
              <p
                className="hrms-text"
                style={{ fontSize: "11px", margin: "0", color: "#6c757d" }}
              >
                HRMS
              </p>
            </div>
          </NavLink>
          <div
            className="collapse navbar-collapse sidebar-bg"
            id="sidebarCollapse"
          >
            <NavLink to="/dashboard" className="text-center my-2">
              <button className="btn btn-dashbord shadow-none">
                Dashboard <MdDashboard className="me-2 ms-4" />
              </button>
            </NavLink>
            <ul className="navbar-nav p-0">
              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("Master")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Master
                  </span>
                  {activeSubmenu === "Master" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "Master" && (
                  <ul className="list-unstyled p-0">
                    <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("CostCenter")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Cost Center
                  </span>
                  {activeSubmenu === "CostCenter" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "CostCenter" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("LeaveManagement")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Leave Management
                  </span>
                  {activeSubmenu === "LeaveManagement" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "LeaveManagement" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("MonthlyActivity")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Monthly Activity{" "}
                  </span>
                  {activeSubmenu === "MonthlyActivity" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "MonthlyActivity" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("IncomeTax")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Income Tax
                  </span>
                  {activeSubmenu === "IncomeTax" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "IncomeTax" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("Human")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Human Resources
                  </span>
                  {activeSubmenu === "Human" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "Human" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("AdminSetting")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Admin Setting
                  </span>
                  {activeSubmenu === "AdminSetting" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "AdminSetting" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("Reports")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Reports
                  </span>
                  {activeSubmenu === "Reports" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "Reports" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("Administration")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Administration
                  </span>
                  {activeSubmenu === "Administration" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "Administration" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("Help")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Help
                  </span>
                  {activeSubmenu === "Help" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "Help" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("Billing")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Billing
                  </span>
                  {activeSubmenu === "Billing" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "Billing" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("CompanyPolicies")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Company Policies
                  </span>
                  {activeSubmenu === "CompanyPolicies" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "CompanyPolicies" && (
                  <ul className="list-unstyled p-0">
                    {/* <li>
                      {role === "HR_SUPER_ADMIN" ? (
                        <NavLink
                          className="nav-link"
                          to="/employeeBasicDetails"
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsBullseye
                              style={{
                                fontSize: "xx-small",
                                marginRight: "8px",
                              }}
                            />
                            Employee Basic Details
                          </span>
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/basicMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Basic Master Setup
                        </span>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink className="nav-link" to="/importStaffProfile">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Import Staff Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/additionalMasterSetup">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Additional Master Setup{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                        to="/allowancesDeductionSetup"
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Allowances Deduction Setup
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/staffBulkUpdate">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Staff Bulk Update
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* {role === "EMPLOYEE" ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/payslip">
                    <RiFileList3Line className="me-2" />
                    Payslip
                  </NavLink>
                </li>
              ) : (
                <></>
              )} */}

              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/expense">
                  <LuFileEdit className="me-2" />
                  Expense
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/claims">
                  <LuFileEdit className="me-2" />
                  Claims
                </NavLink>
              </li> */}

              {/* <li className="nav-item">
                <div
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu("Settings")}
                >
                  <span>
                    <FiSettings className="me-2" />
                    Settings
                  </span>
                  {activeSubmenu === "Settings" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "Settings" && (
                  <ul className="list-unstyled p-0">
                    <li>
                      <NavLink className="nav-link" to="/roles">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Roles & Matrix
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li> */}
            </ul>
            {/* <div className="mt-auto w-100 mb-4 nav-logo">
            <button
              style={{ width: "100%", color: "#fff" }}
              className="nav-link d-flex justify-content-between"
              onClick={handleLogOutClick}
            >
              {" "}
              Logout
              <BiLogOut />
            </button>
          </div> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminSidebar;
