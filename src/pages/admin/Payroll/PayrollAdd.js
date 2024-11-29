import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
// import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";
import api from "../../../config/URL";
// import fetchAllEmployeeListByCenter from "../../List/EmployeeList";

function PayrollAdd() {
  const [centerData, setCenterData] = useState(null);
  const [userNamesData, setUserNameData] = useState(null);
  const [empRole, setEmpRole] = useState(null);
  const [userSalaryInfo, setUserSalaryInfo] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [bonus, setBonus] = useState(0);
  const navigate = useNavigate();
  const cmpId = sessionStorage.getItem("cmpId");

  const validationSchema = Yup.object().shape({
    centerId: Yup.string().required("*Centre name is required"),
    userId: Yup.string().required("*Employee name is required"),
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
    status: Yup.string().required("*Status is required"),
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
      payrollWorkingStatus: "PENDING",
      deptId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      let selectedCenterName = "";
      let selectedEmployeeName = "";

      centerData.forEach((center) => {
        if (parseInt(values.centerId) === center.id) {
          selectedCenterName = center.centerNames || "--";
        }
      });

      userNamesData.forEach((employee) => {
        if (parseInt(values.userId) === employee.id) {
          selectedEmployeeName = employee.userNames || "--";
        }
      });

      let payload = {
        centerName: selectedCenterName,
        centerId: values.centerId,
        userId: values.userId,
        employeeName: selectedEmployeeName,
        grossPay: values.grossPay,
        netPay: values.netPay,
        status: values.status,
      };

      if (empRole !== "freelancer") {
        payload = {
          centerName: selectedCenterName,
          centerId: values.centerId,
          userId: values.userId,
          employeeName: selectedEmployeeName,
          grossPay: values.grossPay,
          netPay: values.netPay,
          status: values.status,
          payrollMonth: values.payrollMonth,
          bonus: values.bonus,
          deductionAmount: values.deductionAmount,
          shgContribution: values.shgContribution,
          cpfContributions: values.cpfContribution,
        };
      } else if (empRole === "freelancer") {
        payload = {
          centerId: values.centerId,
          userId: values.userId,
          userRole: empRole,
          payrollMonth: values.payrollMonth,
          netPay: values.netPay,
          status: values.status,
          payrollType: values.payrollType,
          freelancerCount: Number(values.freelanceCount),
        };
      }

      try {
        setLoadIndicator(true);
        if (empRole === "freelancer") {
          const response = await api.post("/createFreelancerPayroll", payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 201 || response.status === 200) {
            toast.success(response.data.message);
            navigate("/payrolladmin");
          } else {
            toast.error(response.data.message);
          }
        } else {
          const response = await api.post("/createUserPayroll", payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 201 || response.status === 201) {
            toast.success(response.data.message);
            navigate("/payrolladmin");
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

  const handleCenterChange = async (event) => {
    setUserNameData(null);
    const centerId = event.target.value;
    formik.setFieldValue("centerId", centerId);
    formik.setFieldValue("deductionAmount", "");
    formik.setFieldValue("grossPay", "");
    // try {
    //   await fetchUserName(centerId);
    // } catch (error) {
    //   toast.error(error);
    // }
  };

  // const fetchData = async () => {
  //   try {
  //     const centers = await fetchAllCentersWithIds();
  //     setCenterData(centers);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchUserName = async (centerId) => {
  //   try {
  //     const userNames = await fetchAllEmployeeListByCenter(centerId);
  //     setUserNameData(userNames);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const fetchUserSalaryInfo = async (userId, payrollMonth) => {
    // alert(userId, payrollMonth);
    const queryParams = new URLSearchParams({
      userId: userId,
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
      formik.setFieldValue("grossPay", response.data.basicPay);
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
    const userId = event.target.value;
    formik.setFieldValue("payrollEmpId", userId);
    formik.setFieldValue("grossPay", "");
    formik.setFieldValue("netPay", 0);
    const { payrollMonth } = formik.values;
    await fetchUserSalaryInfo(userId, payrollMonth);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { userId, payrollMonth } = formik.values;
      await fetchUserSalaryInfo(userId, payrollMonth);
    };

    fetchUserData();
  }, [formik.values.userId, formik.values.payrollMonth]);

  useEffect(() => {
    const calculateNetPay = () => {
      if (empRole !== "freelancer") {
        const grossPay = parseFloat(formik.values.grossPay) || 0;
        const bonus = parseFloat(formik.values.bonus) || 0;
        const deductionAmount = parseFloat(formik.values.deductionAmount) || 0;
        const cpf = parseFloat(formik.values.cpfContribution) || 0;
        const shg = parseFloat(formik.values.shgContribution) || 0;
        const netPay = grossPay + bonus - deductionAmount - cpf - shg;
        formik.setFieldValue("netPay", isNaN(netPay) ? 0 : netPay.toFixed(2));
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
      if (parseInt(formik.values.userId) === employee.id) {
        const selectedEmployeeRole = employee.role;
        setEmpRole(selectedEmployeeRole);
      }
    });
  }, [formik.values.userId]);

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
    formik.values.userId,
  ]);

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
                  <h1 className="h4 ls-tight headingColor">Add Payroll</h1>
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
                      <span>Save</span>
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
                    formik.touched.payrollEmpId &&
                    formik.errors.payrollEmpId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("payrollEmpId")}
                  onChange={handleUserChange}
                >
                  <option value="" />
                  <option value="freelancer" label="Freelancer" />
                  <option value="Employee" label="Employee" />
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
                />
                {formik.touched.netPay && formik.errors.netPay && (
                  <div className="invalid-feedback">
                    {formik.errors.netPay}
                  </div>
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

export default PayrollAdd;
