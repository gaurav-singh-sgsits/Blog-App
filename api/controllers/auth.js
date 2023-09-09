import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const register = (req, res) => {
  // check for existing user

  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], async (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User alread exists");

    // else Hash the password insert user to our database
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // insert user in our db
    const q =
      "INSERT INTO users(`username`,`email`, `password`, `img`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.img,
    ];

    db.query(q, [values], async (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {
  // Check User
  const q = "SELECT *  FROM users WHERE email = ?";

  db.query(q, [req.body.email], async (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check password
    const idPasswordCorrect = await bcrypt.compare(
      req.body.password,
      data[0].password
    );

    if (!idPasswordCorrect)
      return res.status(400).json("Wrong username or password");

    // now we are going to use JWT(json web token)
    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
    const { password, ...other } = data[0];

    // sening our token in  the form of a cookie and using httpOnly method so that our token can only be used during api requests

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};
