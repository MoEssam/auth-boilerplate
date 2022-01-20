import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import fire from "../firebase";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    fire.auth.GoogleAuthProvider.PROVIDER_ID,
    fire.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function FirebaseGoogle() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   fire
  //     .auth()
  //     .currentUser.getIdToken()
  //     .then((token) => {
  //       if (!token) {
  //         return null;
  //       } else {
  //         const headers = {
  //           Authorization: "Bearer " + token,
  //         };
  //       }
  //       async function saveProfile() {
  //         const data = await axios.post("/firebase/login", void 0, {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         });
  //         console.log(data);
  //         navigate("/profile");
  //       }
  //       saveProfile();
  //     });
  // }, []);

  async function fetchData() {
    fire
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        if (!token) {
          return null;
        } else {
          const headers = {
            Authorization: "Bearer " + token,
          };
          const data = axios.post("/firebase/login", void 0, {
            headers: headers,
          });
          console.log("moe2", data);
          navigate("/profile");
        }
      });
  }
  fetchData();

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
    </div>
  );
}

export default FirebaseGoogle;
