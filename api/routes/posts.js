import express from "express";
import {
  addPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

// to route these following end points to their respective controllers
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
