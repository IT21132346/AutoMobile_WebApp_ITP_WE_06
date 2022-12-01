import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import styles from "../Styles/styles";
import SupplierDataService from "../services/supplier.services";

const SupplierList = ({ getSupplierId }) => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    const data = await SupplierDataService.getAllSuppliers();
    console.log(data.docs);
    setSuppliers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await SupplierDataService.deleteSupplier(id);
    getSuppliers();
  };

  //NAVIGATE TO SUPPLIER FORM
  const navigateSupplierForm = () => {
    navigate("/supplierForm");
  };
  //NAVIGATE TO SUPPLIER Report
  const navigateReport = () => {
    navigate("/supplierReport");
  };

  return (
    <Helmet title="Supplier List">
      <section
        id="SupplierList"
        className={`flex md:flex-row flex-col ${styles.paddingY}`}
      >
        <div
          className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 bg-discount-gradient rounded-md`}
        >
          <div class="overflow-x-auto relative">
            <button
              className={`${styles.ALbtn} font-semibold`}
              onClick={navigateSupplierForm}
            >
              Add New Supplier
            </button>

            <button className={`${styles.ALbtn}`} onClick={navigateReport}>
              Genarate A Report
            </button>

            <table className={`${styles.ALtable}`}>
              <thead className={`${styles.ALthread}`}>
                <tr>
                  <th scope="col" className={`${styles.ALth}`}>
                    ID
                  </th>
                  <th scope="col" className={`${styles.ALth}`}>
                    Name
                  </th>
                  <th scope="col" className={`${styles.ALth}`}>
                    Country
                  </th>
                  <th scope="col" className={`${styles.ALth}`}>
                    Address
                  </th>
                  <th scope="col" className={`${styles.ALth}`}>
                    Postal Code
                  </th>
                  <th scope="col" className={`${styles.ALth}`}>
                    Email
                  </th>
                  <th scope="col" className={`${styles.ALth}`}>
                    Phone
                  </th>
                  <th scope="col" className={`${styles.ALth}`}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((doc, index) => {
                  return (
                    <tr key={doc.id}>
                      <td className={`${styles.ALtd}`}>{index + 1}</td>
                      <td className={`${styles.ALtd}`}>{doc.sName}</td>
                      <td className={`${styles.ALtd}`}>{doc.country}</td>
                      <td className={`${styles.ALtd}`}>{doc.sAddress}</td>
                      <td className={`${styles.ALtd}`}>{doc.spc}</td>
                      <td className={`${styles.ALtd}`}>{doc.sEmail}</td>
                      <td className={`${styles.ALtd}`}>{doc.sPhone}</td>
                      <td>
                        <button className={`${styles.ALbtn}`}>
                          <Link to={`supplierUpdate/${doc.id}`}>Edit</Link>
                        </button>
                        <button
                          className={`${styles.ALbtn}`}
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
        </div>
      </section>
    </Helmet>
  );
};
export default SupplierList;
