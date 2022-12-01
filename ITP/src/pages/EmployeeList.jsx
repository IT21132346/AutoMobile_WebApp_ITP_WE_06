import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import EmployeeDataService from "../services/employee.services";
import styles from "../Styles/styles";
import Helmet from "../components/Helmet/Helmet";

const EmployeeList = ({ getEmployeeID }) => {
  const [employee, setEmployee] = useState([]);
  const [value, setValue] = useState("");
  const [filterTable, setTablefilter] = useState([]);
  const [filterState, setFilterState] = useState(0);

  const navigate = useNavigate(); // Navigate

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    const data = await EmployeeDataService.getAllEmployee();
    console.log(data.docs);
    setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const deleteHandler = async (id) => {
    await EmployeeDataService.deleteEmployee(id);
    getEmployee();
  };

  // navigate to /contacts
  const navigateEmployee = () => {
    navigate("/employee");
  };
  const navigateEmployeeSalary = () => {
    navigate("/employeeSalary");
  };

  const navigateEmployeeReport = () => {
    navigate("/employeeReport");
  };

  const filterData = (e) => {
    if (e.target.value != "") {
      console.log("------------------>> " + e.target.value);
      setValue(e.target.value);
      const filterTable = employee.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      console.log("--------------->" + filterTable);
      setTablefilter([...filterTable]);
      setFilterState(1);
      console.log("+++++++++++++++++++++" + filterState);
    } else {
      setValue(e.target.value);
      setEmployee([...employee]);
      setFilterState(0);
    }
  };

  return (
    <div class="overflow-x-auto relative">
      <div class="flex justify-center ...">
        <button className={`${styles.ALbtn}`} onClick={navigateEmployee}>
          Add New Employee
        </button>
      </div>
      <br></br>
      <div class="flex justify-center ...">
        <button className={`${styles.ALbtn}`} onClick={navigateEmployeeSalary}>
          Salary Calculator
        </button>
      </div>
      <br />
      <center>
        <input
          type="text"
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md h-8 box-border hover:box-content hover:bg-slate-100 duration-500 "
          placeholder="Search"
          value={value}
          onChange={filterData}
        />
      </center>

      <div class="whitespace-pre-wrap ..."> </div>
      <table className={`${styles.ALtable}`}>
        <thead className={`${styles.ALthread}`}>
          <tr>
            <th scope="col" className={`${styles.ALth}`}>
              ID
            </th>
            <th scope="col" className={`${styles.ALth}`}>
              {" "}
              First NAME
            </th>
            <th scope="col" className={`${styles.ALth}`}>
              LAST NAME
            </th>
            <th scope="col" className={`${styles.ALth}`}>
              CITY
            </th>
            <th scope="col" className={`${styles.ALth}`}>
              Position
            </th>
            <th scope="col" className={`${styles.ALth}`}>
              Salary
            </th>
            <th scope="col" className={`${styles.ALth}`}>
              MOBILE Number
            </th>
          </tr>
        </thead>
        <tbody>
          {filterState == 0
            ? employee.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td className={`${styles.ALtd}`}>{index + 1}</td>
                    <td className={`${styles.ALtd}`}>{doc.firstName}</td>
                    <td className={`${styles.ALtd}`}>{doc.lastName}</td>
                    <td className={`${styles.ALtd}`}>{doc.cityName}</td>
                    <td className={`${styles.ALtd}`}>{doc.position}</td>
                    <td className={`${styles.ALtd}`}>{doc.salary}</td>
                    <td className={`${styles.ALtd}`}>{doc.mNumber}</td>
                    <td>
                      <button className={`${styles.ALbtn}`}>
                        <Link to={`employeeUpdate/${doc.id}`}>Edit</Link>
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
              })
            : filterTable.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td className={`${styles.ALtd}`}>{index + 1}</td>
                    <td className={`${styles.ALtd}`}>{doc.firstName}</td>
                    <td className={`${styles.ALtd}`}>{doc.lastName}</td>
                    <td className={`${styles.ALtd}`}>{doc.cityName}</td>
                    <td className={`${styles.ALtd}`}>{doc.position}</td>
                    <td className={`${styles.ALtd}`}>{doc.salary}</td>
                    <td className={`${styles.ALtd}`}>{doc.mNumber}</td>
                    <td>
                      <button className={`${styles.ALbtn}`}>
                        <Link to={`employeeUpdate/${doc.id}`}>Edit</Link>
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

      <div></div>
      <div class="flex justify-center ...">
        <button className={`${styles.ALbtn}`} onClick={navigateEmployeeReport}>
          Employee Report
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
