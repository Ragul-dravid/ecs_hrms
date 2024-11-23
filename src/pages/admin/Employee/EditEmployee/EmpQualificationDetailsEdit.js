import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { CiCirclePlus } from "react-icons/ci";

const EmpQualificationDetailsEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const validationSchema = Yup.object().shape({
      empQualificationEntities: Yup.array().of(
        Yup.object().shape({
          qualName: Yup.string().required("*Qualification name is required"),
          qualType: Yup.string().required("*Qualification type is required"),
          qualModeOfStudy: Yup.string().required("*Mode of study is required"),
          qualInstitution: Yup.string().required("*Institution is required"),
          qualificationDate: Yup.string().required(
            "*Qualification date is required"
          ),
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
            qualType: "",
            qualModeOfStudy: "",
            qualInstitution: "",
            qualificationDate: "",
            certificate: "",
            empQualificationSkils: [
              {
                employeeSkill: "",
                skillDescription: "",
              },
            ],
          },
        ],
      },
      validationSchema,
      onSubmit: async (values) => {
        console.log("Employee Qualification & Skill Details:", values);
        setLoadIndicators(true);
        try {
          // Mock API call
          // const response = await api.post(`/addEmpQualification`, values);
          // if (response.status === 201) {
          //   toast.success(response.data.message);
          //   setFormData((prev) => ({ ...prev, ...values }));
          handleNext();
          // } else {
          //   toast.error(response.data.message);
          // }
        } catch (error) {
          toast.error("An error occurred while submitting the form");
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const addSkill = (entityIndex) => {
      const updatedEntities = [...formik.values.empQualificationEntities];
      updatedEntities[entityIndex].empQualificationSkils.push({
        employeeSkill: "",
        skillDescription: "",
      });
      formik.setFieldValue("empQualificationEntities", updatedEntities);
    };

    const addQualification = () => {
      const updatedEntities = [
        ...formik.values.empQualificationEntities,
        {
          qualName: "",
          qualType: "",
          qualModeOfStudy: "",
          qualInstitution: "",
          qualificationDate: "",
          certificate: "",
          empQualificationSkils: [
            {
              employeeSkill: "",
              skillDescription: "",
            },
          ],
        },
      ];
      formik.setFieldValue("empQualificationEntities", updatedEntities);
    };

    const removeQualification = (entityIndex) => {
      const updatedEntities = [...formik.values.empQualificationEntities];
      updatedEntities.splice(entityIndex, 1);
      formik.setFieldValue("empQualificationEntities", updatedEntities);
    };

    const removeSkill = (entityIndex, skillIndex) => {
      const updatedEntities = [...formik.values.empQualificationEntities];
      updatedEntities[entityIndex].empQualificationSkils.splice(skillIndex, 1);
      formik.setFieldValue("empQualificationEntities", updatedEntities);
    };

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
                    Qualification Type{" "}
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
                    name={`empQualificationEntities[${entityIndex}].qualType`}
                    value={entity.qualType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option selected></option>
                    <option value="Masters">Masters</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Diploma">Diploma</option>
                    <option value="PG Diploma">PG Diploma</option>
                  </select>
                  {formik.touched.empQualificationEntities?.[entityIndex]
                    ?.qualType &&
                    formik.errors.empQualificationEntities?.[entityIndex]
                      ?.qualType && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        {
                          formik.errors.empQualificationEntities[entityIndex]
                            .qualType
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
                <div className="col-md-6 mb-3">
                  <label>
                    Qualification Date{" "}
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </label>
                  <input
                    type="date"
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
                          formik.errors.empQualificationEntities[entityIndex]
                            .qualificationDate
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
                    value={entity.certificate}
                    onChange={formik.handleChange}
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
                <div className="d-flex justify-content-between align-items-center my-4">
                  <p className="headColor mt-3">Skill</p>
                  <button
                    type="button"
                    onClick={() => addSkill(entityIndex)}
                    className="btn btn-sm text-primary shadow-none pt-3 border-none pe-5"
                  >
                    <CiCirclePlus size={30} />
                  </button>
                </div>
                {entity.empQualificationSkils.map((skill, skillIndex) => (
                  <div className="row my-5 " key={skillIndex}>
                    <div className="col-md-11 col-12">
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <input
                            type="text"
                            className="form-control form-control-sm custom-input"
                            placeholder="Employee Skill"
                            name={`empQualificationEntities[${entityIndex}].empQualificationSkils[${skillIndex}].employeeSkill`}
                            value={skill.employeeSkill}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.empQualificationEntities?.[
                            entityIndex
                          ]?.empQualificationSkils?.[skillIndex]
                            ?.employeeSkill &&
                            formik.errors.empQualificationEntities?.[
                              entityIndex
                            ]?.empQualificationSkils?.[skillIndex]
                              ?.employeeSkill && (
                              <div
                                className="text-danger"
                                style={{ fontSize: ".875em" }}
                              >
                                {
                                  formik.errors.empQualificationEntities[
                                    entityIndex
                                  ].empQualificationSkils[skillIndex]
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
                            name={`empQualificationEntities[${entityIndex}].empQualificationSkils[${skillIndex}].skillDescription`}
                            value={skill.skillDescription}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.empQualificationEntities?.[
                            entityIndex
                          ]?.empQualificationSkils?.[skillIndex]
                            ?.skillDescription &&
                            formik.errors.empQualificationEntities?.[
                              entityIndex
                            ]?.empQualificationSkils?.[skillIndex]
                              ?.skillDescription && (
                              <div
                                className="text-danger"
                                style={{ fontSize: ".875em" }}
                              >
                                {
                                  formik.errors.empQualificationEntities[
                                    entityIndex
                                  ].empQualificationSkils[skillIndex]
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
                        onClick={() => removeSkill(entityIndex, skillIndex)}
                        style={{
                          display: skillIndex === 0 ? "none" : "inline-block",
                        }}
                      >
                        <FaRegTrashAlt style={{ cursor: "pointer" }} />
                      </button>
                    </div>
                  </div>
                ))}

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
        </div>
      </form>
    );
  }
);

export default EmpQualificationDetailsEdit;
