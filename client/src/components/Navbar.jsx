import React, { useContext } from "react";
import Logo from "../img/logo.png";
import Search from "../img/search.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { SearchContext } from "../context/serchContext";
import { CatContext } from "../context/catContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { search, setSearch } = useContext(SearchContext);
  const { cat, setCat } = useContext(CatContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" onClick={(e) => setCat("")} to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="searchbar">
          <input
            className="search-bar"
            type="text"
            placeholder="Search projects..."
            autoComplete="off"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {/* <button className="search-button">
            <img className="search-icon" src={Search} />
          </button> */}
        </div>

        <div className="links">
          <div className="category">
            <Link
              className="link"
              onClick={(e) => setCat("arduino")}
              to="/?cat=arduino"
            >
              Arduino
            </Link>
            <Link
              className="link"
              onClick={(e) => setCat("esp32")}
              to="/?cat=esp32"
            >
              ESP32
            </Link>
            <Link
              className="link"
              onClick={(e) => setCat("iot")}
              to="/?cat=iot"
            >
              IOT
            </Link>
            <Link
              className="link"
              onClick={(e) => setCat("robots")}
              to="/?cat=robots"
            >
              ROBOTS
            </Link>
          </div>

          {currentUser ? (
            currentUser.img ? (
              <div className="profile">
                <div className="img">
                  <Link to="/profile">
                    <img src={`${currentUser.img}`} alt="" />
                  </Link>
                </div>
                <div className="name">{currentUser.username}</div>
              </div>
            ) : (
              <div className="profile">
                <div className="name">{currentUser.username}</div>
              </div>
            )
          ) : null}

          <div className="logged">
            {currentUser ? (
              <span onClick={logout}>Logout</span>
            ) : (
              <Link className="link" to="/login">
                <span>LOGIN</span>
              </Link>
            )}
            {currentUser && (
              <span className="write">
                <Link to="/write" className="link">
                  WRITE
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
