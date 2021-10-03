import React, { useEffect, useState } from "react";
import LoginDialog from "./LoginDialog";
import NavBar from "./NavBar";

function App() {
  const [userName, setUserName] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [images, setImages] = useState([]);

  const handleLoginDialog = (state) => {
    setLoginOpen(state);
  };

  const handleLogin = (username) => {
    setUserName(username);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/images")
      .then((res) => res.json())
      .then(setImages)
      .catch((error) => console.warn(error));
  }, []);

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
    </React.Fragment>
  );
}

export default App;
