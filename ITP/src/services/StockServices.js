import { firestore } from "./firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const stockCollectionRef = collection(firestore, "stocks");

class StockDataService {
  addStock = (newStock) => {
    return addDoc(stockCollectionRef, newStock);
  };

  updateStock = (id, updateStock) => {
    const stockDoc = doc(firestore, "stocks", id);
    return updateDoc(stockDoc, updateStock);
  };

  deleteStock = (id) => {
    const stockDoc = doc(firestore, "stocks", id);
    return deleteDoc(stockDoc);
  };

  getAllStocks = () => {
    return getDocs(stockCollectionRef);
  };

  getStock = (id) => {
    const stockDoc = doc(firestore, "stocks", id);
    return getDoc(stockDoc);
  };
}

export default new StockDataService();
