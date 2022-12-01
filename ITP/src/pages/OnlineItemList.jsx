import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import OnlineItemService from "../services/onlineItem.services";
import styles from "../Styles/styles";
import Helmet from "../components/Helmet/Helmet";
import "@progress/kendo-theme-default/dist/all.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const OnlineItemList = () => {
  const [onlineItem, setOnlineItem] = useState([]);

  const navigate = useNavigate(); // Navigate

  useEffect(() => {
    getOnlineItem();
  }, []);

  const getOnlineItem = async () => {
    const data = await OnlineItemService.getAllOnlineItem();
    console.log(data.docs);
    setOnlineItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //Delete
  const deleteHandler = async (id) => {
    await OnlineItemService.deleteOnlineItem(id);
    getOnlineItem();
  };

  // navigate to /CreateItem
  const navigateOnlineItemForm = () => {
    navigate("/createItem");
  };

  //  // Generate Report
  const handleExportWithComponent = (e) => {
    pdfExportComponent.current.save();
  };
  const pdfExportComponent = useRef(null);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <main className="mt-1 p-12 w-full ">
        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Helmet title="Address List">
              <section
                id="AddressList"
                className={`flex md:flex-row flex-col ${styles.paddingY}`}
              >
                <div
                  className={`flex-1 ${styles.flexStart} flex-col xl:px-0 shadow-box-shadow sm:px-16 px-6 bg-box-gradient rounded-md`}
                >
                  <div className="overflow-x-auto relative ">
                    <button
                      className={`${styles.ALbtn} font-semibold mt-5`}
                      onClick={navigateOnlineItemForm}
                    >
                      Add New Item
                    </button>
                    <button
                      className={`${styles.ALbtn} font-semibold mt-5 ml-4`}
                      onClick={handleExportWithComponent}
                    >
                      Download Report
                    </button>
                    <PDFExport ref={pdfExportComponent} paperSize="A1">
                      <div className="bg-box-gradient">
                        <table className={`${styles.ALtable} mt-6`}>
                          <thead className={`${styles.ALthread}`}>
                            <tr>
                              <th scope="col" className={`${styles.ALth}`}>
                                No
                              </th>
                              <th scope="col" className={`${styles.ALth}`}>
                                Brand
                              </th>
                              <th scope="col" className={`${styles.ALth}`}>
                                Category
                              </th>
                              <th scope="col" className={`${styles.ALth}`}>
                                Quantity
                              </th>
                              <th scope="col" className={`${styles.ALth}`}>
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {onlineItem.map((doc, index) => {
                              return (
                                <tr key={doc.id}>
                                  <td className={`${styles.ALtd}`}>
                                    {index + 1}
                                  </td>
                                  <td className={`${styles.ALtd}`}>
                                    {doc.brand}
                                  </td>
                                  <td className={`${styles.ALtd}`}>
                                    {doc.category}
                                  </td>
                                  <td className={`${styles.ALtd}`}>
                                    {doc.quantity}
                                  </td>
                                  <td className={`${styles.ALtd}`}>
                                    {doc.price}
                                  </td>
                                  <td>
                                    <button className={`${styles.ALbtn}`}>
                                      <Link to={`addressUpdate/${doc.id}`}>
                                        Edit
                                      </Link>
                                    </button>
                                  </td>
                                  <td>
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
                    </PDFExport>
                  </div>
                </div>
              </section>
            </Helmet>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnlineItemList;
