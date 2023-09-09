import { createContext, useEffect, useState } from "react";
export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(search));
  }, [search]);

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
