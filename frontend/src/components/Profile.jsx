import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile({ token }) {
  const [profile, setProfile] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await axios.get("/firebase/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (!data) {
          setIsFetching(true);
          return null;
        } else {
          setIsFetching(false);
          var result = data.data;
          setProfile(result);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchProfile();
  }, [token]);

  return (
    <div>
      {!isFetching && profile.email ? (
        <h3>Hello {profile.name}</h3>
      ) : (
        <h1>fetching data please wait</h1>
      )}
    </div>
  );
}
