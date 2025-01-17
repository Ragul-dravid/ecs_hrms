import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import { MaterialReactTable } from "material-react-table";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import DeleteModel from "../../../components/admin/DeleteModel";
import { MdEdit } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import GlobalDelete from "../../../components/admin/GlobalDelete";
import BasicDepartment from "../Department/BasicDepartment";
import BasicDesigination from "../Desigination/BasicDesigination";
import Section from "../Section/Section";
import BasicCategory from "../Category/BasicCategory";
import DesiginationGroup from "../DesiginationGroup/DesiginationGroup";
import Bank from "../Bank/Bank";
import Component from "../Component/Component";
import CarrerSetting from "../CarrerSetting/CarrerSetting";
import Currency from "../Currency/Currency";
import HolidaysTab from "../Holidays/HolidaysTab/HolidaysTab";
import HolidayGroup from "../Holidays/HolidayGroup/HolidayGroup";
import AssignHoliday from "../Holidays/AssignHoliday/AssignHoliday";

const BasicMasterSetup = ({ handleCenterChanged }) => {
  const [filters, setFilters] = useState({
    centerName: "",
    centerCode: "",
    email: "",
    centerManagerId: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [datas, setDatas] = useState([]);
  const cmpId = sessionStorage.getItem("cmpId");
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeSubTab, setActiveSubTab] = useState("subTab1");

  //   const { id } = useParams();
  const [data, setData] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true,
        enableHiding: false,
        size: 40,
        cell: ({ cell }) => (
          <span style={{ textAlign: "center" }}>{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "id",
        header: "",
        enableHiding: false,
        enableSorting: false,
        size: 20,
        Cell: ({ cell }) => (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setMenuAnchor(e.currentTarget);
              setSelectedId(cell.getValue());
            }}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
      { accessorKey: "employeeId", enableHiding: false, header: "EMPLOYEE ID" },
      {
        accessorKey: "firstName",
        enableHiding: false,
        header: "EMPLOYEE NAME",
      },
      {
        accessorKey: "email",
        header: "EMPLOYEE EMAIL",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "empDateOfJoin",
        header: "JOINING DATE",
        enableHiding: false,
        size: 50,
      },
      {
        accessorKey: "section",
        header: "SECTION",
        enableHiding: false,
        size: 50,
      },
      {
        accessorKey: "empDesignation",
        enableHiding: false,
        header: "DESIGINATION",
      },
      {
        accessorKey: "gender",
        enableHiding: false,
        header: "GENDER",
      },
      {
        accessorKey: "resignDate",
        enableHiding: false,
        header: "RESIGN DATE",
      },
      // { accessorKey: "address", header: "Address" },
      // { accessorKey: "invoiceNotes", header: "Invoice Notes" },
      // { accessorKey: "openingDate", header: "Opening Date" },
      // { accessorKey: "bankAccountName", header: "Bank A/C Name" },
      // { accessorKey: "bankAccountNumber", header: "Bank A/C Number" },
      // { accessorKey: "bankBranch", header: "Bank Branch" },
      // { accessorKey: "bankName", header: "Bank Name" },
      // { accessorKey: "gst", header: "GST" },
      // { accessorKey: "taxRegistrationNumber", header: "Tax Reg Number" },
      // { accessorKey: "zipCode", header: "Zip Code" },
      { accessorKey: "createdBy", header: "Created By" },
      {
        accessorKey: "createdDate",
        header: "Created At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10) || "",
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
    ],
    []
  );

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const queryParams = new URLSearchParams(filters).toString();
  //     const response = await api.get(`/getCenterWithCustomInfo?${queryParams}`);
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`emp-reg-details-by-companyId/${cmpId}`);
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // const handleMainTabClick = (tab) => {
  //   setActiveTab(tab);

  //   if (tab === "tab1") {
  //     setSubActiveTab("tabA");
  //   } else if (tab === "tab2") {
  //     setSubActiveTab("tabB");
  //   }
  // };

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            color: "#535454 !important",
            backgroundColor: "#e6edf7 !important",
            fontWeight: "400 !important",
            fontSize: "13px !important",
            textAlign: "center !important",
          },
        },
      },
      // Switch (Toggle button) customization
      MuiSwitch: {
        styleOverrides: {
          root: {
            "&.Mui-disabled .MuiSwitch-track": {
              backgroundColor: "#f5e1d0", // Track color when disabled
              opacity: 1, // Ensures no opacity reduction
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              color: "#eb862a", // Thumb (circle) color when disabled
            },
          },
          track: {
            backgroundColor: "#e0e0e0", // Default track color
          },
          thumb: {
            color: "#eb862a", // Default thumb color
          },
          switchBase: {
            "&.Mui-checked": {
              color: "#eb862a", // Thumb color when checked
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#eb862a", // Track color when checked
            },
          },
        },
      },
    },
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const clearFilter = () => {
    setFilters({
      centerName: "",
      centerCode: "",
      email: "",
      centerManagerId: "",
    });
  };

  const handleMenuClose = () => setMenuAnchor(null);

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
          &nbsp;Basic Master Setup
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <span className="text-muted">
            <strong className="table-headings">Basic Master Setup</strong>
          </span>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            {/* <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="centerName"
                value={filters.centerName}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Centre Name"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="centerCode"
                value={filters.centerCode}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Code"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="email"
                value={filters.email}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Email"
                autoComplete="off"
              />
            </div> */}
            {/* <div className="form-group mb-0 ms-2 mb-1">
              <select
                name="centerManagerId"
                value={filters.centerManagerId}
                onChange={handleFilterChange}
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
              >
                <option value="">Select Employee Type</option>
                <option value="active">Active Employee</option>
                <option value="resigned">Resigned Employee</option>
                <option value="all">All Employee</option>
              </select>
            </div> */}

            {/* <div className="form-group mb-2 ms-2">
              <button
                type="button"
                onClick={clearFilter}
                className="btn btn-sm btn-border"
              >
                Clear
              </button>
            </div> */}
          </div>
          {/* <Link to="/employeeBasicDetails/add">
            <button
              type="button"
              className="btn btn-sm btn-button btn-primary me-2"
              style={{ fontWeight: "600px !important" }}
            >
              &nbsp; Add &nbsp;&nbsp; <i className="bx bx-plus"></i>
            </button>
          </Link> */}
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
                      DEPARTMENT
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
                      DESIGINATION
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
                      SECTION
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "tab4" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("tab4")}
                      style={{
                        borderBottom:
                          activeTab === "tab4" ? "3px solid #a070ff" : "none",
                        borderRadius: "0px",
                      }}
                    >
                      CATEGORY
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "tab5" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("tab5")}
                      style={{
                        borderBottom:
                          activeTab === "tab5" ? "3px solid #a070ff" : "none",
                        borderRadius: "0px",
                      }}
                    >
                      DESIGINATION GROUP
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "tab6" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("tab6")}
                      style={{
                        borderBottom:
                          activeTab === "tab6" ? "3px solid #a070ff" : "none",
                        borderRadius: "0px",
                      }}
                    >
                      BANK
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "tab7" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("tab7")}
                      style={{
                        borderBottom:
                          activeTab === "tab7" ? "3px solid #a070ff" : "none",
                        borderRadius: "0px",
                      }}
                    >
                      COMPONENT
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "tab8" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("tab8")}
                      style={{
                        borderBottom:
                          activeTab === "tab8" ? "3px solid #a070ff" : "none",
                        borderRadius: "0px",
                      }}
                    >
                      CARRER SETTING
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "tab9" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("tab9")}
                      style={{
                        borderBottom:
                          activeTab === "tab9" ? "3px solid #a070ff" : "none",
                        borderRadius: "0px",
                      }}
                    >
                      CURRENCY
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "tab10" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("tab10")}
                      style={{
                        borderBottom:
                          activeTab === "tab10" ? "3px solid #a070ff" : "none",
                        borderRadius: "0px",
                      }}
                    >
                      HOLIDAY
                    </button>
                  </li>
                </ul>
                {activeTab === "tab10" && (
                  <div>
                    <ul className="nav">
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeSubTab === "subTab1" ? "active" : ""
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
                          Holiday
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeSubTab === "subTab2" ? "active" : ""
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
                          Holiday Group
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeSubTab === "subTab3" ? "active" : ""
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
                          Assign Holiday
                        </button>
                      </li>
                    </ul>

                    <div className="tab-content">
                      {activeSubTab === "subTab1" && (
                        <div>
                          <HolidaysTab />
                        </div>
                      )}
                      {activeSubTab === "subTab2" && (
                        <div>
                          <HolidayGroup />
                        </div>
                      )}
                      {activeSubTab === "subTab3" && (
                        <div>
                          <AssignHoliday />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="tab-content container-fluid my-3">
                {activeTab === "tab1" && <BasicDepartment />}
                {activeTab === "tab2" && <BasicDesigination />}
                {activeTab === "tab3" && <Section />}
                {activeTab === "tab4" && <BasicCategory />}
                {activeTab === "tab5" && <DesiginationGroup />}
                {activeTab === "tab6" && <Bank />}
                {activeTab === "tab7" && <Component />}
                {activeTab === "tab8" && <CarrerSetting />}
                {activeTab === "tab9" && <Currency />}
              </div>
            </div>
            {/* </div> */}

            <Menu
              id="action-menu"
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              disableScrollLock
            >
              <MenuItem
                onClick={() => navigate(`/employee/edit/${selectedId}`)}
                className="text-start mb-0 menuitem-style"
              >
                <BiEditAlt style={{ marginRight: "8px" }} />
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/emp-reg-details/${selectedId}`}
                  // onDeleteSuccess={fetchData}
                  onOpen={handleMenuClose}
                  // deleteCenterData={true}
                  handleCenterChanged={handleCenterChanged}
                />
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default BasicMasterSetup;
