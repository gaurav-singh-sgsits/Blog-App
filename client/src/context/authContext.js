import { createContext, useEffect, useState } from "react";
import axios from "axios";

//  we are using this to store our user information using context api
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (values) => {
    const res = await axios.post("/auth/login", values);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
    window.location.reload(false);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
