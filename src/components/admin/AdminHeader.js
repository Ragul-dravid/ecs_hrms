import React, { useState } from "react";
import user from "../../assets/user.webp";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
function AdminHeader({ handleLogout }) {
  const expand = "lg";
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const userName = sessionStorage.getItem("userName");
  const role = sessionStorage.getItem("role");

  const handleClose = () => {
    setShow(false);
    setSearchTerm("");
  };
  const handelNavigate = () => {
    // navigate("/users");
    handleClose();
  };
  const handleShow = () => setShow(true);

  const handleLogOutClick = () => {
    handleLogout();
    // navigate("/");
  };

  return (
    <>
      <header className="border-bottom py-3 sticky-top-header bg-white">
        <div className="container-fluid">
          <div className="mb-npx">
            <div className="row align-items-center">
              <div className="col-sm-6 col-12 mb-4 mb-sm-0 admin-settings">
                {" "}
              </div>
              <div className="col-sm-6 col-12 text-sm-end">
                <div className="mx-n1">
                  <span className="position-relative mx-2">
                    <i className="bi bi-bell admin-icons"></i>
                    <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle icon-badge">
                      4
                    </span>
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span className="position-relative mx-2">
                    <i className="bi bi-question-circle admin-icons"></i>
                    <span className="badge rounded-pill bg-warning position-absolute top-0 start-100 translate-middle icon-badge">
                      2
                    </span>
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span className="position-relative mx-2">
                    <i className="bi bi-megaphone admin-icons"></i>
                    <span className="badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle icon-badge">
                      1
                    </span>
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span className="position-relative mx-2">
                    <i className="bi bi-journal admin-icons"></i>
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span style={{ fontSize: "24px" }} onClick={handleShow}>
                    <img
                      src={user}
                      className="img-fluid header-user"
                      alt="img"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header
          closeButton
          className="d-flex align-items-center p-2"
        ></Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between align-items-center">
          <div className="row">
            <div className="text-center">
              <img
                className="img-fluid mb-3"
                src={user}
                alt="user"
                width={100}
              />
              <p>{userName}</p>
              <p>ECSCloud@gmail.com</p>
            </div>
          </div>
          <div className="row">
            <div className="text-center">
              <button
                onClick={handleLogOutClick}
                className="btn btn-light btn-sm me-1"
              >
                <MdOutlineLogout /> Logout
              </button>
              <Link to="/changepass">
                <button className="btn btn-sm btn-light">
                  Change Password
                </button>
              </Link>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminHeader;
