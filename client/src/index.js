import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AuthContextProvider } from "./context/authContext.js";
import { SearchContextProvider } from "./context/serchContext.js";

import { CatContextProvider } from "./context/catContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CatContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </CatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
