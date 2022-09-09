import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts import
import MainLayout from "../layouts/MainLayout";
import BlankLayout from "../layouts/BlankLayout";

// Pages import
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movie/:movieId" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
}

export default Router;
