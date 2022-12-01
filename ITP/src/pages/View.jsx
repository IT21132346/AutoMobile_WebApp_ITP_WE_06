import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReplyDataService from "../services/reply.services";
import TicketDataService from "../services/ticket.services";
import styles from "../Styles/styles";
import Helmet from "../components/Helmet/Helmet";
import { useLocation } from "react-router-dom";

const View = ({}) => {
  const [ticket, setTicket] = useState([]);
  const [reply, setReply] = useState([]);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state); // Navigate// Navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReply = {
      reply,
    };

    try {
      await ReplyDataService.addReply(newReply);
      alert("Reply added successfully!");
      navigate("/Mytickets");
    } catch (err) {
      alert("Reply not added successfully!");
      setMessage({ error: false, msg: err.message });
    }
  };

  const { ticketID } = useParams();
  console.log("ticket ID: ", ticketID);

  useEffect(() => {
    getTicket();
    getReply();
  }, []);

  const getTicket = async () => {
    const data = await TicketDataService.getAllTicket();
    console.log(data.docs);
    setTicket(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getReply = async () => {
    const data = await ReplyDataService.getAllReply();
    console.log(data.docs);
    setReply(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // navigate to
  const navigateTicketForm = () => {
    navigate("/ticket");
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <main className="mt-1 p-12 w-full ">
        <div className={` ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Helmet title="Mytickets">
              <div className="comment text-black">
                <div className="comment-body">
                  <>
                    <div className="comment-text">{state.firstName}</div>
                    <div className="comment-text">{state.description}</div>
                  </>
                </div>
              </div>

              <div className="comment text-black">
                <div className="comment-body">
                  {reply.map((doc) => {
                    return (
                      <div key={doc.id}>
                        <>
                          <div className="comment-text">Agent</div>
                          <div className="comment-text">{doc.reply}</div>
                        </>
                      </div>
                    );
                  })}
                </div>
              </div>
              <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                rel="stylesheet"
              ></link>
            </Helmet>
          </div>
        </div>
      </main>
    </div>
  );
};

export default View;
