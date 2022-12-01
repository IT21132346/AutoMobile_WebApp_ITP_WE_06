import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { MdShoppingCart } from "react-icons/md";
import styles from "../Styles/styles";
import { actionType } from "../context/reducer";
import CartContainer from "../components/UI/CartContainer";

const SpearParts = () => {
  const [items, setItems] = useState([]);
  const [{ onlineItems, cartItems, cartShow }, dispatch] = useStateValue();

  // Add to Cart
  const addToCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };
  useEffect(() => {}, [cartShow]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <main className="mt-1 p-12 w-full ">
        <div className={` ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Helmet title="Spear Parts">
              <div
                className={`w-full items-center justify-center gap-5 my-12 flex flex-wrap`}
              >
                {onlineItems &&
                  onlineItems.map((item) => (
                    <div
                      key={item.id}
                      className="min-w-[300px] h-[250px] w-300 md:w-350 md:min-w-[340px] my-12 bg-gray-gradient rounded-lg 
                                backdrop-blur-lg p-2 hover:drop-shadow-2xl shadow-lg hover:shadow-blue-500/20 
                                hover:duration-500 hover:ease-in-out flex flex-col items-center justify-between"
                    >
                      <div className="w-full flex items-center justify-between">
                        <motion.img
                          src={item?.imageURL}
                          whileHover={{ scale: 1.2 }}
                          alt=""
                          className="-mt-8 ml-5 w-60 h-36 shadow-2xl shadow-blue-500/10"
                        />
                        <motion.div
                          whileTap={{ scale: 0.75 }}
                          onClick={() => setItems([...cartItems, item])}
                          className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center cursor-pointer mr-2"
                        >
                          <MdShoppingCart />
                        </motion.div>
                      </div>

                      <div className="w-full flex flex-col items-end justify-end">
                        <p className="font-semibold md:text-[15px] mt-3 text-dimWhite">
                          {item?.brand}
                        </p>
                        <div className="flex items-center gap-8">
                          <p className="text-lg font-semibold">
                            <span>Rs. </span>
                            {item?.price} .00
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {cartShow && <CartContainer />}
            </Helmet>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpearParts;
