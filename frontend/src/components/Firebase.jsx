import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import fire from "../firebase";
// import { auth } from "firebase/app";
// import auth from "firebase/compat/app";

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

function FirebaseGoogle() {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
    </div>
  );
}

export default FirebaseGoogle;
