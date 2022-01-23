import { useUserAuth } from "../context/UserAuthContext";

const Profile = () => {
  const { user } = useUserAuth();
  return (
    <>
      <div>
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div>
        <img src={user.photoURL} alt="user" />
      </div>
    </>
  );
};

export default Profile;
