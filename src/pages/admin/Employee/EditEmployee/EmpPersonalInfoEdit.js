import React from "react";

function EmpPersonalInfoEdit() {
  return (
    <div className="container-fluid">
      <p className="headColor">Personal Information</p>
      <div className="container py-3">
        <div className="row mt-3">
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">First Name</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value="Suriya"
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Last Name</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value="Suresh"
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Primary Phone Number</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value="1234567890"
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Address</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value="Singapore"
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Primary Email ID</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value="suriya@gmail.com"
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Primary Email Password</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value=""
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">NRIC Fin</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value=""
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">NRIC Type</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value=""
              className={`form-control iconInput form-control-sm `}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpPersonalInfoEdit;
