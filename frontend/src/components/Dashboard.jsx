export default function Dashboard({ myStorage, token }) {
  const localUser = myStorage.getItem("user");
  const localToken = myStorage.getItem("token");

  return (
    <div>
      {token ? <h1>Hello</h1> : <p>You are not authorized, please log in</p>}
      {/* Authentication System Dashboard */}
    </div>
  );
}
