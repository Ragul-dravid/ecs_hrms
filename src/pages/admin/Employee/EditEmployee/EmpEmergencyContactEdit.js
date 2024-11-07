import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../../../config/URL";

const validationSchema = Yup.object().shape({
  empEmergencyContact: Yup.array().of(
    Yup.object().shape({
      emergencyContactName: Yup.string().required(
        "*Emergency contact name is required"
      ),
      emergencyContactNo: Yup.number().required(
        "*Emergency contact no is required"
      ).typeError("*Must be a number"),
      emergencyContactAddress: Yup.string().required(
        "*Emergency contact address is required"
      ),
      relationshipOfEmployee: Yup.string().required(
        "*Relationship to employee is required"
      ),
    })
  )
});

const EmpEmergencyContactEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [rows, setRows] = useState([{}]);

    const formik = useFormik({
      initialValues: {
        empEmergencyContact: [
          {
            emergencyContactName: formData.emergencyContactName || "",
            emergencyContactNo: formData.emergencyContactNo || "",
            emergencyContactAddress: formData.emergencyContactAddress || "",
            relationshipOfEmployee: formData.relationshipOfEmployee || "",
          }
        ]
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        values.emergencyEmpId = formData.empId;

        const payload = values.empEmergencyContact.map((empEmergency)=>({
          emergencyContactName: empEmergency.emergencyContactName,
            emergencyContactNo: empEmergency.emergencyContactNo,
            emergencyContactAddress: empEmergency.emergencyContactAddress,
            relationshipOfEmployee: empEmergency.relationshipOfEmployee,
            emergencyEmpId:formData.empId
        }))
        // console.log("Body Values is ", values);
        try {
          const response = await api.post(`/createEmpEmergencyContacts`, payload);
          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    useImperativeHandle(ref, () => ({
      emergencyContact: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          {rows.map((row, index) => (
            <div key={index}>
              <p class="headColor mt-3">Emergency Contact</p>
              <div className="container">
                <div className="row mt-3">
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-label">
                      Emergency Contact Name
                      <span className="text-danger">*</span>
                    </lable>
                    <input
                      className="form-control "
                      type="text"
                      name={`empEmergencyContact[${index}].emergencyContactName`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.empEmergencyContact[index]
                          ?.emergencyContactName || ""
                      }
                    />
                    {formik.touched.empEmergencyContact?.[index]
                      ?.emergencyContactName &&
                      formik.errors.empEmergencyContact?.[index]
                        ?.emergencyContactName && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empEmergencyContact[index]
                                .emergencyContactName
                            }
                          </small>
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-label">
                      Emergency Contact No
                      <span className="text-danger">*</span>
                    </lable>

                    <input
                      className="form-control "
                      type="text"
                      name={`empEmergencyContact[${index}].emergencyContactNo`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.empEmergencyContact[index]
                          ?.emergencyContactNo || ""
                      }
                    />
                    {formik.touched.empEmergencyContact?.[index]
                      ?.emergencyContactNo &&
                      formik.errors.empEmergencyContact?.[index]
                        ?.emergencyContactNo && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empEmergencyContact[index]
                                .emergencyContactNo
                            }
                          </small>
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-label">
                      Emergency Contact Address
                      <span className="text-danger">*</span>
                    </lable>
                    <textarea rows="5"
                      className="form-control "
                      name={`empEmergencyContact[${index}].emergencyContactAddress`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.empEmergencyContact[index]
                          ?.emergencyContactAddress || ""
                      }
                    />
                    {formik.touched.empEmergencyContact?.[index]
                      ?.emergencyContactAddress &&
                      formik.errors.empEmergencyContact?.[index]
                        ?.emergencyContactAddress && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empEmergencyContact[index]
                                .emergencyContactAddress
                            }
                          </small>
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <lable className="form-label">
                      Relationship to Employee
                      <span className="text-danger">*</span>
                    </lable>

                    <input
                      className="form-control "
                      type="text"
                      name={`empEmergencyContact[${index}].relationshipOfEmployee`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.empEmergencyContact[index]
                          ?.relationshipOfEmployee || ""
                      }
                    />
                    {formik.touched.empEmergencyContact?.[index]
                      ?.relationshipOfEmployee &&
                      formik.errors.empEmergencyContact?.[index]
                        ?.relationshipOfEmployee && (
                        <div className="text-danger">
                          <small>
                            {
                              formik.errors.empEmergencyContact[index]
                                .relationshipOfEmployee
                            }
                          </small>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col-12 mb-4">
              <button
                type="button"
                onClick={() => {
                  setRows((prev) => [...prev, {}]); // Add a new row for each parent
                }}
                className="btn btn-button btn-sm"
              >
                Add More
              </button>{" "}
              &nbsp;&nbsp;
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => setRows((prev) => prev.slice(0, -1))}
                  className="btn btn-outline-danger"
                >
                  <FaRegTrashAlt />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default EmpEmergencyContactEdit;