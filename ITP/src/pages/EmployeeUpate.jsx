import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { async } from "@firebase/util";
import EmployeeDataService from "../services/employee.services";
import styles from "../Styles/styles";
import Helmet from "../components/Helmet/Helmet";
import img from "../assets/Employee/2.webp";
import { NavLink, useNavigate, Link } from "react-router-dom";

const EmployeeUpdate = () => {
  const navigate = useNavigate(); // Navigate

  const navigateEmployeeList = () => {
    navigate("/employeeList");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [cityName, setCityName] = useState("");

  const [mNumber, setMnumber] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  //const [ID, setID] = useState("")    // To Navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateEmployee = {
      firstName,
      lastName,
      position,
      salary,
      cityName,
      mNumber,
    };
    console.log(updateEmployee);

    try {
      if (EmployeeID !== undefined) {
        await EmployeeDataService.updateEmployee(EmployeeID, updateEmployee);

        alert("Employee Updated  successfully!");
        navigate("/employeeList");
      } else {
        navigate("/employee");
        setMessage({ error: false, msg: "Update failed!" });
      }
    } catch (err) {
      setMessage({ error: false, msg: err.message });
    }
  };

  // Fetch data from firestore to update
  const { EmployeeID } = useParams();
  console.log("EmployeeId ", EmployeeID);

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await EmployeeDataService.getEmployee(EmployeeID);
      console.log("Got the Data: ", docSnap.data());
      setFirstName(docSnap.data().firstName);
      setLastName(docSnap.data().lastName);
      setCityName(docSnap.data().cityName);
      setSalary(docSnap.data().salary);
      setPosition(docSnap.data().position);

      setMnumber(docSnap.data().mNumber);
    } catch {}
  };

  useEffect(() => {
    console.log("Got ID: ", EmployeeID);
    if (EmployeeID !== undefined && EmployeeID !== "") {
      editHandler();
      console.log("Check ", EmployeeID);
    }
  }, [EmployeeID]);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <main className="mt-1 p-12 w-full ">
        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Helmet title="Employee update">
              <div class="flex justify-center ...">
                <button
                  className={`${styles.ALbtn}`}
                  onClick={navigateEmployeeList}
                >
                  Employee List
                </button>
              </div>
              <br />
              <br />

              <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <center>
                        <h3 class="text-lg font-high leading-20 text-white">
                          {" "}
                          EDIT EMPLOYEE DETAILS{" "}
                        </h3>
                      </center>
                      <p className="mt-1 text-sm text-dimWhite">
                        <br />
                      </p>

                      <img src={img} alt="" />
                    </div>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={handleSubmit} className="text-black">
                      <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label for="first_name" className="formLable">
                                First name
                              </label>
                              <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                defaultValue={firstName}
                                onSelect={(e) => {
                                  setFirstName(e.target.value);
                                }}
                                required
                                className="mt-1 block w-full shadow-sm sm:text-sm border-black-600 rounded-md h-8 box-border hover:box-content hover:bg-slate-100 duration-500 "
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label for="last_name" className="formLable">
                                Last name
                              </label>
                              <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                defaultValue={lastName}
                                onSelect={(e) => {
                                  setLastName(e.target.value);
                                }}
                                required
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md h-8 box-border hover:box-content hover:bg-slate-100 duration-500"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 ">
                              <label for="position" className="formLable">
                                Position
                              </label>
                              <input
                                type="text"
                                name="position"
                                id="position"
                                defaultValue={position}
                                onSelect={(e) => {
                                  setPosition(e.target.value);
                                }}
                                required
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md h-8 box-border hover:box-content hover:bg-slate-100 duration-500"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 ">
                              <label for="salary" className="formLable">
                                salary
                              </label>
                              <input
                                type="text"
                                name="salary"
                                id="City"
                                defaultValue={salary}
                                onSelect={(e) => {
                                  setSalary(e.target.value);
                                }}
                                required
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md h-8 box-border hover:box-content hover:bg-slate-100 duration-500"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 ">
                              <label for="City" className="formLable">
                                City
                              </label>
                              <input
                                type="text"
                                name="City"
                                id="City"
                                defaultValue={cityName}
                                onSelect={(e) => {
                                  setCityName(e.target.value);
                                }}
                                required
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md h-8 box-border hover:box-content hover:bg-slate-100 duration-500"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label for="tel" className="formLable">
                                Mobile Number
                              </label>
                              <input
                                type="tel"
                                name="tel"
                                id="tel"
                                defaultValue={mNumber}
                                onSelect={(e) => {
                                  setMnumber(e.target.value);
                                }}
                                required
                                placeholder="07xxxxxxxx"
                                pattern="[0-9]{10}"
                                className="mt-1 block  shadow-sm sm:text-sm border-gray-600 rounded-md h-8 box-border hover:box-content hover:bg-slate-100 duration-500"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="px-2 py-3 bg-gray-50 text-center sm:px-50">
                          <div class="text-center grid grid-cols-1 gap-5 content-center ...">
                            <button
                              type="submit"
                              className={`${styles.ALbtn} font-semibold`}
                            >
                              UPDATE
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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

export default EmployeeUpdate;
