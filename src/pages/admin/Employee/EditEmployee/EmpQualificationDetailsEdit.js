import React,{useState} from 'react'

function EmpQualificationDetailsEdit() {
  const qd = [""];
  const skill = [""];
  const [qD, setQd] = useState(qd);
  const [skills, setSkills] = useState(skill);
  const addQualificationDetail = () => {
    setQd((prevQD) => [...prevQD, {}]);
    console.log("Add qualification detail");
  };
  const addskill = () => {
    setSkills((prevskil) => [...prevskil, {}]);
    console.log("Add qualification detail");
  };
  return (
    <div className="pb-4">
    {qD.map((data, i) => {
      return (
        <div key={i}>
          <p class="headColor">Qualification Details</p>
          <div class="container-fluid row d-flex my-4">
            <div class="form-group  col-sm ">
              <label>
                Qualification Name<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" value="Master"/>
            </div>

            <div class="form-group col-sm">
              <label>
                Qualification Type<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" value=" Computer Science"/>
            </div>
          </div>

          <div class="container-fluid row d-flex my-4 justify-align-content-around">
            <div class="form-group  col-sm ">
              <label>
                Field of Study<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" />
            </div>
            <div class="form-group col-sm ">
              <label>
                Mode of Study<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" value="Developer"/>
            </div>
          </div>

          <div class="container-fluid row d-flex my-4 justify-align-content-around">
            <div class="form-group  col-sm ">
              <label>
                Start Date<span className="text-danger">*</span>
              </label>
              <input type="date" class="form-control" />
            </div>
            <div class="form-group  col-sm ">
              <label>
                End Date<span className="text-danger">*</span>
              </label>
              <input type="date" class="form-control" />
            </div>
          </div>

          <div class="container-fluid row d-flex my-4 justify-align-content-around">
            <div class="form-group  col-sm ">
              <label>
                {" "}
                Institution<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" value="University of Dubai"/>
            </div>
            <div class="form-group  col-sm "></div>
          </div>
        </div>
      );
    })}
    <button
      onClick={addQualificationDetail}
      class="btn btn-button btn-sm my-4 mx-1"
    >
      Add
    </button>
    {qD.length > 1 && (
      <button
        className="btn btn-danger  my-4 mx-1"
        onClick={() => {
          setQd((prevQD) => prevQD.slice(0, -1));
        }}
      >
        Delete
      </button>
    )}
   

    {skills.map((item, i) => {
      return (
        <div key={i}>
          <div>
            <p class="headColor">Skills</p>
          </div>

          <div class="container-fluid row d-flex my-4 justify-align-content-around">
            <div class="form-group  col-sm ">
              <label>
                Employee Skill<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" value="React Js"/>
            </div>
            <div class="form-group  col-sm ">
              <label>
                Years Of Experience<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" value="5"/>
            </div>
          </div>

          <div class="container-fluid row d-flex my-4 justify-align-content-around">
            <div class="form-group  col-sm ">
              <label>
                Skill Description<span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" value="I am writing to express my strong interest in the React Developer position at Virbant. As an experienced React Developer with a passion for creating innovative and user-friendly web applications, I am excited about the opportunity to contribute to your team and help drive the success of your projects"/>
            </div>
            <div class="form-group  col-sm "></div>
          </div>
        </div>
      );
    })}
    <button
      onClick={addskill}
      class="btn btn-button btn-sm my-4 mx-1"
    >
      Add
    </button>
     {skills.length > 1 && (
      <button
        className="btn btn-danger  my-4 mx-1"
        onClick={() => {
          setSkills((prevskil) => prevskil.slice(0, -1));
        }}
      >
        Delete
      </button>
    )}
  </div>
  )
}

export default EmpQualificationDetailsEdit