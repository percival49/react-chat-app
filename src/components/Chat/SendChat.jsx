import { useEffect, useState } from "react";

export default function SendChat(props) {
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState("");

  const setMessageHandler = (e) => {
    setMessage(e.target.value);
  };

  const setRecipientEmailHandler = (e) => {
    setRecipientEmail(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();
    let isValid = false;
    let _recipientEmail = "";
    let recipientUID = "";
    const targetRecipient = allUsers.find((user) => {
      if (user.email === recipientEmail) {
        isValid = true;
        _recipientEmail = user.uid;
        recipientUID = user.id;
      }
    });

    if (isValid) {
      setMessage("");
      const responseBody = JSON.stringify({
        receiver_id: recipientUID,
        receiver_class: "User",
        body: message,
      });
      const response = await fetch("http://206.189.91.54/api/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(sessionStorage.getItem("session"))
            .accessToken,
          client: JSON.parse(sessionStorage.getItem("session")).client,
          expiry: JSON.parse(sessionStorage.getItem("session")).expiry,
          uid: JSON.parse(sessionStorage.getItem("session")).uid,
        },
        body: responseBody,
      });
      const data = await response.json();
    }
  };

  const getAllUsers = async () => {
    const response = await fetch("http://206.189.91.54/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": JSON.parse(sessionStorage.getItem("session"))
          .accessToken,
        client: JSON.parse(sessionStorage.getItem("session")).client,
        expiry: JSON.parse(sessionStorage.getItem("session")).expiry,
        uid: JSON.parse(sessionStorage.getItem("session")).uid,
      },
    });

    const data = await response.json();

    setAllUsers([...data.data]);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <form className="send-chat-form">
        <input
          type="text"
          placeholder="user's email"
          onChange={setRecipientEmailHandler}
          className="input margin-right-5px"
        />
        <input
          type="text"
          placeholder="message..."
          onChange={setMessageHandler}
          value={message}
          className="input margin-right-5px flex-grow-1"
        />
        <input
          type="submit"
          value="Send"
          onClick={sendChat}
          className="button margin-right-5px "
        />
      </form>
    </>
  );
}
