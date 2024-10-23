import React from 'react'

function EmpPreviousCompanyEdit() {
  return (
    <div className="pb-4">
    <p class="headColor">Previous Company Reference</p>

    <div class="container-fluid row d-flex my-4">
      <div class="form-group  col-sm ">
        <label>
            Company Name
        </label>
        <input type="text" class="form-control" value="cloud Ecs infotech"/>
      </div>

      <div class="form-group col-sm">
        <label>
          Job Title
        </label>
        <input type="text" class="form-control" />
      </div>
    </div>

    <div class="container-fluid row d-flex my-4 justify-align-content-around">
      <div class="form-group  col-sm ">
        <label>
        Company Address
        </label>
        <input type="text" class="form-control" value="282A SengKang East Avenue #07-591"/>
      </div>
      <div class="form-group col-sm ">
        <label>
        Referral Name
        </label>
        <input type="text" class="form-control" value="Evelyn Chia Si Ting"/>
      </div>
    </div>

    <div class="container-fluid row d-flex my-4 justify-align-content-around">
      <div class="form-group  col-sm ">
        <label>
        Referral Contact No
        </label>
        <input type="text" class="form-control" value="852579345"/>
      </div>
      <div class="form-group  col-sm">
      
      </div>
    </div>
  </div>
  )
}

export default EmpPreviousCompanyEdit