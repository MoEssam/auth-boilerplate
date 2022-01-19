import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import fire from "../firebase";
import axios from "axios";
import { useState } from "react";
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/dashboard",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    fire.auth.GoogleAuthProvider.PROVIDER_ID,
    fire.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function FirebaseGoogle({ token }) {
  const [profile, setProfile] = useState("");

  async function fetchData() {
    if (!token) {
      return null;
    } else {
      const headers = {
        Authorization: "Bearer " + token,
      };
      try {
        const data = await axios.post("/firebase/login", void 0, {
          headers: headers,
        });
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    }
  }
  fetchData();

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
    </div>
  );
}

export default FirebaseGoogle;
