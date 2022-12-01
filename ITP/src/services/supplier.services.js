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

const supplierCollectionRef = collection(firestore, "suppliers");
class SupplierDataService {
  addSuppliers = (newSupplier) => {
    return addDoc(supplierCollectionRef, newSupplier);
  };

  updateSupplier = (id, updatedSupplier) => {
    const supplierDoc = doc(firestore, "suppliers", id);
    return updateDoc(supplierDoc, updatedSupplier);
  };

  deleteSupplier = (id) => {
    const supplierDoc = doc(firestore, "suppliers", id);
    return deleteDoc(supplierDoc);
  };

  getAllSuppliers = () => {
    return getDocs(supplierCollectionRef);
  };

  getSupplier = (id) => {
    const supplierDoc = doc(firestore, "suppliers", id);
    return getDoc(supplierDoc);
  };
}

export default new SupplierDataService();
