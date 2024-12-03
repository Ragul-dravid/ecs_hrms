import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../../../config/URL";
import { CiCirclePlus } from "react-icons/ci";

const EmpExperienceEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [isFresher, setIsFresher] = useState(false);
    const [perDetailsId, setPerDetailsId] = useState([]);
    console.log("perDetailsId", perDetailsId);
    const validationSchema = Yup.object().shape({
      empExperience: Yup.array().of(
        Yup.object().shape({
          prevCmpName: Yup.string().required(
            "*Previous company name is required"
          ),
          prevCmpAddr: Yup.string().required(
            "*Previous company address is required"
          ),
          designation: Yup.string().required("*Designation is required"),
          experienceDesc: Yup.string().required(
            "*Experience description is required"
          ),
          experienceStartDate: Yup.string().required("*Start date is required"),
          experienceEndDate: Yup.string().required("*End date is required"),
          prevCompReferralContactNum: Yup.number()
            .required("*Referral contact number is required")
            .typeError("*Must be a number"),
          prevCompReferralName: Yup.string().required(
            "*Referral name is required"
          ),
        })
      ),
    });

    const formik = useFormik({
      initialValues: {
        empExperience: [
          {
            prevCmpName: formData.prevCmpName || "",
            prevCmpAddr: formData.prevCmpAddr || "",
            designation: formData.designation || "",
            experienceDesc: formData.experienceDesc || "",
            experienceStartDate: formData.experienceStartDate || "",
            experienceEndDate: formData.experienceEndDate || "",
            prevCompReferralName: formData.prevCompReferralName || "",
            prevCompReferralContactNum:
              formData.prevCompReferralContactNum || "",
          },
        ],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("data", values);
        setLoadIndicators(true);
        values.experienceEmpId = formData.empId;

        const payload = values.empExperience.map((experience, index) => ({
          experienceId: perDetailsId[index] || "",
          prevCmpName: experience.prevCmpName,
          prevCmpAddr: experience.prevCmpAddr,
          designation: experience.designation,
          experienceDesc: experience.experienceDesc,
          experienceStartDate: experience.experienceStartDate,
          experienceEndDate: experience.experienceEndDate,
          experienceEmpId: formData.empId,
        }));

        try {
          for (let i = 0; i < payload.length; i++) {
            const experience = payload[i];
            if (experience.experienceId) {
              const response = await api.put(
                `/emp-experience/${experience.experienceId}`,
                experience
              );
              if (response.status === 200) {
                toast.success(response.data.message);
              } else {
                toast.error(response.data.message);
              }
            } else {
              // const { experienceId, ...postPayload } = payload;
              const response = await api.post(`/emp-experience`, payload);
              if (response.status === 201) {
                toast.success(response.data.message);
              } else {
                toast.error(response.data.message);
              }
            }
          }
          setFormData((prev) => ({ ...prev, ...values }));
          handleNext();
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });
    const addExp = () => {
      const updatedEntities = [
        ...formik.values.empExperience,
        {
          prevCmpName: "",
          prevCmpAddr: "",
          designation: "",
          experienceDesc: "",
          experienceStartDate: "",
          experienceEndDate: "",
          prevCompReferralName: "",
          prevCompReferralContactNum: "",
        },
      ];
      formik.setFieldValue("empExperience", updatedEntities);
    };
    const removeExp = async (index) => {
      const experienceToDelete = formik.values.empExperience[index];

      if (experienceToDelete.experienceId) {
        try {
          const response = await api.delete(
            `/emp-experience/${experienceToDelete.experienceId}`
          );
          if (response.status === 201) {
            getData();
            toast.success(
              response.data.message || "Experience deleted successfully"
            );
          } else {
            toast.error(
              `Failed to delete experience with ID: ${experienceToDelete.experienceId}`
            );
            return;
          }
        } catch (error) {
          console.error("Error deleting experience:", error.message);
          toast.error("Error Deleting Experience");
          return;
        }
      }
      const updatedEntities = [...formik.values.empExperience];
      updatedEntities.splice(index, 1);
      formik.setFieldValue("empExperience", updatedEntities);
    };

    const handleRadioChange = (e) => {
      const { name } = e.target;
      if (name === "fresher") {
        setIsFresher(true);
        handleNext();
      } else {
        setIsFresher(false);
      }
    };
    const getData = async () => {
      try {
        const response = await api.get(`/emp-reg-details/${formData.empId}`);
        const experiences =
          response.data.empExperienceEntities?.length > 0
            ? response.data.empExperienceEntities.map((exp) => ({
                prevCmpName: exp.prevCmpName || "",
                prevCmpAddr: exp.prevCmpAddr || "",
                designation: exp.designation || "",
                experienceDesc: exp.experienceDesc || "",
                experienceStartDate:
                  exp.experienceStartDate?.slice(0, 10) || "",
                experienceEndDate: exp.experienceEndDate?.slice(0, 10) || "",
                prevCompReferralName: exp.prevCompReferralName || "",
                prevCompReferralContactNum:
                  exp.prevCompReferralContactNum || "",
                experienceId: exp.experienceId,
              }))
            : [
                {
                  prevCmpName: "",
                  prevCmpAddr: "",
                  designation: "",
                  experienceDesc: "",
                  experienceStartDate: "",
                  experienceEndDate: "",
                  prevCompReferralName: "",
                  prevCompReferralContactNum: "",
                  experienceId: null,
                },
              ];
        formik.setValues({ empExperience: experiences });
        const experienceIds = experiences.map(
          (experience) => experience.experienceId
        );
        setPerDetailsId(experienceIds);
      } catch (error) {
        console.error("Error fetching experience data:", error.message);
        toast.error("Error Fetching Data");
      }
    };
    useEffect(() => {
      getData();
    }, []);

    useImperativeHandle(ref, () => ({
      experience: () => {
        if (isFresher) {
          handleNext();
        } else {
          formik.handleSubmit();
        }
      },
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="container p-0">
          <div className="d-flex align-items-center mt-3">
            <div className="me-3 d-flex align-items-center">
              <p className="headColor me-2 mb-0">Experience</p>
              <input
                type="radio"
                name="experience"
                className="form-check-input mt-0"
                onChange={handleRadioChange}
                checked={!isFresher}
              />
            </div>
            <div className="d-flex align-items-center">
              <p className="fw-bold me-2 mb-0">/</p>
              <p className="headColor me-2 mb-0">Fresher</p>
              <input
                type="radio"
                name="fresher"
                className="form-check-input mt-0"
                onChange={handleRadioChange}
                checked={isFresher}
              />
            </div>
          </div>
          {formik.values.empExperience?.map((row, index) => (
            <div key={index}>
              <div className="row mt-3">
                <div className=" col-md-6 col-12 text-start my-3">
                  <lable className="form-label">
                    Previous Company Name
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </lable>
                  <br />
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name={`empExperience[${index}].prevCmpName`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.empExperience[index]?.prevCmpName || ""
                    }
                  />
                  {formik.touched.empExperience?.[index]?.prevCmpName &&
                    formik.errors.empExperience?.[index]?.prevCmpName && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>
                          {formik.errors.empExperience[index].prevCmpName}
                        </small>
                      </div>
                    )}
                </div>
                <div className=" col-md-6 col-12 text-start my-3">
                  <lable className="form-label">
                    Designation
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </lable>
                  <br />
                  <input
                    className="form-control form-control-sm "
                    type="text"
                    name={`empExperience[${index}].designation`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.empExperience[index]?.designation || ""
                    }
                  />
                  {formik.touched.empExperience?.[index]?.designation &&
                    formik.errors.empExperience?.[index]?.designation && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>
                          {formik.errors.empExperience[index].designation}
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 text-start my-3">
                  <lable className="form-label">
                    Start Date
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </lable>
                  <br />
                  <input
                    className="form-control form-control-sm "
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name={`empExperience[${index}].experienceStartDate`}
                    value={
                      formik.values.empExperience[index]?.experienceStartDate ||
                      ""
                    }
                  />
                  {formik.touched.empExperience?.[index]?.experienceStartDate &&
                    formik.errors.empExperience?.[index]
                      ?.experienceStartDate && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>
                          {
                            formik.errors.empExperience[index]
                              .experienceStartDate
                          }
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 text-start my-3">
                  <lable className="form-label">
                    End Date
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </lable>
                  <br />
                  <input
                    className="form-control form-control-sm "
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name={`empExperience[${index}].experienceEndDate`}
                    value={
                      formik.values.empExperience[index]?.experienceEndDate ||
                      ""
                    }
                  />
                  {formik.touched.empExperience?.[index]?.experienceEndDate &&
                    formik.errors.empExperience?.[index]?.experienceEndDate && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>
                          {formik.errors.empExperience[index].experienceEndDate}
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <lable htmlFor="" className="form-label">
                    Referral Name
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </lable>

                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name={`empExperience[${index}].prevCompReferralName`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.empExperience[index]
                        ?.prevCompReferralName || ""
                    }
                  />
                  {formik.touched.empExperience?.[index]
                    ?.prevCompReferralName &&
                    formik.errors.empExperience?.[index]
                      ?.prevCompReferralName && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>
                          {
                            formik.errors.empExperience[index]
                              .prevCompReferralName
                          }
                        </small>
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <lable htmlFor="" className="form-label">
                    Referral Contact No
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </lable>

                  <input
                    className="form-control form-control-sm  form-contorl-sm"
                    name={`empExperience[${index}].prevCompReferralContactNum`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.empExperience[index]
                        ?.prevCompReferralContactNum || ""
                    }
                  />
                  {formik.touched.empExperience?.[index]
                    ?.prevCompReferralContactNum &&
                    formik.errors.empExperience?.[index]
                      ?.prevCompReferralContactNum && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>
                          {
                            formik.errors.empExperience[index]
                              .prevCompReferralContactNum
                          }
                        </small>
                      </div>
                    )}
                </div>
                <div className=" col-md-6 col-12 text-start my-3">
                  <lable className="form-label">
                    Previous Company Address
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </lable>
                  <textarea
                    rows="5"
                    className="form-control form-control-sm "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name={`empExperience[${index}].prevCmpAddr`}
                    value={
                      formik.values.empExperience[index]?.prevCmpAddr || ""
                    }
                  ></textarea>
                  {formik.touched.empExperience?.[index]?.prevCmpAddr &&
                    formik.errors.empExperience?.[index]?.prevCmpAddr && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>
                          {formik.errors.empExperience[index].prevCmpAddr}
                        </small>
                      </div>
                    )}
                </div>

                <div className="col-md-6 col-12 text-start my-3">
                  <lable className="form-label">
                    Experience Description
                    <span
                      className="text-danger"
                      style={{ fontSize: ".875em" }}
                    >
                      *
                    </span>
                  </lable>
                  <br />
                  <textarea
                    rows="5"
                    className="form-control form-control-sm "
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name={`empExperience[${index}].experienceDesc`}
                    value={
                      formik.values.empExperience[index]?.experienceDesc || ""
                    }
                  />
                  {formik.touched.empExperience?.[index]?.experienceDesc &&
                    formik.errors.empExperience?.[index]?.experienceDesc && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>
                          {formik.errors.empExperience[index].experienceDesc}
                        </small>
                      </div>
                    )}
                </div>
              </div>
              <div className="row">
                <div className="col-12 mb-4">
                  <button
                    type="button"
                    onClick={addExp}
                    className="btn btn-sm border-none shadow-none"
                  >
                    <CiCirclePlus size={40} />
                  </button>
                  &nbsp;&nbsp;
                  {formik.values.empExperience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExp(index)} // Corrected: wrapped in an arrow function
                      className="btn btn-sm text-danger border-none shadow-none"
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

export default EmpExperienceEdit;
