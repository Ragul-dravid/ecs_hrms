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

const EmployeeBasic = ({ handleCenterChanged }) => {
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
    <div className="container-fluid px-2 my-4 center">
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
          &nbsp;Employee Basic Details
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <span className="text-muted">
            <strong className="table-headings">Staff Details</strong>
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
            <div className="form-group mb-0 ms-2 mb-1">
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
            </div>

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
          <Link to="/employeeBasicDetails/add">
            <button
              type="button"
              className="btn btn-sm btn-button btn-primary me-2"
              style={{ fontWeight: "600px !important" }}
            >
              &nbsp; Add &nbsp;&nbsp; <i className="bx bx-plus"></i>
            </button>
          </Link>
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
            <ThemeProvider theme={theme}>
              <MaterialReactTable
                columns={columns}
                data={datas}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                initialState={{
                  columnVisibility: {
                    gst: false,
                    address: false,
                    bankAccountName: false,
                    bankAccountNumber: false,
                    bankBranch: false,
                    bankName: false,
                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                    invoiceNotes: false,
                    openingDate: false,
                    taxRegistrationNumber: false,
                    zipCode: false,
                  },
                }}
                // muiTableBodyRowProps={({ row }) => ({
                //   onClick: () => navigate(`/center/view/${row.original.id}`),
                //   style: { cursor: "pointer" },
                // })}
              />
            </ThemeProvider>

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
                  onDeleteSuccess={getData}
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

export default EmployeeBasic;
