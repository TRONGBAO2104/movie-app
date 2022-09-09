import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import NavAppBar from "../components/NavAppBar";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <NavAppBar />

      {/*  Route MainLayout wrapper Route HomePage and DetailPage and showup here */}
      <Outlet />

      {/* I dont realy know what effect it come Lol */}
      <Box sx={{ flexGrow: 1 }} />

      {/* <Footer /> */}
    </Stack>
  );
}

export default MainLayout;
