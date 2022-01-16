import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "../setupFirebase";

export default function Firebase({ setToken, myStorage }) {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(
    false || myStorage.getItem("auth") === "true"
  );

  const uiConfig = {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    signInFlow: "popup",
    signInFailure: function (error) {
      console.log(error);
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        myStorage.setItem("auth", "true");
      }
      userCred.getIdToken().then((token) => {
        setToken(token);
      });
    });
  }, []);

  return (
    <div>
      Hello Moe
      {auth ? (
        navigate("/dashboard")
      ) : (
        <StyledFirebaseAuth
          // uiCallback={(ui) => ui.disableAutoSignIn()}
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
}
