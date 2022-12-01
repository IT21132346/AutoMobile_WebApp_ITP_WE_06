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

const OnlineItemRef = collection(firestore, "onlineItems");

class OnlineItemService {
  addOnlineItem = (newOnlineItem) => {
    return addDoc(OnlineItemRef, newOnlineItem);
  };

  updateOnlineItem = (id, updateOnlineItem) => {
    const onlineItem = doc(firestore, "onlineItems", id);
    return updateDoc(onlineItem, updateOnlineItem);
  };

  deleteOnlineItem = (id) => {
    const onlineItem = doc(firestore, "onlineItems", id);
    return deleteDoc(onlineItem);
  };

  getAllOnlineItem = () => {
    return getDocs(OnlineItemRef);
  };

  getOnlineItem = (id) => {
    const onlineItem = doc(firestore, "onlineItems", id);
    return getDoc(onlineItem);
  };
}

export default new OnlineItemService();
