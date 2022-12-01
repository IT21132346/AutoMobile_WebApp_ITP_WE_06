import React from "react";
import { useState } from "react";
import { async } from "@firebase/util";
import EmployeeDataService from "../services/employee.services";
import styles from "../Styles/styles";
import Helmet from "../components/Helmet/Helmet";
import img from "../assets/Employee/1.webp";
import { NavLink, useNavigate, Link } from "react-router-dom";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState([]);

  const navigate = useNavigate();

  // Navigate

  const navigateEmployeeList = () => {
    navigate("/employeeList");
  };

  const navigateEmployeeImageAdd = () => {
    navigate("/employeeImageAdd");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [cityName, setCityName] = useState("");
  const [mNumber, setMnumber] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = {
      firstName,
      lastName,
      position,
      salary,
      cityName,
      mNumber,
    };
    console.log(newEmployee);
    try {
      await EmployeeDataService.addEmployee(newEmployee);
      alert("Employee added successfully!");
      navigate("/employeeList");
    } catch (err) {
      setMessage({ error: false, msg: err.message });
    }
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <main className="mt-1 p-12 w-full ">
        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Helmet title="Employee Form">
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

              <div class="mt-10 sm:mt-0">
                <div class="md:grid md:grid-cols-3 md:gap-6">
                  <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                      <center>
                        <h3 class="text-lg font-high leading-20 text-white">
                          {" "}
                          ADD NEW EMPLOYEES{" "}
                        </h3>
                      </center>
                      <p className="mt-1 text-sm text-dimWhite">
                        <br />
                        <br />
                        <br />
                        <br />
                      </p>

                      <img src={img} alt="" />
                    </div>
                  </div>

                  <div class="mt-5 md:mt-0 md:col-span-2">
                    <form
                      onSubmit={handleSubmit}
                      className="bg-discount-gradient text-black"
                    >
                      <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                          <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-12 sm:col-span-6">
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

                            <div class="col-span-12 sm:col-span-6">
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

                            <div class="col-span-6 sm:col-span-6">
                              <label for="position" class="formLable">
                                position
                              </label>
                              <input
                                type="text"
                                name="position"
                                id="position"
                                maxlength="15"
                                defaultValue={position}
                                onSelect={(e) => {
                                  setPosition(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div class="col-span-6 sm:col-span-6">
                              <label for="salary" class="formLable">
                                salary
                              </label>
                              <input
                                type="text"
                                name="salary"
                                id="salary"
                                maxlength="30"
                                defaultValue={salary}
                                onSelect={(e) => {
                                  setSalary(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-6">
                              <label for="City" class="formLable">
                                City
                              </label>
                              <input
                                type="text"
                                name="City"
                                id="City"
                                maxlength="15"
                                defaultValue={cityName}
                                onSelect={(e) => {
                                  setCityName(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div class="col-span-8 sm:col-span-6">
                              <label for="tel" class="formLable">
                                Mobile Number
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
                          </div>
                        </div>
                        <div class="px-2 py-3 bg-gray-50 text-center sm:px-50">
                          <div class="text-center grid grid-cols-1 gap-5 content-center ...">
                            <button
                              type="submit"
                              className={`${styles.ALbtn} font-semibold`}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <br />
                <br />
                <div class="flex justify-center ...">
                  <button
                    className={`${styles.ALbtn}`}
                    onClick={navigateEmployeeImageAdd}
                  >
                    Add Employee Images
                  </button>
                </div>
              </div>
            </Helmet>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeForm;
