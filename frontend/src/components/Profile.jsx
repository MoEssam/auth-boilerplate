import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Profile = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  return (
    <>
      <div>
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div>
        <img src={user.photoURL} alt="user photo" />
      </div>
    </>
  );
};

export default Profile;
