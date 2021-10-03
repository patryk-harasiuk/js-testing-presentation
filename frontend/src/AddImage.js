import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: "3em",
    right: "3em",
  },
}));

export default function AddImage(props) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleChange = (e) => {
    setUrl(e.target.value);
  };
  const handleSubmit = () => {
    props.url(url);
    handleClose();
  };

  return (
    <React.Fragment>
      <Fab color="primary" onClick={handleOpen} className={classes.root}>
        <AddIcon />
      </Fab>
      <Dialog open={isOpen} onClose={handleClose} fullWidth>
        <DialogTitle id="add-url">Add image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="url"
            label="url"
            type="url"
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
          <Button onClick={handleSubmit} color="primary" disabled={!url}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
