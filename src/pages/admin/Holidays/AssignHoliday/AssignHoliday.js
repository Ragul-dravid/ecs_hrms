import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../config/URL";
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
// import DeleteModel from "../../../components/admin/DeleteModel";
import { MdEdit } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import GlobalDelete from "../../../../components/admin/GlobalDelete";

const AssignHoliday = ({ handleCenterChanged }) => {
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
  const [selectedType, setSelectedType] = useState("individual");

  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
  };
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
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid px-2 my-4 center">
      <div className="card">
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
            <div className="table-container assign-holiday mb-5">
              <h3 className="table-header assign-header">HOLIDAY GROUP NAME</h3>
              <table className="holiday-group-table">
                <thead>
                  <tr>
                    <th>Holiday Group Code</th>
                    <th>Holiday Group Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SGHL</td>
                    <td>SINGAPORE HOLIDAY</td>
                    <td>
                      <input type="radio" name="holidayGroup" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="table-container assign-holiday"
              style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
            >
              <h3 className="table-header assign-header">List of Employee</h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label htmlFor="type" style={{ marginRight: "10px" }}>
                    Select Type:
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={selectedType}
                    onChange={handleSelectChange}
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    <option value="individual">Individual</option>
                    <option value="department">Department</option>
                    <option value="company">Company</option>
                  </select>
                </div>
              </div>

              <div style={{ position: "relative" }}>
                {selectedType === "individual" && (
                  <>
                    {/* Dropdown for Company */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-40px",
                        right: "0",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <label htmlFor="company" style={{ marginRight: "10px" }}>
                        Company:
                      </label>
                      <select
                        id="company"
                        name="company"
                        style={{
                          padding: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      >
                        <option>ARTY LEARNING @</option>
                        {/* Add more options here */}
                      </select>
                    </div>

                    {/* Individual Table */}
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "1px solid #ccc",
                        marginTop: "40px",
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: "#d3d3d3" }}>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            Employee Code
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            Employee Name
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            Holiday Group Code
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            <input type="checkbox" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            code: "A009",
                            name: "TAN KIM CHUAN",
                            group: "SGHL",
                          },
                          {
                            code: "A010",
                            name: "SEAH JING XUAN (CRYSTALLINE)",
                            group: "SGHL",
                          },
                          {
                            code: "D1",
                            name: "SNG MEI SHUE MICHELLE",
                            group: "SGHL",
                          },
                          {
                            code: "D2",
                            name: "SNG MEI SHZE AMANDA",
                            group: "SGHL",
                          },
                          { code: "D3", name: "GOH BEE HEONG", group: "SGHL" },
                          { code: "D4", name: "SNG SOCK HENG", group: "SGHL" },
                          {
                            code: "HR001",
                            name: "HIEW YONG QI",
                            group: "SGHL",
                          },
                        ].map((employee, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {employee.code}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {employee.name}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {employee.group}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              <input type="checkbox" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}

                {selectedType === "department" && (
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid #ccc",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#d3d3d3" }}>
                        <th
                          style={{
                            padding: "10px",
                            border: "1px solid #ccc",
                            textAlign: "left",
                          }}
                        >
                          Code <span>⬆⬇</span>
                        </th>
                        <th
                          style={{
                            padding: "10px",
                            border: "1px solid #ccc",
                            textAlign: "left",
                          }}
                        >
                          Department Name <span>⬆⬇</span>
                        </th>
                        <th
                          style={{
                            padding: "10px",
                            border: "1px solid #ccc",
                            textAlign: "center",
                          }}
                        >
                          <input type="checkbox" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { code: "OPE-S", name: "STAFF" },
                        { code: "DIR", name: "DIRECTOR" },
                        { code: "MGR", name: "MANAGEMENT" },
                        { code: "OPE", name: "TEACHER" },
                      ].map((department, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                              textAlign: "left",
                            }}
                          >
                            {department.code}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                              textAlign: "left",
                            }}
                          >
                            {department.name}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                              textAlign: "center",
                            }}
                          >
                            <input type="checkbox" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {selectedType === "company" && (
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid #ccc",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#d3d3d3" }}>
                        <th
                          style={{
                            padding: "10px",
                            border: "1px solid #ccc",
                            textAlign: "left",
                          }}
                        >
                          Code <span>⬆⬇</span>
                        </th>
                        <th
                          style={{
                            padding: "10px",
                            border: "1px solid #ccc",
                            textAlign: "left",
                          }}
                        >
                          Company Name <span>⬆⬇</span>
                        </th>
                        <th
                          style={{
                            padding: "10px",
                            border: "1px solid #ccc",
                            textAlign: "center",
                          }}
                        >
                          <input type="checkbox" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[{ code: "1", name: "ARTY LEARNING @ HG PTE LTD" }].map(
                        (company, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                                textAlign: "left",
                              }}
                            >
                              {company.code}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                                textAlign: "left",
                              }}
                            >
                              {company.name}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                                textAlign: "center",
                              }}
                            >
                              <input type="checkbox" />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                )}
                <div className="text-end">
                  <button type="" className="btn btn-primary mt-2">
                    Assign
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignHoliday;
