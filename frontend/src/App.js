import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import LoginDialog from "./LoginDialog";
import NavBar from "./NavBar";
import AddImage from "./AddImage";

function App() {
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [lastUpdate, setLastUpdate] = useState("");

  const handleLoginDialog = (state) => {
    setLoginOpen(state);
  };

  const handleLogin = (username, token) => {
    setUserName(username);
    setToken(token);
  };

  const handleUpdate = () => {
    setLastUpdate(String(Math.floor(Math.random() * 1000000000000000000))); // xd
  };

  const handleNewImage = (url) => {
    // check if url is correct
    fetch(`http://localhost:3000/api/images/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ url: url }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(`${res.status}:${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => handleUpdate())
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/images")
      .then((res) => res.json())
      .then(setImages)
      .catch((error) => console.warn(error));
  }, [lastUpdate]);

  return (
    <React.Fragment>
      <NavBar
        userName={userName}
        handleLoginDialogState={handleLoginDialog}
      ></NavBar>
      <LoginDialog
        isOpen={loginOpen}
        handleLoginDialogState={handleLoginDialog}
        handleLogin={handleLogin}
      ></LoginDialog>
      <Gallery token={token} images={images} update={handleUpdate}></Gallery>
      <AddImage url={handleNewImage}></AddImage>
    </React.Fragment>
  );
}

export default App;
