import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { async } from "@firebase/util";
import StockDataService from "../services/StockServices";
import styles from "../Styles/styles";
import Helmet from "../components/Helmet/Helmet";

const StockForm = () => {
  // const { stockID } = useParams();

  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [supplier, setSupplier] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const total = quantity * price;
  const [message, setMessage] = useState({ error: false, msg: " " });

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    const newStock = {
      product,
      brand,
      supplier,
      phone,
      quantity,
      price,
      total,
    };
    console.log(newStock);
    try {
      await StockDataService.addStock(newStock);
      alert("New Stock Added Successfully!");
      navigate("/stocklist");
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
    setProduct("");
    setBrand("");
    setSupplier("");
    setPhone("");
    setQuantity("");
    setPrice("");
  };

  const navigate = useNavigate();
  const navigateStockList = () => {
    navigate("/stocklist");
  };

  return (
    <Helmet title="Update Form">
      <div>
        <div className="SL-log">
          <h3 className="text-lg font-medium text-white">Stock Update Log</h3>
          <p className="text-sm text-dimWhite">
            Update your Stock Details Here.
            <br />
            make sure to add correct details once.
          </p>
        </div>
        <div className="SL-form center">
          <form onSubmit={handleStockSubmit}>
            <div>
              <label
                htmlFor="floating_product_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Product Name:{" "}
              </label>
              <input
                input
                type="text"
                name="floating_product_name"
                id="floating_product_name"
                placeholder=" "
                required
                defaultValue={product}
                onSelect={(e) => {
                  setProduct(e.target.value);
                }}
                className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="floating_brand_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Brand Name:{" "}
              </label>
              <input
                type="text"
                name="floating_brand_name"
                id="floating_brand_name"
                placeholder=" "
                required
                defaultValue={brand}
                onSelect={(e) => {
                  setBrand(e.target.value);
                }}
                className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="floating_supplier_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Product Supplier:{" "}
              </label>
              <input
                type="text"
                name="floating_supplier_name"
                id="floating_supplier_name"
                placeholder=" "
                required
                defaultValue={supplier}
                onSelect={(e) => {
                  setSupplier(e.target.value);
                }}
                className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="floating_phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Phone Number:{" "}
              </label>
              <input
                type="text"
                name="floating_phone_number"
                id="floating_phone_number"
                maxLength={10}
                placeholder=" "
                required="[0-9]{10}"
                defaultValue={phone}
                onSelect={(e) => {
                  setPhone(e.target.value);
                }}
                className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="floating_quantity"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Quantity:{" "}
              </label>
              <input
                type="number"
                name="floating_quantity"
                id="floating_quantity"
                placeholder=" "
                required
                defaultValue={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="floating_unit_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Unit Price:{" "}
              </label>
              <input
                type="number"
                name="floating_unit_price"
                id="floating_unit_price"
                placeholder=" "
                required
                defaultValue={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <h1 className="text-white SL-log">Total price is: {total} </h1>
            <div className="SL-Form-btn">
              <button type="submit" className={`${styles.SLbtn}`}>
                Save Stock
              </button>

              <button type="reset" className={`${styles.SLbtn}`}>
                RESET
              </button>

              <button className={`${styles.SLbtn}`} onClick={navigateStockList}>
                Go To List
              </button>
            </div>
          </form>
        </div>
      </div>
    </Helmet>
  );
};
export default StockForm;
