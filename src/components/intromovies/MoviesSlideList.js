import React, { useContext, useEffect, useRef, useState } from "react";

// API
import apiService from "../../api/apiService";
import { API_KEY } from "../../api/config";

// Components
import MovieSlideCard from "./MovieSlideCard";

// Material UI
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { MovieContext } from "../../context/MovieProvider";

function MoviesSlideList() {
  const dataContext = useContext(MovieContext);
  const [moviesList, setMoviesList] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  useEffect(() => {
    const fetchDataMovies = async () => {
      try {
        // Example: https://api.themoviedb.org/3/movie/now_playing?api_key=747bdae421bd7cc4b6553379021dab65&language=en-US&page=1
        const response = await apiService.get(
          `movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );

        setMoviesList(response.data.results);

        // console.log(">>> NowPlayingList", response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataMovies();
    // console.log(BASE_URL);
  }, []);

  const listRef = useRef();

  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${500 + distance}px)`;
    } else if (direction === "right" && slideNumber <= 10) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-500 + distance}px)`;
    } else if (slideNumber > 10) {
      listRef.current.style.transform = `translateX(${-3500}px)`;
    }
    console.log(distance);
  };
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ pt: 7, pb: 3 }}
        fontWeight={700}
      >
        <Divider>MOVIES</Divider>
      </Typography>

      <Box sx={{ position: "relative" }}>
        <ArrowBackIosNewIcon
          fontSize="large"
          sx={{
            width: 50,
            height: 100,
            backgroundColor: "rgb(22,22,22,0.5)",
            color: "#fff",
            zIndex: 99,
            position: "absolute",
            left: 0,
            top: -50,
            bottom: 0,
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => handleClick("left")}
        />
        <Box>
          {dataContext.isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                width: "max-content",
                transform: "translateX(0px)",
                transition: "all 1s ease",
              }}
              ref={listRef}
            >
              {moviesList.map((movie) => (
                <MovieSlideCard key={movie.id} movie={movie} />
              ))}
            </Stack>
          )}
        </Box>

        <ArrowForwardIosIcon
          fontSize="large"
          sx={{
            width: 50,
            height: 100,
            backgroundColor: "rgb(22,22,22,0.5)",
            color: "#fff",
            zIndex: 99,
            position: "absolute",
            right: 0,
            top: -50,
            bottom: 0,
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => handleClick("right")}
        />
      </Box>
    </Box>
  );
}

export default MoviesSlideList;
