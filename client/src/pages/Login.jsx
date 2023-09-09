import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { AuthContext } from "../context/authContext";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  // to set the zoom when the page loads
  // useEffect(() => {
  //   const initialValue = document.body.style.zoom;

  //   // Change zoom level on mount
  //   document.body.style.zoom = "100%";

  //   return () => {
  //     // Restore default value
  //     document.body.style.zoom = initialValue;
  //   };
  // }, []);

  const [message, setMessage] = useState();
  const navigate = useNavigate();

  // using context to check if the user has logged in
  const { login } = useContext(AuthContext);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          await login(values);
          setMessage("Welcome Back! Redirecting you to home page in a sec");
          setTimeout(() => {
            navigate("/");
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

  return (
    <div className="auth login">
      <div className="container">
        <h1 className="modal-title">Login</h1>
        <p className="modal-desc">To learn something new</p>
        <form onSubmit={handleSubmit}>
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
          <div className="modal-buttons">
            <button className="input-button" type="submit">
              Login
            </button>
            {message ? <p className="form-error">{message}</p> : null}
          </div>
        </form>
        <p className="sign-up">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
