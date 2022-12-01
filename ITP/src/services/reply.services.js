import { firestore } from "./firebase-config";
import { collection, getDoc, getDocs, addDoc, doc } from "firebase/firestore";

const ReplyCollectionRef = collection(firestore, "Reply");

class ReplyDataService {
  addReply = (newReply) => {
    return addDoc(ReplyCollectionRef, newReply);
  };

  getAllReply = () => {
    return getDocs(ReplyCollectionRef);
  };

  getReply = (id) => {
    const reply = doc(firestore, "Ticket", id);
    return getDoc(reply);
  };
}

export default new ReplyDataService();
