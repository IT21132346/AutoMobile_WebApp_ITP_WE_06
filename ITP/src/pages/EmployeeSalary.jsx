import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import styles from "../Styles/styles";
import Helmet from "../components/Helmet/Helmet";
import img from "../assets/Employee/3.jpg";

const EmployeeSalary = () => {
  const navigate = useNavigate();

  const navigateEmployeeList = () => {
    navigate("/employeeList");
  };
  const [salary, setSalary] = useState();
  var [firstName, setFirstName] = useState();
  var [tax, setTax] = useState();
  var [nsal, setNsal] = useState();

  function Calculation() {
    if (salary > 50000) {
      tax = (salary * 10) / 100;
    } else if (salary > 30000) {
      tax = (salary * 5) / 100;
    } else {
      tax = 0;
    }

    setTax(tax);

    nsal = salary - tax;

    setNsal(nsal);
  }

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

              <div class="mt-12 sm:mt-0">
                <div class="md:grid md:grid-cols-3 md:gap-3">
                  <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                      <h3 class="text-lg font-high leading-20 text-white">
                        {" "}
                        Employee Salary Calculator{" "}
                      </h3>
                      <p className="mt-1 text-sm text-dimWhite">
                        <br />
                        <br />
                        <br />
                        <br />
                      </p>

                      <img src={img} alt="" />
                    </div>
                  </div>

                  <div class="mt-5 md:mt-0 md:col-span-2 text-black">
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
                              className={`${styles.ADtxt}`}
                            />
                          </div>

                          <div class="col-span-12 sm:col-span-6">
                            <label for="salary" class="formLable">
                              Salary
                            </label>
                            <input
                              type="text"
                              name="last_name"
                              id="salary"
                              maxlength="15"
                              defaultValue={salary}
                              className={`${styles.ADtxt}`}
                              onChange={(event) => {
                                setSalary(event.target.value);
                              }}
                            />
                          </div>
                          <div class="px-1 py-1 text-center sm:px-150">
                            <div class="flex justify-center ...">
                              <button
                                type="submit"
                                onClick={Calculation}
                                className={`${styles.ALbtn} font-semibold`}
                              >
                                Submit
                              </button>
                            </div>
                          </div>

                          <div class="col-span-12 sm:col-span-6">
                            <label for="tax" class="formLable">
                              Tax
                            </label>
                            <input
                              type="text"
                              name="tax"
                              id="tax"
                              maxlength="15"
                              defaultValue={tax}
                              className={`${styles.ADtxt}`}
                            />
                          </div>

                          <div class="col-span-12 sm:col-span-6">
                            <label for="netSAL" class="formLable">
                              Net Salary
                            </label>
                            <input
                              type="text"
                              name="Net Salary"
                              id="netSal"
                              maxlength="15"
                              defaultValue={nsal}
                              className={`${styles.ADtxt}`}
                            />
                          </div>
                        </div>
                      </div>
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

export default EmployeeSalary;
