import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
// import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";
import api from "../../../config/URL";
// import fetchAllEmployeeListByCenter from "../../List/EmployeeList";

function PayrollEdit() {
  const { id } = useParams();
  const [empData, setEmpData] = useState(null);
  const [userNamesData, setUserNameData] = useState(null);
  const [empRole, setEmpRole] = useState(null);
  console.log("empRole", empRole);
  const [userSalaryInfo, setUserSalaryInfo] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [bonus, setBonus] = useState(0);
  const navigate = useNavigate();
  const cmpId = sessionStorage.getItem("cmpId");

  const validationSchema = Yup.object().shape({
    payrollEmpId: Yup.string().required("*Employee name is required"),
    payrollMonth: Yup.string().test(
      "Payroll Month-required",
      "*Payroll Month is required",
      function (value) {
        return empRole !== "freelancer" ? !!value : true;
      }
    ),
    bonus: Yup.string().test(
      "Bonus-required",
      "*Bonus is required",
      function (value) {
        return empRole !== "freelancer" ? !!value : true;
      }
    ),
    deductionAmount: Yup.string().test(
      "Deduction Amount-required",
      "*Deduction Amount is required",
      function (value) {
        return empRole !== "freelancer" ? !!value : true;
      }
    ),
    shgContribution: Yup.string().test(
      "shgContribution-required",
      "*shgContribution is required",
      function (value) {
        return empRole !== "freelancer" ? !!value : true;
      }
    ),
    cpfContribution: Yup.string().test(
      "cpfContribution-required",
      "*cpfContribution is required",
      function (value) {
        return empRole !== "freelancer" ? !!value : true;
      }
    ),
    freelanceCount: Yup.string().test(
      "freelanceCount-required",
      "*Freelance count is required",
      function (value) {
        return empRole === "freelancer" ? !!value : true;
      }
    ),
    payrollType: Yup.string().test(
      "payrollType-required",
      "*Payroll type is required",
      function (value) {
        return empRole === "freelancer" ? !!value : true;
      }
    ),
    netPay: Yup.number()
      .required("*Net pay is required")
      .typeError("Net pay must be a number"),
    payrollWorkingStatus: Yup.string().required("*Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      cmpId: cmpId,
      payrollEmpId: "",
      grossPay: "",
      payrollMonth: "",
      payrollStart: "",
      payrollEnd: "",
      bonus: "",
      deductionAmount: "",
      shgContribution: "",
      cpfContribution: "",
      freelanceCount: "",
      payrollType: "",
      basicSalary: "",
      netPay: "",
      totalSalary: "",
      payrollWorkingStatus: "",
      deptId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      let selectedEmployeeName = "";

      userNamesData.forEach((employee) => {
        if (parseInt(values.payrollEmpId) === employee.id) {
          selectedEmployeeName = employee.empName || "--";
        }
      });

      const payload = {
        payrollEmpId: values.payrollEmpId,
        employeeName: selectedEmployeeName,
        grossPay: values.grossPay,
        netPay: values.netPay,
        status: values.payrollWorkingStatus,
        cmpId: cmpId,
        payrollMonth: values.payrollMonth,
        bonus: values.bonus,
        deductionAmount: values.deductionAmount,
        shgContribution: values.shgContribution,
        cpfContributions: values.cpfContribution,
        userRole: empRole,
        payrollType: values.payrollType,
        freelancerCount: Number(values.freelanceCount),
      };
      try {
        setLoadIndicator(true);
        {
          const response = await api.put(`/payroll/${id}`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 201 || response.status === 200) {
            toast.success(response.data.message);
            navigate("/payroll");
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        if (error?.response?.status === 409) {
          toast.warning("The payroll for this user has already been generated");
        } else {
          toast.error(error?.response?.data?.message);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });
  const fetchEmployeeList = async () => {
    try {
      const employee = await api.get(`getEmpolyeeWithRole/${cmpId}`);
      setEmpData(employee.data);
      setUserNameData(employee.data);
      console.log("Employee:", employee.data);
      return employee.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchUserSalaryInfo = async (payrollEmpId, payrollMonth) => {
    // alert(payrollEmpId, payrollMonth);
    const queryParams = new URLSearchParams({
      empId: payrollEmpId,
      deductionMonth: payrollMonth,
    });

    try {
      const response = await api.get(
        `/getCurrentMonthUserDeduction?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserSalaryInfo(response.data);
      formik.setFieldValue("deductionAmount", response.data.deductionAmount);
      formik.setFieldValue("basicSalary", response.data.basicPay);
      formik.setFieldValue("cpfContribution", response.data.cpfContribution);
      formik.setFieldValue("shgContribution", response.data.shgContribution);
    } catch (error) {
      toast.error(error);
    }
  };

  // useEffect(() => {
  //   const currentMonth = format(new Date(), "yyyy-MM");
  //   formik.setFieldValue("payrollMonth", currentMonth);
  // }, []);

  const handleUserChange = async (event) => {
    const payrollEmpId = event.target.value;
    console.log("payrollEmpId", payrollEmpId);
    formik.setFieldValue("payrollEmpId", payrollEmpId);
    formik.setFieldValue("grossPay", "");
    formik.setFieldValue("netPay", 0);
    const { payrollMonth } = formik.values;
    await fetchUserSalaryInfo(payrollEmpId, payrollMonth);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { payrollEmpId, payrollMonth } = formik.values;
      await fetchUserSalaryInfo(payrollEmpId, payrollMonth);
    };

    fetchUserData();
  }, [formik.values.payrollEmpId, formik.values.payrollMonth]);

  useEffect(() => {
    const calculateNetPay = () => {
      if (empRole !== "freelancer") {
        const grossPay = parseFloat(formik.values.grossPay) || 0;
        const bonus = parseFloat(formik.values.bonus) || 0;
        const deductionAmount = parseFloat(formik.values.deductionAmount) || 0;
        const cpf = parseFloat(formik.values.cpfContribution) || 0;
        const shg = parseFloat(formik.values.shgContribution) || 0;
        const netPay = grossPay + bonus - deductionAmount - cpf - shg;
        formik.setFieldValue("netPay", netPay);
      }
    };
    calculateNetPay();
  }, [
    formik.values.grossPay,
    formik.values.bonus,
    formik.values.deductionAmount,
  ]);

  useEffect(() => {
    userNamesData?.forEach((employee) => {
      if (parseInt(formik.values.payrollEmpId) === employee.id) {
        const selectedEmployeeRole = employee.roleName;
        setEmpRole(selectedEmployeeRole);
      }
    });
  }, [formik.values.payrollEmpId]);

  const fetchUserPaymentInfo = async (freelanceCount, payrollType) => {
    const queryParams = new URLSearchParams({
      payrollType: payrollType,
      freelanceCount: freelanceCount,
    });

    try {
      const response = await api.get(`/freelancerPayment?${queryParams}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      formik.setFieldValue("netPay", response.data.netPay);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchUserPaymentData = async () => {
      const { freelanceCount, payrollType } = formik.values;
      await fetchUserPaymentInfo(freelanceCount, payrollType);
    };

    fetchUserPaymentData();
  }, [
    formik.values.freelanceCount,
    formik.values.payrollType,
    formik.values.payrollEmpId,
  ]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/payroll-by-id-name/${id}`);
        formik.setValues({
          ...response.data,
          freelancerCount: response.data.freelanceCount,
          payrollEmpId:response.data.empId
        });

      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // fetchData();
  }, []);

  return (
    <div className="container-fluid px-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div
          className="card shadow border-0 mb-2 top-header"
          style={{ borderRadius: "0" }}
        >
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Edit Payroll</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/payroll">
                    <button type="button" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    disabled={loadIndicator}
                  >
                    {loadIndicator ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <span>Update</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card shadow border-0 my-2"
          style={{ borderRadius: "0" }}
        >
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Employee Name <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select form-select-sm ${
                    formik.touched.payrollEmpId && formik.errors.payrollEmpId
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.payrollEmpId} // Ensure proper controlled value
                  onChange={handleUserChange} // Custom change handler
                >
                  <option value="" selected></option>
                  {Array.isArray(empData) &&
                    empData.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.empName}
                      </option>
                    ))}
                </select>
                {formik.touched.payrollEmpId && formik.errors.payrollEmpId && (
                  <div className="invalid-feedback">
                    {formik.errors.payrollEmpId}
                  </div>
                )}
              </div>

              {empRole !== "freelancer" && (
                <>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Payroll Month <span className="text-danger">*</span>
                    </label>
                    <input
                      type="month"
                      name="payrollMonth"
                      className={`form-control form-control-sm ${
                        formik.touched.payrollMonth &&
                        formik.errors.payrollMonth
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("payrollMonth")}
                    />
                    {formik.touched.payrollMonth &&
                      formik.errors.payrollMonth && (
                        <div className="invalid-feedback">
                          {formik.errors.payrollMonth}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Basic Pay <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="basicSalary"
                      className={`form-control form-control-sm ${
                        formik.touched.basicSalary && formik.errors.basicSalary
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("basicSalary")}
                      readOnly
                    />
                    {formik.touched.basicSalary &&
                      formik.errors.basicSalary && (
                        <div className="invalid-feedback">
                          {formik.errors.basicSalary}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Bonus <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="bonus"
                      className={`form-control form-control-sm ${
                        formik.touched.bonus && formik.errors.bonus
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("bonus")}
                    />
                    {formik.touched.bonus && formik.errors.bonus && (
                      <div className="invalid-feedback">
                        {formik.errors.bonus}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Deduction <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="deductionAmount"
                      className={`form-control form-control-sm ${
                        formik.touched.deductionAmount &&
                        formik.errors.deductionAmount
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("deductionAmount")}
                      readOnly
                    />
                    {formik.touched.deductionAmount &&
                      formik.errors.deductionAmount && (
                        <div className="invalid-feedback">
                          {formik.errors.deductionAmount}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      SHG<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="shgContribution"
                      className={`form-control form-control-sm ${
                        formik.touched.shgContribution &&
                        formik.errors.shgContribution
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("shgContribution")}
                      readOnly
                    />
                    {formik.touched.shgContribution &&
                      formik.errors.shgContribution && (
                        <div className="invalid-feedback">
                          {formik.errors.shgContribution}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      CPF<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="cpfContribution"
                      className={`form-control form-control-sm ${
                        formik.touched.cpfContribution &&
                        formik.errors.cpfContribution
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("cpfContribution")}
                      readOnly
                    />
                    {formik.touched.cpfContribution &&
                      formik.errors.cpfContribution && (
                        <div className="invalid-feedback">
                          {formik.errors.cpfContribution}
                        </div>
                      )}
                  </div>
                </>
              )}
              {empRole === "freelancer" && (
                <>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Payroll Start Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      name="payrollStart"
                      className={`form-control form-control-sm ${
                        formik.touched.payrollStart &&
                        formik.errors.payrollStart
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("payrollStart")}
                    />
                    {formik.touched.payrollStart &&
                      formik.errors.payrollStart && (
                        <div className="invalid-feedback">
                          {formik.errors.payrollStart}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Payroll End Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      name="payrollEnd"
                      className={`form-control form-control-sm ${
                        formik.touched.payrollEnd && formik.errors.payrollEnd
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("payrollEnd")}
                    />
                    {formik.touched.payrollEnd && formik.errors.payrollEnd && (
                      <div className="invalid-feedback">
                        {formik.errors.payrollEnd}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Payroll Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select form-select-sm ${
                        formik.touched.payrollType && formik.errors.payrollType
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("payrollType")}
                    >
                      <option></option>
                      <option value="HOURLY">HOURLY</option>
                      <option value="SESSION">SESSION</option>
                      <option value="PACKAGE">PACKAGE</option>
                    </select>
                    {formik.touched.payrollType &&
                      formik.errors.payrollType && (
                        <div className="invalid-feedback">
                          {formik.errors.payrollType}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Freelance Count <span className="text-danger">*</span>
                    </label>
                    <input
                      type="month"
                      name="freelanceCount"
                      className={`form-control form-control-sm ${
                        formik.touched.freelanceCount &&
                        formik.errors.freelanceCount
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("freelanceCount")}
                    />
                    {formik.touched.freelanceCount &&
                      formik.errors.freelanceCount && (
                        <div className="invalid-feedback">
                          {formik.errors.freelanceCount}
                        </div>
                      )}
                  </div>
                </>
              )}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Net Pay <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="netPay"
                  className={`form-control form-control-sm ${
                    formik.touched.netPay && formik.errors.netPay
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("netPay")}
                  readOnly
                />
                {formik.touched.netPay && formik.errors.netPay && (
                  <div className="invalid-feedback">{formik.errors.netPay}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Payroll Status <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select form-select-sm ${
                    formik.touched.payrollWorkingStatus &&
                    formik.errors.payrollWorkingStatus
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("payrollWorkingStatus")}
                >
                  <option></option>
                  <option value="Pending">Pending</option>
                  <option value="Approve">Approve</option>
                  <option value="Rejected">Rejected</option>
                </select>
                {formik.touched.payrollWorkingStatus &&
                  formik.errors.payrollWorkingStatus && (
                    <div className="invalid-feedback">
                      {formik.errors.payrollWorkingStatus}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PayrollEdit;
