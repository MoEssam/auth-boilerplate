export default function Dashboard({ myStorage }) {
  const user = myStorage.getItem("user");
  return (
    <div>
      Authentication System Dashboard
      <h1>Hello {user}</h1>
    </div>
  );
}
