import { firestore } from "./firebase-config";
import { collection, getDoc, getDocs, addDoc, doc } from "firebase/firestore";

const TicketCollectionRef = collection(firestore, "Ticket");

class TicketDataService {
  addTicket = (newTicket) => {
    return addDoc(TicketCollectionRef, newTicket);
  };

  getAllTicket = () => {
    return getDocs(TicketCollectionRef);
  };

  getTicket = (id) => {
    const ticket = doc(firestore, "Ticket", id);
    return getDoc(ticket);
  };

  updateTicket = (id, updateTicket) => {
    const ticket = doc(firestore, "Ticket", id);
    return updateDoc(ticket, updateTicket);
  };
}

export default new TicketDataService();
