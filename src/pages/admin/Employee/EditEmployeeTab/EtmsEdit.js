import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

function EtmsEdit() {

    const [rows, setRows] = useState([{}]);

    const validationSchema = Yup.object({
        otType: Yup.string().required("OT Type is required"),
        workingHour: Yup.string().required("Working Hours is required"),
        schedule: Yup.string().required("The 3 settings here optional. You can only choose 1out of the 3 setting if it is afflicatable to the staff."),
    });

    const formik = useFormik({
        initialValues: {
            otType: "",
            flatHour: "",
            branch: "",
            workingHour: "",
            restDay: "",
            dutyRoster: "",
            schedule: "",
            autoShift: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Form Values:", values);
        },
    });

    return (
        <div className="container-fluid p-0">
            <form onSubmit={formik.handleSubmit}>
                <div className="row my-2">
                    <label className="form-label fw-semibold">
                        OT/Branch Details
                    </label>
                </div>
                <div className=" border-0 mb-5">
                    <div className="container p-0">
                        <div className="row mt-3">
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    OT Type <span className="text-danger">*</span>
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("otType")}
                                        className={`form-select form-select-sm  ${formik.touched.otType && formik.errors.otType
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.otType && formik.errors.otType && (
                                        <div className="invalid-feedback">
                                            {formik.errors.otType}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3 ">
                                <div className="mb-2">
                                    <label className="form-label">
                                        Flat/Hourly
                                    </label>
                                    <input
                                        type="text"
                                        name="flatHour"
                                        className={`form-control form-control-sm  ${formik.touched.flatHour && formik.errors.flatHour
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("flatHour")}
                                    />
                                    {formik.touched.flatHour && formik.errors.flatHour && (
                                        <div className="invalid-feedback">
                                            {formik.errors.flatHour}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    Branch
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("branch")}
                                        className={`form-select form-select-sm  ${formik.touched.branch && formik.errors.branch
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.branch && formik.errors.branch && (
                                        <div className="invalid-feedback">
                                            {formik.errors.branch}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="row my-2">
                                <label className="form-label fw-semibold">
                                    Shift Details
                                </label>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    Working Hours/Shift <span className="text-danger">*</span>
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("workingHour")}
                                        className={`form-select form-select-sm  ${formik.touched.workingHour && formik.errors.workingHour
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.workingHour && formik.errors.workingHour && (
                                        <div className="invalid-feedback">
                                            {formik.errors.workingHour}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <label className="form-label">
                                    Rest Day <span className="text-danger">*</span>
                                </label>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("restDay")}
                                        className={`form-select form-select-sm  ${formik.touched.restDay && formik.errors.restDay
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.restDay && formik.errors.restDay && (
                                        <div className="invalid-feedback">
                                            {formik.errors.restDay}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3 ">
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="1">
                                    </input>
                                    <label class="form-check-label">
                                        Duty Roster/Group
                                    </label>
                                </div>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("dutyRoster")}
                                        className={`form-select form-select-sm  ${formik.touched.dutyRoster && formik.errors.dutyRoster
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.dutyRoster && formik.errors.dutyRoster && (
                                        <div className="invalid-feedback">
                                            {formik.errors.dutyRoster}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="2">
                                    </input>
                                    <label class="form-check-label">
                                        Schedule
                                    </label>
                                </div>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("schedule")}
                                        className={`form-select form-select-sm  ${formik.touched.schedule && formik.errors.schedule
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.schedule && formik.errors.schedule && (
                                        <div className="invalid-feedback">
                                            {formik.errors.schedule}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="3">
                                    </input>
                                    <label class="form-check-label">
                                        Auto Shift
                                    </label>
                                </div>
                                <div className="input-group mb-3">
                                    <select
                                        {...formik.getFieldProps("autoShift")}
                                        className={`form-select form-select-sm  ${formik.touched.autoShift && formik.errors.autoShift
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        <option value="None">None</option>
                                        <option value="One">One</option>
                                    </select>
                                    {formik.touched.autoShift && formik.errors.autoShift && (
                                        <div className="invalid-feedback">
                                            {formik.errors.autoShift}
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

export default EtmsEdit;
