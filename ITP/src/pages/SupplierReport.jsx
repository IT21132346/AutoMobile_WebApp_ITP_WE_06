import React from "react";
import styles from "../Styles/styles";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";
import SupplierDataService from "../services/supplier.services";
import Helmet from "../components/Helmet/Helmet";
import "@progress/kendo-theme-default/dist/all.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const SupplierReport = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    const data = await SupplierDataService.getAllSuppliers();
    console.log(data.docs);
    setSuppliers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  //REPORT GENARATING PURPOSE
  const handleExportWithComponent = (e) => {
    pdfExportComponent.current.save();
  };
  const pdfExportComponent = useRef(null);

  return (
    <div>
      <PDFExport ref={pdfExportComponent} paperSize="A1">
        <div
          className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 SL-bg-table rounded-md SL-log`}
        >
          <div>
            <button
              className={`${styles.ADbtn}`}
              onClick={handleExportWithComponent}
            >
              Take a Snapshot
            </button>
          </div>

          <table className={`${styles.SLtable}`}>
            <thead className={`${styles.SLthead}`}>
              <tr>
                <th className={`${styles.SLtd}`}>ID</th>
                <th className={`${styles.SLtd}`}>Name</th>
                <th className={`${styles.SLtd}`}>Country</th>
                <th className={`${styles.SLtd}`}>Address</th>
                <th className={`${styles.SLtd}`}>Postal Code</th>
                <th className={`${styles.SLtd}`}>Email</th>
                <th className={`${styles.SLtd}`}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td className={`${styles.SLtd}`}>{index + 1}</td>
                    <td className={`${styles.SLtd}`}>{doc.sName} </td>
                    <td className={`${styles.SLtd}`}>{doc.country}</td>
                    <td className={`${styles.SLtd}`}>{doc.sAddress}</td>
                    <td className={`${styles.SLtd}`}>{doc.spc}</td>
                    <td className={`${styles.SLtd}`}>{doc.sEmail}</td>
                    <td className={`${styles.SLtd}`}>{doc.sPhone}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PDFExport>
    </div>
  );
};

export default SupplierReport;
