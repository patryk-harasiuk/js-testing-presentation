import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function LoginDialog(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    props.handleLoginDialogState(false);
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "username":
        setUserName(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // const token = btoa()`${userName}:${password}`.toString("base64");
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: btoa(`${userName}:${password}`),
      }), // body data type must match "Content-Type" header
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(`${res.status}:${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => props.handleLogin(res.username))
      .catch((error) => console.warn(error));
    props.handleLoginDialogState(false);
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="username"
            type="text"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="password"
            label="password"
            type="password"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!userName || !password}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
