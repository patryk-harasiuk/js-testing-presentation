import { makeStyles } from "@material-ui/core";
import React from "react";
import GalleryItem from "./GalleryItem";

const useStyles = makeStyles({
  media: {
    columnCount: (columns) => columns,
    padding: "2em",
  },
});

export default function Gallery(props) {
  const columns = props.images.length <= 3 ? props.images.length : 3;
  const classes = useStyles(columns);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/images/${id}`, {
      method: "DELETE",
      headers: {
        authorization: props.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(`${res.status}:${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => props.update())
      .catch((error) => console.warn(error));
    props.update();
  };
  return (
    <section className={classes.media}>
      {props.images.map((image, index) => {
        return (
          <GalleryItem
            key={index}
            imageData={image}
            handleDelete={handleDelete}
          ></GalleryItem>
        );
      })}
    </section>
  );
}
