import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import styles from "../Styles/styles";
import SupplierDataService from "../services/supplier.services";

const Supplierform = () => {
  const [sName, setsName] = useState("");
  const [country, setCountry] = useState("");
  const [sAddress, setsAddress] = useState("");
  const [spc, setspc] = useState("");
  const [sEmail, setsEmail] = useState("");
  const [sPhone, setsPhone] = useState("");

  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
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
      await SupplierDataService.addSuppliers(newSupplier);
      alert("New Supplier Added Successfyly!");
      navigate("/supplierlist");
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };
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
              <div class="mt-10 sm:mt-0">
                <div class="md:grid md:grid-cols-3 md:gap-6">
                  <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                      <h3 class="text-lg font-medium leading-6 text-white">
                        Supplier Log
                      </h3>
                      <p class="mt-1 text-sm text-dimWhite">
                        Add your supplier informations here
                      </p>
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
                            <div class="col-span-6 sm:col-span-3">
                              <label for="sName" class="formLable">
                                Supplier Name
                              </label>
                              <input
                                type="text"
                                name="sName"
                                id="sName"
                                defaultValue={sName}
                                onSelect={(e) => {
                                  setsName(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                              <label for="country" class="formLable">
                                Country
                              </label>
                              <input
                                type="text"
                                name="country"
                                id="country"
                                defaultValue={country}
                                onSelect={(e) => {
                                  setCountry(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                              <label for="sAddress" class="formLable">
                                Supplier Address
                              </label>
                              <input
                                type="text"
                                name="sAddress"
                                id="sAddress"
                                defaultValue={sAddress}
                                onSelect={(e) => {
                                  setsAddress(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                              <label for="spc" class="formLable">
                                Supplier PostalCode
                              </label>
                              <input
                                type="text"
                                name="spc"
                                id="spc"
                                defaultValue={spc}
                                onSelect={(e) => {
                                  setspc(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="sEmail" class="formLable">
                                Email
                              </label>
                              <input
                                type="text"
                                name="sEmail"
                                id="sEmail"
                                defaultValue={sEmail}
                                onSelect={(e) => {
                                  setsEmail(e.target.value);
                                }}
                                required
                                className={`${styles.ADtxt}`}
                              />
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="sPhone" class="formLable">
                                Phone
                              </label>
                              <input
                                type="text"
                                name="sPhone"
                                id="sPhone"
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
export default Supplierform;
