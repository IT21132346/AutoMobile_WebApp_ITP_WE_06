import { firestore } from "./firebase-config";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const employeeCollectionRef = collection(firestore, "employee");

class EmployeeDataService {
  addEmployee = (newEmployee) => {
    return addDoc(employeeCollectionRef, newEmployee);
  };

  updateEmployee = (EmployeeID, updateEmployee) => {
    const employee = doc(firestore, "employee", EmployeeID);
    return updateDoc(employee, updateEmployee);
  };

  deleteEmployee = (EmployeeID) => {
    const employee = doc(firestore, "employee", EmployeeID);
    return deleteDoc(employee);
  };

  getAllEmployee = () => {
    return getDocs(employeeCollectionRef);
  };

  getEmployee = (EmployeeID) => {
    const employee = doc(firestore, "employee", EmployeeID);
    return getDoc(employee);
  };
}

export default new EmployeeDataService();
