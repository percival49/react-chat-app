import { useState } from "react";

import SendChat from "./SendChat";
import ChatBody from "./ChatBody";
import Logout from "./Logout";

export default function Chat(props) {
  const [lastRecipientEmail, setLastRecipientEmail] = useState("");

  return (
    <div className="card container">
      <Logout onChangePage={props.onChangePage} />
      <SendChat />
      <ChatBody />
    </div>
  );
}
