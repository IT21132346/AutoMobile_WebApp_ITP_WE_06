import React from "react";
import styles from "../Styles/styles";
import Helmet from "../components/Helmet/Helmet";
import Loader from "../components/UI/Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { categories } from "../utils/data";
import { useState } from "react";
import { motion } from "framer-motion";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { storage } from "../services/firebase-config";
import { getAllItems, saveItem } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { NavLink, useNavigate, Link } from "react-router-dom";

const EmployeeImageAdd = () => {
  const [name, setName] = useState("");

  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [isLoading, setLoading] = useState(false);
  const [{ onlineItems }, dispatch] = useStateValue();

  const navigate = useNavigate(); // Navigate

  const navigateEmployee = () => {
    navigate("/employee");
  };

  const uploadImage = (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `EmpImage/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try Again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 5000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setLoading(false);
          setFields(true);
          setMsg("Image Uploaded Successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 5000);
        });
      }
    );
  };

  const deleteImage = () => {
    setLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setLoading(false);
      setFields(true);
      setMsg("Image Delete Successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 5000);
    });
  };

  const saveDetails = () => {
    setLoading(true);
    try {
      if (!name || !imageAsset) {
        setFields(true);
        setMsg("Required fields cannot be Empty : Try Again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 5000);
      } else {
        const data = {
          id: `${Date.now()}`,

          name: name,
          imageURL: imageAsset,
        };
        saveItem(data);
        setLoading(false);
        setFields(true);
        setMsg("Data Uploaded Successfully");
        setAlertStatus("success");
        clearData();
        setTimeout(() => {
          setFields(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try Again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setLoading(false);
      }, 5000);
    }
    fetchData();
  };

  const clearData = () => {
    setName("");
    setImageAsset(null);
  };

  const fetchData = async () => {
    await getAllItems().then((data) => {
      dispatch({
        type: actionType.SET_ONLINE_ITEM,
        onlineItems: data,
      });
    });
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <main className="mt-1 p-12 w-full ">
        <div className={` ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Helmet title="EmployeeImage">
              <div class="flex justify-center ...">
                <button
                  className={`${styles.ALbtn}`}
                  onClick={navigateEmployee}
                >
                  Add New Employee
                </button>
              </div>
              <br></br>
              {/*-------------- Messages -------------*/}
              {fields && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`w-full p2 rounded-lg text-center text-lg font-semibold ${
                    alertStatus === "danger"
                      ? "bg-alert-red text-black"
                      : "bg-alert-green text-green-900"
                  }`}
                >
                  {msg}
                </motion.p>
              )}
              <div
                className="bg-gray-gradient mt-1 mb-20 p-12 w-[75%] border boader-gray-200 
                                rounded-lg flex flex-col items-center justify-center ml-48"
              >
                <div className="w-full py-2 border-b border-gray-400 flex items-center">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-5xl dark:text-white">
                    Add Employee Images
                  </h1>
                </div>

                <div className="mt-4 w-full flex flex-col md:flex-row items-center">
                  <div className="w-full py-2 flex items-center gap-2">
                    <label className="block text-lg font-medium text-gray-300 ">
                      Details of the Employee:{" "}
                    </label>
                    <textarea
                      placeholder="Details of the Employee"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="ml-5 w-[900px] h-[100px] text-lg bg-transparent font-semibold placeholder:text-gray-800
                                    form-control block px-3 py-1.5 border border-solid border-gray-300 rounded-md resize-none"
                    ></textarea>
                  </div>
                </div>

                {/*-------------- Image Uploader -------------*/}
                <div className="mt-4 group flex justify-center flex-col border-2 border-dotted border-gray-300 w-full h-100 md:h-300 cursor-pointer rounded-lg">
                  <div className="flex justify-center">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {!imageAsset ? (
                          <>
                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                              <div className="w-full h-full flex flex-col items-center justify-center">
                                <MdCloudUpload className="text-gray-400 text-[50px] hover:text-gray-600" />
                                <p className="text-gray-400 hover:text-gray-600">
                                  {" "}
                                  Click here to Upload{" "}
                                </p>
                              </div>
                              <input
                                type="file"
                                name="uploadimage"
                                accept="image/*"
                                onChange={uploadImage}
                                className="w-0 h-0"
                              />
                            </label>
                          </>
                        ) : (
                          <>
                            <div className="relative h-full">
                              <img
                                src={imageAsset}
                                alt="upload image"
                                className="w-96 h-52 object"
                              />
                              <button
                                type="button"
                                onClick={deleteImage}
                                className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer 
                                                outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                              >
                                <MdDelete className="text-white" />
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center w-full">
                  <button
                    type="button"
                    onClick={saveDetails}
                    className="ml-1 md:ml-auto boader-none outline-none
                              bg-blue-gradient px-80 py-2 rounded-lg text-black font-semibold"
                  >
                    Save
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

export default EmployeeImageAdd;
