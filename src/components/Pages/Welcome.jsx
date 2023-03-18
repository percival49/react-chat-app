import Login from "../Login/Login";

export default function Welcome(props) {
  return (
    <div className="card container">
      <h1 className="center text-default-color">Welcome to chat app!</h1>
      <Login
        getCurrentSession={props.getCurrentSession}
        onSetCurrentSession={props.onSetCurrentSession}
        onChangePage={props.onChangePage}
      />
      <p className="text-default-color">
        No account?{" "}
        <a
          onClick={(e) => {
            e.preventDefault();
            props.onChangePage("signup");
          }}
          href=""
        >
          Signup
        </a>{" "}
      </p>
    </div>
  );
}
