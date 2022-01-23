import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Button from "@mui/material/Button";

const Dashboard = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div>
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </>
  );
};

export default Dashboard;
