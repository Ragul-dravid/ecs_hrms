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
import EmployeeEdit from "../pages/admin/Employee/EmployeeEdit.js";
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


function Admin({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <div className="d-flex flex-column flex-lg-row bg-surface-secondary">
          <AdminSidebar handleLogout={handleLogout} />
          <div className="flex-grow-1 h-screen overflow-y-auto">
            <AdminHeader handleLogout={handleLogout} />
            <main className="pt-3 bg-surface-secondary">
              <div style={{ minHeight: "90vh" }}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />

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

                  {/* Company Registration */}
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

                  <Route path="/hrpolicy" element={<HrPolicy />} />
                  <Route path="/hrpolicy/add" element={<HrPolicyAdd />} />
                  <Route path="/hrpolicy/edit/:id" element={<HrPolicyEdit />} />
                  <Route path="/hrpolicy/view/:id" element={<HrPolicyView />} />

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
                  <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
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

                  { /* Deduction */}
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

                   {/* Holiday */}
                  <Route path="/payroll" element={<Payroll />} />
                  <Route path="/payroll/add" element={<PayrollAdd />} />
                  <Route path="/payroll/edit/:id" element={<PayrollEdit />} />
                  <Route path="/payroll/view/:id" element={<PayrollView />} />
                  
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
