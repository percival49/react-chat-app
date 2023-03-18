import { useState } from "react";

export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const responseBody = JSON.stringify({
      email: email,
      password: password,
      password_confirmation: password,
    });
    const response = await fetch("http://206.189.91.54/api/v1/auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: responseBody,
    });

    const data = await response.json();
    if (data.status === "success") {
      console.log("Success: ", data);
      props.onChangePage("welcome");
    }
  };

  return (
    <div className="container card">
      <p className="center">Signup</p>
      <form className="login-form">
        <input
          className="input"
          type="email"
          placeholder="email"
          onChange={emailInputHandler}
        />
        <input
          type="password"
          placeholder="password"
          onChange={passwordInputHandler}
          className="input"
        />
        <button className="button" onClick={signupHandler}>
          Register
        </button>
        <button
          className="button"
          onClick={() => {
            props.onChangePage("welcome");
          }}
        >
          Back
        </button>
      </form>
    </div>
  );
}
