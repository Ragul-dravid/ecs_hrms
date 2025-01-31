import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AlternateEmail } from "@mui/icons-material";

function EleaveEdit() {

    const validationSchema = Yup.object({
        excludeDays: Yup.string().required("Exclude Days is required"),
        final: Yup.string().required("Final is required"),
    });

    const formik = useFormik({
        initialValues: {
            shortNmae: "",
            replaceStaff: "",
            excludeDays: "",
            homePhone: "",
            alternateEmail: "",
            final: "",
            second: "",
            first: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("E-LEAVE:", values);
        },
    });

    return (
        <div className="container-fluid p-0">
            <form onSubmit={formik.handleSubmit}>
                <div className="row my-2">
                    <label className="form-label fw-semibold">
                        Basic Details
                    </label>
                </div>
                <div className=" border-0 mb-5">
                    <div className="container p-0">
                        <div className="row mt-3">
                            <div className="col-md-4 col-12 mb-3 ">
                                <div className="mb-2">
                                    <label className="form-label">
                                        Short Name
                                    </label>
                                    <input
                                        type="text"
                                        name="shortNmae"
                                        className={`form-control form-control-sm  ${formik.touched.shortNmae && formik.errors.shortNmae
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("shortNmae")}
                                    />
                                    {formik.touched.shortNmae && formik.errors.shortNmae && (
                                        <div className="invalid-feedback">
                                            {formik.errors.shortNmae}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    Default Replacement Staff
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("replaceStaff")}
                                        className={`form-select form-select-sm  ${formik.touched.replaceStaff && formik.errors.replaceStaff
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.replaceStaff && formik.errors.replaceStaff && (
                                        <div className="invalid-feedback">
                                            {formik.errors.replaceStaff}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    Exclude Days <span className="text-danger">*</span>
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("excludeDays")}
                                        className={`form-select form-select-sm  ${formik.touched.excludeDays && formik.errors.excludeDays
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.excludeDays && formik.errors.excludeDays && (
                                        <div className="invalid-feedback">
                                            {formik.errors.excludeDays}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3 ">
                                <div className="mb-2">
                                    <label className="form-label">
                                        Home Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="homePhone"
                                        className={`form-control form-control-sm  ${formik.touched.homePhone && formik.errors.homePhone
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("homePhone")}
                                    />
                                    {formik.touched.homePhone && formik.errors.homePhone && (
                                        <div className="invalid-feedback">
                                            {formik.errors.homePhone}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3 ">
                                <div className="mb-2">
                                    <label className="form-label">
                                        Alternate Email
                                    </label>
                                    <input
                                        type="text"
                                        name="alternateEmail"
                                        className={`form-control form-control-sm  ${formik.touched.alternateEmail && formik.errors.alternateEmail
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("alternateEmail")}
                                    />
                                    {formik.touched.alternateEmail && formik.errors.alternateEmail && (
                                        <div className="invalid-feedback">
                                            {formik.errors.alternateEmail}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="row my-2">
                                <label className="form-label fw-semibold">
                                    Approver Details
                                </label>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    Final <span className="text-danger">*</span>
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("final")}
                                        className={`form-select form-select-sm  ${formik.touched.final && formik.errors.final
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.final && formik.errors.final && (
                                        <div className="invalid-feedback">
                                            {formik.errors.final}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    Second
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("second")}
                                        className={`form-select form-select-sm  ${formik.touched.second && formik.errors.second
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.second && formik.errors.second && (
                                        <div className="invalid-feedback">
                                            {formik.errors.second}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    First
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("first")}
                                        className={`form-select form-select-sm  ${formik.touched.first && formik.errors.first
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.first && formik.errors.first && (
                                        <div className="invalid-feedback">
                                            {formik.errors.first}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid p-3 d-flex align-items-center justify-content-center">
                    <Link to="/employeeBasicDetails">
                        <button
                            className="btn btn-sm btn-light"
                            style={{ padding: "7px" }}
                        >
                            Back
                        </button>
                    </Link>
                    <div style={{ flex: "1 1 auto" }}></div>

                    <button
                        type="submit"
                        className="btn btn-sm btn-buttonm btn-primary"
                        style={{ padding: "7px" }}
                    // disabled={loadIndicator}
                    >
                        {/* {loadIndicator && (
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    aria-hidden="true"
                                ></span>
                            )} */}
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EleaveEdit;
