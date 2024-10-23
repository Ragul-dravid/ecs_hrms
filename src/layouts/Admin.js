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
                  <Route path="/companyRegistration" element={<CompanyRegistration />} />
                  <Route path="/companyRegistration/add" element={<CompanyRegistrationAdd />} />
                  <Route path="/companyRegistration/edit/:id" element={<CompanyRegistrationEdit />} />
                  <Route path="/companyRegistration/view/:id" element={<CompanyRegistrationView />} />

                  {/* Company Registration */}
                  <Route path="/companyCompliance" element={<CompanyCompliance />} />
                  <Route path="/companyCompliance/add" element={<CompanyComplianceAdd />} />
                  <Route path="/companyCompliance/edit/:id" element={<CompanyComplianceEdit />} />
                  <Route path="/companyCompliance/view/:id" element={<CompanyComplianceView />} />

                  
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
