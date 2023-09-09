import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  console.log(req.query);
  const cat = req.query.cat;
  const search = req.query.search;
  if (cat.length > 0 && search.length == 0) {
    const q = "SELECT * FROM posts WHERE category=?";
    db.query(q, [cat], (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });
  } else if (cat.length == 0 && search.length > 0) {
    const q = `SELECT * FROM posts WHERE title like '%${search}%'`;

    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });
  } else if (cat.length > 0 && search.length > 0) {
    const q = `SELECT * FROM posts WHERE category=? AND title like '%${search}%'`;

    db.query(q, [cat], (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });
  } else {
    const q = "SELECT * FROM posts";
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });
  }
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img as postImage, u.img as userImage, `category`, `date`, `about` FROM posts p LEFT JOIN users u ON p.uid = u.id WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  // To make sure that we are the logged in and that our token is valid
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not authenticated, Please Login first");
  }

  // now we have to verify our JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO posts(`title`,`desc`,`img`,`category`,`date`,`uid`, `about`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
      req.body.about,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  // check whether we have a jwt and verify that we are the owner of the post we are trying to delete

  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  // now we have to verify our JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id`= ? AND `uid` = ?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post.");

      return res.status(200).json("Post has been deleted");
    });
  });
};

export const updatePost = (req, res) => {
  // To make sure that we are the logged in and that our token is valid
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  // now we have to verify our JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;

    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`category`=?, `about`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.about,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
