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

const CreateContainer = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discription, setDiscription] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [isLoading, setLoading] = useState(false);
  const [{ onlineItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
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
      if (
        !brand ||
        !category ||
        !price ||
        !quantity ||
        !discription ||
        !imageAsset
      ) {
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
          brand: brand,
          category: category,
          price: price,
          quantity: quantity,
          discription: discription,
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
    setBrand("");
    setCategory("Select Category");
    setprice("");
    setDiscription("");
    setQuantity("");
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
            <Helmet title="CreateContainer">
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
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
                    Add Items
                  </h1>
                </div>

                <div className=" mt-14 w-full py-2 flex items-center gap-2">
                  <label className="block text-lg font-medium text-gray-300 ">
                    Brand Name:{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="  Enter brand name"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="ml-5 w-[980px] h-full text-lg bg-transparent font-semibold 
                                rounded-md placeholder:text-gray-800 border border-solid border-gray-300"
                  />
                </div>

                <div className="mt-3 w-full">
                  <label className=" block text-lg font-medium text-gray-300 ">
                    Select Item Category:{" "}
                  </label>
                  <div className="w-full mt-1">
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="text-black outline-none w-full text-base border-b-2 p-2 rounded-md cursor-pointer"
                    >
                      <option value="other" className="bg-white">
                        {" "}
                        Select Category{" "}
                      </option>
                      {categories &&
                        categories.map((item) => (
                          <option
                            key={item.id}
                            className="text-base boader-0 outline-none capitalize bg-white text-headingColor "
                            value={item.urlParamName}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 w-full flex flex-col md:flex-row items-center">
                  <div className="w-full py-2 flex items-center gap-2">
                    <label className="block text-lg font-medium text-gray-300 ">
                      Item Quantity:{" "}
                    </label>
                    <input
                      type="number"
                      placeholder="  quantity"
                      pattern="[0-9]"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="ml-5 w-[960px] h-full text-lg bg-transparent font-semibold 
                                    rounded-md placeholder:text-gray-800 border border-solid border-gray-300"
                    />
                  </div>
                </div>

                <div className="mt-4 w-full flex flex-col md:flex-row items-center">
                  <div className="w-full py-2 flex items-center gap-2">
                    <label className="block text-lg font-medium text-gray-300 ">
                      Price of the Item:{" "}
                    </label>
                    <input
                      type="number"
                      placeholder="  Rs."
                      pattern="[0-9]"
                      required
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                      className="ml-5 w-[960px] h-full text-lg bg-transparent font-semibold 
                                    rounded-md placeholder:text-gray-800 border border-solid border-gray-300"
                    />
                  </div>
                </div>

                <div className="mt-4 w-full flex flex-col md:flex-row items-center">
                  <div className="w-full py-2 flex items-center gap-2">
                    <label className="block text-lg font-medium text-gray-300 ">
                      Discription of the Item:{" "}
                    </label>
                    <textarea
                      placeholder="Discription here"
                      required
                      value={discription}
                      onChange={(e) => setDiscription(e.target.value)}
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
                    className="ml-0 md:ml-auto boader-none outline-none
                              bg-blue-gradient px-12 py-2 rounded-lg text-black font-semibold"
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

export default CreateContainer;
