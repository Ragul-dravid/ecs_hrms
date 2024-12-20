import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { CiCirclePlus } from "react-icons/ci";
import api from "../../../../config/URL";

const EmpQualificationDetailsEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [perDetailsId, setPerDetailsId] = useState(null);
    const cmpId = sessionStorage.getItem("cmpId");

    const validationSchema = Yup.object().shape({
      empQualificationEntities: Yup.array().of(
        Yup.object().shape({
          qualName: Yup.string().required("*Qualification name is required"),
          fieldOfStudy: Yup.string().required("*Field Of Study is required"),
          qualModeOfStudy: Yup.string().required("*Mode of study is required"),
          qualInstitution: Yup.string().required("*Institution is required"),
          studying: Yup.string().required("*studying is required"),
          // percentage: Yup.string().required("*Percentage is required"),
          // qualificationDate: Yup.string().required(
          //   "*Qualification Year is required"
          // ),
          certificate: Yup.string().required("*Certificate is required"),
          empQualificationSkils: Yup.array().of(
            Yup.object().shape({
              employeeSkill: Yup.string().required(
                "*Employee skill is required"
              ),
              skillDescription: Yup.string().required(
                "*Skill description is required"
              ),
            })
          ),
        })
      ),
    });

    const formik = useFormik({
      initialValues: {
        empQualificationEntities: [
          {
            qualName: "",
            fieldOfStudy: "",
            qualModeOfStudy: "",
            qualInstitution: "",
            qualificationDate: "",
            certificate: null,
            percentage: "",
            studying: "",
          },
        ],
        empQualificationSkils: [
          {
            employeeSkill: "",
            skillDescription: "",
          },
        ],
      },
      validationSchema,
      onSubmit: async (values) => {
        console.log("Employee Qualification & Skill Details:", values);
        setLoadIndicators(true);
        console.log("Contact Details:", values);
        setLoadIndicators(true);
        values.perDetailsEmpId = formData.empId;

        try {
          const formDatas = new FormData();
          const formattedQualifications = values.empQualificationEntities.map(
            (qualification) => ({
              qualType: qualification.qualType,
              qualName: qualification.qualName,
              qualInstitution: qualification.qualInstitution,
              qualModeOfStudy: qualification.qualModeOfStudy,
              qualStartDate: qualification.qualStartDate,
              study: qualification.fieldOfStudy,
              percentage: qualification.percentage,
              courseComplitionYear: qualification.qualificationDate,
              // certificate: "Degree",
              // qualEmpId: formData.empId,
              // cmpId: cmpId,
            })
          );
          const formattedSkills = values.empQualificationSkils.map((skill) => ({
            employeeSkill: skill.employeeSkill,
            skillDescription: skill.skillDescription,
          }));
          formDatas.append("skills", JSON.stringify(formattedSkills));
          formDatas.append(
            "qualifications",
            JSON.stringify(formattedQualifications)
          );
          values.empQualificationEntities.forEach((qualification, index) => {
            if (qualification.certificate) {
              formDatas.append(
                `certificates[${index}]`,
                qualification.certificate
              );
            }
          });
          // values.empQualificationEntities.forEach((qualification, index) => {
          //   if (qualification.certificate && Array.isArray(qualification.certificate)) {
          //     qualification.certificate.forEach((file, fileIndex) => {
          //       const key = `certificates[${index}${fileIndex + 1}]`;
          //       formDatas.append(key, file);
          //     });
          //   }
          // });

          formDatas.append(`empRegId`, formData.empId);
          formDatas.append(`cmpId`, cmpId);
          const response =
            perDetailsId !== null
              ? await api.put(`/updateQualificationAndSkills/${formData.empId}`, formDatas, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
              : await api.post("/createQualificationAndSkills", formDatas, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });

          if (response.status === 201) {
            setFormData((prev) => ({ ...prev, ...values }));
            toast.success(response.data.message);
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message || "An error occurred");
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const addSkill = () => {
      const updatedEntities = [
        ...formik.values.empQualificationSkils,
        {
          employeeSkill: "",
          skillDescription: "",
        },
      ];
      formik.setFieldValue("empQualificationSkils", updatedEntities);
    };

    const addQualification = () => {
      const updatedEntities = [
        ...formik.values.empQualificationEntities,
        {
          qualName: "",
          fieldOfStudy: "",
          qualModeOfStudy: "",
          qualInstitution: "",
          qualificationDate: "",
          certificate: "",
          percentage: "",
          // empQualificationSkils: [
          //   {
          //     employeeSkill: "",
          //     skillDescription: "",
          //   },
          // ],
        },
      ];
      formik.setFieldValue("empQualificationEntities", updatedEntities);
    };

    const removeQualification = (entityIndex) => {
      const updatedEntities = [...formik.values.empQualificationEntities];
      updatedEntities.splice(entityIndex, 1);
      formik.setFieldValue("empQualificationEntities", updatedEntities);
    };

    const removeSkill = (skillIndex) => {
      const updatedEntities = [...formik.values.empQualificationSkils];
      updatedEntities.splice(skillIndex, 1);
      formik.setFieldValue("empQualificationSkils", updatedEntities);
    };

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(`emp-reg-details/${formData.empId}`);
          setPerDetailsId(response.data.empQualificationEntities[0].qualId);
          const data = response.data;
          const mappedQualifications = data.empQualificationEntities.map(
            (qual) => ({
              qualName: qual.qualName || "",
              fieldOfStudy: qual.fieldOfStudy || "",
              qualModeOfStudy: qual.modeOfStudy || "",
              qualInstitution: qual.qualInstitution || "",
              qualificationDate: qual.courseCompletionYear || "",
              certificate: qual.certificates || null,
              percentage: qual.percentage || "",
              studying: qual.studying || "",
            })
          );

          const mappedSkills = data.empQualificationSkils?.map((skill) => ({
            employeeSkill: skill.employeeSkill || "",
            skillDescription: skill.skillDescription || "",
          })) || [
            {
              employeeSkill: "",
              skillDescription: "",
            },
          ];

          formik.setValues({
            empQualificationEntities: mappedQualifications,
            empQualificationSkils: mappedSkills,
          });
        } catch (error) {
          toast.error("Error Fetching Data: " + error.message);
        }
      };

      getData();
    }, []);

    useImperativeHandle(ref, () => ({
      qualificationDetails: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="container p-0">
          {formik.values.empQualificationEntities.map((entity, entityIndex) => (
            <div className="border-0 mb-5" key={entityIndex}>
              <div className="row my-2">
                <p className="headColor">Qualification Details</p>
              </div>
              <div className="row my-5">
                <div className="col-md-6 mb-3">
                  <label>
                    Qualification Name{" "}
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name={`empQualificationEntities[${entityIndex}].qualName`}
                    value={entity.qualName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.empQualificationEntities?.[entityIndex]
                    ?.qualName &&
                    formik.errors.empQualificationEntities?.[entityIndex]
                      ?.qualName && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        {
                          formik.errors.empQualificationEntities[entityIndex]
                            .qualName
                        }
                      </div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Institution{" "}
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name={`empQualificationEntities[${entityIndex}].qualInstitution`}
                    value={entity.qualInstitution}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.empQualificationEntities?.[entityIndex]
                    ?.qualInstitution &&
                    formik.errors.empQualificationEntities?.[entityIndex]
                      ?.qualInstitution && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        {
                          formik.errors.empQualificationEntities[entityIndex]
                            .qualInstitution
                        }
                      </div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Field of Study{" "}
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name={`empQualificationEntities[${entityIndex}].fieldOfStudy`}
                    value={entity.fieldOfStudy}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.empQualificationEntities?.[entityIndex]
                    ?.fieldOfStudy &&
                    formik.errors.empQualificationEntities?.[entityIndex]
                      ?.fieldOfStudy && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        {
                          formik.errors.empQualificationEntities[entityIndex]
                            .fieldOfStudy
                        }
                      </div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Mode of Study{" "}
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </label>
                  <select
                    type="text"
                    className="form-select form-select-sm"
                    name={`empQualificationEntities[${entityIndex}].qualModeOfStudy`}
                    value={entity.qualModeOfStudy}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option selected></option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Business">Business</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Banking">Banking</option>
                    <option value="Finance">Finance</option>
                  </select>

                  {formik.touched.empQualificationEntities?.[entityIndex]
                    ?.qualModeOfStudy &&
                    formik.errors.empQualificationEntities?.[entityIndex]
                      ?.qualModeOfStudy && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        {
                          formik.errors.empQualificationEntities[entityIndex]
                            .qualModeOfStudy
                        }
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Currently Pursuing <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex">
                    <div className="form-check me-3">
                      <input
                        type="radio"
                        id={`studyingYes-${entityIndex}`}
                        name={`empQualificationEntities[${entityIndex}].studying`}
                        value="Yes"
                        checked={entity.studying === "Yes"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-check-input ${
                          formik.touched.empQualificationEntities?.[entityIndex]
                            ?.studying &&
                          formik.errors.empQualificationEntities?.[entityIndex]
                            ?.studying
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`studyingYes-${entityIndex}`}
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id={`studyingNo-${entityIndex}`}
                        name={`empQualificationEntities[${entityIndex}].studying`}
                        value="No"
                        checked={entity.studying === "No"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-check-input ${
                          formik.touched.empQualificationEntities?.[entityIndex]
                            ?.studying &&
                          formik.errors.empQualificationEntities?.[entityIndex]
                            ?.studying
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`studyingNo-${entityIndex}`}
                      >
                        No
                      </label>
                    </div>
                  </div>
                  {formik.touched.empQualificationEntities?.[entityIndex]
                    ?.studying &&
                    formik.errors.empQualificationEntities?.[entityIndex]
                      ?.studying && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        {
                          formik.errors.empQualificationEntities[entityIndex]
                            .studying
                        }
                      </div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Certificate{" "}
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-sm"
                    name={`empQualificationEntities[${entityIndex}].certificate`}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      formik.setFieldValue(
                        `empQualificationEntities[${entityIndex}].certificate`,
                        file
                      );
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.empQualificationEntities?.[entityIndex]
                    ?.certificate &&
                    formik.errors.empQualificationEntities?.[entityIndex]
                      ?.certificate && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        {
                          formik.errors.empQualificationEntities[entityIndex]
                            .certificate
                        }
                      </div>
                    )}
                </div>

                {entity.studying === "No" && (
                  <>
                    <div className="col-md-6 mb-3">
                      <label>
                        Course complition Year{" "}
                        <span
                          className="text-danger"
                          style={{ fontSize: ".875em" }}
                        >
                          *
                        </span>
                      </label>
                      <input
                        type="month"
                        className="form-control form-control-sm"
                        name={`empQualificationEntities[${entityIndex}].qualificationDate`}
                        value={entity.qualificationDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.empQualificationEntities?.[entityIndex]
                        ?.qualificationDate &&
                        formik.errors.empQualificationEntities?.[entityIndex]
                          ?.qualificationDate && (
                          <div
                            className="text-danger"
                            style={{ fontSize: ".875em" }}
                          >
                            {
                              formik.errors.empQualificationEntities[
                                entityIndex
                              ].qualificationDate
                            }
                          </div>
                        )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Percentage(%) </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name={`empQualificationEntities[${entityIndex}].percentage`}
                        value={entity.percentage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.empQualificationEntities?.[entityIndex]
                        ?.percentage &&
                        formik.errors.empQualificationEntities?.[entityIndex]
                          ?.percentage && (
                          <div
                            className="text-danger"
                            style={{ fontSize: ".875em" }}
                          >
                            {
                              formik.errors.empQualificationEntities[
                                entityIndex
                              ].percentage
                            }
                          </div>
                        )}
                    </div>
                  </>
                )}

                <div className="col-md-12 text-right mt-3 d-flex">
                  <button
                    type="button"
                    className="btn btn-sm border-none shadow-none"
                    onClick={addQualification}
                  >
                    <CiCirclePlus size={40} />
                  </button>
                  {formik.values.empQualificationEntities.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm text-danger border-none shadow-none"
                      onClick={() => removeQualification(entityIndex)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between align-items-center my-4">
            <p className="headColor mt-3">Skill</p>
            <button
              type="button"
              onClick={() => addSkill()}
              className="btn btn-sm text-primary shadow-none pt-3 border-none pe-5"
            >
              <CiCirclePlus size={30} />
            </button>
          </div>
          {formik.values.empQualificationSkils.map((skill, skillIndex) => (
            <div className="row my-5 " key={skillIndex}>
              <div className="col-md-11 col-12">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <input
                      type="text"
                      className="form-control form-control-sm custom-input"
                      placeholder="Employee Skill"
                      name={`empQualificationSkils[${skillIndex}].employeeSkill`}
                      value={skill.employeeSkill}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.empQualificationSkils?.[skillIndex]
                      ?.employeeSkill &&
                      formik.errors.empQualificationSkils?.[skillIndex]
                        ?.employeeSkill && (
                        <div
                          className="text-danger"
                          style={{ fontSize: ".875em" }}
                        >
                          {
                            formik.errors.empQualificationSkils[skillIndex]
                              .employeeSkill
                          }
                        </div>
                      )}
                  </div>

                  <div className="col-md-6 col-12">
                    <input
                      type="text"
                      className="form-control form-control-sm custom-input"
                      placeholder="Skill Description"
                      name={`empQualificationSkils[${skillIndex}].skillDescription`}
                      value={skill.skillDescription}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.empQualificationSkils?.[skillIndex]
                      ?.skillDescription &&
                      formik.errors.empQualificationSkils?.[skillIndex]
                        ?.skillDescription && (
                        <div
                          className="text-danger"
                          style={{ fontSize: ".875em" }}
                        >
                          {
                            formik.errors.empQualificationSkils[skillIndex]
                              .skillDescription
                          }
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="col-md-1 col-12 d-flex">
                <button
                  type="button"
                  className="btn btn-sm text-danger border-none shadow-none ps-5"
                  onClick={() => removeSkill(skillIndex)}
                  style={{
                    display: skillIndex === 0 ? "none" : "inline-block",
                  }}
                >
                  <FaRegTrashAlt style={{ cursor: "pointer" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </form>
    );
  }
);

export default EmpQualificationDetailsEdit;
