import React, { useRef, useState, useEffect } from "react";
import HomeContainer from "../components/UI/HomeContainer";
import styles from "../Styles/styles";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "../components/UI/RowContainer";
import { useStateValue } from "../context/StateProvider";
import CartContainer from "../components/UI/CartContainer";

const Home = () => {
  const [{ onlineItems, cartShow }, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);
  useEffect(() => {}, [scrollValue, cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center overflow-hidden">
      <HomeContainer />
      <main className="p-12 md:-mt-80 w-full">
        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <section className="w-full my-6">
              <div className="w-full flex items-center justify-between">
                <p
                  className="text-[25px] font-semibold capitalize relative 
                      before:absolute before:rounded-lg before:content before:w-20 h-1 
                      before:bottom-0 before:left-0 before:bg-white transition-all ease-in-out duration-100"
                >
                  Our Genuine Products
                </p>

                <div className="hidden md:flex gap-3 items-center">
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-8 h-8 rounded-lg bg-btn-gradient cursor-pointer hover:bg-blue-gradient transition-all 
                         duration-100 ease-in-out flex items-center justify-center"
                    onClick={() => setScrollValue(-400)}
                  >
                    <MdChevronLeft className="text-lg text-white" />
                  </motion.div>
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-8 h-8 rounded-lg bg-btn-gradient cursor-pointer hover:bg-blue-gradient transition-all 
                         duration-100 ease-in-out flex items-center justify-center"
                    onClick={() => setScrollValue(400)}
                  >
                    <MdChevronRight className="text-lg text-white" />
                  </motion.div>
                </div>
              </div>

              <RowContainer
                scrollValue={scrollValue}
                flag={true}
                data={onlineItems}
              />
            </section>

            {cartShow && <CartContainer />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
