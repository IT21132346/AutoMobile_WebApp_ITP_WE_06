import styles from "../Styles/styles";
import React from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";
import EmployeeDataService from "../services/employee.services";
import Helmet from "../components/Helmet/Helmet";
import "@progress/kendo-theme-default/dist/all.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const EmployeeReport = ({ getEmployeeId }) => {
  const [Employee, setEmployee] = useState([]);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    const data = await EmployeeDataService.getAllEmployee();
    console.log(data.docs);
    setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //REPORT GENARATING PURPOSE
  const handleExportWithComponent = (e) => {
    pdfExportComponent.current.save();
  };
  const pdfExportComponent = useRef(null);

  return (
    <Helmet title="Employee List">
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 SL-bg-table rounded-md SL-log`}
      >
        <div class="text-center grid grid-cols-1 gap-5 content-center ...">
          <button
            className={`${styles.ALbtn}`}
            onClick={handleExportWithComponent}
          >
            Download Report
          </button>
        </div>
        <PDFExport ref={pdfExportComponent} paperSize="A3">
          <div className="sonali-form">
            <table className={`${styles.SLtable}`}>
              <thead>
                <tr>
                  <th className={`${styles.SLtd}`}>ID</th>
                  <th className={`${styles.SLtd}`}>First Name</th>
                  <th className={`${styles.SLtd}`}>Last Name</th>
                  <th className={`${styles.SLtd}`}>city</th>
                  <th className={`${styles.SLtd}`}>Position</th>
                  <th className={`${styles.SLtd}`}>Salary</th>
                  <th className={`${styles.SLtd}`}>mobile Number</th>
                </tr>
                <br></br>
              </thead>

              <tbody>
                {Employee.map((doc, index) => {
                  return (
                    <tr key={doc.id}>
                      <td className={`${styles.ALtd}`}>{index + 1}</td>
                      <td className={`${styles.ALtd}`}>{doc.firstName}</td>
                      <td className={`${styles.ALtd}`}>{doc.lastName}</td>
                      <td className={`${styles.ALtd}`}>{doc.cityName}</td>
                      <td className={`${styles.ALtd}`}>{doc.position}</td>
                      <td className={`${styles.ALtd}`}>{doc.salary}</td>
                      <td className={`${styles.ALtd}`}>{doc.mNumber}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </PDFExport>
      </div>
    </Helmet>
  );
};
export default EmployeeReport;
