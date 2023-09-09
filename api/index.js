import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
// import uploadRoutes from "./routes/uploads.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();
const port = 8000;

// using this middleware so that we can parse the json data to js object so that we can use it in our code
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }, { limit: "50mb" }));
// to send and recieve cookies through our web app
app.use(cookieParser());

// To handle uploads in our files
const storageCover = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads/cover");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const uploadCover = multer({ storage: storageCover });
const uploadUserimg = multer({ storage: storageUser });

app.post(
  "/api/upload/coverImg",
  uploadCover.single("file"),
  function (req, res) {
    const file = req.file;
    console.log(file.filename);
    res.status(200).json({ location: `../uploads/cover/${file.filename}` });
  }
);

app.post(
  "/api/upload/userImg",
  uploadUserimg.single("file"),
  function (req, res) {
    const file = req.file;
    console.log(file.filename);
    res.status(200).json({ location: `../uploads/users/${file.filename}` });
  }
);

// to route all the requests with the following end points with their respective functions
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("api/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
