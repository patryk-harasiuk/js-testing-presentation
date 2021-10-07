const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// const { Datastore } = require('nedb-async-await');
const { AsyncNedb } = require("nedb-async");

const db = {};
db.images = new AsyncNedb({
  filename: path.resolve(path.dirname(""), "./database/images.db"),
  autoload: true,
});

db.users = new AsyncNedb({
  filename: path.resolve(path.dirname(""), "./database/users.db"),
  autoload: true,
});

if (process.env.ENV === "dev") {
  console.log("cors is on");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// // base64 helpers
// const btoa = (string) => Buffer.from(string).toString("base64");
// const atob = (encoded) => Buffer.from(encoded, "base64").toString();

authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization || "";
  let user;
  console.log(token);
  if (token) {
    user = await db.users.asyncFindOne({ token });
  }
  if (!user) return res.status(401).json({ error: `Unauthorized` });

  next();
};

app.post("/api/login", async (req, res) => {
  const { token } = req.body;
  let user;

  if (token) {
    user = await db.users.asyncFindOne({ token });
  }

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// read images
app.get("/api/images", async (req, res) => {
  const images = await db.images.asyncFind({}, [["sort", { createdAt: -1 }]]);
  console.log(images);
  res.json(images);
});

// add image
app.post("/api/images", authMiddleware, async (req, res) => {
  if (req.body.url === "") res.status(400).json({ error: "Bad request." });
  // TODO: add regex to verify if url is correct, if not send another error

  const doc = req.body;
  doc.createdAt = Date.now();

  const image = await db.images.asyncInsert(doc);
  res.json(image);
});

app.get("/api/images/:id", async (req, res) => {
  const image = await db.images.asyncFindOne({ _id: req.params.id });
  res.json(image);
});

// delete image
app.delete("/api/images/:id", authMiddleware, async (req, res) => {
  console.log(req.params.id);
  const removed = await db.images.asyncRemove({ _id: req.params.id });
  res.json(removed);
});

// utils
app.get("/api/status", (req, res) => {
  res.json({ status: "Server works!" });
});

app.use("/", express.static(path.resolve(__dirname, "./docs/")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../docs/index.html"));
});

app.listen(PORT);
console.log("http://localhost:3000");
