import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { firestore } from "../services/firebase-config";

const StockSearch = () => {
  const [data, setData] = useState({});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("product_name");
  console.log("search", search);

  useEffect(() => {
    searchData();
  }, [search]);

  const searchData = () => {
    firestore
      .child("stocks")
      .orderbyChild("product_name")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  return <div>StockSearch</div>;
};
export default StockSearch;
