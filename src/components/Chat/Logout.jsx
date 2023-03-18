export default function Logout(props) {
  const logoutHandler = () => {
    props.onChangePage("welcome");
    sessionStorage.clear();
  };

  return (
    <>
      <button className="button" onClick={logoutHandler}>
        Logout
      </button>
    </>
  );
}
