import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import fire from "../firebase";

export default function Profile() {
  const [isFetching, setIsFetching] = useState(true);
  const [profile, setProfile] = useState("");

  // useEffect(() => {
  //   async function fetchProfile() {
  //     try {
  //       const data = await axios.get("/firebase/profile", {
  //         credentials: "include",
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       if (!data) {
  //         setIsFetching(true);
  //         return null;
  //       } else {
  //         setIsFetching(false);
  //         var result = data.data;
  //         setProfile(result);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   fetchProfile();
  //   console.log("token", token);
  // }, [token]);

  // const data = await axios.get("/firebase/profile", {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //   },
  // });
  // console.log(data);
  useEffect(() => {
    fire
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        async function fetchProfile() {
          const data = await axios.get("/firebase/profile", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          console.log(data);
          var result = data.data;
          setProfile(result);
          setIsFetching(false);
        }
        fetchProfile();
      });
  }, []);

  return (
    <div>
      {!isFetching ? (
        ((<img src={profile.profilePicture} alt="profile picture" />),
        (<h3>Hello {profile.name}</h3>))
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
