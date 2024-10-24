import React,{useState} from 'react'

function EmpExperienceEdit() {
  const [exp, setExp] = useState([""]); 
  const addExp = () => {
    setExp((prevExp) => [...prevExp, ""]);
    console.log("test");
  };
  return (
    <div className="pb-4">
    {exp.map((data, i) => {
      return (
        <div key={i}>
          <p class="headColor">Experience</p>

          <div class="container-fluid row d-flex my-4">
            <div class="form-group  col-sm ">
              <label>
                Previous Company Name<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" value=" Cloud Ecs infotech pvt Ltd"/>
            </div>

            <div class="form-group col-sm">
              <label>
                Previous Company Address<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" value="  282A SengKang East Avenue #07-591"/>

            </div>
          </div>

          <div class="container-fluid row d-flex my-4 justify-align-content-around">
            <div class="form-group  col-sm ">
              <label>
                Designation<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" value=" Singapore Citizen"/>

            </div>
            <div class="form-group col-sm ">
              <label>
                Experience Description<span className="text-danger">*</span>
              </label>
              <textarea type="text" class="form-control" >
      I am writing to express my strong interest in the React Developer position at Virbant. 
      </textarea>

            </div>
          </div>

          <div class="container-fluid row d-flex my-4 justify-align-content-around">
            <div class="form-group  col-sm ">
              <label>
                Start Date<span className="text-danger">*</span>
              </label>
              <input type="date" class="form-control" />
            </div>
            <div class="form-group  col-sm">
              <label>
                End Date<span className="text-danger">*</span>
              </label>
              <input type="date" class="form-control" />
            </div>
          </div>
        </div> 
      );
    })}
    
    <button onClick={addExp} className="btn btn-button btn-sm my-4 mx-1">Add</button>
    
    {exp.length > 1 && (
      <button
        className="btn btn-danger my-4 mx-1"
        onClick={() => {
          setExp((prevExp) => prevExp.slice(0, -1));
        }}
      >
        Delete
      </button>
    )}
  </div>
  )
}

export default EmpExperienceEdit