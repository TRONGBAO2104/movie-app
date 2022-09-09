import React from "react";

// components
import IntroVideo from "../components/IntroVideo";
import MoviesSlideList from "../components/intromovies/MoviesSlideList";
import MainMoviesList from "../components/mainmovies/MainMoviesList";
import { Box } from "@mui/material";

function HomePage() {
  return (
    <>
      <IntroVideo />

      <Box sx={{ position: "relative", top: -120 }}>
        <MoviesSlideList />
      </Box>

      <Box sx={{ position: "relative", top: -80, pr: 2 }}>
        <MainMoviesList />
      </Box>
    </>
  );
}

export default HomePage;
