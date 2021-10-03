const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const path = require("path");

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
  const cors = require("cors");
  app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // base64 helpers
// const btoa = (string) => Buffer.from(string).toString("base64");
// const atob = (encoded) => Buffer.from(encoded, "base64").toString();

authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const token = authorization.replace("Basic ", "");

  if (!token) res.status(401).json({ error: `Unauthorized` });

  const user = await db.users.asyncFindOne({ token });

  if (!user) res.status(401).json({ error: `Unauthorized` });

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

// create post
app.post("/api/images", authMiddleware, async (req, res) => {
  if (req.body.url === "") res.status(400).json({ error: "Bad request." });
  // TODO: add regex to verify if url is correct, if not send another error

  const doc = req.body;
  doc.createdAt = Date.now();

  const image = await db.images.asyncInsert(doc);
  res.json(image);
});

// read images
app.get("/api/images", async (req, res) => {
  const images = await db.images.asyncFind({}, [["sort", { createdAt: -1 }]]);
  console.log(images);
  res.json(images);
});

app.get("/api/images/:id", async (req, res) => {
  const image = await db.images.asyncFindOne({ _id: req.params.id });
  res.json(image);
});

// delete all
app.delete("/api/images", authMiddleware, async (req, res) => {
  const clean = await db.images.asyncRemove({});
  res.json(clean);
});

// utils
app.get("/api/status", (req, res) => {
  res.json({ status: "Server works!" });
});

app.use("/", express.static(path.resolve(__dirname, "../frontend/public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/public/index.html"));
});

app.listen(PORT);
console.log("localhost:3000");
