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
import GlobalDelete from "../../../../components/admin/GlobalDelete";
import RaceAdd from "../Race/RaceAdd";
import RaceEdit from "../Race/RaceEdit";

const Race = ({ handleCenterChanged }) => {
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
      {
        accessorKey: "raceCode",
        enableHiding: false,
        header: "RACE CODE",
      },
      {
        accessorKey: "raceName",
        enableHiding: false,
        header: "RACE NAME",
      },
      { accessorKey: "createdBy", header: "CREATED BY" },
      {
        accessorKey: "createdDate",
        header: "CREATED AT",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "updatedAt",
        header: "UPDATED AT",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10) || "",
      },
      {
        accessorKey: "updatedBy",
        header: "UPDATED BY",
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

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container-fluid px-2 my-4 center">
      <div className="card">
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex "></div>
          <span>
            <RaceAdd />
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
              <MenuItem>
                <RaceEdit
                  onSuccess={getData}
                  id={selectedId}
                  handleMenuClose={handleMenuClose}
                />
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

export default Race;
