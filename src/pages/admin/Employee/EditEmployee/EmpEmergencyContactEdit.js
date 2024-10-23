import React,{useState} from 'react'

function EmpEmergencyContactEdit() {
  const [cont,setCont]=useState([""])
 const addcont=()=>{
  setCont((prev)=>[...prev,""])
 }
  return (
    <div className="pb-4">
    {cont.map((data,i)=>{
      return(
        <div> <p class="headColor">Emergency Contact</p>
          <div class="container-fluid row d-flex my-4">
          <div class="form-group  col-sm ">
            <label>
              Emergency Contact Name
            </label>
            <input type="text" class="form-control" value="Kumar"/>
          </div>
  
          <div class="form-group col-sm">
          <label>
            Emergency Contact No
            </label>
            <input type="text" class="form-control" value="999955588"/>
          </div>
        </div>
  
        <div class="container-fluid row d-flex my-4 justify-align-content-around">
          <div class="form-group  col-sm ">
            <label>
            Famil Reference Name 
            </label>
            <input type="text" class="form-control" value="Rohit"/>
          </div>
          <div class="form-group col-sm ">
            <label>
            Emergency Contact Address
            </label>
            <input type="text" class="form-control" value="India"/>
          </div>
        </div>
  
        <div class="container-fluid row d-flex my-4 justify-align-content-around">
          <div class="form-group  col-sm ">
            <label>
            Family Reference Phone No
            </label>
            <input type="text" class="form-control" value="78355588"/>
          </div>
          <div class="form-group  col-sm ">
            <label>
            Relationship to Employee
            </label>
            <input type="text" class="form-control" value="Firend"/>
          </div>
        </div>
        </div>
      )
    })}
   <button onClick={addcont} className="btn btn-button btn-sm my-4 mx-1">Add</button>
    
    {cont.length > 1 && (
      <button
        className="btn btn-danger my-4 mx-1"
        onClick={() => {
          setCont((prevExp) => prevExp.slice(0, -1));
        }}
      >
        Delete
      </button>
    )}
  </div>
  )
}

export default EmpEmergencyContactEdit