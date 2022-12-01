import styles from "../Styles/styles";
import React from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";
import StockDataService from "../services/StockServices";
import Helmet from "../components/Helmet/Helmet";
import "@progress/kendo-theme-default/dist/all.css";

const StockList = ({ getStockId }) => {
  const [Stock, setStocks] = useState([]);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const data = await StockDataService.getAllStocks();
    console.log(data.docs);
    setStocks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //DELETE Stock
  const deleteHandler = async (id) => {
    await StockDataService.deleteStock(id);
    getStock();
  };

  //NAVIGATE to stock form
  const navigate = useNavigate();
  const navigateStockForm = () => {
    navigate("/stockform");
  };

  const navigateReport = () => {
    navigate("/stockreport");
  };

  //SEARCH BAR
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/stocksearch? product_name=${search}`);
    setSearch("");
  };

  return (
    <Helmet title="Stock List">
      <form onSubmit={handleSubmit} className="SL-log">
        <input
          type="text"
          id="search"
          placeholder="Search Stock"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </form>
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 SL-bg-table rounded-md SL-log`}
      >
        <div>
          <button className={`${styles.ADbtn}`} onClick={navigateStockForm}>
            Add New Stock
          </button>
          <button className={`${styles.ADbtn}`} onClick={navigateReport}>
            Genarate A Report
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
              <th className={`${styles.SLtd}`}>Action</th>
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
                  <td>
                    <button className={`${styles.SLbtn}`}>
                      <Link to={`stockupdateform/${doc.id}`}>Edit</Link>
                    </button>

                    <button
                      className={`${styles.SLbtn}`}
                      onClick={(e) => deleteHandler(doc.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Helmet>
  );
};
export default StockList;
