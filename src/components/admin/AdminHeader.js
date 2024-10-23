import React, { useState } from "react";
import user from "../../assets/user.webp";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";

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
        <Offcanvas.Header closeButton className="d-flex align-items-center p-2">
    
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column align-items-center p-2">
          <img className="img-fluid my-2" src={user} alt="user" width={100} />
          <p className="my-2">User Name : {userName}</p>
          <p className="my-2">User Email : ECSCloud@gmail.com</p>
          <p className="my-2">Role : {role}</p>

          <button
            onClick={handleLogOutClick}
            className="btn btn-danger mb-3"
            style={{ width: "100%" }}
          >
            Logout
          </button>
          <Link to="/changepass" style={{ width: "100%" }}>
            <button className="btn btn-primary" style={{ width: "100%" }}>
              Change Password
            </button>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminHeader;
