import { useState } from "react";

export default function FetchUser() {
  const [user, setUser] = useState();
  const [error, setError] = useState("");

  const API = "https://random-data-api.com/api/users/random_user";

  const getRandomUser = async () => {
    setError("");

    fetch(API, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => setUser({UserData: res}))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="content">
      <button className="button" onClick={getRandomUser}>
        Fetch user
      </button>
      <pre className="paragraph" role="textbox">
        {error ? "Something went wrong..." : JSON.stringify(user, null, 8)}
      </pre>
    </div>
  );
}
