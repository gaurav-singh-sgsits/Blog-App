import { createContext, useEffect, useState } from "react";

export const CatContext = createContext();

export const CatContextProvider = ({ children }) => {
  const [cat, setCat] = useState("");

  useEffect(() => {
    localStorage.setItem("cat", JSON.stringify(cat));
  }, [cat]);

  return (
    <CatContext.Provider value={{ cat, setCat }}>
      {children}
    </CatContext.Provider>
  );
};
