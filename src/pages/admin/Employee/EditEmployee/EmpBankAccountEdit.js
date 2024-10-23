import React from "react";

function EmpBankAccountEdit() {
  return (
    <div className="pb-4">
      <p class="headColor">Bank Account Information</p>

      <div class="container-fluid row d-flex my-4">
        <div class="form-group  col-sm ">
          <label>Bank Name</label>
          <input type="text" class="form-control" value="ICC" />
        </div>
        <div class="form-group  col-sm ">
          <label>Branch Name</label>
          <input type="text" class="form-control" value="India" />
        </div>
      </div>

      <div class="container-fluid row d-flex my-4 justify-align-content-around">
        <div class="form-group  col-sm ">
          <label>IFSC Code</label>
          <input type="text" class="form-control" value="IF3214312c21e" />
        </div>
        <div class="form-group col-sm">
          <label>Account Number</label>
          <input type="text" class="form-control" value="AC81672132" />
        </div>
      </div>
    </div>
  );
}

export default EmpBankAccountEdit;
