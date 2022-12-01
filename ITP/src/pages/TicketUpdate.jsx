import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import TicketDataService from "../services/ticket.services";
import styles from "../Styles/styles";
import Helmet from "../components/Helmet/Helmet";

const TicketUpdate = () => {
  const [issueDate, setissueDate] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mNumber, setMnumber] = useState("");
  const [inquiry, setinquiry] = useState("");
  const [subject, setsubject] = useState("");
  const [description, setdescription] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {
      issueDate,
      firstName,
      lastName,
      mNumber,
      inquiry,
      subject,
      description,
    };
    console.log(newTicket);
    try {
      if (ticketID !== undefined && ticketID !== "") {
        await TicketDataService.updateTicket(ticketID, newTicket);
        alert("Update added successfully!");
        navigate("/List");
      } else {
        navigate("/List");
      }
    } catch (err) {
      setMessage({ error: false, msg: err.message });
    }
  };

  // -----------------------------------------------------   Fetch data from firestore to update        -----------------------------------
  const { ticketID } = useParams();
  console.log("Ticket ID: ", ticketID);

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await TicketDataService.getTicket(ticketID);
      console.log("Got the Data: ", docSnap.data());
      setissueDate(docSnap.data().issueDate);
      setFirstName(docSnap.data().firstName);
      setLastName(docSnap.data().lastName);
      setMnumber(docSnap.data().mNumber);
      setinquiry(docSnap.data().inquiry);
      setsubject(docSnap.data().subject);
      setdescription(docSnap.data().description);
    } catch {}
  };
  useEffect(() => {
    console.log("Got ID: ", ticketID);
    if (ticketID !== undefined && ticketID !== "") {
      editHandler();
      console.log("Check ", ticketID);
    }
  }, [ticketID]);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <main className="mt-1 p-12 w-full ">
        <div className={` ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Helmet title="Ticket Form">
              <div class="text-right grid grid-cols-7 gap-4 content-center ...">
                <a href="/List">
                  <button
                    type="submit"
                    className={`${styles.ALbtn} font-semibold`}
                  >
                    My Tickets
                  </button>
                </a>
              </div>
              <div class="h-screen flex flex-col items-center justify-center">
                <div class="mt-10 sm:mt-0">
                  <div class="md:grid md:grid-cols-3 md:gap-6">
                    <div class="mt-5 md:mt-6 md:col-span-4">
                      <div class="md:col-span-1">
                        <div class="px-4 sm:px-0">
                          <h3 class="text-lg font-medium leading-6 text-white">
                            Raise your concern here
                          </h3>
                          <p class="mt-1 text-sm text-dimWhite">
                            Please complete this form and one of our agents will
                            reply to you as soon as possible.
                          </p>
                        </div>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className="bg-discount-gradient text-black"
                      >
                        <div class="shadow overflow-hidden sm:rounded-md">
                          <div class="px-3 py-5 bg-white sm:p-6 w-50">
                            <div class="grid grid-cols-6 gap-6">
                              <div class="col-start-1 col-end-5">
                                <label for="issueDate" class="formLable">
                                  issue Date
                                </label>
                                <input
                                  type="date"
                                  name="issueDate"
                                  id="issueDate"
                                  defaultValue={issueDate}
                                  onSelect={(e) => {
                                    setissueDate(e.target.value);
                                  }}
                                  required
                                  className={`${styles.ADtxt}`}
                                />
                              </div>

                              <div class="col-span-3">
                                <label for="first_name" class="formLable">
                                  First name
                                </label>
                                <input
                                  type="text"
                                  name="first_name"
                                  id="first_name"
                                  maxlength="10"
                                  defaultValue={firstName}
                                  onSelect={(e) => {
                                    setFirstName(e.target.value);
                                  }}
                                  required
                                  className={`${styles.ADtxt}`}
                                />
                              </div>

                              <div class="col-span-3 ">
                                <label for="last_name" class="formLable">
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  name="last_name"
                                  id="last_name"
                                  maxlength="15"
                                  defaultValue={lastName}
                                  onSelect={(e) => {
                                    setLastName(e.target.value);
                                  }}
                                  required
                                  className={`${styles.ADtxt}`}
                                />
                              </div>

                              <div class="col-start-1 col-end-5">
                                <label for="tel" class="formLable">
                                  Contact Number
                                </label>
                                <input
                                  type="tel"
                                  name="tel"
                                  id="tel"
                                  defaultValue={mNumber}
                                  maxlength="10"
                                  onSelect={(e) => {
                                    setMnumber(e.target.value);
                                  }}
                                  required
                                  placeholder="07xxxxxxxx"
                                  pattern="[0-9]{10}"
                                  class="mt-1 block  shadow-sm sm:text-sm border-gray-600 rounded-md h-8 box-border hover:box-content hover:bg-slate-100 duration-500"
                                />
                              </div>

                              <div class="col-start-1 col-end-5">
                                <label for="inquiry" class="formLable">
                                  Inquiry type
                                </label>
                                <select
                                  id="inquiry"
                                  name="inquiry"
                                  Value={inquiry}
                                  onChange={(e) => {
                                    setinquiry(e.target.value);
                                  }}
                                  placeholder="Select inquiry"
                                  required
                                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  <option>
                                    I have a concern about an Item purchased
                                  </option>
                                  <option>
                                    I have a question about the services you
                                    offer
                                  </option>
                                  <option>Other</option>
                                </select>
                              </div>

                              <div class="col-start-1 col-end-5">
                                <label for="subject" class="formLable">
                                  Subject
                                </label>
                                <input
                                  type="text"
                                  name="subject"
                                  id="subject"
                                  maxlength="30"
                                  defaultValue={subject}
                                  onSelect={(e) => {
                                    setsubject(e.target.value);
                                  }}
                                  required
                                  className={`${styles.ADtxt}`}
                                />
                              </div>

                              <div class="col-start-1 col-end-5">
                                <label for="description" class="formLable">
                                  Message
                                </label>
                                <textarea
                                  class="block p-30 w-full   rounded-lg border  sm:text-md  "
                                  name="description"
                                  id="description"
                                  maxlength="100"
                                  defaultValue={description}
                                  onSelect={(e) => {
                                    setdescription(e.target.value);
                                  }}
                                  required
                                  className={`${styles.ADtxt}`}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <div class="text-right grid grid-cols-7 gap-4 content-center ...">
                              <button
                                type="reset"
                                className={`${styles.ALbtn} font-semibold `}
                              >
                                Reset
                              </button>
                              <button
                                type="submit"
                                className={`${styles.ALbtn} font-semibold `}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Helmet>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketUpdate;
