import React from "react";

function EmployeeInfoAdd() {
  return (
    <div className="container-fluid">
      <p class="headColor">Employee Information</p>
      <div className="container py-2">
        <div className="row mt-3">
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Employee Designation</lable>

            <input
              type="text"
              value="Manager"
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Date Of Joining</lable>

            <input
              type="date"
              value="2002-02-24"
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Reporting Manager ID</lable>

            <input
              type="text"
              value="05"
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Reporting Manager Name</lable>

            <input
              type="text"
              value="Dinesh"
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Notice Period</lable>

            <input
              type="text"
              value="something..."
              className={`form-control iconInput form-control-sm `}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">First Name</lable>

            <input
              type="text"
              value=""
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Last Name</lable>

            <input
              type="text"
              value=""
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Primary Phone No</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value=""
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Address</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value=""
              className={`form-control iconInput form-control-sm `}
            />
          </div>
          <div className="col-md-6 col-12 mb-3 ">
            <lable className="">Primary Email ID</lable>
            <span className="text-danger">*</span>
            <input
              type="text"
              value=""
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
        </div>
      </div>
    </div>
  );
}

export default EmployeeInfoAdd;
