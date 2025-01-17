import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

const BasicDetailsEdit = forwardRef(
    ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
        const cmpId = sessionStorage.getItem("cmpId");
        console.log("FormData:", formData);
        const roleName = sessionStorage.getItem("role");
        console.log("object", formData?.empId);
        const [rows, setRows] = useState([{}]);

        const ChildrenSchema = Yup.object({
            rows: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().required("Name is required"),
                    dob: Yup.date().required("Date of Birth is required"),
                    gender: Yup.string().required("Gender is required"),
                    certNumber: Yup.string().required("Birth Certificate Number is required"),
                    isCitizen: Yup.string().required("Citizen status is required"),
                })
            ),
        });

        const validationSchema = Yup.object({
            employeeCode: Yup.string().required("*Employee Code is required"),
            employeeName: Yup.string().required("*Employee Name is required"),
            email: Yup.string()
                .email("*Enter a valid email")
                .required("*Email is required"),
            childrenDetails: Yup.array()
                .of(ChildrenSchema)
                .required("Invoice items are required"),
        });

        const formik = useFormik({
            initialValues: {
                empRegCmpId: cmpId,
                firstName: formData?.firstName || "",
                lastName: formData?.lastName || "",
                empPriPhNumber: formData?.empPriPhNumber || "",
                email: formData?.email || "",
                basicSalary: formData?.basicSalary || "",
                workingType: formData?.workingType || "",
                // password: formData?.password || "",
                NRICFin: formData?.NRICFin || "",
                nationality: formData?.nationality || "",
                citizenship: formData?.citizenship || "",
                NRICType: formData?.NRICType || "",
                aadharNumber: formData?.aadharNumber || "",
                empRegDeptId: formData?.empRegDeptId || "",
                empDesignation: formData?.empDesignation || "",
                proof: formData?.proof || "",
                empDateOfJoin: formData?.empDateOfJoin || "",
                empType: formData?.empType || "",
                noticePeriod: formData?.noticePeriod || "",
                repManagerName: formData?.repManagerName || "",
                roleName: formData?.roleName || "",
                pan: formData?.pan || "",
                childrenDetails: [
                    {
                        id: "",
                        name: "",
                        dob: "",
                        gender: "",
                        certNumber: "",
                        Citizen: "",
                    },
                ],
            },
            validationSchema: validationSchema,
            onSubmit: async (values) => {
                console.log("values", values)
            },
        });

        useImperativeHandle(ref, () => ({
            personalInfo: formik.handleSubmit,
        }));

        const handleAddRow = () => {
            const newItem = {
                id: null,
                name: "",
                dob: "",
                gender: "",
                certNumber: "",
                Citizen: "",
            };
            setRows([...rows, newItem]);
            formik.setFieldValue("childrenDetails", [
                ...formik.values.childrenDetails,
                newItem,
            ]);
        };

        const handleRowDelete = (index) => {
            const selectedItem = formik.values.childrenDetails[index];

            if (!selectedItem || !selectedItem.item) {
                const updatedChildrenDetails = formik.values.childrenDetails.filter(
                    (_, i) => i !== index
                );
                setRows(updatedChildrenDetails);
                formik.setFieldValue("childrenDetails", updatedChildrenDetails);
                return;
            }
            // Database data
        };

        return (
            <div className="container-fluid p-0">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row my-2">
                        <p className="headColor">BASIC DETAILS</p>
                    </div>
                    <div className=" border-0 mb-5">
                        <div className="container p-0">
                            <div className="row mt-3">
                                <div className="col-md-4 col-12 mb-3">
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Employee code<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="employeeCode"
                                            className={`form-control form-control-sm  ${formik.touched.employeeCode && formik.errors.employeeCode
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("employeeCode")}
                                        />
                                        {formik.touched.employeeCode && formik.errors.employeeCode && (
                                            <div className="invalid-feedback">
                                                {formik.errors.employeeCode}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Employee Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="employeeName"
                                            className={`form-control form-control-sm  ${formik.touched.employeeName && formik.errors.employeeName
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("employeeName")}
                                        />
                                        {formik.touched.employeeName && formik.errors.employeeName && (
                                            <div className="invalid-feedback">
                                                {formik.errors.employeeName}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3">
                                    <label className="form-label">
                                        Gender<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        name="gender"
                                        className={`form-select form-select-sm ${formik.touched.gender && formik.errors.gender
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={formik.values.gender}
                                    >
                                        <option selected></option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                    {formik.touched.gender && formik.errors.gender && (
                                        <div className="invalid-feedback">
                                            {formik.errors.gender}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Marital Status<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="maritalStatus"
                                            className={`form-control form-control-sm  ${formik.touched.maritalStatus &&
                                                formik.errors.maritalStatus
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("maritalStatus")}
                                        />
                                        {formik.touched.maritalStatus &&
                                            formik.errors.maritalStatus && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.maritalStatus}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Email Address
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            className={`form-control form-control-sm ${formik.touched.email && formik.errors.email
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("email")}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="invalid-feedback">
                                                {formik.errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Mobile Number
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="mobileNumber"
                                            className={`form-control form-control-sm ${formik.touched.mobileNumber && formik.errors.mobileNumber
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("mobileNumber")}
                                        />
                                        {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                                            <div className="invalid-feedback">
                                                {formik.errors.mobileNumber}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Join Date<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="joinDate"
                                            className={`form-control form-control-sm ${formik.touched.joinDate && formik.errors.joinDate
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("joinDate")}
                                        />
                                        {formik.touched.joinDate && formik.errors.joinDate && (
                                            <div className="invalid-feedback">{formik.errors.joinDate}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Confirmation Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="Date"
                                            name="confirmationDate"
                                            className={`form-control form-control-sm ${formik.touched.confirmationDate && formik.errors.confirmationDate
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("confirmationDate")}
                                        />
                                        {formik.touched.confirmationDate && formik.errors.confirmationDate && (
                                            <div className="invalid-feedback">{formik.errors.confirmationDate}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Probation(Months)
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="probation"
                                            className={`form-control form-control-sm ${formik.touched.probation && formik.errors.probation
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("probation")}
                                        />
                                        {formik.touched.probation && formik.errors.probation && (
                                            <div className="invalid-feedback">
                                                {formik.errors.probation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Fingerprint/Face ID
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fingerprint"
                                            className={`form-control form-control-sm ${formik.touched.fingerprint && formik.errors.fingerprint
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("fingerprint")}
                                        />
                                        {formik.touched.fingerprint && formik.errors.fingerprint && (
                                            <div className="invalid-feedback">
                                                {formik.errors.fingerprint}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Leave Calculation Date
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="leaveCalculate"
                                            className={`form-control form-control-sm ${formik.touched.leaveCalculate && formik.errors.leaveCalculate
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("leaveCalculate")}
                                        />
                                        {formik.touched.leaveCalculate &&
                                            formik.errors.leaveCalculate && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.leaveCalculate}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Resignation Date
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="resignationDate"
                                            className={`form-control form-control-sm ${formik.touched.resignationDate && formik.errors.resignationDate
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("resignationDate")}
                                        />
                                        {formik.touched.resignationDate && formik.errors.resignationDate && (
                                            <div className="invalid-feedback">
                                                {formik.errors.resignationDate}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-2">
                                    <label className="form-label">
                                        Resignation Reason<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            {...formik.getFieldProps("resignationReason")}
                                            className={`form-select form-select-sm  ${formik.touched.resignationReason && formik.errors.resignationReason
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        >
                                            <option selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="2">2</option>
                                        </select>
                                        {formik.touched.resignationReason && formik.errors.resignationReason && (
                                            <div className="invalid-feedback">
                                                {formik.errors.resignationReason}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-2">
                                    <label className="form-label">
                                        Department<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            {...formik.getFieldProps("department")}
                                            className={`form-select form-select-sm  ${formik.touched.department && formik.errors.department
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        >
                                            <option selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="2">2</option>
                                        </select>
                                        {formik.touched.department && formik.errors.department && (
                                            <div className="invalid-feedback">
                                                {formik.errors.department}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-2">
                                    <label className="form-label">
                                        Section<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            {...formik.getFieldProps("section")}
                                            className={`form-select form-select-sm  ${formik.touched.section && formik.errors.section
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        >
                                            <option selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="2">2</option>
                                        </select>
                                        {formik.touched.section && formik.errors.section && (
                                            <div className="invalid-feedback">
                                                {formik.errors.section}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-2">
                                    <label className="form-label">
                                        Designation<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            {...formik.getFieldProps("designation")}
                                            className={`form-select form-select-sm  ${formik.touched.designation && formik.errors.designation
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        >
                                            <option selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="2">2</option>
                                        </select>
                                        {formik.touched.designation && formik.errors.designation && (
                                            <div className="invalid-feedback">
                                                {formik.errors.designation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-2">
                                    <label className="form-label">
                                        Extra Classification<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            {...formik.getFieldProps("extraClassification")}
                                            className={`form-select form-select-sm  ${formik.touched.extraClassification && formik.errors.extraClassification
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        >
                                            <option selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="2">2</option>
                                        </select>
                                        {formik.touched.extraClassification && formik.errors.extraClassification && (
                                            <div className="invalid-feedback">
                                                {formik.errors.extraClassification}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-2">
                                    <label className="form-label">
                                        Holiday Group<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            {...formik.getFieldProps("holidayGroup")}
                                            className={`form-select form-select-sm  ${formik.touched.holidayGroup && formik.errors.holidayGroup
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        >
                                            <option selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="2">2</option>
                                        </select>
                                        {formik.touched.holidayGroup && formik.errors.holidayGroup && (
                                            <div className="invalid-feedback">
                                                {formik.errors.holidayGroup}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Hours Worked /Day
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="hoursWorkedDay"
                                            className={`form-control form-control-sm ${formik.touched.hoursWorkedDay && formik.errors.hoursWorkedDay
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("hoursWorkedDay")}
                                        />
                                        {formik.touched.hoursWorkedDay && formik.errors.hoursWorkedDay && (
                                            <div className="invalid-feedback">
                                                {formik.errors.hoursWorkedDay}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Days Worked /Week
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="daysWorkedWeek"
                                            className={`form-control form-control-sm ${formik.touched.daysWorkedWeek && formik.errors.daysWorkedWeek
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("daysWorkedWeek")}
                                        />
                                        {formik.touched.daysWorkedWeek && formik.errors.daysWorkedWeek && (
                                            <div className="invalid-feedback">
                                                {formik.errors.daysWorkedWeek}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-3 ">
                                    <div className="mb-2">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Days Worked Per Year
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="daysWorkedYear"
                                            className={`form-control form-control-sm ${formik.touched.daysWorkedYear && formik.errors.daysWorkedYear
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("daysWorkedYear")}
                                        />
                                        {formik.touched.daysWorkedYear && formik.errors.daysWorkedYear && (
                                            <div className="invalid-feedback">
                                                {formik.errors.daysWorkedYear}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-2">
                                    <label className="form-label">
                                        Part Time /Flexi<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            {...formik.getFieldProps("partTime")}
                                            className={`form-select form-select-sm  ${formik.touched.partTime && formik.errors.partTime
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        >
                                            <option selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="2">2</option>
                                        </select>
                                        {formik.touched.partTime && formik.errors.partTime && (
                                            <div className="invalid-feedback">
                                                {formik.errors.partTime}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-2">
                                    <label className="form-label">
                                        Category<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            {...formik.getFieldProps("category")}
                                            className={`form-select form-select-sm  ${formik.touched.category && formik.errors.category
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        >
                                            <option selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="2">2</option>
                                        </select>
                                        {formik.touched.category && formik.errors.category && (
                                            <div className="invalid-feedback">
                                                {formik.errors.category}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 mb-2">
                                    <label className="form-label">
                                        Leave Category<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            {...formik.getFieldProps("leaveCategory")}
                                            className={`form-select form-select-sm  ${formik.touched.leaveCategory && formik.errors.leaveCategory
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        >
                                            <option selected></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="2">2</option>
                                        </select>
                                        {formik.touched.leaveCategory && formik.errors.leaveCategory && (
                                            <div className="invalid-feedback">
                                                {formik.errors.leaveCategory}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <p className="headColor">CHILDREN  DETAILS</p>
                                </div>
                                <div className="row mt-5 pt-5 flex-nowrap">
                                    <div className="col-12">
                                        <div className="table-responsive table-bordered">
                                            <table className="table table-light table-nowrap">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>
                                                            Name<span className="text-danger">*</span>
                                                        </th>
                                                        <th>
                                                            Date of Birth
                                                            <span className="text-danger">*</span>
                                                        </th>
                                                        <th className="w-40">
                                                            Gender
                                                            <span className="text-danger">*</span>
                                                        </th>
                                                        <th>
                                                            Birth Certificate Number
                                                            <span className="text-danger">*</span>
                                                        </th>
                                                        <th>
                                                            Singapore Citizen
                                                            <span className="text-danger">*</span>
                                                        </th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rows.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <input
                                                                    {...formik.getFieldProps(`childrenDetails[${index}].name`)}
                                                                    className={`form-control ${formik.touched.childrenDetails?.[index]?.name &&
                                                                        formik.errors.childrenDetails?.[index]?.name
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}
                                                                    type="text"
                                                                    style={{
                                                                        width: "100%",
                                                                    }}
                                                                />
                                                                {formik.touched.childrenDetails?.[index]?.name &&
                                                                    formik.errors.childrenDetails?.[index]?.name && (
                                                                        <div className="invalid-feedback">
                                                                            {formik.errors.childrenDetails[index].name}
                                                                        </div>
                                                                    )}
                                                            </td>
                                                            <td>
                                                                <input
                                                                    {...formik.getFieldProps(`childrenDetails[${index}].dob`)}
                                                                    className={`form-control ${formik.touched.childrenDetails?.[index]?.dob &&
                                                                        formik.errors.childrenDetails?.[index]?.dob
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}
                                                                    type="text"
                                                                    min={0}
                                                                    style={{
                                                                        width: "80%",
                                                                    }}
                                                                    onChange={formik.handleChange}
                                                                />
                                                                {formik.touched.childrenDetails?.[index]?.dob &&
                                                                    formik.errors.childrenDetails?.[index]?.dob && (
                                                                        <div className="invalid-feedback">
                                                                            {formik.errors.childrenDetails[index].dob}
                                                                        </div>
                                                                    )}
                                                            </td>
                                                            <td>
                                                                <select
                                                                    className={`form-select ${formik.touched.childrenDetails?.[index]?.gender &&
                                                                        formik.errors.childrenDetails?.[index]?.gender
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}
                                                                    {...formik.getFieldProps(`childrenDetails[${index}].gender`)}
                                                                    style={{
                                                                        width: "80%",
                                                                    }}
                                                                >
                                                                    <option selected></option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                </select>
                                                                {formik.touched.childrenDetails?.[index]?.gender &&
                                                                    formik.errors.childrenDetails?.[index]?.gender && (
                                                                        <div className="invalid-feedback">
                                                                            {formik.errors.childrenDetails[index].gender}
                                                                        </div>
                                                                    )}
                                                            </td>
                                                            <td>
                                                                <input
                                                                    {...formik.getFieldProps(`childrenDetails[${index}].certNumber`)}
                                                                    className={`form-control ${formik.touched.childrenDetails?.[index]?.certNumber &&
                                                                        formik.errors.childrenDetails?.[index]?.certNumber
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}
                                                                    type="text"
                                                                    style={{
                                                                        width: "100%",
                                                                    }}
                                                                />
                                                                {formik.touched.childrenDetails?.[index]?.certNumber &&
                                                                    formik.errors.childrenDetails?.[index]?.certNumber && (
                                                                        <div className="invalid-feedback">
                                                                            {formik.errors.childrenDetails[index].certNumber}
                                                                        </div>
                                                                    )}
                                                            </td>
                                                            <td>
                                                                <select
                                                                    className={`form-select ${formik.touched.childrenDetails?.[index]?.citizenship &&
                                                                        formik.errors.childrenDetails?.[index]?.citizenship
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}
                                                                    {...formik.getFieldProps(`childrenDetails[${index}].citizenship`)}
                                                                    style={{
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <option selected></option>
                                                                    <option value="YES">Yes</option>
                                                                    <option value="NO">No</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-white border-white"
                                                                    onClick={() => handleRowDelete(index)}
                                                                >
                                                                    <ImCancelCircle className="fs-6 fw-medium text-danger" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 text-end mt-3">
                                    <button
                                        className="btn btn-sm text-white"
                                        type="button"
                                        style={{
                                            fontWeight: "600px !important",
                                            background: "#eb862a",
                                        }}
                                        onClick={handleAddRow}
                                    >
                                        Add Row
                                    </button>
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
        );
    }
);

export default BasicDetailsEdit;
