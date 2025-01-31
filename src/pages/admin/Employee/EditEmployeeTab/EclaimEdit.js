import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function EclaimEdit() {

    const validationSchema = Yup.object({
        claimDateRange: Yup.string().required("Claim Date Range is required"),
        claimLimit: Yup.string().required("Claim Limit is required"),
        final: Yup.string().required("Final is required"),
    });

    const formik = useFormik({
        initialValues: {
            claimDateRange: "",
            claimLimit: "",
            final: "",
            second: "",
            first: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("E-CLAIM:", values);
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
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    Claim Date Range<span className="text-danger">*</span>
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("claimDateRange")}
                                        className={`form-select form-select-sm  ${formik.touched.claimDateRange && formik.errors.claimDateRange
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.claimDateRange && formik.errors.claimDateRange && (
                                        <div className="invalid-feedback">
                                            {formik.errors.claimDateRange}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    Claim Limit <span className="text-danger">*</span>
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("claimLimit")}
                                        className={`form-select form-select-sm  ${formik.touched.claimLimit && formik.errors.claimLimit
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.claimLimit && formik.errors.claimLimit && (
                                        <div className="invalid-feedback">
                                            {formik.errors.claimLimit}
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

export default EclaimEdit;
