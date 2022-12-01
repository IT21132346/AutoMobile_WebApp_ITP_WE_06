import React, { useEffect, useState, ReactDOM, useRef } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import TicketDataService from "../services/ticket.services";
import styles from "../Styles/styles";
import Helmet from "../components/Helmet/Helmet";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const List = ({}) => {
  const [ticket, setTicket] = useState([]);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [filterTable, setTablefilter] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate(); // Navigate

  useEffect(() => {
    getTicket();
  }, []);

  const getTicket = async () => {
    const data = await TicketDataService.getAllTicket();
    console.log(data.docs);
    setTicket(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // navigate to /contacts
  const navigateTicketForm = () => {
    navigate("/TicketForm");
  };

  const Admin = (ticket) => {
    navigate("/View", { state: ticket });
  };

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = ticket.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTablefilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setTicket([...ticket]);
    }
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <main className="mt-1 p-12 w-full ">
        <div className={` ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Helmet title="Mytickets">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"></span>
                </div>
                <input
                  type="text"
                  color="black"
                  class="form-control"
                  placeholder="Search"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={value}
                  className={`${styles.ADtxt}`}
                  onChange={filterData}
                />
              </div>

              <section
                id="Mytickets"
                className={`flex md:flex-row flex-col ${styles.paddingY}`}
              >
                <div
                  className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 SL-bg-table rounded-md SL-log`}
                >
                  <div class="overflow-x-auto relative">
                    <button
                      className={`${styles.ADbtn} font-semibold`}
                      onClick={navigateTicketForm}
                    >
                      Add New Ticket
                    </button>

                    <table className={`${styles.ALtable}`}>
                      <thead className={`${styles.ALthread}`}>
                        <tr>
                          <th scope="col" className={`${styles.ALth}`}></th>
                          <th scope="col" className={`${styles.ALth}`}></th>
                          <th scope="col" className={`${styles.ALth}`}></th>
                        </tr>
                      </thead>

                      <tbody>
                        {value.length > 0
                          ? filterTable.map((doc, index) => {
                              return (
                                <tr key={doc.id}>
                                  <td className={`${styles.ALtd}`}>
                                    {" "}
                                    <button onClick={() => Admin(doc)}>
                                      {index + 1}
                                    </button>
                                  </td>
                                  <td className={`${styles.ALtd}`}>
                                    {doc.subject}
                                  </td>
                                  <td className={`${styles.ALtd}`}>
                                    {doc.issueDate}
                                  </td>
                                </tr>
                              );
                            })
                          : ticket.map((doc, index) => {
                              return (
                                <tr key={doc.id}>
                                  <td className={`${styles.ALtd}`}>
                                    {" "}
                                    <button onClick={() => Admin(doc)}>
                                      {index + 1}
                                    </button>
                                  </td>
                                  <td className={`${styles.ALtd}`}>
                                    {doc.subject}
                                  </td>
                                  <td className={`${styles.ALtd}`}>
                                    {doc.issueDate}
                                  </td>
                                  <td>
                                    <button className={`${styles.ALbtn}`}>
                                      <Link to={`TicketUpdate/${doc.id}`}>
                                        Edit
                                      </Link>
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
             
          </div>
                   {" "}
        </div>
             {" "}
      </main>
         {" "}
    </div>
  );
};
export default List;
