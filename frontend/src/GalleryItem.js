import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    padding: "0.2em",
    position: "relative",
  },
  media: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "1em",
    boxShadow: "2px 2px 10px -2px rgba(66, 68, 90, 1)",
  },
  button: {
    position: "absolute",
    top: "0.5em",
    right: "0.5em",
  },
});

export default function GalleryItem(props) {
  const classes = useStyles();
  const { url, _id } = props.imageData;

  const handleDelete = () => {
    props.handleDelete(_id);
  };

  return (
    <div className={classes.root}>
      <img alt="meaningless text" className={classes.media} src={url} />
      <IconButton
        onClick={handleDelete}
        disableRipple
        className={classes.button}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
