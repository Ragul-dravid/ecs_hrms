import React,{useState} from 'react'

function EmployeeInfoEdit() {
  return (
    <div className="pb-4">
      <p class="headColor">Employee Information</p>

      <div class="container-fluid row d-flex my-4">
        <div class="form-group  col-sm ">
          <label>First Name</label>
          <input
            type="text"
            class="form-control"
            value="Deepak"
            />
        </div>

        <div class="form-group col-sm">
          <label>Last Name</label>
          <input
            type="text"
            class="form-control"
            value="Kumar"/>
        </div>
      </div>

      <div class="container-fluid row d-flex my-4 justify-align-content-around">
        <div class="form-group  col-sm ">
          <label>Primary Phone No</label>
          <span className="text-danger">*</span>
          <input
            type="text"
            class="form-control"
            value="901231232"/>
        </div>
        <div class="form-group col-sm ">
          <label>Address</label>
          <span className="text-danger">*</span>
          <input
            type="text"
            class="form-control"
            value="282A SengKang East Avenue #07-591"/>
        </div>
      </div>

      <div class="container-fluid row d-flex my-4 justify-align-content-around">
        <div class="form-group  col-sm ">
          <label>Primary Email Id</label>
          <span className="text-danger">*</span>
          <input
            type="text"
            class="form-control"
            value="deepak02@gmail.com"/>
        </div>
        <div class="form-group  col-sm ">
          <label>Primary Email Password<span className="text-danger">*</span></label>
          <input
            type="password"
            class="form-control"
            value="123456"/>
        </div>
      </div>

      <div class="container-fluid row d-flex my-4 justify-align-content-around">
        <div class="form-group  col-sm ">
          <label>NRIC Fin</label>
          <span className="text-danger">*</span>
          <input
            type="text"
            class="form-control"
            value="25"/>
        </div>
        <div class="form-group  col-sm ">
          <label>NRIC Type<span className="text-danger">*</span></label>
          <input
            type="text"
            class="form-control"
            value="Permanent Residents "/>
        </div>
      </div>

      <div class="container-fluid row d-flex my-4 justify-align-content-around">
        <div class="form-group  col-sm ">
          <label>Company Id</label>
          <input
            type="text"
            class="form-control"
            value="09021"/>
        </div>
        <div class="form-group  col-sm ">
          <label>Employee Ref Id</label>
          <input
            type="text"
            class="form-control"
            value="012"/>
        </div>
      </div>
      
      <div class="container-fluid row d-flex my-4 justify-align-content-around">
        <div class="form-group  col-sm ">
          <label>Employee Id</label>
          <input
            type="text"
            class="form-control"
            value="#emp01"/>
        </div>
        <div class="form-group  col-sm ">
          <label>Department Id</label>
          <select
            class="form-select">
            <option value="Option0">#Ecs01</option>
            <option value="Option1">Option1</option>
            <option value="Option2">Option2</option>
            <option value="Option3">Option3</option>
            <option value="Option4">Option4</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default EmployeeInfoEdit