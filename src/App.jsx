import { useEffect, useState } from "react";

import Welcome from "./components/Pages/Welcome";
import Signup from "./components/Registration/Signup";
import Chat from "./components/Chat/Chat";

import "./assets/styles.css";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [currentSession, setCurrentSession] = useState({});

  const setCurrentPageHandler = (page) => {
    setCurrentPage(page);
  };

  const getCurrentSessionHandler = () => {
    return currentSession;
  };
  const setCurrentSessionHandler = (session) => {
    setCurrentSession(session);
  };

  const sessionHotReload = () => {
    try {
      let sessionLength = Object.keys(
        JSON.parse(sessionStorage.getItem("session"))
      ).length;
      if (sessionLength > 0) {
        const session = JSON.parse(sessionStorage.getItem("session"));
        setCurrentSession(session);
        setCurrentPage("logged");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const page = () => {
    switch (currentPage) {
      case "welcome":
        return (
          <Welcome
            onChangePage={setCurrentPageHandler}
            getCurrentSession={getCurrentSessionHandler}
            onSetCurrentSession={setCurrentSession}
          />
        );
      case "signup":
        return <Signup onChangePage={setCurrentPageHandler} />;
      case "logged":
        return <Chat onChangePage={setCurrentPageHandler} />;
    }
  };

  useEffect(() => {
    sessionHotReload();
  }, []);
  return <>{page()}</>;
}

export default App;
