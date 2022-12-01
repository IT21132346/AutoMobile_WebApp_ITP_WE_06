import React from "react";
import styles from "../Styles/styles";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";
import StockDataService from "../services/StockServices";
import Helmet from "../components/Helmet/Helmet";
import "@progress/kendo-theme-default/dist/all.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const StockReport = () => {
  const [Stock, setStocks] = useState([]);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const data = await StockDataService.getAllStocks();
    console.log(data.docs);
    setStocks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
                <th className={`${styles.SLtd}`}>Product Name</th>
                <th className={`${styles.SLtd}`}>Brand Name</th>
                <th className={`${styles.SLtd}`}>Product Supplier</th>
                <th className={`${styles.SLtd}`}>Phone</th>
                <th className={`${styles.SLtd}`}>Quantity</th>
                <th className={`${styles.SLtd}`}>Unit Price</th>
                <th className={`${styles.SLtd}`}>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {Stock.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td className={`${styles.SLtd}`}>{index + 1}</td>
                    <td className={`${styles.SLtd}`}>{doc.product} </td>
                    <td className={`${styles.SLtd}`}>{doc.brand}</td>
                    <td className={`${styles.SLtd}`}>{doc.supplier}</td>
                    <td className={`${styles.SLtd}`}>{doc.phone}</td>
                    <td className={`${styles.SLtd}`}>{doc.quantity}</td>
                    <td className={`${styles.SLtd}`}>{doc.price}</td>
                    <td className={`${styles.SLtd}`}>{doc.total} </td>
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

export default StockReport;
