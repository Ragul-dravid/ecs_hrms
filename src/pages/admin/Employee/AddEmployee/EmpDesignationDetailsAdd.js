import React from "react";

function EmpDesignationDetailsAdd() {
  return (
    <div className="pb-4">
      <p class="headColor">Bank Account Information</p>

      <div class="container-fluid row d-flex my-4">
        <div class="form-group col-sm">
          <label>Designation Details</label>
          <input type="text" class="form-control"/>
        </div>
        <div class="form-group  col-sm ">
          <label>Date of Joining</label>
          <input type="date" class="form-control"/>
        </div>
      </div>

      <div class="container-fluid row d-flex my-4 justify-align-content-around">
        <div class="form-group  col-sm ">
          <label>Reporting Manager</label>
          <input type="text" class="form-control"/>
        </div>
        <div class="form-group col-sm"></div>
      </div>
    </div>
  );
}

export default EmpDesignationDetailsAdd;
