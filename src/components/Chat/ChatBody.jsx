import { useEffect, useState, useRef } from "react";

export default function ChatBody(props) {
  const [messages, setMessages] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState("");

  const chatBoxRef = useRef();

  const setRecipientEmailHandler = (e) => {
    setRecipientEmail(e.target.value);
  };

  const messagesList = async () => {
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
      console.log("valid");
      //Our messages
      const response1 = await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${
          JSON.parse(sessionStorage.getItem("session")).id
        }&receiver_class=User`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access-token": JSON.parse(sessionStorage.getItem("session"))
              .accessToken,
            client: JSON.parse(sessionStorage.getItem("session")).client,
            expiry: JSON.parse(sessionStorage.getItem("session")).expiry,
            uid: JSON.parse(sessionStorage.getItem("session")).uid,
          },
        }
      );

      //Their message
      const response2 = await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${recipientUID}&receiver_class=User`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access-token": JSON.parse(sessionStorage.getItem("session"))
              .accessToken,
            client: JSON.parse(sessionStorage.getItem("session")).client,
            expiry: JSON.parse(sessionStorage.getItem("session")).expiry,
            uid: JSON.parse(sessionStorage.getItem("session")).uid,
          },
        }
      );

      const data = await response1.json();
      const data2 = await response2.json();
      const data3 = [...data.data, ...data2.data];
      data3.sort(function (a, b) {
        return new Date(a.created_at) - new Date(b.created_at);
      });
      console.log(data3);
      setMessages([...data3]);
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

  const reloadMessages = setInterval(messagesList, 2000);

  const reloadEveryX = (event) => {
    if (event) {
      event.preventDefault();
    }
    reloadMessages;
  };

  useEffect(() => {
    getAllUsers();
    // reloadEveryX();
    clearInterval(reloadMessages);

    return () => {
      clearInterval(reloadMessages);
    };
  }, []);

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <form className="display-flex ">
        <input
          onChange={setRecipientEmailHandler}
          type="text"
          placeholder="user's email"
          className="button margin-right-5px margin-top-5px"
        />
        <button
          className="button margin-right-5px margin-top-5px flex-grow-1"
          onClick={reloadEveryX}
        >
          Retrieve
        </button>
      </form>
      <div className="chatbox" ref={chatBoxRef}>
        <ul>
          {messages.map((message) => (
            <li key={Math.random()}>
              {message.body} | from: {message.sender.uid}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
