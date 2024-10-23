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
  IFSCCode: Yup.string().required("*IFSC code is required"),
  accNumber: Yup.string().required("*Account number is required"),
});

const EmpBankAccountAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const navigate = useNavigate();
    const [centerData, setCenterData] = useState(null);
    const fetchData = async () => {
      try {
        setCenterData(centerData);
      } catch (error) {
        toast.error(error);
      }
    };

    useEffect(() => {
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formik = useFormik({
      initialValues: {
        bankName: formData.bankName || "",
        brName: formData.brName || "",
        IFSCCode: formData.IFSCCode || "",
        accNumber: formData.accNumber || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        values.bankAccDetailsEmpId = formData.empId;
        // console.log("Body Values is ", values);
        try {
          const response = await api.post(`/addEmpBankAccDetails`, values);
          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values }));
            navigate("/employee/view")
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
      bankAccountAdd: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          <div className=" border-0 mb-5">
            <div className="mb-3">
              <p class="headColor">Bank Account Information</p>
              <div className="container">
                <div className="row mt-3">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="text-start mt-2">
                      <lable className="form-label">
                        Bank Name
                        <span className="text-danger">*</span>
                      </lable>
                      <br />
                      <input
                        className="form-control "
                        type="text"
                        name="bankName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bankName}
                      />
                      {formik.touched.bankName && formik.errors.bankName && (
                        <div className="text-danger">
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
                        className="form-control "
                        type="text"
                        name="IFSCCode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.IFSCCode}
                      />
                      {formik.touched.IFSCCode && formik.errors.IFSCCode && (
                        <div className="text-danger">
                          <small>{formik.errors.IFSCCode}</small>
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
                        className="form-control "
                        type="text"
                      />
                      {formik.touched.brName &&
                        formik.errors.brName && (
                          <div className="text-danger">
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
                        type="number"
                        name="accNumber"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.accNumber &&
                        formik.errors.accNumber && (
                          <div className="error text-danger ">
                            <small>{formik.errors.accNumber}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);
export default EmpBankAccountAdd;
