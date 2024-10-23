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
import EmployeeAdd from "../pages/admin/Employee/EmployeeAdd";
import EmployeeEdit from "../pages/admin/Employee/EmployeeEdit";
import EmployeeView from "../pages/admin/Employee/EmployeeView";

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
                  <Route path="/" element={<Dashboard />} />

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
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/employee/add" element={<EmployeeAdd />} />
                  <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
                  <Route path="/employee/view/:id" element={<EmployeeView />} />
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
