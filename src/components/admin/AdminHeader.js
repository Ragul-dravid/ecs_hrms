import React, { useEffect, useState } from "react";
import user from "../../assets/user.webp";
import { Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import api from "../../config/URL";
import toast from "react-hot-toast";
import { PiBuildingsThin } from "react-icons/pi";

function AdminHeader({ handleLogout }) {
  const expand = "lg";
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userName = localStorage.getItem("userName");
  const cmpName = localStorage.getItem("cmpName");
  const cpmId = localStorage.getItem("cmpId");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const [isCanvasVisible, setIsCanvasVisible] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setSearchTerm("");
  };
  const handleLinkClick = (e) => {
    setShow(false);
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
      <header className="border-bottom py-3 sticky-top-header bg-white">
        <div className="container-fluid">
          <div className="mb-npx">
            <div className="row align-items-center">
              <div className="col-sm-6 col-12 mb-4 mb-sm-0 admin-settings">
                {" "}
              </div>
              <div className="col-sm-6 col-12 text-sm-end">
                <div className="mx-n1">
                  {/* <span className="position-relative mx-2">
                    <i className="bi bi-bell admin-icons"></i>
                    <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle icon-badge">
                      4
                    </span>
                  </span> */}
                  &nbsp;&nbsp;&nbsp;
                  {/* <span className="position-relative mx-2">
                    <i className="bi bi-question-circle admin-icons"></i>
                    <span className="badge rounded-pill bg-warning position-absolute top-0 start-100 translate-middle icon-badge">
                      2
                    </span>
                  </span> */}
                  &nbsp;&nbsp;&nbsp;
                  {/* <span className="position-relative mx-2">
                    <i className="bi bi-megaphone admin-icons"></i>
                    <span className="badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle icon-badge">
                      1
                    </span>
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span className="position-relative mx-2">
                    <i className="bi bi-journal admin-icons"></i>
                  </span> */}
                  &nbsp;&nbsp;&nbsp;
                  <span style={{ fontSize: "24px" }} onClick={handleShow}>
                    <img
                      className="img-fluid"
                      src={data.profileImg || user}
                      alt="user"
                      style={{
                        borderRadius: "50%", // Makes the image circular
                        objectFit: "cover", // Ensures the image fills the container without distortion
                        width: "40px", // Equal width and height for a perfect circle
                        height: "40px",
                      }}
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
                src={data.profileImg || user}
                alt="user"
                style={{
                  borderRadius: "50%", // Makes the image circular
                  objectFit: "cover", // Ensures the image fills the container without distortion
                  width: "100px", // Equal width and height for a perfect circle
                  height: "100px",
                }}
              />
              <p className="mt-2">{userName}</p>
              <p className="mt-2">{email}</p>
              <Link
                to={`/registrationcompany/edit/${cpmId}`}
                onClick={handleLinkClick}
              >
                <p className="my-2">
                  <PiBuildingsThin /> &nbsp; {cmpName}
                </p>
              </Link>
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
