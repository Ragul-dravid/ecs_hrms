import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../../../config/URL";

const validationSchema = Yup.object().shape({
  bankName: Yup.string().required("*Bank name is required"),
  brName: Yup.string().required("*Branch name is required"),
  ifsccode: Yup.string().required("*IFSC code is required"),
  accNumber: Yup.string().required("*Account number is required"),
  accHoldName: Yup.string().required("*Account Holder Name is required"),
  accountType: Yup.string().required("*Account Type is required"),
  // bankAddress: Yup.string().required("*Bank Address is required"),
  // bankPhoneNumber: Yup.string().required("*Bank Phone Number is required"),
});

const EmpBankAccountEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const navigate = useNavigate();
    const [perDetailsId, setPerDetailsId] = useState(null);

    const formik = useFormik({
      initialValues: {
        bankName: formData.bankName || "",
        brName: formData.brName || "",
        ifsccode: formData.ifsccode || "",
        accNumber: formData.accNumber || "",
        accHoldName: formData.accHoldName || "",
        // bankAddress: formData.bankAddress || "",
        // bankPhoneNumber: formData.bankPhoneNumber || "",
        accountType: formData.accountType || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("data", values);
        setLoadIndicators(true);
        values.bankAccDetailsEmpId = formData.empId;

        try {
          // const response = await api.post(`/emp-bank-acc-details`, values);
          const response =
            perDetailsId !== null
              ? await api.put(`/emp-bank-acc-details/${perDetailsId}`, values)
              : await api.post("/emp-bank-acc-details", values);
          if (response.status === 201 ||response.status === 200) {
            toast.success(response.data.message);
            navigate("/employee");
            setFormData((prv) => ({ ...prv, ...values }));
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

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(`emp-reg-details/${formData.empId}`);
          formik.setValues(response?.data?.empBankAccDetailsEntities[0] || []);
          setPerDetailsId(
            response.data.empBankAccDetailsEntities[0].bankAccDetailsId
          );
        } catch (error) {
          toast.error("Error Fetching Data ", error.message);
        }
      };
      getData();
    }, []);

    useImperativeHandle(ref, () => ({
      bankAccountAdd: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid p-0">
        <form onSubmit={formik.handleSubmit}>
          <div className=" border-0 mb-5">
            <div className="my-3">
              <p class="headColor">Bank Account Information</p>
              <div className="row mt-3">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="text-start mt-2">
                    <lable className="form-label">
                      Bank Name
                      <span className="text-danger">*</span>
                    </lable>
                    <br />
                    <input
                      className="form-control form-control-sm "
                      type="text"
                      name="bankName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.bankName}
                    />
                    {formik.touched.bankName && formik.errors.bankName && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>{formik.errors.bankName}</small>
                      </div>
                    )}
                  </div>
                  <div className="text-start mt-4">
                    <lable className="form-label">
                      IFSC Code
                      <span className="text-danger">*</span>
                      &nbsp;
                    </lable>
                    <br />
                    <input
                      className="form-control form-control-sm "
                      type="text"
                      name="ifsccode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ifsccode}
                    />
                    {formik.touched.ifsccode && formik.errors.ifsccode && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>{formik.errors.ifsccode}</small>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 px-5">
                  <div className="text-start mt-2">
                    <lable className="form-label">
                      Branch Name
                      <span className="text-danger">*</span>
                    </lable>
                    <br />
                    <input
                      name="brName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.brName}
                      className="form-control form-control-sm "
                      type="text"
                    />
                    {formik.touched.brName && formik.errors.brName && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        <small>{formik.errors.brName}</small>
                      </div>
                    )}
                  </div>
                  <div className="text-start mt-4">
                    <lable className="form-label">
                      Account Number
                      <span className="text-danger">*</span>
                    </lable>
                    <br />
                    <input
                      type="text"
                      name="accNumber"
                      className="form-control form-control-sm"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.accNumber && formik.errors.accNumber && (
                      <div className="error text-danger ">
                        <small>{formik.errors.accNumber}</small>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 px-5">
                  <div className="text-start mt-2">
                    <lable className="form-label">
                      Account Holder Name
                      <span className="text-danger">*</span>
                    </lable>
                    <br />
                    <input
                      name="accHoldName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.accHoldName}
                      className="form-control form-control-sm "
                      type="text"
                    />
                    {formik.touched.accHoldName &&
                      formik.errors.accHoldName && (
                        <div
                          className="text-danger"
                          style={{ fontSize: ".875em" }}
                        >
                          <small>{formik.errors.accHoldName}</small>
                        </div>
                      )}
                  </div>
                  {/* <div className="text-start mt-4">
                      <lable className="form-label">
                        Bank Address
                        <span className="text-danger">*</span>
                      </lable>
                      <br />
                      <textarea
                        rows="5"
                        className="form-control form-control-sm "
                        name="bankAddress"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      {formik.touched.bankAddress &&
                        formik.errors.bankAddress && (
                          <div
                            className="error text-danger "
                            style={{ fontSize: ".875em" }}
                          >
                            <small>{formik.errors.bankAddress}</small>
                          </div>
                        )}
                    </div> */}
                </div>
                <div className="col-lg-6 col-md-6 col-12 px-5">
                  <div className="text-start mt-2">
                    <lable className="form-label">
                      Account Type
                      <span className="text-danger">*</span>
                    </lable>
                    <br />
                    <input
                      name="accountType"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.accountType}
                      className="form-control form-control-sm "
                      type="text"
                    />
                    {formik.touched.accountType &&
                      formik.errors.accountType && (
                        <div
                          className="text-danger"
                          style={{ fontSize: ".875em" }}
                        >
                          <small>{formik.errors.accountType}</small>
                        </div>
                      )}
                  </div>
                  {/* <div className="text-start mt-4">
                      <lable className="form-label">
                        Bank Phone Number
                        <span className="text-danger">*</span>
                      </lable>
                      <br />
                      <input
                        type="text"
                        name="bankPhoneNumber"
                        className="form-control form-control-sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.bankPhoneNumber &&
                        formik.errors.bankPhoneNumber && (
                          <div className="error text-danger " style={{ fontSize: ".875em" }}>
                            <small>{formik.errors.bankPhoneNumber}</small>
                          </div>
                        )}
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);
export default EmpBankAccountEdit;
