import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import styles from "../Styles/styles";
import { useNavigate, useParams } from "react-router-dom";
import SupplierDataService from "../services/supplier.services";

const SupplierUpdate = () => {
  const [sName, setsName] = useState("");
  const [country, setCountry] = useState("");
  const [sAddress, setsAddress] = useState("");
  const [spc, setspc] = useState("");
  const [sEmail, setsEmail] = useState("");
  const [sPhone, setsPhone] = useState("");

  const [message, setMessage] = useState({ error: false, msg: "" });

  const handlesupplierSubmit = async (e) => {
    e.preventDefault();
    const newSupplier = {
      sName,
      country,
      sAddress,
      spc,
      sEmail,
      sPhone,
    };
    console.log(newSupplier);

    try {
      if (supID !== undefined && supID !== "") {
        await SupplierDataService.updateSupplier(supID, newSupplier);
        alert("Update added successfully!");

        navigate("/supplierUpdate");
      } else {
        navigate("/supplierList");
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  const { supID } = useParams();
  console.log("Supplier ID: ", supID);

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await SupplierDataService.getSupplier(supID);
      console.log("the record is :", docSnap.data());
      setsName(docSnap.data().sName);
      setCountry(docSnap.data().country);
      setsAddress(docSnap.data().sAddress);
      setspc(docSnap.data().spc);
      setsEmail(docSnap.data().sEmail);
      setsPhone(docSnap.data().sPhone);
    } catch {}
  };
  useEffect(() => {
    console.log("The supID here is : ", supID);
    if (supID !== undefined && supID !== "") {
      editHandler();
      console.log("check", supID);
    }
  }, [supID]);

  const navigate = useNavigate();
  const navigateSupplierList = () => {
    navigate("/supplierlist");
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <main className="mt-1 p-12 w-full ">
        <div className={` ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Helmet>
              <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-white">
                        Supplier Update
                      </h3>
                      <p className="mt-1 text-sm text-dimWhite">
                        Add your supplier informations here
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <form
                      onSubmit={handlesupplierSubmit}
                      className="bg-discount-gradient text-black"
                    >
                      <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label for="sName" className="formLable">
                                Supplier Name
                              </label>
                              <input
                                type="text"
                                name="sName"
                                supID="sName"
                                defaultValue={sName}
                                onSelect={(e) => {
                                  setsName(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label for="country" className="formLable">
                                Country
                              </label>
                              <input
                                type="text"
                                name="country"
                                supID="country"
                                defaultValue={country}
                                onSelect={(e) => {
                                  setCountry(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label for="sAddress" className="formLable">
                                Supplier Address
                              </label>
                              <input
                                type="text"
                                name="sAddress"
                                supID="sAddress"
                                defaultValue={sAddress}
                                onSelect={(e) => {
                                  setsAddress(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label for="spc" className="formLable">
                                Supplier PostalCode
                              </label>
                              <input
                                type="text"
                                name="spc"
                                supID="spc"
                                defaultValue={spc}
                                onSelect={(e) => {
                                  setspc(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="sEmail" className="formLable">
                                Email
                              </label>
                              <input
                                type="text"
                                name="sEmail"
                                supID="sEmail"
                                defaultValue={sEmail}
                                onSelect={(e) => {
                                  setsEmail(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="sPhone" className="formLable">
                                Phone
                              </label>
                              <input
                                type="number"
                                name="sPhone"
                                supID="sPhone"
                                maxlength="10"
                                Value={sPhone}
                                onSelect={(e) => {
                                  setsPhone(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <div className="text-right grid grid-cols-7 gap-4 content-center ...">
                            <button
                              type="reset"
                              className={`${styles.ALbtn} font-semibold `}
                            >
                              Reset
                            </button>
                            <button
                              type="submit"
                              className={`${styles.ALbtn} font-semibold`}
                            >
                              Save
                            </button>
                            <button
                              className={`${styles.ALbtn} font-semibold`}
                              onClick={navigateSupplierList}
                            >
                              Go To List
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
export default SupplierUpdate;
