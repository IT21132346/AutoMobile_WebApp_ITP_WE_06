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

const buyerCollectionRef = collection(firestore, "Buyer_Address");

class BuyerDataService {
  addAddress = (newAddress) => {
    return addDoc(buyerCollectionRef, newAddress);
  };

  updateAddress = (id, updateAddress) => {
    const address = doc(firestore, "Buyer_Address", id);
    return updateDoc(address, updateAddress);
  };

  deleteAddress = (id) => {
    const address = doc(firestore, "Buyer_Address", id);
    return deleteDoc(address);
  };

  getAllAddress = () => {
    return getDocs(buyerCollectionRef);
  };

  getAddress = (id) => {
    const address = doc(firestore, "Buyer_Address", id);
    return getDoc(address);
  };
}

export default new BuyerDataService();
