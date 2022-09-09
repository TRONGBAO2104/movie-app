import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./context/MovieProvider";
import Router from "./routes";

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
