import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import deals from "../../assets/CRMLogo.png";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import { BsBullseye } from "react-icons/bs";
import { RiOrganizationChart } from "react-icons/ri";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { BiRightIndent } from "react-icons/bi";
import { LuFileEdit } from "react-icons/lu";
import { MdOutlineHolidayVillage } from "react-icons/md";

function AdminSidebar({ handleLogout }) {
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    handleLogout();
    navigate("/");
  };

  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (menuName) => {
    setActiveSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <>
      <nav
        className="navbar show navbar-vertical max-h-screen navbar-expand-lg p-0 navbar-light border-bottom border-bottom-lg-0 border-end-lg"
        id="navbarVertical"
      >
        <div className="container-fluid sm-md-padding">
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
            className="nav-logo py-lg-2 px-lg-6 m-0 d-flex align-items-center justify-content-start gap-3 shadow-lg"
            to="/"
          >
            <img
              src={deals}
              alt="deals"
              className="img-fluid sidebar-logo rounded-circle"
              style={{
                background: "#fff",
                borderRadius: "5px",
                width: "50px",
                height: "50px",
              }}
            />
            <p className="hrms-text">HRMS</p>
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
                  onClick={() => toggleSubmenu("Organization")}
                >
                  <span>
                    <RiOrganizationChart className="me-2" />
                    Organization
                  </span>
                  {activeSubmenu === "Organization" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
                {activeSubmenu === "Organization" && (
                  <ul className="list-unstyled p-0">
                    <li>
                      <NavLink className="nav-link" to="/companyRegistration">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Company Registration
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/companyCompliance">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Company Compliance
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/hrPolicy">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          HR Policy
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/exitmangement">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Exit Management
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/employee">
                  <HiOutlineUserGroup className="me-2" />
                  Employee Info
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/holidays">
                  <MdOutlineHolidayVillage className="me-2" />
                  Holidays
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/leaveRequest">
                  <LuFileEdit className="me-2" />
                  Leave
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/attendance">
                  <RiContactsBook3Line className="me-2" />
                  Attendance
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/deduction">
                  <MdOutlineLibraryBooks className="me-2" />
                  Deduction
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/payroll">
                  <BiRightIndent className="me-2" />
                  Payroll
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/payslip">
                  <RiFileList3Line className="me-2" />
                  Payslip
                </NavLink>
              </li>

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

              <li className="nav-item">
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
                          Roles
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/departments">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <BsBullseye
                            style={{ fontSize: "xx-small", marginRight: "8px" }}
                          />
                          Departments
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/rolesMatrix">
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
              </li>
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
