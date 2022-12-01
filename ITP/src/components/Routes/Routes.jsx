import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  AddressForm,
  AddressList,
  AddressUpdateForm,
  Home,
  LoginPage,
  SignUpPage,
  CreateContainer,
  SpearParts,
  OnlineItemList,
  SupplierForm,
  SupplierList,
  SupplierUpdate,
  StockList,
  StockForm,
  StockUpdateForm,
  StockSearch,
  Mytickets,
  StockReport,
  Adminticket,
  TicketForm,
  EmployeeForm,
  EmployeeList,
  EmployeeUpdate,
  EmployeeSalary,
  EmployeeReport,
  EmployeeImageAdd,
  SupplierReport,
  List,
  TicketUpdate,
  View,
} from "../../pages";

import { MainContainer } from "../index";

const AppRoutes = () => {
  return (
    <Routes>
      {true ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/spearParts" element={<SpearParts />} />
          <Route path="/createItem" element={<CreateContainer />} />
          <Route path="/address" element={<AddressForm />} />
          <Route path="/addressUpdate" element={<AddressUpdateForm />} />
          <Route path="/addressList" element={<AddressList />} />
          <Route path="/onlineItemList" element={<OnlineItemList />} />
          <Route
            path="addressList/addressUpdate/:addressID"
            element={<AddressUpdateForm />}
          />
          <Route path="/Mytickets" element={<Mytickets />} />
          <Route path="/Adminticket" element={<Adminticket />} />
          <Route path="/TicketForm" element={<TicketForm />} />
          <Route path="/List" element={<List />} />
          <Route path="/View" element={<View />} />
          <Route path="/TicketUpdate" element={<ticketUpdate />} />
          <Route
            path="addressList/addressUpdate/:addressID"
            element={<AddressUpdateForm />}
          />
          <Route
            path="List/TicketUpdate/:ticketID"
            element={<TicketUpdate />}
          />

          <Route path="/employee" element={<EmployeeForm />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/employeeUpdate" element={<EmployeeUpdate />} />
          <Route
            path="employeeList/employeeUpdate/:EmployeeID"
            element={<EmployeeUpdate />}
          />
          <Route path="employeeSalary" element={<EmployeeSalary />} />
          <Route path="/employeeReport" element={<EmployeeReport />} />
          <Route path="/employeeImageAdd" element={<EmployeeImageAdd />} />

          <Route path="/stocklist" element={<StockList />} />
          <Route path="/stockform" element={<StockForm />} />
          <Route path="/stockupdateform" element={<StockUpdateForm />} />
          <Route
            path="/stocklist/stockupdateform/:stockID"
            element={<StockUpdateForm />}
          />
          <Route path="/stocksearch" element={<StockSearch />} />
          <Route path="/stockreport" element={<StockReport />} />
          <Route path="/supplierForm" element={<SupplierForm />} />
          <Route path="/supplierList" element={<SupplierList />} />
          <Route path="/supplierUpdate" element={<SupplierUpdate />} />
          <Route
            path="supplierList/supplierUpdate/:supID"
            element={<SupplierUpdate />}
          />
          <Route path="/supplierReport" element={<SupplierReport />} />

          {/* Have to remove when login and singin done */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </>
      )}

      <Route path="/*" element={<LoginPage />} />
    </Routes>
  );
};
export default AppRoutes;
