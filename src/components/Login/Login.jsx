import { useEffect, useState } from "react";

export default function Login(props) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const emailInputHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const responseBody = JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
    });
    const response = await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: responseBody,
    });
    const data = await response.json();
    if (response.status === 200) {
      props.onSetCurrentSession({
        email: enteredEmail,
        password: enteredPassword,
        accessToken: response.headers.get("access-token"),
        client: response.headers.get("client"),
        expiry: response.headers.get("expiry"),
        uid: response.headers.get("uid"),
        id: data.data.id,
      });

      const session = JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        accessToken: response.headers.get("access-token"),
        client: response.headers.get("client"),
        uid: response.headers.get("uid"),
        expiry: response.headers.get("expiry"),
        id: data.data.id,
      });
      sessionStorage.setItem("session", session);

      props.onChangePage("logged");
    } else {
      console.log("invalid credentials");
    }
  };

  return (
    <>
      <form className="login-form">
        <input
          className="input"
          type="email"
          placeholder="email"
          onChange={emailInputHandler}
        />
        <input
          className="input"
          type="password"
          placeholder="password"
          onChange={passwordInputHandler}
        />
        <input
          className="button"
          type="submit"
          onClick={loginHandler}
          value="Login"
        ></input>
      </form>
    </>
  );
}
