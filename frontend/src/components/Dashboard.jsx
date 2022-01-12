export default function Dashboard({ myStorage }) {
  const user = myStorage.getItem("user");
  const token = myStorage.getItem("token");
  return (
    <div>
      {token ? (
        <h1>Hello {user}</h1>
      ) : (
        <p>You are not authorized, please log in</p>
      )}
      {/* Authentication System Dashboard */}
    </div>
  );
}
