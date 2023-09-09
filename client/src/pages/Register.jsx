import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (file) {
        const res = await upload();
        // console.log(res);
        setImg(res.location);
      }
    };
    fetchData();
  }, [file]);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload/userImg", formData);
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post("/auth/register", {
            ...values,
            img: `${img}`,
          });
          setMessage(res.data + ". Redirecting you to login page in a sec");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } catch (err) {
          setMessage(err.response.data);
        }

        setTimeout(() => {
          setMessage();
        }, 3000);
        action.resetForm();
      },
    });

  const handleCancelclick = () => {
    setImg(null);
    setFile(null);
  };

  console.log(file, img);
  // console.log(values);

  return (
    <div className="auth">
      <div className="container">
        <h1 className="modal-title">Register</h1>
        <p className="modal-desc">
          To electroblog, your go to place for Electronics Project Ideas!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <input
              type="name"
              autoComplete="off"
              name="username"
              id="username"
              placeholder="UserName"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username ? (
              <p className="form-error">{errors.username}</p>
            ) : null}
          </div>
          <div className="input-block">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}
          </div>
          <div className="input-block">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}
          </div>
          <div className="input-block">
            <label htmlFor="confirm_password" className="input-label">
              Confirm Password
            </label>
            <input
              type="password"
              autoComplete="off"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirm_password && touched.confirm_password ? (
              <p className="form-error">{errors.confirm_password}</p>
            ) : null}
          </div>
          <div className="input-block user-img">
            <label htmlFor="img" className="input-label">
              Upload Profile Picture
            </label>
            <input
              type="file"
              name="img"
              id="img"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {img && <img src={`${img}`} />}
            {img && (
              <button className="input-label" onClick={handleCancelclick}>
                Cancel
              </button>
            )}
          </div>
          <div className="modal-buttons">
            <button className="input-button" type="submit">
              Register
            </button>
            {message ? <p className="form-error">{message}</p> : null}
          </div>
        </form>
        <p className="sign-up">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
