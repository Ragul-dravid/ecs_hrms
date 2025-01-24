import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import "../styles/admin.css";
import "../styles/admincdn.css";
import "../styles/custom.css";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import CompanyRegistration from "../pages/admin/Organization/CompanyRegistration/CompanyRegistration";
import CompanyRegistrationAdd from "../pages/admin/Organization/CompanyRegistration/CompanyRegistrationAdd";
import CompanyRegistrationEdit from "../pages/admin/Organization/CompanyRegistration/CompanyRegistrationEdit";
import CompanyRegistrationView from "../pages/admin/Organization/CompanyRegistration/CompanyRegistrationView";
import CompanyCompliance from "../pages/admin/Organization/CompanyCompliance/CompanyCompliance";
import CompanyComplianceAdd from "../pages/admin/Organization/CompanyCompliance/CompanyComplianceAdd";
import CompanyComplianceEdit from "../pages/admin/Organization/CompanyCompliance/CompanyComplianceEdit";
import CompanyComplianceView from "../pages/admin/Organization/CompanyCompliance/CompanyComplianceView";
import HrPolicy from "../pages/admin/Organization/HrPolicy/HrPolicy";
import HrPolicyAdd from "../pages/admin/Organization/HrPolicy/HrPolicyAdd";
import HrPolicyEdit from "../pages/admin/Organization/HrPolicy/HrPolicyEdit";
import HrPolicyView from "../pages/admin/Organization/HrPolicy/HrPolicyView.js";
import ExitManagement from "../pages/admin/Organization/ExitManagement/ExitManagement.js";
import ExitManagementAdd from "../pages/admin/Organization/ExitManagement/ExitManagementAdd.js";
import ExitManagementEdit from "../pages/admin/Organization/ExitManagement/ExitManagementEdit.js";
import ExitManagementView from "../pages/admin/Organization/ExitManagement/ExitManagementView.js";
import Department from "../pages/admin/Settings/Department/Department";
import DepartmentAdd from "../pages/admin/Settings/Department/DepartmentAdd";
import DepartmentEdit from "../pages/admin/Settings/Department/DepartmentEdit";
import DepartmentView from "../pages/admin/Settings/Department/DepartmentView";
import Employee from "../pages/admin/Employee/Employee";
import EmployeeAdminAdd from "../pages/admin/Employee/EmpoyeeAdminAdd.js";
// import EmployeeEdit from "../pages/admin/Employee/EmployeeEdit.js";
import EmployeeView from "../pages/admin/Employee/EmployeeView";
import Deduction from "../pages/admin/Deduction/Deduction.js";
import DeductionAdd from "../pages/admin/Deduction/DeductionAdd.js";
import DeductionEdit from "../pages/admin/Deduction/DeductionEdit.js";
import DeductionView from "../pages/admin/Deduction/DeductionView.js";
import Attendance from "../pages/admin/Attendance/Attendance.js";
import AttendanceAdd from "../pages/admin/Attendance/AttendanceAdd.js";
import AttendanceEdit from "../pages/admin/Attendance/AttendanceEdit.js";
import AttendanceView from "../pages/admin/Attendance/AttendanceView.js";
import Holiday from "../pages/admin/Holiday/Holiday.js";
import HolidayAdd from "../pages/admin/Holiday/HolidayAdd.js";
import HolidayEdit from "../pages/admin/Holiday/HolidayEdit.js";
import HolidayView from "../pages/admin/Holiday/HolidayView.js";
import LeaveRequest from "../pages/admin/LeaveRequest/LeaveRequest.js";
import LeaveRequestAdd from "../pages/admin/LeaveRequest/LeaveRequestAdd.js";
import LeaveRequestEdit from "../pages/admin/LeaveRequest/LeaveRequestEdit.js";
import LeaveRequestView from "../pages/admin/LeaveRequest/LeaveRequestView.js";
import Expense from "../pages/admin/Expense/Expense.js";
import ExpenseAdd from "../pages/admin/Expense/ExpenseAdd.js";
import ExpenseEdit from "../pages/admin/Expense/ExpenseEdit.js";
import ExpenseView from "../pages/admin/Expense/ExpenseView.js";
import Claims from "../pages/admin/Claims/Claims.js";
import ClaimsAdd from "../pages/admin/Claims/ClaimsAdd.js";
import Payroll from "../pages/admin/Payroll/Payroll.js";
import PayrollAdd from "../pages/admin/Payroll/PayrollAdd.js";
import PayrollEdit from "../pages/admin/Payroll/PayrollEdit.js";
import PayrollView from "../pages/admin/Payroll/PayrollView.js";
import Payslip from "../pages/admin/Payroll/Payslip.js";
import Roles from "../pages/admin/Settings/Roles/Roles.js";
import RolesAdd from "../pages/admin/Settings/Roles/RolesAdd.js";
import RolesEdit from "../pages/admin/Settings/Roles/RolesEdit.js";
import RolesView from "../pages/admin/Settings/Roles/RolesView.js";
import ScrollToTop from "../pages/ScrollToTop.js";
import Designation from "../pages/admin/Settings/Designation/Designation.js";
import DesignationEdit from "../pages/admin/Settings/Designation/DesignationEdit.js";
import DesignationView from "../pages/admin/Settings/Designation/DesignationView.js";
import DesignationAdd from "../pages/admin/Settings/Designation/DesignationAdd.js";
import RegistrationCompany from "../pages/admin/RegistrationCompany.js";
import LeaveRequestEmp from "../pages/admin/LeaveRequest/LeaveRequestEmp.js";
import EmployeeBasic from "../pages/admin/Master/EmployeeBasic.js";
import EmployeeBasicAdd from "../pages/admin/Master/EmployeeBasicAdd.js";
import BasicMasterSetup from "../pages/admin/BasicMasterSetup/BasicMasterSetup.js";
import BasicDepartment from "../pages/admin/Department/BasicDepartment.js";
import BasicDepartmentAdd from "../pages/admin/Department/BasicDeparmentAdd.js";
import BasicDepartmentEdit from "../pages/admin/Department/BasicDeparmentEdit.js";
import BasicDesigination from "../pages/admin/Desigination/BasicDesigination.js";
import BasicDesiginationAdd from "../pages/admin/Desigination/BasicDesiginationAdd.js";
import BasicDesiginationEdit from "../pages/admin/Desigination/BasicDesiginationEdit.js";
import Section from "../pages/admin/Section/Section.js";
import SectionAdd from "../pages/admin/Section/SectionAdd.js";
import SectionEdit from "../pages/admin/Section/SectionEdit.js";
import BasicCategory from "../pages/admin/Category/BasicCategory.js";
import BasicCategoryAdd from "../pages/admin/Category/BasicCategoryAdd.js";
import BasicCategoryEdit from "../pages/admin/Category/BasicCategoryEdit.js";
import DesiginationGroup from "../pages/admin/DesiginationGroup/DesiginationGroup.js";
import DesiginationGroupAdd from "../pages/admin/DesiginationGroup/DesiginationGroupAdd.js";
import DesiginationGroupEdit from "../pages/admin/DesiginationGroup/DesiginationGroupEdit.js";
import Bank from "../pages/admin/Bank/Bank.js";
import BankAdd from "../pages/admin/Bank/BankAdd.js";
import BankEdit from "../pages/admin/Bank/BankEdit.js";
import Component from "../pages/admin/Component/Component.js";
import ComponentAdd from "../pages/admin/Component/ComponentAdd.js";
import ComponentEdit from "../pages/admin/Component/ComponentEdit.js";
import EmployeeEditTab from "../pages/admin/Employee/EmployeeEditTab.js";
import CarrerSetting from "../pages/admin/CarrerSetting/CarrerSetting.js";
import CarrerSettingAdd from "../pages/admin/CarrerSetting/CarrerSettingAdd.js";
import CarrerSettingEdit from "../pages/admin/CarrerSetting/CarrerSettingEdit.js";
import Currency from "../pages/admin/Currency/Currency.js";
import CurrencyAdd from "../pages/admin/Currency/CurrencyAdd.js";
import CurrencyEdit from "../pages/admin/Currency/CurrencyEdit.js";
import HolidaysTab from "../pages/admin/Holidays/HolidaysTab/HolidaysTab.js";
import HolidaysTabAdd from "../pages/admin/Holidays/HolidaysTab/HolidaysTabAdd.js";
import HolidaysTabEdit from "../pages/admin/Holidays/HolidaysTab/HolidaysTabEdit.js";
import HolidayGroupAdd from "../pages/admin/Holidays/HolidayGroup/HolidayGroupAdd.js";
import HolidayGroup from "../pages/admin/Holidays/HolidayGroup/HolidayGroup.js";
import HolidayGroupEdit from "../pages/admin/Holidays/HolidayGroup/HolidayGroupEdit.js";
import AssignHoliday from "../pages/admin/Holidays/AssignHoliday/AssignHoliday.js";
import AdditionalMasterSetup from "../pages/admin/AdditionalMaster/AdditionalMasterSetup.js";
import AllowanceDeduction from "../pages/admin/AllowanceDeductibleSetups/AllowanceDeduction.js";
import PayableDeductible from "../pages/admin/AllowanceDeductibleSetups/PayableDeductible/PayableDeductible.js";
import NonPayableAllowance from "../pages/admin/AllowanceDeductibleSetups/NonPayableAllowance/NonPayableAllowance.js";
import ActiveAndInActive from "../pages/admin/AllowanceDeductibleSetups/ActiveAndInActiveAllowance/ActiveAndInActive.js";
import PayableDeductibleAdd from "../pages/admin/AllowanceDeductibleSetups/PayableDeductible/PayableDeductibleAdd.js";
import PayableDeductibleEdit from "../pages/admin/AllowanceDeductibleSetups/PayableDeductible/PayableDeductibleEdit.js";
import NonPayableAllowanceAdd from "../pages/admin/AllowanceDeductibleSetups/NonPayableAllowance/NonPayableAllowanceAdd.js";
import NonPayableAllowanceEdit from "../pages/admin/AllowanceDeductibleSetups/NonPayableAllowance/NonPayableAllowanceEdit.js";
function Admin({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <div className="d-flex flex-column flex-lg-row bg-surface-secondary">
          <AdminSidebar handleLogout={handleLogout} />
          <div className="flex-grow-1 max-h-screen overflow-y-auto scrollable-container">
            <AdminHeader handleLogout={handleLogout} />
            <main className="pt-3 bg-surface-secondary">
              <div style={{ minHeight: "90vh" }}>
                <ScrollToTop />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<Dashboard />} />
                  <Route
                    path="/employeeBasicDetails"
                    element={<EmployeeBasic />}
                  />
                  <Route
                    path="/employeeBasicDetails/add"
                    element={<EmployeeBasicAdd />}
                  />

                  <Route
                    path="/basicMasterSetup"
                    element={<BasicMasterSetup />}
                  />

                  <Route
                    path="/basicDepartment"
                    element={<BasicDepartment />}
                  />
                  <Route
                    path="/basicDepartment/add"
                    element={<BasicDepartmentAdd />}
                  />
                  <Route
                    path="/basicDepartment/edit/:id"
                    element={<BasicDepartmentEdit />}
                  />

                  <Route
                    path="/basicDesigination"
                    element={<BasicDesigination />}
                  />

                  <Route
                    path="/basicDesigination/add"
                    element={<BasicDesiginationAdd />}
                  />
                  <Route
                    path="/basicDesigination/edit/:id"
                    element={<BasicDesiginationEdit />}
                  />

                  <Route path="/section" element={<Section />} />
                  <Route path="/section/add" element={<SectionAdd />} />
                  <Route path="/section/edit/:id" element={<SectionEdit />} />

                  <Route path="/basicCategory" element={<BasicCategory />} />
                  <Route
                    path="/basicCategory/add"
                    element={<BasicCategoryAdd />}
                  />
                  <Route
                    path="/basicCategory/edit/:id"
                    element={<BasicCategoryEdit />}
                  />

                  <Route
                    path="/desiginationGroup"
                    element={<DesiginationGroup />}
                  />
                  <Route
                    path="/desiginationGroup/add"
                    element={<DesiginationGroupAdd />}
                  />
                  <Route
                    path="/desiginationGroup/edit/:id"
                    element={<DesiginationGroupEdit />}
                  />

                  {/* Additional Master Setup */}
                  <Route path="/additionalMasterSetup" element={<AdditionalMasterSetup />} />

                  {/* Allowances Deduction Setup */} 
                  <Route path="/allowancesDeductionSetup" element={<AllowanceDeduction />} />
                  <Route path="/payableDeductionAllowances" element={<PayableDeductible />} />
                  <Route path="/payableDeductionAllowancesAdd" element={<PayableDeductibleAdd />} />
                  <Route path="/payableDeductionAllowancesEdit" element={<PayableDeductibleEdit />} />

                  <Route path="/nonPayableAllowances" element={<NonPayableAllowance />} />
                  <Route path="/nonPayableAllowancesAdd" element={<NonPayableAllowanceAdd />} />
                  <Route path="/nonPayableAllowancesEdit" element={<NonPayableAllowanceEdit />} />
                  <Route path="/activeAndInAtive" element={<ActiveAndInActive />} />


                  <Route path="/bank" element={<Bank />} />
                  <Route path="/bank/add" element={<BankAdd />} />
                  <Route path="/bank/edit/:id" element={<BankEdit />} />

                  <Route path="/component" element={<Component />} />
                  <Route path="/component/add" element={<ComponentAdd />} />
                  <Route
                    path="/component/edit/:id"
                    element={<ComponentEdit />}
                  />

                  <Route path="/carrerSetting" element={<CarrerSetting />} />
                  <Route
                    path="/carrerSetting/add"
                    element={<CarrerSettingAdd />}
                  />
                  <Route
                    path="/carrerSetting/edit/:id"
                    element={<CarrerSettingEdit />}
                  />

                  <Route path="/currency" element={<Currency />} />
                  <Route path="/currency/add" element={<CurrencyAdd />} />
                  <Route path="/currency/edit/:id" element={<CurrencyEdit />} />

                  <Route path="/holidaysTab" element={<HolidaysTab />} />
                  <Route path="/holidaysTab/add" element={<HolidaysTabAdd />} />
                  <Route
                    path="/holidaysTab/edit/:id"
                    element={<HolidaysTabEdit />}
                  />

                  <Route path="/holidayGroup" element={<HolidayGroup />} />
                  <Route
                    path="/holidayGroup/add"
                    element={<HolidayGroupAdd />}
                  />
                  <Route
                    path="/holidayGroup/edit/:id"
                    element={<HolidayGroupEdit />}
                  />

                  <Route path="/assignHoliday" element={<AssignHoliday />} />

                  {/* Company Registration */}
                  <Route
                    path="/companyRegistration"
                    element={<CompanyRegistration />}
                  />
                  <Route
                    path="/companyRegistration/add"
                    element={<CompanyRegistrationAdd />}
                  />
                  <Route
                    path="/companyRegistration/edit/:id"
                    element={<CompanyRegistrationEdit />}
                  />
                  <Route
                    path="/companyRegistration/view/:id"
                    element={<CompanyRegistrationView />}
                  />

                  {/* Company Compliance */}
                  <Route
                    path="/companyCompliance"
                    element={<CompanyCompliance />}
                  />
                  <Route
                    path="/companyCompliance/add"
                    element={<CompanyComplianceAdd />}
                  />
                  <Route
                    path="/companyCompliance/edit/:id"
                    element={<CompanyComplianceEdit />}
                  />
                  <Route
                    path="/companyCompliance/view/:id"
                    element={<CompanyComplianceView />}
                  />

                  {/* HR policy */}
                  <Route path="/hrpolicy" element={<HrPolicy />} />
                  <Route path="/hrpolicy/add" element={<HrPolicyAdd />} />
                  <Route path="/hrpolicy/edit/:id" element={<HrPolicyEdit />} />
                  <Route path="/hrpolicy/view/:id" element={<HrPolicyView />} />

                  {/* Exit Mangement */}
                  <Route path="/exitmangement" element={<ExitManagement />} />
                  <Route
                    path="/exitmangement/add"
                    element={<ExitManagementAdd />}
                  />
                  <Route
                    path="/exitmangement/edit/:id"
                    element={<ExitManagementEdit />}
                  />
                  <Route
                    path="/exitmangement/view/:id"
                    element={<ExitManagementView />}
                  />

                  {/* {/ Departments /} */}
                  <Route path="/departments" element={<Department />} />
                  <Route path="/departments/add" element={<DepartmentAdd />} />
                  <Route
                    path="/departments/edit/:id"
                    element={<DepartmentEdit />}
                  />
                  <Route
                    path="/departments/view/:id"
                    element={<DepartmentView />}
                  />

                  {/* {/ Employee /} */}
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/employee/add" element={<EmployeeAdminAdd />} />
                  <Route
                    path="/employee/edit/:empId"
                    element={<EmployeeEditTab />}
                  />
                  <Route path="/employee/view/:id" element={<EmployeeView />} />

                  {/* Holiday */}
                  <Route path="/holidays" element={<Holiday />} />
                  <Route path="/holidays/add" element={<HolidayAdd />} />
                  <Route path="/holidays/edit/:id" element={<HolidayEdit />} />
                  <Route path="/holidays/view/:id" element={<HolidayView />} />

                  {/* Claims */}
                  <Route path="/claims" element={<Claims />} />
                  <Route path="/claims/add" element={<ClaimsAdd />} />
                  <Route path="/holidays/edit/:id" element={<HolidayEdit />} />
                  <Route path="/holidays/view/:id" element={<HolidayView />} />

                  {/* Expense */}
                  <Route path="/expense" element={<Expense />} />
                  <Route path="/expense/add" element={<ExpenseAdd />} />
                  <Route path="/expense/edit/:id" element={<ExpenseEdit />} />
                  <Route path="/expense/view/:id" element={<ExpenseView />} />

                  {/* LeaveRequest */}
                  <Route path="/leaverequest" element={<LeaveRequest />} />
                  <Route
                    path="/leaveRequestEmp"
                    element={<LeaveRequestEmp />}
                  />
                  <Route
                    path="/leaverequest/add"
                    element={<LeaveRequestAdd />}
                  />
                  <Route
                    path="/leaverequest/edit/:id"
                    element={<LeaveRequestEdit />}
                  />
                  <Route
                    path="/leaverequest/view/:id"
                    element={<LeaveRequestView />}
                  />

                  {/* Attendance */}
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/attendance/add" element={<AttendanceAdd />} />
                  <Route
                    path="/attendance/edit/:id"
                    element={<AttendanceEdit />}
                  />
                  <Route
                    path="/attendance/view/:id"
                    element={<AttendanceView />}
                  />

                  {/* Deduction */}
                  <Route path="/deduction" element={<Deduction />} />
                  <Route path="/deduction/add" element={<DeductionAdd />} />
                  <Route
                    path="/deduction/edit/:id"
                    element={<DeductionEdit />}
                  />
                  <Route
                    path="/deduction/view/:id"
                    element={<DeductionView />}
                  />

                  {/* Payroll */}
                  <Route path="/payroll" element={<Payroll />} />
                  <Route path="/payroll/add" element={<PayrollAdd />} />
                  <Route path="/payroll/edit/:id" element={<PayrollEdit />} />
                  <Route path="/payroll/view/:id" element={<PayrollView />} />

                  {/* Payslip */}
                  <Route path="/payslip" element={<Payslip />} />

                  {/* Payroll */}
                  <Route path="/roles" element={<Roles />} />
                  <Route path="/roles/add" element={<RolesAdd />} />
                  <Route path="/roles/edit/:id" element={<RolesEdit />} />
                  <Route path="/roles/view/:id" element={<RolesView />} />

                  {/* Designation  */}
                  <Route path="/designation" element={<Designation />} />
                  <Route path="/designation/add" element={<DesignationAdd />} />
                  <Route
                    path="/designation/edit/:id"
                    element={<DesignationEdit />}
                  />
                  <Route
                    path="/designation/view/:id"
                    element={<DesignationView />}
                  />

                  <Route
                    path="/registrationcompany/edit/:id"
                    element={<RegistrationCompany />}
                  />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Admin;
